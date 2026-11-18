/**
 * Public API - Standalone request functions
 *
 * These functions provide a simple interface for making HTTP requests
 * without creating a Session. They use a shared session internally
 * for connection pooling.
 */
import { Response } from "./http/response.js";
import type { RequestOptions } from "./types/options.js";
/**
 * Close the shared session (call this when your application exits)
 */
export declare function closeSharedSession(): Promise<void>;
/**
 * Make an HTTP request
 *
 * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param url - Request URL
 * @param options - Request options
 * @returns Response object
 *
 * @example
 * ```ts
 * const response = await request("GET", "https://httpbin.org/get");
 * console.log(response.json());
 * ```
 */
export declare function request(method: string, url: string, options?: RequestOptions): Promise<Response>;
/**
 * Make an HTTP GET request
 *
 * @param url - Request URL
 * @param options - Request options
 * @returns Response object
 *
 * @example
 * ```ts
 * const response = await get("https://httpbin.org/get", {
 *   params: { key: "value" }
 * });
 * console.log(response.json());
 * ```
 */
export declare function get(url: string, options?: RequestOptions): Promise<Response>;
/**
 * Make an HTTP POST request
 *
 * @param url - Request URL
 * @param options - Request options
 * @returns Response object
 *
 * @example
 * ```ts
 * const response = await post("https://httpbin.org/post", {
 *   json: { key: "value" }
 * });
 * console.log(response.json());
 * ```
 */
export declare function post(url: string, options?: RequestOptions): Promise<Response>;
/**
 * Make an HTTP PUT request
 *
 * @param url - Request URL
 * @param options - Request options
 * @returns Response object
 */
export declare function put(url: string, options?: RequestOptions): Promise<Response>;
/**
 * Make an HTTP DELETE request
 *
 * @param url - Request URL
 * @param options - Request options
 * @returns Response object
 */
export declare function del(url: string, options?: RequestOptions): Promise<Response>;
/**
 * Make an HTTP HEAD request
 *
 * @param url - Request URL
 * @param options - Request options
 * @returns Response object
 */
export declare function head(url: string, options?: RequestOptions): Promise<Response>;
/**
 * Make an HTTP OPTIONS request
 *
 * @param url - Request URL
 * @param options - Request options
 * @returns Response object
 */
export declare function options(url: string, options?: RequestOptions): Promise<Response>;
/**
 * Make an HTTP PATCH request
 *
 * @param url - Request URL
 * @param options - Request options
 * @returns Response object
 */
export declare function patch(url: string, options?: RequestOptions): Promise<Response>;
export { fetch } from "./http/fetch.js";
export type { ImpersRequestInit } from "./http/fetch.js";
export { Session } from "./http/session.js";
export { Response } from "./http/response.js";
export { Request } from "./http/request.js";
export { Headers } from "./http/headers.js";
export { Cookies } from "./http/cookies.js";
export { Curl } from "./core/easy.js";
export { CurlMime } from "./core/mime.js";
export { CurlMulti, getSharedMulti, closeSharedMulti } from "./core/multi.js";
export { CurlOpt, CurlInfo, CurlCode, CurlHttpVersion, CurlWsFlag, CurlWsOpt, CurlImpersonateOpt, CurlSslVersion } from "./ffi/constants.js";
export { Fingerprint, FingerprintManager, FingerprintUpdateError, getFingerprint, NATIVE_IMPERSONATE_TARGETS, DEFAULT_API_ROOT, type NativeFingerprintTarget, type FingerprintRow, } from "./fingerprints.js";
export { setJa3Options, setAkamaiOptions, setExtraFingerprintOptions, FingerprintError, TLS_CIPHER_NAME_MAP, TLS_EC_CURVES_MAP, TLS_VERSION_MAP, TLS_EXTENSION_NAME_MAP, } from "./utils/fingerprint.js";
export { resolveLibcurlPath, resolveLibrary, isUsingImpersonate, getPlatformInfo, type LibraryInfo, } from "./utils/platform.js";
export { AsyncWebSocket, wsConnect, WebSocketMessageType, type WebSocketMessage, type WebSocketCloseEvent, } from "./websocket/websocket.js";
export type { RequestOptions, SessionOptions, WebSocketOptions, BasicAuth, DigestAuth, BearerAuth, AuthType, ProxyConfig, CertConfig, MultipartField, ExtraFingerprint, } from "./types/options.js";
export type { HeadersInit } from "./http/headers.js";
export type { CookiesInit, Cookie, CookieOptions } from "./http/cookies.js";
export { RequestException, AbortError, CurlError, ConnectionError, DNSError, ProxyError, SSLError, CertificateVerifyError, Timeout, ConnectTimeout, ReadTimeout, HTTPError, TooManyRedirects, InvalidURL, InvalidHeader, InvalidProxyURL, ImpersonateError, SessionClosed, WebSocketError, WebSocketClosed, IncompleteRead, InvalidJSONError, CookieConflict, InterfaceError, } from "./utils/errors.js";
//# sourceMappingURL=public.d.ts.map