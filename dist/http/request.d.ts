/**
 * HTTP Request representation
 */
import { Headers, type HeadersInit } from "./headers.js";
export type BodyInit = string | Buffer | URLSearchParams | Record<string, unknown>;
export interface RequestInit {
    headers?: HeadersInit;
    body?: BodyInit;
}
/**
 * Request - Represents an HTTP request
 */
export declare class Request {
    readonly method: string;
    readonly url: URL;
    readonly headers: Headers;
    readonly body: Buffer | null;
    constructor(method: string, url: string | URL, init?: RequestInit);
    /**
     * Normalize body to Buffer
     */
    private normalizeBody;
    /**
     * Get the full URL as string
     */
    get href(): string;
    /**
     * Get the hostname
     */
    get hostname(): string;
    /**
     * Get the pathname
     */
    get pathname(): string;
    /**
     * Get query string
     */
    get search(): string;
    /**
     * Check if body exists
     */
    get hasBody(): boolean;
    /**
     * Get body as string
     */
    get text(): string | null;
    /**
     * Clone the request
     */
    clone(): Request;
}
//# sourceMappingURL=request.d.ts.map