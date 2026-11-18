/**
 * HTTP Cookie jar with domain/path support
 */
export interface Cookie {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    expires?: Date;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
}
export interface CookieOptions {
    domain?: string;
    path?: string;
    expires?: Date;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
}
export type CookiesInit = Cookies | Record<string, string> | Iterable<[string, string]> | Cookie[];
/**
 * Cookies - HTTP cookie jar with domain and path matching
 */
export declare class Cookies implements Iterable<Cookie> {
    private cookies;
    constructor(init?: CookiesInit);
    /**
     * Generate a unique key for a cookie.
     * Strips leading dot from domain per RFC 6265 §5.2.3.
     */
    private makeKey;
    /**
     * Set a cookie
     */
    set(name: string, value: string, options?: CookieOptions): void;
    /**
     * Get a cookie value
     */
    get(name: string, domain?: string, path?: string): string | null;
    /**
     * Get a cookie object
     */
    getCookie(name: string, domain?: string, path?: string): Cookie | null;
    /**
     * Delete a cookie
     */
    delete(name: string, domain?: string, path?: string): boolean;
    /**
     * Clear all cookies, optionally filtering by domain/path
     */
    clear(domain?: string, path?: string): void;
    /**
     * Check if a cookie exists
     */
    has(name: string, domain?: string, path?: string): boolean;
    /**
     * Update cookies from another source
     */
    update(init: CookiesInit): void;
    /**
     * Get cookies matching a URL
     */
    getForUrl(url: string | URL): Cookie[];
    /**
     * Check if cookie domain matches request domain
     */
    private matchesDomain;
    /**
     * Check if cookie path matches request path
     */
    private matchesPath;
    /**
     * Convert to Cookie header value
     */
    toCookieHeader(url?: string | URL): string;
    /**
     * Convert to Netscape cookie file format (for curl)
     */
    toNetscapeFormat(): string;
    /**
     * Parse Set-Cookie header
     */
    static parseSetCookie(setCookie: string, requestUrl?: URL): Cookie;
    /**
     * Parse Netscape cookie file format
     */
    static fromNetscapeFormat(text: string): Cookies;
    /**
     * Iterate over all cookies
     */
    [Symbol.iterator](): IterableIterator<Cookie>;
    /**
     * Get all cookie names
     */
    keys(): IterableIterator<string>;
    /**
     * Get all cookie values
     */
    values(): IterableIterator<string>;
    /**
     * Get name-value entries
     */
    entries(): IterableIterator<[string, string]>;
    /**
     * Get number of cookies
     */
    get size(): number;
    /**
     * Convert to plain object
     */
    toObject(): Record<string, string>;
    /**
     * Create a copy
     */
    clone(): Cookies;
}
//# sourceMappingURL=cookies.d.ts.map