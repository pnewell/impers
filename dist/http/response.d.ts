/**
 * HTTP Response representation
 */
import { Headers } from "./headers.js";
import { Cookies } from "./cookies.js";
import { Curl } from "../core/easy.js";
export interface ResponseInit {
    content?: Buffer;
    rawHeaders?: Buffer | string;
    headers?: Headers;
    curl?: Curl;
    requestUrl?: string;
    elapsed?: number;
    history?: Response[];
    statusCode?: number;
    statusText?: string;
    url?: string;
}
/**
 * Response - HTTP response with headers, cookies, and body
 */
export declare class Response {
    readonly requestUrl: string;
    readonly url: string;
    readonly statusCode: number;
    readonly headers: Headers;
    readonly cookies: Cookies;
    readonly elapsed: number;
    readonly primaryIp: string | null;
    readonly primaryPort: number;
    readonly localIp: string | null;
    readonly localPort: number;
    readonly redirectCount: number;
    /**
     * URL of the next redirect that was NOT followed, or null if all redirects
     * were followed. When allowRedirects is true (default), this will be null
     * after a successful redirect chain. Use `response.url` for the final URL,
     * or `response.history` for intermediate Response objects at each redirect step.
     */
    readonly redirectUrl: string | null;
    readonly httpVersion: number;
    readonly contentType: string | null;
    readonly history: Response[];
    private _content;
    private _stream;
    private _encoding;
    private readonly _statusText;
    constructor(init: ResponseInit);
    /**
     * Detect character encoding from Content-Type header
     */
    private detectEncoding;
    /**
     * HTTP status code (alias for statusCode)
     */
    get status(): number;
    /**
     * HTTP status reason phrase (alias for reason)
     */
    get statusText(): string;
    /**
     * Check if response was successful (2xx status)
     */
    get ok(): boolean;
    /**
     * Get status reason phrase
     */
    get reason(): string;
    /**
     * Get response encoding
     */
    get encoding(): string;
    /**
     * Set response encoding
     */
    set encoding(value: string);
    /**
     * Get HTTP version as string
     */
    get httpVersionString(): string;
    /**
     * Get response body as Buffer (sync)
     * Throws if content is not available (streaming response)
     */
    get content(): Buffer;
    /**
     * Get response body as string (sync)
     */
    get text(): string;
    /**
     * Parse response body as JSON (sync)
     */
    json<T = unknown>(): T;
    /**
     * Raise an exception if status code indicates an error
     */
    raiseForStatus(): void;
    /**
     * Async content getter
     */
    aContent(): Promise<Buffer>;
    /**
     * Async text getter
     */
    aText(): Promise<string>;
    /**
     * Async JSON parser
     */
    aJson<T = unknown>(): Promise<T>;
    /**
     * Iterate over response content in chunks
     */
    iterContent(chunkSize?: number): AsyncIterableIterator<Buffer>;
    /**
     * Iterate over response content line by line
     */
    iterLines(delimiter?: string, keepEnds?: boolean): AsyncIterableIterator<string>;
    /**
     * Set the response stream (for streaming responses)
     */
    setStream(stream: AsyncIterable<Buffer>): void;
    /**
     * Set the response content directly
     */
    setContent(content: Buffer): void;
    /**
     * Close the response (cleanup resources)
     */
    close(): Promise<void>;
    /**
     * Alias for close
     */
    aClose(): Promise<void>;
}
//# sourceMappingURL=response.d.ts.map