/**
 * Fetch API compatible interface
 *
 * Provides a standard Fetch API (`fetch()`) wrapper around impers' HTTP engine.
 * The input (`input`/`init`) follows the global Fetch types (undici-types), and
 * the return value is a global `Response`. impers-specific extensions are added
 * on top of `RequestInit` via {@link ImpersRequestInit}.
 *
 * Limitations inherited from the global `Response` public constructor:
 * - `response.url` is always `""` (final URL is not exposed).
 * - `response.redirected` is always `false`.
 * - `response.type` is always `"default"`.
 * The `status`, `statusText`, `headers` and body (`text()`/`json()`/`arrayBuffer()`)
 * are accurate.
 *
 * Unsupported standard `RequestInit` fields are silently ignored:
 * `credentials`, `mode`, `integrity`, `keepalive`, `window`, `duplex`,
 * `referrerPolicy`, `referrer`.
 */
import type { ProxyConfig, BasicAuth, AuthType, CertConfig, ExtraFingerprint } from "../types/options.js";
import type { CookiesInit } from "./cookies.js";
/**
 * impers extension of the standard {@link RequestInit}.
 *
 * Standard Fetch fields (`method`, `headers`, `body`, `signal`, `redirect`,
 * `integrity`, `credentials`, `mode`, `referrer`, `referrerPolicy`, `window`,
 * `keepalive`, `duplex`) are inherited from `RequestInit` and not redefined.
 *
 * The following standard fields are currently ignored:
 * `credentials`, `mode`, `integrity`, `keepalive`, `window`, `duplex`,
 * `referrerPolicy`, `referrer`.
 *
 * `maxRedirects` defaults to 20 (Fetch standard) rather than impers' usual 30.
 */
export interface ImpersRequestInit extends RequestInit {
    /** Query string parameters */
    params?: Record<string, string | number | boolean | (string | number | boolean)[]> | URLSearchParams;
    /** Browser to impersonate (e.g. "chrome124", "firefox120") */
    impersonate?: string;
    /** JA3 fingerprint string */
    ja3?: string;
    /** Akamai HTTP/2 fingerprint */
    akamai?: string;
    /** Extra fingerprint options */
    extraFp?: ExtraFingerprint;
    /** Default headers when impersonating (default: true) */
    defaultHeaders?: boolean;
    /** Proxy URL (applies to all protocols) */
    proxy?: string;
    /** Protocol-specific proxies */
    proxies?: ProxyConfig;
    /** Proxy authentication */
    proxyAuth?: BasicAuth;
    /** HTTP authentication */
    auth?: AuthType;
    /** Verify SSL certificates (default: true) */
    verify?: boolean;
    /** CA certificate bundle path */
    caCert?: string;
    /** Client certificate */
    cert?: string | CertConfig;
    /** Total request timeout in seconds */
    timeout?: number;
    /** Connection timeout in seconds */
    connectTimeout?: number;
    /** Read timeout in seconds */
    readTimeout?: number;
    /** Maximum number of redirects (default: 20, Fetch standard) */
    maxRedirects?: number;
    /** Force specific HTTP version */
    httpVersion?: "1.0" | "1.1" | "2" | "3";
    /** Network interface to use */
    interface?: string;
    /** Local address to bind to */
    localAddress?: string;
    /** Local port to bind to */
    localPort?: number;
    /** DNS servers to use */
    dnsServers?: string[];
    /** DNS-over-HTTPS URL */
    dohUrl?: string;
    /** User-Agent header */
    userAgent?: string;
    /** Accept-Encoding header (default: "gzip, deflate, br") */
    acceptEncoding?: string;
    /** Decode response content automatically (default: true) */
    decodeContent?: boolean;
    /** Referer header */
    referer?: string;
    /** Request cookies */
    cookies?: CookiesInit;
    /** Raw curl options to set (escape hatch) */
    curlOptions?: Record<number, unknown>;
}
/**
 * Fetch a resource, returning a standard global `Response`.
 *
 * This mirrors the global Fetch API while exposing impers' impersonation and
 * transport options via {@link ImpersRequestInit}.
 *
 * - Network errors (connection/DNS/SSL/timeout/abort) are re-thrown as
 *   `TypeError` with the original impers exception preserved in `cause`.
 * - 4xx/5xx responses are returned (not rejected), matching Fetch semantics.
 * - `response.url`/`response.redirected` are not populated (constructor limit).
 *
 * @param input - A URL string, `URL`, or global `Request`.
 * @param init - Standard `RequestInit` plus impers extensions.
 * @returns A global `Response`.
 *
 * @example
 * ```ts
 * const res = await fetch("https://example.com", { impersonate: "chrome124" });
 * console.log(res.status, await res.text());
 * ```
 */
export declare function fetch(input: string | URL | Request, init?: ImpersRequestInit): Promise<Response>;
//# sourceMappingURL=fetch.d.ts.map