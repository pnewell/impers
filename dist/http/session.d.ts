/**
 * HTTP Session with connection pooling and cookie persistence
 */
import { Headers } from "./headers.js";
import { Cookies } from "./cookies.js";
import { Response } from "./response.js";
import type { RequestOptions, SessionOptions } from "../types/options.js";
/**
 * Session - HTTP client with connection pooling and cookie persistence
 *
 * Provides a high-level interface for making HTTP requests with automatic
 * connection reuse, cookie handling, and browser impersonation support.
 */
export declare class Session {
    private multi;
    private ownMulti;
    private closed;
    private _cookies;
    private _headers;
    private _baseUrl;
    private _defaults;
    constructor(options?: SessionOptions);
    /**
     * Get session cookies
     */
    get cookies(): Cookies;
    /**
     * Get session headers
     */
    get headers(): Headers;
    /**
     * Make an HTTP request
     */
    request(method: string, url: string, options?: RequestOptions): Promise<Response>;
    /**
     * HTTP GET request
     */
    get(url: string, options?: RequestOptions): Promise<Response>;
    /**
     * HTTP POST request
     */
    post(url: string, options?: RequestOptions): Promise<Response>;
    /**
     * HTTP PUT request
     */
    put(url: string, options?: RequestOptions): Promise<Response>;
    /**
     * HTTP DELETE request
     */
    delete(url: string, options?: RequestOptions): Promise<Response>;
    /**
     * HTTP HEAD request
     */
    head(url: string, options?: RequestOptions): Promise<Response>;
    /**
     * HTTP OPTIONS request
     */
    options(url: string, options?: RequestOptions): Promise<Response>;
    /**
     * HTTP PATCH request
     */
    patch(url: string, options?: RequestOptions): Promise<Response>;
    /**
     * Close the session and release resources
     */
    close(): Promise<void>;
    /**
     * Resolve URL with base URL
     */
    private resolveUrl;
    /**
     * Merge request options with session defaults
     */
    private mergeOptions;
    /**
     * Set HTTP method
     */
    private setMethod;
    /**
     * Build headers list for curl
     */
    private buildHeaders;
    /**
     * Build cookie header for request
     */
    private buildCookieHeader;
    /**
     * Set request body
     */
    private setBody;
    private hasMultipartBody;
    private addDataFieldsToMime;
    private addMultipartField;
    private addFilePathPart;
    /**
     * Set authentication
     */
    private setAuth;
    /**
     * Set proxy configuration
     */
    private setProxy;
    /**
     * Set SSL/TLS options
     */
    private setSslOptions;
    /**
     * Set timeouts
     */
    private setTimeouts;
    /**
     * Set redirect behavior
     */
    private setRedirects;
    /**
     * Set HTTP version
     */
    private setHttpVersion;
    /**
     * Set network interface options
     */
    private setInterface;
    /**
     * Set DNS options
     */
    private setDnsOptions;
    /**
     * Set browser impersonation and fingerprinting options
     */
    private setImpersonation;
    private resolveFingerprint;
}
//# sourceMappingURL=session.d.ts.map