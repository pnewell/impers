import type { Curl } from "./easy.js";
export interface MultiOptions {
    maxConnections?: number;
    maxHostConnections?: number;
    maxTotalConnections?: number;
    pipelining?: boolean;
}
export interface TransferResult {
    code: number;
}
/**
 * CurlMulti - Async multi-handle interface for concurrent requests
 *
 * Uses libcurl's socket action API to integrate with Node.js' event loop.
 * This allows multiple HTTP requests to run concurrently without blocking.
 */
export declare class CurlMulti {
    private handle;
    private pendingTransfers;
    private curlToAddr;
    private polling;
    private timer;
    private fallbackTimer;
    private socketPolls;
    private socketCallback;
    private timerCallback;
    private closed;
    constructor(options?: MultiOptions);
    private setOptLong;
    private setOptPtr;
    private ensureSocketCallbacks;
    /**
     * Add a Curl handle and perform the transfer asynchronously
     * Returns a Promise that resolves when the transfer completes
     */
    perform(curl: Curl): Promise<TransferResult>;
    /**
     * Start the poll loop if not already running
     */
    private startPolling;
    /**
     * Drive libcurl after a socket or timeout event.
     */
    private runSocketAction;
    private processData;
    private updateSocketPoll;
    private onSocketEvent;
    private updateTimer;
    private clearTimer;
    private scheduleFallbackTimer;
    private clearFallbackTimer;
    private closeSocketPoll;
    private closeAllSocketPolls;
    private stopPolling;
    /**
     * Find a pending transfer by handle address
     */
    private findPendingByHandle;
    /**
     * Check for completed transfers and resolve/reject their promises
     */
    private checkCompleted;
    /**
     * Fail all pending transfers with an error
     */
    private failAllPending;
    private failFromCallback;
    /**
     * Cancel a specific transfer
     */
    cancel(curl: Curl, error?: Error): boolean;
    /**
     * Get number of active transfers
     */
    get activeCount(): number;
    /**
     * Check if multi handle is closed
     */
    get isClosed(): boolean;
    /**
     * Close the multi handle and cleanup resources
     */
    close(): Promise<void>;
    private releaseCallbacks;
}
/**
 * Get or create a shared CurlMulti instance
 */
export declare function getSharedMulti(): CurlMulti;
/**
 * Close the shared multi instance
 */
export declare function closeSharedMulti(): Promise<void>;
//# sourceMappingURL=multi.d.ts.map