import { curl_multi_init, curl_multi_cleanup, curl_multi_add_handle, curl_multi_remove_handle, curl_multi_socket_action, curl_multi_perform, curl_multi_poll_async, curl_multi_wakeup, curl_multi_info_read, curl_multi_setopt_long, curl_multi_setopt_ptr, curl_multi_strerror, curl_easy_strerror, koffi, getHandleAddress, } from "../ffi/libcurl.js";
import { CurlMCode, CurlMOpt, CurlMsg, CurlCode, CurlPoll, CurlCSelect, CURL_SOCKET_TIMEOUT, } from "../ffi/constants.js";
import { mapCurlError } from "../utils/errors.js";
const SOCKET_ACTION_FALLBACK_MS = 100;
const POLL_TIMEOUT_MS = 1000;
const CURLPIPE_NOTHING = 0;
const CURLPIPE_MULTIPLEX = 2;
const koffiTypeSuffix = `${process.pid}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
const SocketCallbackProto = koffi.proto(`int CurlMultiSocketCallback_${koffiTypeSuffix}(void *, int, int, void *, void *)`);
const TimerCallbackProto = koffi.proto(`int CurlMultiTimerCallback_${koffiTypeSuffix}(void *, long, void *)`);
function debugMulti(message) {
    if (process.env.IMPERS_DEBUG_TESTS === "1") {
        console.log(`[curl-multi] ${message}`);
    }
}
/**
 * CurlMulti - Async multi-handle interface for concurrent requests
 *
 * Uses libcurl's socket action API to integrate with Node.js' event loop.
 * This allows multiple HTTP requests to run concurrently without blocking.
 *
 * Bun does not implement the libuv polling that koffi.node.poll needs
 * (oven-sh/bun#18546). There, libcurl waits in curl_multi_poll on a worker
 * thread instead, and transfers run on the main thread with curl_multi_perform.
 * While that poll is in flight the handle belongs to the worker: only
 * curl_multi_wakeup may be called, so adds and cancels are queued until the
 * poll returns.
 */
export class CurlMulti {
    handle;
    pendingTransfers = new Map(); // keyed by handle address
    curlToAddr = new Map();
    polling = false;
    timer = null;
    fallbackTimer = null;
    socketPolls = new Map();
    socketCallback = null;
    timerCallback = null;
    closed = false;
    usePollThread = Boolean(process.versions.bun);
    queuedAdds = [];
    queuedCancels = new Map();
    driver = null;
    driving = false;
    pollInFlight = false;
    constructor(options = {}) {
        this.handle = curl_multi_init();
        if (!this.handle) {
            throw new Error("Failed to initialize curl multi handle");
        }
        // Configure multi handle options
        if (options.maxConnections !== undefined) {
            this.setOptLong(CurlMOpt.CURLMOPT_MAXCONNECTS, options.maxConnections);
        }
        if (options.maxHostConnections !== undefined) {
            this.setOptLong(CurlMOpt.CURLMOPT_MAX_HOST_CONNECTIONS, options.maxHostConnections);
        }
        if (options.maxTotalConnections !== undefined) {
            this.setOptLong(CurlMOpt.CURLMOPT_MAX_TOTAL_CONNECTIONS, options.maxTotalConnections);
        }
        if (options.pipelining !== undefined) {
            this.setOptLong(CurlMOpt.CURLMOPT_PIPELINING, options.pipelining ? CURLPIPE_MULTIPLEX : CURLPIPE_NOTHING);
        }
    }
    setOptLong(option, value) {
        if (!this.handle)
            return;
        const code = curl_multi_setopt_long(this.handle, option, value);
        if (code !== CurlMCode.CURLM_OK) {
            throw new Error(`curl_multi_setopt failed: ${curl_multi_strerror(code)}`);
        }
    }
    setOptPtr(option, value) {
        if (!this.handle)
            return;
        const code = curl_multi_setopt_ptr(this.handle, option, value);
        if (code !== CurlMCode.CURLM_OK) {
            throw new Error(`curl_multi_setopt failed: ${curl_multi_strerror(code)}`);
        }
    }
    ensureSocketCallbacks() {
        if (this.socketCallback || this.timerCallback) {
            return;
        }
        this.socketCallback = koffi.register((_easy, socket, what, clientp, socketp) => {
            void clientp;
            void socketp;
            try {
                return this.updateSocketPoll(socket, what);
            }
            catch (error) {
                this.failFromCallback("socket callback", error);
                return -1;
            }
        }, koffi.pointer(SocketCallbackProto));
        this.timerCallback = koffi.register((_multi, timeoutMs, clientp) => {
            void clientp;
            try {
                return this.updateTimer(timeoutMs);
            }
            catch (error) {
                this.failFromCallback("timer callback", error);
                return -1;
            }
        }, koffi.pointer(TimerCallbackProto));
        this.setOptPtr(CurlMOpt.CURLMOPT_SOCKETFUNCTION, this.socketCallback);
        this.setOptPtr(CurlMOpt.CURLMOPT_TIMERFUNCTION, this.timerCallback);
    }
    /**
     * Add a Curl handle and perform the transfer asynchronously
     * Returns a Promise that resolves when the transfer completes
     */
    async perform(curl) {
        if (this.closed) {
            throw new Error("CurlMulti has been closed");
        }
        if (!this.handle) {
            throw new Error("CurlMulti handle is null");
        }
        const easyHandle = curl.getHandle();
        if (!easyHandle) {
            throw new Error("Curl handle is null");
        }
        if (this.usePollThread) {
            return new Promise((resolve, reject) => {
                const handleAddr = getHandleAddress(easyHandle);
                this.queuedAdds.push({ curl, handle: easyHandle, handleAddr, resolve, reject });
                this.curlToAddr.set(curl, handleAddr);
                this.drive();
            });
        }
        return new Promise((resolve, reject) => {
            // Get the handle address for lookup
            const handleAddr = getHandleAddress(easyHandle);
            debugMulti(`add handle=${handleAddr} pending=${this.pendingTransfers.size}`);
            this.ensureSocketCallbacks();
            // Add to multi handle
            const code = curl_multi_add_handle(this.handle, easyHandle);
            if (code !== CurlMCode.CURLM_OK) {
                this.stopPolling();
                reject(new Error(`curl_multi_add_handle failed: ${curl_multi_strerror(code)}`));
                return;
            }
            // Store pending transfer keyed by handle address
            const transfer = { curl, handle: easyHandle, handleAddr, resolve, reject };
            this.pendingTransfers.set(handleAddr, transfer);
            this.curlToAddr.set(curl, handleAddr);
            this.startPolling();
        });
    }
    /**
     * Start the curl_multi_poll loop, or wake it if it is waiting
     */
    drive() {
        if (this.driving) {
            if (this.pollInFlight && this.handle) {
                curl_multi_wakeup(this.handle);
            }
            return;
        }
        this.driving = true;
        this.driver = this.runPollLoop();
    }
    async runPollLoop() {
        try {
            while (this.applyQueued()) {
                const { code } = curl_multi_perform(this.handle);
                if (code !== CurlMCode.CURLM_OK && code !== CurlMCode.CURLM_CALL_MULTI_PERFORM) {
                    this.failAllPending(new Error(`curl_multi_perform failed: ${curl_multi_strerror(code)}`));
                    break;
                }
                this.checkCompleted();
                if (this.queuedAdds.length > 0 || this.queuedCancels.size > 0) {
                    continue;
                }
                if (this.pendingTransfers.size === 0) {
                    break;
                }
                this.pollInFlight = true;
                let pollCode;
                try {
                    pollCode = await curl_multi_poll_async(this.handle, POLL_TIMEOUT_MS);
                }
                finally {
                    this.pollInFlight = false;
                }
                if (pollCode !== CurlMCode.CURLM_OK) {
                    this.failAllPending(new Error(`curl_multi_poll failed: ${curl_multi_strerror(pollCode)}`));
                    break;
                }
            }
        }
        catch (error) {
            this.failFromCallback("multi poll", error);
        }
        this.driving = false;
    }
    /**
     * Apply queued cancels and adds. Only called while no poll is in flight.
     * Returns whether there are transfers left to drive.
     */
    applyQueued() {
        if (this.closed || !this.handle) {
            return false;
        }
        for (const [handleAddr, error] of this.queuedCancels) {
            const pending = this.pendingTransfers.get(handleAddr);
            if (pending) {
                curl_multi_remove_handle(this.handle, pending.handle);
                this.pendingTransfers.delete(handleAddr);
                this.curlToAddr.delete(pending.curl);
                pending.reject(error);
            }
        }
        this.queuedCancels.clear();
        for (const transfer of this.queuedAdds.splice(0)) {
            const code = curl_multi_add_handle(this.handle, transfer.handle);
            if (code !== CurlMCode.CURLM_OK) {
                this.curlToAddr.delete(transfer.curl);
                transfer.reject(new Error(`curl_multi_add_handle failed: ${curl_multi_strerror(code)}`));
                continue;
            }
            this.pendingTransfers.set(transfer.handleAddr, transfer);
        }
        return this.pendingTransfers.size > 0;
    }
    /**
     * Start the poll loop if not already running
     */
    startPolling() {
        if (this.closed)
            return;
        this.polling = true;
        debugMulti(`start pending=${this.pendingTransfers.size}`);
        this.scheduleFallbackTimer();
        this.processData(CURL_SOCKET_TIMEOUT, CurlPoll.CURL_POLL_NONE);
    }
    /**
     * Drive libcurl after a socket or timeout event.
     */
    runSocketAction(socket, events) {
        if (this.closed || !this.handle || this.pendingTransfers.size === 0) {
            debugMulti(`skip action socket=${socket} events=${events} pending=${this.pendingTransfers.size}`);
            this.stopPolling();
            return;
        }
        const { code, runningHandles } = curl_multi_socket_action(this.handle, socket, events);
        debugMulti(`action socket=${socket} events=${events} code=${code} running=${runningHandles} pending=${this.pendingTransfers.size}`);
        if (code !== CurlMCode.CURLM_OK && code !== CurlMCode.CURLM_CALL_MULTI_PERFORM) {
            const error = new Error(`curl_multi_socket_action failed: ${curl_multi_strerror(code)}`);
            this.failAllPending(error);
            this.stopPolling();
            return;
        }
        this.checkCompleted();
        if (runningHandles === 0 && this.pendingTransfers.size === 0) {
            this.stopPolling();
        }
    }
    processData(socket, events) {
        try {
            this.runSocketAction(socket, events);
        }
        catch (error) {
            this.failFromCallback("socket action", error);
        }
    }
    updateSocketPoll(socket, what) {
        debugMulti(`socket callback socket=${socket} what=${what}`);
        if (this.closed) {
            this.closeSocketPoll(socket);
            return 0;
        }
        try {
            const existing = this.socketPolls.get(socket);
            if (existing) {
                existing.stop();
            }
            if (what === CurlPoll.CURL_POLL_REMOVE || what === CurlPoll.CURL_POLL_NONE) {
                this.closeSocketPoll(socket);
                return 0;
            }
            const readable = what === CurlPoll.CURL_POLL_IN || what === CurlPoll.CURL_POLL_INOUT;
            const writable = what === CurlPoll.CURL_POLL_OUT || what === CurlPoll.CURL_POLL_INOUT;
            const opts = { readable, writable, disconnect: true };
            if (existing) {
                existing.start(opts, (status, events) => this.onSocketEvent(socket, status, events));
            }
            else {
                const poll = koffi.node.poll(socket, opts, (status, events) => this.onSocketEvent(socket, status, events));
                this.socketPolls.set(socket, poll);
            }
            debugMulti(`watch socket=${socket} readable=${readable} writable=${writable}`);
            return 0;
        }
        catch (error) {
            debugMulti(`watch failed socket=${socket}: ${error instanceof Error ? error.message : String(error)}`);
            return -1;
        }
    }
    onSocketEvent(socket, status, events) {
        if (this.closed)
            return;
        debugMulti(`event socket=${socket} status=${status} readable=${events.readable} writable=${events.writable} disconnect=${events.disconnect}`);
        let eventMask = 0;
        if (events.readable) {
            eventMask |= CurlCSelect.CURL_CSELECT_IN;
        }
        if (events.writable) {
            eventMask |= CurlCSelect.CURL_CSELECT_OUT;
        }
        if (events.disconnect || status < 0) {
            eventMask |= CurlCSelect.CURL_CSELECT_ERR;
        }
        if (eventMask !== 0) {
            this.processData(socket, eventMask);
        }
    }
    updateTimer(timeoutMs) {
        this.clearTimer();
        debugMulti(`timer callback timeout=${timeoutMs}`);
        if (this.closed || timeoutMs < 0) {
            return 0;
        }
        // Do not call libcurl recursively from inside the timer callback.
        this.timer = setTimeout(() => {
            this.timer = null;
            debugMulti("timer fired");
            this.processData(CURL_SOCKET_TIMEOUT, CurlPoll.CURL_POLL_NONE);
        }, Math.max(0, timeoutMs));
        return 0;
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    scheduleFallbackTimer() {
        if (this.fallbackTimer || this.closed || this.pendingTransfers.size === 0) {
            return;
        }
        this.fallbackTimer = setTimeout(() => {
            this.fallbackTimer = null;
            if (this.closed || this.pendingTransfers.size === 0) {
                return;
            }
            debugMulti("fallback fired");
            this.processData(CURL_SOCKET_TIMEOUT, CurlPoll.CURL_POLL_NONE);
            this.scheduleFallbackTimer();
        }, SOCKET_ACTION_FALLBACK_MS);
    }
    clearFallbackTimer() {
        if (this.fallbackTimer) {
            clearTimeout(this.fallbackTimer);
            this.fallbackTimer = null;
        }
    }
    closeSocketPoll(socket) {
        const poll = this.socketPolls.get(socket);
        if (!poll) {
            return;
        }
        try {
            poll.close();
        }
        catch {
            // Ignore poll handles already closed by libuv/Koffi.
        }
        this.socketPolls.delete(socket);
    }
    closeAllSocketPolls() {
        for (const socket of this.socketPolls.keys()) {
            this.closeSocketPoll(socket);
        }
    }
    stopPolling() {
        this.polling = false;
        this.clearTimer();
        this.clearFallbackTimer();
        this.closeAllSocketPolls();
    }
    /**
     * Find a pending transfer by handle address
     */
    findPendingByHandle(completedHandle) {
        const handleAddr = getHandleAddress(completedHandle);
        return this.pendingTransfers.get(handleAddr) || null;
    }
    /**
     * Check for completed transfers and resolve/reject their promises
     */
    checkCompleted() {
        if (!this.handle)
            return;
        let info = curl_multi_info_read(this.handle);
        while (info.message) {
            const msg = info.message;
            if (msg.msg === CurlMsg.CURLMSG_DONE) {
                const pending = this.findPendingByHandle(msg.easyHandle);
                if (pending) {
                    debugMulti(`done handle=${pending.handleAddr} result=${msg.result}`);
                    // Remove from multi handle
                    curl_multi_remove_handle(this.handle, pending.handle);
                    this.pendingTransfers.delete(pending.handleAddr);
                    this.curlToAddr.delete(pending.curl);
                    // Resolve or reject based on result
                    if (msg.result === CurlCode.CURLE_OK) {
                        pending.resolve({ code: msg.result });
                    }
                    else {
                        const message = curl_easy_strerror(msg.result);
                        pending.reject(mapCurlError(msg.result, message || undefined));
                    }
                }
            }
            info = curl_multi_info_read(this.handle);
        }
    }
    /**
     * Fail all pending transfers with an error
     */
    failAllPending(error) {
        for (const queued of this.queuedAdds.splice(0)) {
            queued.reject(error);
        }
        for (const [, pending] of this.pendingTransfers) {
            if (this.handle) {
                curl_multi_remove_handle(this.handle, pending.handle);
            }
            pending.reject(error);
        }
        this.pendingTransfers.clear();
        this.curlToAddr.clear();
    }
    failFromCallback(context, error) {
        const reason = error instanceof Error ? error : new Error(String(error));
        const wrapped = new Error(`${context} failed: ${reason.message}`);
        if (reason.stack) {
            wrapped.stack = reason.stack;
        }
        debugMulti(wrapped.message);
        this.failAllPending(wrapped);
        this.stopPolling();
    }
    /**
     * Cancel a specific transfer
     */
    cancel(curl, error = new Error("Transfer cancelled")) {
        if (!this.handle)
            return false;
        const handleAddr = this.curlToAddr.get(curl);
        if (handleAddr === undefined)
            return false;
        if (this.usePollThread) {
            const queued = this.queuedAdds.findIndex((transfer) => transfer.curl === curl);
            if (queued !== -1) {
                const [transfer] = this.queuedAdds.splice(queued, 1);
                this.curlToAddr.delete(curl);
                transfer.reject(error);
                return true;
            }
            if (!this.pendingTransfers.has(handleAddr))
                return false;
            // The handle is removed once the in-flight poll returns.
            this.queuedCancels.set(handleAddr, error);
            this.drive();
            return true;
        }
        const pending = this.pendingTransfers.get(handleAddr);
        if (!pending)
            return false;
        curl_multi_remove_handle(this.handle, pending.handle);
        this.pendingTransfers.delete(handleAddr);
        this.curlToAddr.delete(curl);
        pending.reject(error);
        if (this.pendingTransfers.size === 0) {
            this.stopPolling();
        }
        return true;
    }
    /**
     * Get number of active transfers
     */
    get activeCount() {
        return this.pendingTransfers.size;
    }
    /**
     * Check if multi handle is closed
     */
    get isClosed() {
        return this.closed;
    }
    /**
     * Close the multi handle and cleanup resources
     */
    async close() {
        if (this.closed)
            return;
        this.closed = true;
        // Let an in-flight curl_multi_poll return before touching the handle
        if (this.driving) {
            this.drive();
            await this.driver;
        }
        // Fail all pending transfers
        this.failAllPending(new Error("CurlMulti closed"));
        this.stopPolling();
        // Cleanup multi handle
        if (this.handle) {
            this.setOptPtr(CurlMOpt.CURLMOPT_SOCKETFUNCTION, null);
            this.setOptPtr(CurlMOpt.CURLMOPT_TIMERFUNCTION, null);
            curl_multi_cleanup(this.handle);
            this.handle = null;
        }
        this.releaseCallbacks();
    }
    releaseCallbacks() {
        for (const callback of [this.socketCallback, this.timerCallback]) {
            if (!callback) {
                continue;
            }
            try {
                koffi.unregister(callback);
            }
            catch {
                // Ignore callbacks already released during shutdown.
            }
        }
        this.socketCallback = null;
        this.timerCallback = null;
    }
}
// Shared multi instance for simple use cases
let sharedMulti = null;
/**
 * Get or create a shared CurlMulti instance
 */
export function getSharedMulti() {
    if (!sharedMulti || sharedMulti.isClosed) {
        sharedMulti = new CurlMulti({
            maxTotalConnections: 100,
            maxHostConnections: 6,
            pipelining: true,
        });
    }
    return sharedMulti;
}
/**
 * Close the shared multi instance
 */
export async function closeSharedMulti() {
    if (sharedMulti) {
        await sharedMulti.close();
        sharedMulti = null;
    }
}
//# sourceMappingURL=multi.js.map