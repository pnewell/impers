/**
 * Base exception for all request errors
 */
export declare class RequestException extends Error {
    cause?: Error;
    /** libcurl error code, set when the error was mapped from one */
    curlCode?: number;
    constructor(message: string, cause?: Error);
}
/**
 * Request aborted by an AbortSignal
 */
export declare class AbortError extends RequestException {
    reason?: unknown;
    constructor(reason?: unknown);
}
/**
 * libcurl error with error code
 */
export declare class CurlError extends RequestException {
    code: number;
    constructor(code: number, message?: string, cause?: Error);
}
/**
 * Connection error (network failure)
 */
export declare class ConnectionError extends RequestException {
    constructor(message: string, cause?: Error);
}
/**
 * DNS resolution error
 */
export declare class DNSError extends ConnectionError {
    hostname?: string;
    constructor(message: string, hostname?: string, cause?: Error);
}
/**
 * Proxy connection error
 */
export declare class ProxyError extends ConnectionError {
    constructor(message: string, cause?: Error);
}
/**
 * SSL/TLS error
 */
export declare class SSLError extends RequestException {
    constructor(message: string, cause?: Error);
}
/**
 * Certificate verification error
 */
export declare class CertificateVerifyError extends SSLError {
    constructor(message: string, cause?: Error);
}
/**
 * Request timeout
 */
export declare class Timeout extends RequestException {
    constructor(message?: string, cause?: Error);
}
/**
 * Connection timeout
 */
export declare class ConnectTimeout extends Timeout {
    constructor(cause?: Error);
}
/**
 * Read timeout
 */
export declare class ReadTimeout extends Timeout {
    constructor(cause?: Error);
}
/**
 * HTTP error (4xx/5xx response)
 */
export declare class HTTPError extends RequestException {
    statusCode: number;
    reason: string;
    response?: unknown;
    constructor(statusCode: number, reason: string, response?: unknown);
}
/**
 * Too many redirects
 */
export declare class TooManyRedirects extends RequestException {
    maxRedirects: number;
    constructor(maxRedirects: number, cause?: Error);
}
/**
 * Invalid URL
 */
export declare class InvalidURL extends RequestException {
    url: string;
    constructor(url: string, cause?: Error);
}
/**
 * Invalid header
 */
export declare class InvalidHeader extends RequestException {
    header: string;
    constructor(header: string, cause?: Error);
}
/**
 * Invalid proxy URL
 */
export declare class InvalidProxyURL extends RequestException {
    url: string;
    constructor(url: string, cause?: Error);
}
/**
 * Impersonation error
 */
export declare class ImpersonateError extends RequestException {
    constructor(message: string, cause?: Error);
}
/**
 * Session closed error
 */
export declare class SessionClosed extends RequestException {
    constructor(message?: string, cause?: Error);
}
/**
 * WebSocket error
 */
export declare class WebSocketError extends RequestException {
    code?: number;
    constructor(message: string, code?: number, cause?: Error);
}
/**
 * WebSocket closed
 */
export declare class WebSocketClosed extends WebSocketError {
    closeCode: number | null;
    closeReason: string | null;
    constructor(closeCode: number | null, closeReason: string | null);
}
/**
 * Incomplete read error
 */
export declare class IncompleteRead extends RequestException {
    expected: number;
    received: number;
    constructor(expected: number, received: number, cause?: Error);
}
/**
 * JSON parsing error
 */
export declare class InvalidJSONError extends RequestException {
    constructor(message: string, cause?: Error);
}
/**
 * Cookie conflict error
 */
export declare class CookieConflict extends RequestException {
    constructor(message: string, cause?: Error);
}
/**
 * Interface error (network interface not available)
 */
export declare class InterfaceError extends RequestException {
    interfaceName: string;
    constructor(interfaceName: string, cause?: Error);
}
/**
 * Raise CurlError if code is not CURLE_OK
 */
export declare function raiseIfError(code: number): void;
/**
 * Map curl error codes to appropriate exception types
 */
export declare function mapCurlError(code: number, message?: string): RequestException;
//# sourceMappingURL=errors.d.ts.map