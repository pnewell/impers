export declare const DEFAULT_API_ROOT = "https://api.impersonate.pro/v1";
export declare class Fingerprint {
    client: string;
    client_version: string;
    os: string;
    os_version: string;
    http_version: string;
    tls_version: string;
    tls_ciphers: string[];
    tls_alpn: boolean;
    tls_alps: boolean;
    tls_cert_compression: string[];
    tls_signature_hashes: string[];
    tls_key_shares_limit: number;
    tls_supported_groups: string[];
    tls_session_ticket: boolean;
    tls_extension_order: string;
    tls_delegated_credentials: string[];
    tls_record_size_limit: number | null;
    tls_grease: boolean;
    tls_use_new_alps_codepoint: boolean;
    tls_signed_cert_timestamps: boolean;
    tls_ech: string | null;
    tls_permute_extensions: boolean;
    tls_trust_anchors: string[] | null;
    headers: Record<string, string>;
    header_order: string;
    split_cookies: boolean;
    form_boundary: string;
    http2_settings: string;
    http2_window_update: number;
    http2_pseudo_headers_order: string;
    http2_stream_weight: number | null;
    http2_stream_exclusive: number | null;
    http2_no_priority: boolean;
    http3_settings: string;
    http3_pseudo_headers_order: string;
    http3_tls_extension_order: string;
    http3_headers: Record<string, string>;
    http3_header_order: string;
    http3_tls_supported_groups: string[];
    quic_transport_parameters: string;
    /** -1 randomizes like Firefox; 0..2147483647 selects a fixed packet number. */
    quic_initial_packet_number: number | null;
    ws_headers: Record<string, string>;
    ws_header_order: string;
    ws_disable_session_ticket: boolean;
    ws_tls_cert_compression: string[] | null;
    header_lang: string;
    constructor(value?: Partial<Fingerprint>);
}
export interface FingerprintRow {
    type: "builtin" | "custom";
    name: string;
    browser: string;
    version: string;
    os: string;
    os_version: string;
    h3_fingerprints: boolean;
}
export interface NativeFingerprintTarget {
    browser: string;
    version: string;
    os: string;
    os_version: string;
    target_name: string;
    h3_fingerprints: boolean;
}
export declare class FingerprintUpdateError extends Error {
    constructor(message: string);
}
export declare const NATIVE_IMPERSONATE_TARGETS: NativeFingerprintTarget[];
export declare function resolveNativeImpersonateTarget(target: string): string | null;
export declare class FingerprintManager {
    static getConfigDir(env?: NodeJS.ProcessEnv): string;
    static getConfigPath(env?: NodeJS.ProcessEnv): string;
    static getFingerprintPath(env?: NodeJS.ProcessEnv): string;
    static getApiRoot(env?: NodeJS.ProcessEnv): string;
    static getApiKey(env?: NodeJS.ProcessEnv): string | null;
    static setApiKey(apiKey: string, env?: NodeJS.ProcessEnv): void;
    static updateFingerprints(env?: NodeJS.ProcessEnv): Promise<number>;
    static loadFingerprints(env?: NodeJS.ProcessEnv): Record<string, Fingerprint>;
    static getFingerprint(target: string, env?: NodeJS.ProcessEnv): Fingerprint;
    static listFingerprints(env?: NodeJS.ProcessEnv): FingerprintRow[];
}
export declare function getFingerprint(target: string): Fingerprint;
//# sourceMappingURL=fingerprints.d.ts.map