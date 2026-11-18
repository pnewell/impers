/**
 * AsyncWebSocket - WebSocket client using libcurl
 *
 * Provides an async interface for WebSocket communication with support
 * for text, binary, ping/pong frames, and proper close handling.
 */
import { Curl } from "../core/easy.js";
import { curl_easy_perform_async, curl_ws_recv, curl_ws_send, } from "../ffi/libcurl.js";
import { CurlOpt, CurlCode, CurlWsFlag, CurlWsOpt } from "../ffi/constants.js";
import { WebSocketError, WebSocketClosed } from "../utils/errors.js";
import { Headers } from "../http/headers.js";
/**
 * WebSocket message types
 */
export var WebSocketMessageType;
(function (WebSocketMessageType) {
    WebSocketMessageType["TEXT"] = "text";
    WebSocketMessageType["BINARY"] = "binary";
    WebSocketMessageType["PING"] = "ping";
    WebSocketMessageType["PONG"] = "pong";
    WebSocketMessageType["CLOSE"] = "close";
})(WebSocketMessageType || (WebSocketMessageType = {}));
/**
 * AsyncWebSocket - Async WebSocket client
 */
export class AsyncWebSocket {
    curl;
    handle;
    _url;
    _connected = false;
    _closed = false;
    _closeEvent = null;
    receiveBuffer;
    messageQueue = [];
    pollTimer = null;
    pollInterval = 10; // ms between polls
    maxMessageSize;
    /**
     * Create a WebSocket connection
     * Use AsyncWebSocket.connect() for the preferred way to create a connection
     */
    constructor(url, options = {}) {
        this._url = url;
        this.maxMessageSize = options.maxMessageSize || 64 * 1024 * 1024; // 64MB default
        this.receiveBuffer = Buffer.alloc(Math.min(this.maxMessageSize, 1024 * 1024)); // Start with 1MB
        // Create curl handle
        this.curl = new Curl();
        this.handle = this.curl.getHandle();
        try {
            // Configure WebSocket URL (curl expects ws:// or wss:// scheme)
            this.curl.setOpt(CurlOpt.URL, url);
            // Enable WebSocket upgrade
            this.curl.setOpt(CurlOpt.CONNECT_ONLY, 2); // 2 = WebSocket mode
            if (options.perMessageDeflate) {
                this.curl.setOpt(CurlOpt.WS_OPTIONS, CurlWsOpt.CURLWS_PERMESSAGE_DEFLATE);
            }
            // Set headers
            if (options.headers) {
                this.curl.setStringList(CurlOpt.HTTPHEADER, new Headers(options.headers).toCurlHeaders());
            }
            // Set timeout
            if (options.timeout) {
                this.curl.setOpt(CurlOpt.TIMEOUT, options.timeout);
            }
        }
        catch (error) {
            this.curl.cleanup();
            throw error;
        }
    }
    /**
     * Connect to a WebSocket server
     */
    static async connect(url, options = {}) {
        const ws = new AsyncWebSocket(url, options);
        await ws.performConnect();
        return ws;
    }
    /**
     * Perform the WebSocket connection handshake using Koffi's async
     * worker thread to avoid blocking the Node.js event loop.
     */
    async performConnect() {
        try {
            const code = await curl_easy_perform_async(this.handle);
            if (code !== CurlCode.CURLE_OK) {
                throw new WebSocketError(`WS connect failed with code ${code}`);
            }
            this._connected = true;
        }
        catch (error) {
            this._closed = true;
            this.curl.cleanup();
            if (error instanceof WebSocketError)
                throw error;
            throw new WebSocketError(`Failed to connect: ${error}`);
        }
    }
    /**
     * Get the WebSocket URL
     */
    get url() {
        return this._url;
    }
    /**
     * Check if connected
     */
    get connected() {
        return this._connected && !this._closed;
    }
    /**
     * Check if closed
     */
    get closed() {
        return this._closed;
    }
    /**
     * Get close event details
     */
    get closeEvent() {
        return this._closeEvent;
    }
    /**
     * Try to receive a message (non-blocking)
     * Returns the message if available, null if CURLE_AGAIN
     * Throws on error
     */
    tryReceive() {
        if (this._closed) {
            return null;
        }
        const { code, received, frame } = curl_ws_recv(this.handle, this.receiveBuffer);
        if (code === CurlCode.CURLE_OK && received > 0) {
            // Process the received frame
            const data = Buffer.from(this.receiveBuffer.subarray(0, received));
            // Default to TEXT if no frame info available
            const flags = frame?.flags ?? CurlWsFlag.CURLWS_TEXT;
            const message = this.frameToMessage(data, flags);
            if (message) {
                // Handle close frame
                if (message.type === WebSocketMessageType.CLOSE) {
                    this.handleCloseFrame(message.data);
                    throw new WebSocketClosed(this._closeEvent?.code || 1000, this._closeEvent?.reason || "");
                }
                // Handle ping - auto respond with pong
                if (message.type === WebSocketMessageType.PING) {
                    this.sendPong(message.data).catch(() => { });
                }
                return message;
            }
        }
        else if (code === CurlCode.CURLE_AGAIN) {
            // No data available
            return null;
        }
        else if (code !== CurlCode.CURLE_OK) {
            // Error occurred
            throw new WebSocketError(`Receive error: ${code}`);
        }
        return null;
    }
    /**
     * Convert frame flags to message type
     */
    frameToMessage(data, flags) {
        if (flags & CurlWsFlag.CURLWS_TEXT) {
            return { type: WebSocketMessageType.TEXT, data };
        }
        else if (flags & CurlWsFlag.CURLWS_BINARY) {
            return { type: WebSocketMessageType.BINARY, data };
        }
        else if (flags & CurlWsFlag.CURLWS_PING) {
            return { type: WebSocketMessageType.PING, data };
        }
        else if (flags & CurlWsFlag.CURLWS_PONG) {
            return { type: WebSocketMessageType.PONG, data };
        }
        else if (flags & CurlWsFlag.CURLWS_CLOSE) {
            return { type: WebSocketMessageType.CLOSE, data };
        }
        // Default to binary
        return { type: WebSocketMessageType.BINARY, data };
    }
    /**
     * Handle close frame
     */
    handleCloseFrame(data) {
        let code = 1000;
        let reason = "";
        if (data.length >= 2) {
            code = data.readUInt16BE(0);
            if (data.length > 2) {
                reason = data.subarray(2).toString("utf-8");
            }
        }
        this._closeEvent = { code, reason, wasClean: true };
        this._closed = true;
        this._connected = false;
    }
    /**
     * Receive a message with polling
     */
    async recv(timeout) {
        if (this._closed) {
            throw new WebSocketClosed(this._closeEvent?.code || 1006, this._closeEvent?.reason || "Connection closed");
        }
        // Check queue first
        if (this.messageQueue.length > 0) {
            return this.messageQueue.shift();
        }
        const startTime = Date.now();
        const timeoutMs = timeout !== undefined ? timeout * 1000 : Infinity;
        // Poll for message
        return new Promise((resolve, reject) => {
            let settled = false;
            const poll = () => {
                if (settled)
                    return;
                // Check timeout
                if (Date.now() - startTime >= timeoutMs) {
                    settled = true;
                    this.pollTimer = null;
                    reject(new WebSocketError("Receive timeout"));
                    return;
                }
                // Check if closed
                if (this._closed) {
                    settled = true;
                    this.pollTimer = null;
                    reject(new WebSocketClosed(this._closeEvent?.code || 1006, this._closeEvent?.reason || "Connection closed"));
                    return;
                }
                try {
                    const message = this.tryReceive();
                    if (message) {
                        settled = true;
                        this.pollTimer = null;
                        resolve(message);
                        return;
                    }
                    // No message, schedule next poll (only if not closed/settled)
                    if (!this._closed && !settled) {
                        this.pollTimer = setTimeout(poll, this.pollInterval);
                    }
                }
                catch (error) {
                    settled = true;
                    this.pollTimer = null;
                    reject(error);
                }
            };
            // Start polling
            poll();
        });
    }
    /**
     * Receive a text message
     */
    async recvStr(timeout) {
        const msg = await this.recv(timeout);
        return msg.data.toString("utf-8");
    }
    /**
     * Receive and parse as JSON
     */
    async recvJson(timeout) {
        const str = await this.recvStr(timeout);
        return JSON.parse(str);
    }
    /**
     * Send raw data with flags
     */
    async sendRaw(data, flags) {
        if (this._closed) {
            throw new WebSocketClosed(this._closeEvent?.code || 1006, this._closeEvent?.reason || "Connection closed");
        }
        const { code, sent } = curl_ws_send(this.handle, data, flags);
        if (code !== CurlCode.CURLE_OK) {
            throw new WebSocketError(`Send failed with code ${code}`);
        }
        if (sent !== data.length) {
            throw new WebSocketError(`Incomplete send: ${sent}/${data.length} bytes`);
        }
    }
    /**
     * Send binary data
     */
    async send(data) {
        const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
        await this.sendRaw(buffer, CurlWsFlag.CURLWS_BINARY);
    }
    /**
     * Send text message
     */
    async sendStr(text) {
        const buffer = Buffer.from(text, "utf-8");
        await this.sendRaw(buffer, CurlWsFlag.CURLWS_TEXT);
    }
    /**
     * Send binary data
     */
    async sendBinary(data) {
        await this.send(data);
    }
    /**
     * Send JSON message
     */
    async sendJson(data) {
        const json = JSON.stringify(data);
        await this.sendStr(json);
    }
    /**
     * Send ping frame
     */
    async ping(data) {
        const buffer = data
            ? Buffer.isBuffer(data)
                ? data
                : Buffer.from(data, "utf-8")
            : Buffer.alloc(0);
        await this.sendRaw(buffer, CurlWsFlag.CURLWS_PING);
    }
    /**
     * Send pong frame (usually auto-sent in response to ping)
     */
    async sendPong(data) {
        await this.sendRaw(data, CurlWsFlag.CURLWS_PONG);
    }
    /**
     * Close the WebSocket connection
     */
    async close(code = 1000, reason = "") {
        if (this._closed)
            return;
        // Build close frame payload
        const reasonBytes = Buffer.from(reason, "utf-8");
        const payload = Buffer.alloc(2 + reasonBytes.length);
        payload.writeUInt16BE(code, 0);
        reasonBytes.copy(payload, 2);
        try {
            await this.sendRaw(payload, CurlWsFlag.CURLWS_CLOSE);
        }
        catch {
            // Ignore send errors during close
        }
        this._closeEvent = { code, reason, wasClean: true };
        this._closed = true;
        this._connected = false;
        // Stop any pending polls
        if (this.pollTimer) {
            clearTimeout(this.pollTimer);
            this.pollTimer = null;
        }
        // Cleanup
        this.curl.cleanup();
    }
    /**
     * Async iterator for receiving messages
     */
    async *[Symbol.asyncIterator]() {
        while (!this._closed) {
            try {
                yield await this.recv();
            }
            catch (error) {
                if (error instanceof WebSocketClosed) {
                    return;
                }
                throw error;
            }
        }
    }
}
/**
 * Connect to a WebSocket server
 */
export async function wsConnect(url, options) {
    return AsyncWebSocket.connect(url, options);
}
//# sourceMappingURL=websocket.js.map