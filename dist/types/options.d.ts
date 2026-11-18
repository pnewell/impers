/**
 * Request and Session options types
 */
import type { HeadersInit } from "../http/headers.js";
import type { CookiesInit } from "../http/cookies.js";
import type { Fingerprint } from "../fingerprints.js";
/**
 * Authentication types
 */
export interface BasicAuth {
    username: string;
    password: string;
}
export interface DigestAuth {
    username: string;
    password: string;
    type: "digest";
}
export interface BearerAuth {
    token: string;
}
export type AuthType = BasicAuth | DigestAuth | BearerAuth | string;
/**
 * Proxy configuration
 */
export interface ProxyConfig {
    http?: string;
    https?: string;
    all?: string;
}
/**
 * Certificate configuration
 */
export interface CertConfig {
    cert: string;
    key?: string;
    password?: string;
}
/**
 * Multipart form field
 */
export interface MultipartField {
    name: string;
    value?: string | Buffer;
    filename?: string;
    filepath?: string;
    contentType?: string;
}
/**
 * Extra fingerprint options for manual TLS/HTTP2 configuration
 */
export interface ExtraFingerprint {
    /** TLS extension order */
    tlsExtensionOrder?: number[];
    /** TLS signature algorithms */
    tlsSigAlgs?: string[];
    /** TLS supported groups */
    tlsSupportedGroups?: string[];
    /** HTTP/2 settings */
    http2Settings?: Record<string, number>;
    /** HTTP/2 window update */
    http2WindowUpdate?: number;
    /** HTTP/2 pseudo header order */
    http2PseudoHeaderOrder?: string[];
    /** HTTP/2 connection flow */
    http2ConnectionFlow?: number;
}
/**
 * Request options - passed to individual requests
 */
export interface RequestOptions {
    /** Query string parameters */
    params?: Record<string, string | number | boolean | (string | number | boolean)[]> | URLSearchParams;
    /** Form data (application/x-www-form-urlencoded) */
    data?: Record<string, string | number | boolean> | URLSearchParams | string;
    /** JSON body (automatically sets Content-Type) */
    json?: unknown;
    /** Multipart form data (automatically sets Content-Type) */
    multipart?: MultipartField[];
    /** Raw body content */
    content?: string | Buffer;
    /** Files for multipart upload */
    files?: Record<string, string | Buffer | {
        filename: string;
        content: Buffer;
        contentType?: string;
    }>;
    /** Request body callback for streamed uploads */
    readCallback?: (size: number) => Buffer | string | null | undefined;
    /** Total byte size for readCallback request bodies */
    readCallbackSize?: number | bigint;
    /** Request headers */
    headers?: HeadersInit;
    /** Request cookies */
    cookies?: CookiesInit;
    /** Referer header */
    referer?: string;
    /** HTTP authentication */
    auth?: AuthType;
    /** Total request timeout in seconds */
    timeout?: number;
    /** Connection timeout in seconds */
    connectTimeout?: number;
    /** Read timeout in seconds (same as timeout for simplicity) */
    readTimeout?: number;
    /** Abort signal for request cancellation */
    signal?: AbortSignal;
    /** Follow redirects (default: true) */
    allowRedirects?: boolean;
    /** Maximum number of redirects (default: 30) */
    maxRedirects?: number;
    /** Proxy URL (applies to all protocols) */
    proxy?: string;
    /** Protocol-specific proxies */
    proxies?: ProxyConfig;
    /** Proxy authentication */
    proxyAuth?: BasicAuth;
    /** Verify SSL certificates (default: true) */
    verify?: boolean;
    /** CA certificate bundle path */
    caCert?: string;
    /** Client certificate */
    cert?: string | CertConfig;
    /** Builtin/cached target name or an editable Fingerprint object */
    impersonate?: string | Fingerprint;
    /** JA3 fingerprint string */
    ja3?: string;
    /** Akamai HTTP/2 fingerprint */
    akamai?: string;
    /** Extra fingerprint options */
    extraFp?: ExtraFingerprint;
    /** Default headers when impersonating (default: true) */
    defaultHeaders?: boolean;
    /** Enable streaming response */
    stream?: boolean;
    /** Content callback for streaming; honors decodeContent */
    contentCallback?: (chunk: Buffer) => void;
    /** Header callback for raw response header chunks */
    headerCallback?: (chunk: Buffer) => void;
    /** Force specific HTTP version ("1.0", "1.1", "2", "3") */
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
    /** Decode buffered and callback response content using libcurl (default: true) */
    decodeContent?: boolean;
    /** Raw curl options to set */
    curlOptions?: Record<number, unknown>;
}
/**
 * Session options - configure default behavior for all requests
 */
export interface SessionOptions extends Omit<RequestOptions, "params" | "data" | "json" | "multipart" | "content" | "files" | "signal"> {
    /** Base URL for all requests */
    baseUrl?: string;
    /** Maximum concurrent connections */
    maxConnections?: number;
    /** Maximum connections per host */
    maxHostConnections?: number;
    /** Enable HTTP/2 multiplexing */
    http2Multiplexing?: boolean;
    /** Default headers for all requests */
    headers?: HeadersInit;
    /** Default cookies for all requests */
    cookies?: CookiesInit;
}
/**
 * WebSocket options
 */
export interface WebSocketOptions {
    /** Negotiate permessage-deflate compression (default: false; curl-impersonate 2.3.0+ with zlib) */
    perMessageDeflate?: boolean;
    /** Request headers */
    headers?: HeadersInit;
    /** Request cookies */
    cookies?: CookiesInit;
    /** Authentication */
    auth?: AuthType;
    /** Proxy URL */
    proxy?: string;
    /** Verify SSL certificates (default: true) */
    verify?: boolean;
    /** Browser to impersonate */
    impersonate?: string;
    /** Connection timeout in seconds */
    timeout?: number;
    /** Auto-reconnect on disconnect */
    autoReconnect?: boolean;
    /** Maximum reconnect attempts */
    maxReconnectAttempts?: number;
    /** Reconnect delay in milliseconds */
    reconnectDelay?: number;
    /** Maximum message size in bytes (default: 64MB) */
    maxMessageSize?: number;
}
//# sourceMappingURL=options.d.ts.map