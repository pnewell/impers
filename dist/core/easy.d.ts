import { type CurlHandle } from "../ffi/libcurl.js";
import { CurlOpt, CurlInfo, CurlCode } from "../ffi/constants.js";
import { type ReadCallback, type WriteCallback } from "../utils/callbacks.js";
import type { ExtraFingerprint } from "../types/options.js";
export interface CurlOptions {
    /** Use an existing handle instead of creating a new one */
    fromHandle?: CurlHandle;
}
/**
 * Curl - Low-level wrapper around libcurl easy interface
 *
 * Provides direct access to curl_easy_* functions with proper
 * memory management for callbacks and string lists.
 */
export declare class Curl {
    private handle;
    private _callbacks;
    private _slists;
    private _buffers;
    constructor(options?: CurlOptions);
    /**
     * Release JS-side resources tied to the easy handle.
     * Registered Koffi callbacks must be explicitly unregistered or they keep
     * the process alive even after the curl handle is cleaned up.
     */
    private releaseResources;
    /**
     * Get the underlying curl handle (for use with CurlMulti)
     */
    getHandle(): CurlHandle | null;
    /**
     * Set a curl option
     * Automatically selects the correct setopt variant based on value type
     */
    setOpt(option: number, value: unknown): void;
    /**
     * Get info from a completed transfer
     * Automatically selects the correct getinfo variant based on info type
     */
    getInfo(info: number): string | number | bigint | string[] | null;
    /**
     * Get response status code
     */
    getResponseCode(): number;
    /**
     * Get effective URL (after redirects)
     */
    getEffectiveUrl(): string | null;
    /**
     * Get content type from response
     */
    getContentType(): string | null;
    /**
     * Get total transfer time in seconds
     */
    getTotalTime(): number;
    /**
     * Get primary IP address
     */
    getPrimaryIp(): string | null;
    /**
     * Get primary port
     */
    getPrimaryPort(): number;
    /**
     * Get local IP address
     */
    getLocalIp(): string | null;
    /**
     * Get local port
     */
    getLocalPort(): number;
    /**
     * Get redirect count
     */
    getRedirectCount(): number;
    /**
     * Get redirect URL (if any)
     */
    getRedirectUrl(): string | null;
    /**
     * Get HTTP version used
     */
    getHttpVersion(): number;
    /**
     * Set write callback function
     */
    setWriteFunction(fn: WriteCallback): void;
    /**
     * Set header callback function
     */
    setHeaderFunction(fn: WriteCallback): void;
    /**
     * Set read callback function
     */
    setReadFunction(fn: ReadCallback): void;
    /**
     * Set a curl_slist option from an array of strings.
     */
    setStringList(option: number, values: string[]): void;
    /**
     * Set HTTP headers from array of "Header: Value" strings
     */
    setHeaders(headers: string[]): void;
    /**
     * Enable browser impersonation (requires curl-impersonate)
     * @param target Browser target (e.g., "chrome124", "firefox120", "safari17_0")
     * @param defaultHeaders Whether to add default browser headers (default: true)
     */
    impersonate(target: string, defaultHeaders?: boolean): void;
    /**
     * Check if impersonation is available
     */
    static hasImpersonateSupport(): boolean;
    /**
     * Perform the request synchronously
     */
    perform(): void;
    /**
     * Reset the handle to initial state for reuse
     * Clears all options but keeps connections alive
     */
    reset(): void;
    /**
     * Duplicate this curl handle
     * Returns a new Curl instance with the same options
     */
    dupHandle(): Curl;
    /**
     * Apply JA3 TLS fingerprint
     *
     * JA3 format: tls_version,ciphers,extensions,curves,curve_formats
     * Example: 771,4865-4866-4867-49195-49199,0-23-65281-10-11-35-16-5-13-18-51-45-43-27-17513,29-23-24,0
     *
     * Requires curl-impersonate for full extension control.
     *
     * @param ja3 - JA3 fingerprint string
     * @param permute - If true, don't enforce extension order (allows random permutation)
     */
    setJa3(ja3: string, permute?: boolean): void;
    /**
     * Apply Akamai HTTP/2 fingerprint
     *
     * Akamai format: settings|window_update|streams|header_order
     * Example: 1:65536;3:1000;4:6291456;6:262144|15663105|0|m,a,s,p
     *
     * Requires curl-impersonate.
     *
     * @param akamai - Akamai fingerprint string
     */
    setAkamai(akamai: string): void;
    /**
     * Apply extra fingerprint options for fine-grained TLS/HTTP2 control
     *
     * Requires curl-impersonate.
     *
     * @param options - Extra fingerprint configuration
     */
    setExtraFingerprint(options: ExtraFingerprint): void;
    /**
     * Cleanup and release resources
     */
    cleanup(): void;
    /**
     * Get libcurl version string
     */
    static version(): string;
    /**
     * Get detailed version information
     */
    static versionInfo(): unknown;
}
export { CurlOpt, CurlInfo, CurlCode };
//# sourceMappingURL=easy.d.ts.map