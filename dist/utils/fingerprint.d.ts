/**
 * TLS/HTTP2 Fingerprinting utilities
 *
 * Provides support for JA3, Akamai, and custom fingerprint configuration
 * when using curl-impersonate.
 */
import type { Curl } from "../core/easy.js";
import type { ExtraFingerprint } from "../types/options.js";
import type { Fingerprint } from "../fingerprints.js";
/**
 * TLS version mapping from JA3 hex codes to curl SSL version constants
 */
export declare const TLS_VERSION_MAP: Record<number, number>;
/**
 * TLS cipher suite ID to name mapping
 * Based on IANA TLS parameters: http://www.iana.org/assignments/tls-parameters/tls-parameters.xml
 */
export declare const TLS_CIPHER_NAME_MAP: Record<number, string>;
/**
 * TLS elliptic curve ID to name mapping
 */
export declare const TLS_EC_CURVES_MAP: Record<number, string>;
/**
 * TLS extension ID to name mapping (for reference/debugging)
 */
export declare const TLS_EXTENSION_NAME_MAP: Record<number, string>;
/**
 * Error thrown when fingerprint configuration fails
 */
export declare class FingerprintError extends Error {
    constructor(message: string);
}
/**
 * Parse and apply JA3 fingerprint string to a curl handle
 *
 * JA3 format: tls_version,ciphers,extensions,curves,curve_formats
 * Example: 771,4865-4866-4867-49195-49199,0-23-65281-10-11-35-16-5-13-18-51-45-43-27-17513,29-23-24,0
 *
 * @param curl - The Curl instance to configure
 * @param ja3 - JA3 fingerprint string
 * @param permute - If true, don't set extension order (allows random permutation)
 */
export declare function setJa3Options(curl: Curl, ja3: string, permute?: boolean): void;
/**
 * Parse and apply Akamai HTTP/2 fingerprint string to a curl handle
 *
 * Akamai format: settings|window_update|streams|header_order
 * Example: 1:65536;3:1000;4:6291456;6:262144|15663105|0|m,a,s,p
 *
 * @param curl - The Curl instance to configure
 * @param akamai - Akamai fingerprint string
 */
export declare function setAkamaiOptions(curl: Curl, akamai: string): void;
/**
 * Apply ExtraFingerprint options to a curl handle
 *
 * @param curl - The Curl instance to configure
 * @param fp - Extra fingerprint options
 */
export declare function setExtraFingerprintOptions(curl: Curl, fp: ExtraFingerprint): void;
/** Apply a downloaded or user-created Fingerprint to a curl handle. */
export declare function applyFingerprintOptions(curl: Curl, fingerprint: Fingerprint, defaultHeaders?: boolean): void;
//# sourceMappingURL=fingerprint.d.ts.map