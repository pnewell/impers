/**
 * AsyncWebSocket - WebSocket client using libcurl
 *
 * Provides an async interface for WebSocket communication with support
 * for text, binary, ping/pong frames, and proper close handling.
 */
import type { WebSocketOptions } from "../types/options.js";
/**
 * WebSocket message types
 */
export declare enum WebSocketMessageType {
    TEXT = "text",
    BINARY = "binary",
    PING = "ping",
    PONG = "pong",
    CLOSE = "close"
}
/**
 * WebSocket message
 */
export interface WebSocketMessage {
    type: WebSocketMessageType;
    data: Buffer;
}
/**
 * WebSocket close event
 */
export interface WebSocketCloseEvent {
    code: number;
    reason: string;
    wasClean: boolean;
}
export type { WebSocketOptions } from "../types/options.js";
/**
 * AsyncWebSocket - Async WebSocket client
 */
export declare class AsyncWebSocket {
    private curl;
    private handle;
    private _url;
    private _connected;
    private _closed;
    private _closeEvent;
    private receiveBuffer;
    private messageQueue;
    private pollTimer;
    private pollInterval;
    private maxMessageSize;
    /**
     * Create a WebSocket connection
     * Use AsyncWebSocket.connect() for the preferred way to create a connection
     */
    private constructor();
    /**
     * Connect to a WebSocket server
     */
    static connect(url: string, options?: WebSocketOptions): Promise<AsyncWebSocket>;
    /**
     * Perform the WebSocket connection handshake using Koffi's async
     * worker thread to avoid blocking the Node.js event loop.
     */
    private performConnect;
    /**
     * Get the WebSocket URL
     */
    get url(): string;
    /**
     * Check if connected
     */
    get connected(): boolean;
    /**
     * Check if closed
     */
    get closed(): boolean;
    /**
     * Get close event details
     */
    get closeEvent(): WebSocketCloseEvent | null;
    /**
     * Try to receive a message (non-blocking)
     * Returns the message if available, null if CURLE_AGAIN
     * Throws on error
     */
    private tryReceive;
    /**
     * Convert frame flags to message type
     */
    private frameToMessage;
    /**
     * Handle close frame
     */
    private handleCloseFrame;
    /**
     * Receive a message with polling
     */
    recv(timeout?: number): Promise<WebSocketMessage>;
    /**
     * Receive a text message
     */
    recvStr(timeout?: number): Promise<string>;
    /**
     * Receive and parse as JSON
     */
    recvJson<T = unknown>(timeout?: number): Promise<T>;
    /**
     * Send raw data with flags
     */
    private sendRaw;
    /**
     * Send binary data
     */
    send(data: Buffer | Uint8Array): Promise<void>;
    /**
     * Send text message
     */
    sendStr(text: string): Promise<void>;
    /**
     * Send binary data
     */
    sendBinary(data: Buffer | Uint8Array): Promise<void>;
    /**
     * Send JSON message
     */
    sendJson(data: unknown): Promise<void>;
    /**
     * Send ping frame
     */
    ping(data?: Buffer | string): Promise<void>;
    /**
     * Send pong frame (usually auto-sent in response to ping)
     */
    private sendPong;
    /**
     * Close the WebSocket connection
     */
    close(code?: number, reason?: string): Promise<void>;
    /**
     * Async iterator for receiving messages
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<WebSocketMessage>;
}
/**
 * Connect to a WebSocket server
 */
export declare function wsConnect(url: string, options?: WebSocketOptions): Promise<AsyncWebSocket>;
//# sourceMappingURL=websocket.d.ts.map