import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
export const DEFAULT_API_ROOT = "https://api.impersonate.pro/v1";
const FINGERPRINT_PAGE_LIMIT = 100;
export class Fingerprint {
    client = "";
    client_version = "";
    os = "";
    os_version = "";
    // Describes the default HTTP version associated with this fingerprint. The
    // version used for a request is selected separately with `httpVersion`.
    http_version = "v2";
    tls_version = "1.2";
    tls_ciphers = [];
    tls_alpn = false;
    tls_alps = false;
    tls_cert_compression = [];
    tls_signature_hashes = [];
    tls_key_shares_limit = 2;
    tls_supported_groups = [];
    tls_session_ticket = false;
    tls_extension_order = "";
    tls_delegated_credentials = [];
    tls_record_size_limit = null;
    tls_grease = false;
    tls_use_new_alps_codepoint = false;
    tls_signed_cert_timestamps = false;
    tls_ech = null;
    tls_permute_extensions = false;
    tls_trust_anchors = null;
    headers = {};
    header_order = "";
    split_cookies = false;
    form_boundary = "";
    http2_settings = "";
    http2_window_update = 0;
    http2_pseudo_headers_order = "";
    http2_stream_weight = null;
    http2_stream_exclusive = null;
    http2_no_priority = false;
    http3_settings = "";
    http3_pseudo_headers_order = "";
    http3_tls_extension_order = "";
    http3_headers = {};
    http3_header_order = "";
    http3_tls_supported_groups = [];
    quic_transport_parameters = "";
    /** -1 randomizes like Firefox; 0..2147483647 selects a fixed packet number. */
    quic_initial_packet_number = null;
    ws_headers = {};
    ws_header_order = "";
    ws_disable_session_ticket = false;
    ws_tls_cert_compression = null;
    header_lang = "";
    constructor(value = {}) {
        Object.assign(this, value);
    }
}
const FINGERPRINT_KEYS = new Set(Object.keys(new Fingerprint()));
export class FingerprintUpdateError extends Error {
    constructor(message) {
        super(message);
        this.name = "FingerprintUpdateError";
    }
}
export const NATIVE_IMPERSONATE_TARGETS = [
    { browser: "Chrome", version: "99", os: "Windows", os_version: "10", target_name: "chrome99", h3_fingerprints: false },
    { browser: "Chrome", version: "100", os: "Windows", os_version: "10", target_name: "chrome100", h3_fingerprints: false },
    { browser: "Chrome", version: "101", os: "Windows", os_version: "10", target_name: "chrome101", h3_fingerprints: false },
    { browser: "Chrome", version: "104", os: "Windows", os_version: "10", target_name: "chrome104", h3_fingerprints: false },
    { browser: "Chrome", version: "107", os: "Windows", os_version: "10", target_name: "chrome107", h3_fingerprints: false },
    { browser: "Chrome", version: "110", os: "Windows", os_version: "10", target_name: "chrome110", h3_fingerprints: false },
    { browser: "Chrome", version: "116", os: "Windows", os_version: "10", target_name: "chrome116", h3_fingerprints: false },
    { browser: "Chrome", version: "119", os: "macOS", os_version: "Sonoma", target_name: "chrome119", h3_fingerprints: false },
    { browser: "Chrome", version: "120", os: "macOS", os_version: "Sonoma", target_name: "chrome120", h3_fingerprints: false },
    { browser: "Chrome", version: "123", os: "macOS", os_version: "Sonoma", target_name: "chrome123", h3_fingerprints: false },
    { browser: "Chrome", version: "124", os: "macOS", os_version: "Sonoma", target_name: "chrome124", h3_fingerprints: false },
    { browser: "Chrome", version: "131", os: "macOS", os_version: "Sonoma", target_name: "chrome131", h3_fingerprints: false },
    { browser: "Chrome", version: "133", os: "macOS", os_version: "Sequoia", target_name: "chrome133a", h3_fingerprints: false },
    { browser: "Chrome", version: "136", os: "macOS", os_version: "Sequoia", target_name: "chrome136", h3_fingerprints: false },
    { browser: "Chrome", version: "142", os: "macOS", os_version: "Tahoe", target_name: "chrome142", h3_fingerprints: false },
    { browser: "Chrome", version: "145", os: "macOS", os_version: "Tahoe", target_name: "chrome145", h3_fingerprints: true },
    { browser: "Chrome", version: "146", os: "macOS", os_version: "Tahoe", target_name: "chrome146", h3_fingerprints: true },
    { browser: "Chrome", version: "150", os: "macOS", os_version: "Tahoe", target_name: "chrome150", h3_fingerprints: true },
    { browser: "Chrome", version: "151", os: "Windows", os_version: "10", target_name: "chrome151", h3_fingerprints: true },
    { browser: "Chrome", version: "151", os: "macOS", os_version: "26.0", target_name: "chrome151_macos", h3_fingerprints: true },
    { browser: "Chrome", version: "152", os: "Windows", os_version: "10", target_name: "chrome152", h3_fingerprints: true },
    { browser: "Chrome", version: "152", os: "macOS", os_version: "26.0", target_name: "chrome152_macos", h3_fingerprints: true },
    { browser: "Chrome", version: "99", os: "Android", os_version: "12", target_name: "chrome99_android", h3_fingerprints: false },
    { browser: "Chrome", version: "131", os: "Android", os_version: "14", target_name: "chrome131_android", h3_fingerprints: false },
    { browser: "Edge", version: "99", os: "Windows", os_version: "10", target_name: "edge99", h3_fingerprints: false },
    { browser: "Edge", version: "101", os: "Windows", os_version: "10", target_name: "edge101", h3_fingerprints: false },
    { browser: "Safari", version: "15.3", os: "macOS", os_version: "Big Sur", target_name: "safari153", h3_fingerprints: false },
    { browser: "Safari", version: "15.5", os: "macOS", os_version: "Monterey", target_name: "safari155", h3_fingerprints: false },
    { browser: "Safari", version: "17.0", os: "macOS", os_version: "Sonoma", target_name: "safari170", h3_fingerprints: false },
    { browser: "Safari", version: "17.2", os: "iOS", os_version: "17.2", target_name: "safari172_ios", h3_fingerprints: false },
    { browser: "Safari", version: "18.0", os: "macOS", os_version: "Sequoia", target_name: "safari180", h3_fingerprints: false },
    { browser: "Safari", version: "18.0", os: "iOS", os_version: "18.0", target_name: "safari180_ios", h3_fingerprints: false },
    { browser: "Safari", version: "18.4", os: "macOS", os_version: "Sequoia", target_name: "safari184", h3_fingerprints: false },
    { browser: "Safari", version: "18.4", os: "iOS", os_version: "18.4", target_name: "safari184_ios", h3_fingerprints: false },
    { browser: "Safari", version: "26.0", os: "macOS", os_version: "Tahoe", target_name: "safari260", h3_fingerprints: false },
    { browser: "Safari", version: "26.0.1", os: "macOS", os_version: "Tahoe", target_name: "safari2601", h3_fingerprints: false },
    { browser: "Safari", version: "26.0", os: "iOS", os_version: "26.0", target_name: "safari260_ios", h3_fingerprints: false },
    { browser: "Safari", version: "27.0", os: "macOS", os_version: "27.0", target_name: "safari270", h3_fingerprints: true },
    { browser: "Safari", version: "27.0", os: "iOS", os_version: "27.0", target_name: "safari270_ios", h3_fingerprints: true },
    { browser: "Firefox", version: "133.0", os: "macOS", os_version: "Sonoma", target_name: "firefox133", h3_fingerprints: false },
    { browser: "Firefox", version: "135.0", os: "macOS", os_version: "Sonoma", target_name: "firefox135", h3_fingerprints: false },
    { browser: "Firefox", version: "144.0", os: "macOS", os_version: "Tahoe", target_name: "firefox144", h3_fingerprints: false },
    { browser: "Firefox", version: "147.0", os: "macOS", os_version: "Tahoe", target_name: "firefox147", h3_fingerprints: true },
    { browser: "Firefox", version: "153.0", os: "Windows", os_version: "10", target_name: "firefox153", h3_fingerprints: false },
    { browser: "Firefox", version: "154.0", os: "Windows", os_version: "10", target_name: "firefox154", h3_fingerprints: false },
    { browser: "Firefox", version: "155.0", os: "Windows", os_version: "10", target_name: "firefox155", h3_fingerprints: false },
    { browser: "Tor", version: "14.5", os: "macOS", os_version: "Sonoma", target_name: "tor145", h3_fingerprints: false },
];
const NATIVE_TARGET_ALIASES = {
    chrome: "chrome152",
    edge: "edge101",
    safari: "safari270",
    safari_ios: "safari270_ios",
    safari_beta: "safari270",
    safari_ios_beta: "safari270_ios",
    chrome_android: "chrome131_android",
    firefox: "firefox155",
    tor: "tor145",
    safari15_3: "safari153",
    safari15_5: "safari155",
    safari17_0: "safari170",
    safari17_2_ios: "safari172_ios",
    safari18_0: "safari180",
    safari18_0_ios: "safari180_ios",
    safari18_4: "safari184",
    safari18_4_ios: "safari184_ios",
};
const NATIVE_TARGET_NAMES = new Set(NATIVE_IMPERSONATE_TARGETS.map((target) => target.target_name));
export function resolveNativeImpersonateTarget(target) {
    const resolved = NATIVE_TARGET_ALIASES[target] || target;
    return NATIVE_TARGET_NAMES.has(resolved) ? resolved : null;
}
function getDefaultConfigDir(env = process.env) {
    if (process.platform === "win32") {
        if (env.APPDATA) {
            return join(env.APPDATA, "impersonate");
        }
        if (env.USERPROFILE) {
            return join(env.USERPROFILE, "AppData", "Roaming", "impersonate");
        }
        return join(homedir(), "AppData", "Roaming", "impersonate");
    }
    if (env.XDG_CONFIG_HOME) {
        return join(env.XDG_CONFIG_HOME, "impersonate");
    }
    return join(homedir(), ".config", "impersonate");
}
function readJsonFile(path) {
    return JSON.parse(readFileSync(path, "utf8"));
}
function writeJsonFile(path, value) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify(value, null, 2) + "\n");
}
function parseFingerprintPayload(payload) {
    const parsed = {};
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return parsed;
    }
    for (const [name, value] of Object.entries(payload)) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
            const filtered = {};
            for (const [key, fieldValue] of Object.entries(value)) {
                if (FINGERPRINT_KEYS.has(key)) {
                    filtered[key] = fieldValue;
                }
            }
            parsed[name] = new Fingerprint(filtered);
        }
    }
    return parsed;
}
function cloneFingerprint(fingerprint) {
    return new Fingerprint(JSON.parse(JSON.stringify(fingerprint)));
}
export class FingerprintManager {
    static getConfigDir(env = process.env) {
        return env.IMPERSONATE_CONFIG_DIR || getDefaultConfigDir(env);
    }
    static getConfigPath(env = process.env) {
        return join(this.getConfigDir(env), "config.json");
    }
    static getFingerprintPath(env = process.env) {
        return join(this.getConfigDir(env), "fingerprints.json");
    }
    static getApiRoot(env = process.env) {
        return env.IMPERSONATE_API_ROOT || DEFAULT_API_ROOT;
    }
    static getApiKey(env = process.env) {
        if (env.IMPERSONATE_API_KEY) {
            return env.IMPERSONATE_API_KEY;
        }
        const configPath = this.getConfigPath(env);
        if (!existsSync(configPath)) {
            return null;
        }
        try {
            const config = readJsonFile(configPath);
            if (config && typeof config === "object" && !Array.isArray(config)) {
                const apiKey = config.api_key;
                if (typeof apiKey === "string" && apiKey) {
                    return apiKey;
                }
            }
        }
        catch {
            return null;
        }
        return null;
    }
    static setApiKey(apiKey, env = process.env) {
        const configPath = this.getConfigPath(env);
        let config = {};
        if (existsSync(configPath)) {
            try {
                const existing = readJsonFile(configPath);
                if (existing && typeof existing === "object" && !Array.isArray(existing)) {
                    config = existing;
                }
            }
            catch {
                config = {};
            }
        }
        config.api_key = apiKey;
        config.update_time = new Date().toISOString();
        writeJsonFile(configPath, config);
    }
    static async updateFingerprints(env = process.env) {
        const apiRoot = this.getApiRoot(env);
        const baseUrl = `${apiRoot.replace(/\/+$/, "")}/fingerprints`;
        const apiKey = this.getApiKey(env);
        const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined;
        const fingerprints = {};
        let skip = 0;
        const { Session } = await import("./http/session.js");
        const session = new Session({ maxConnections: 1 });
        try {
            while (true) {
                const params = new URLSearchParams({
                    skip: String(skip),
                    limit: String(FINGERPRINT_PAGE_LIMIT),
                });
                const url = `${baseUrl}?${params.toString()}`;
                let response;
                try {
                    response = await session.get(url, { headers });
                }
                catch (error) {
                    throw new FingerprintUpdateError(`Failed to access fingerprint endpoint at ${url}: ${error instanceof Error ? error.message : String(error)}`);
                }
                if (response.statusCode >= 400) {
                    throw new FingerprintUpdateError(`Failed to access fingerprint endpoint at ${url}: HTTP ${response.statusCode}: ${response.text}`);
                }
                let data;
                try {
                    data = JSON.parse(response.text);
                }
                catch (error) {
                    throw new FingerprintUpdateError(`Invalid fingerprint response from ${url}: ${error instanceof Error ? error.message : String(error)}`);
                }
                if (!data || typeof data !== "object" || Array.isArray(data)) {
                    throw new FingerprintUpdateError(`Invalid fingerprint response from ${url}: expected object`);
                }
                const body = data;
                const items = Array.isArray(body.items) ? body.items : Array.isArray(body.data) ? body.data : null;
                if (!items) {
                    throw new FingerprintUpdateError(`No fingerprints found at ${url}`);
                }
                for (const item of items) {
                    if (!item || typeof item !== "object" || Array.isArray(item)) {
                        continue;
                    }
                    const record = item;
                    const name = typeof record.name === "string" && record.name
                        ? record.name
                        : typeof record.target === "string"
                            ? record.target
                            : "";
                    if (!name) {
                        continue;
                    }
                    let raw = record.data ?? record.fingerprint ?? {};
                    if (typeof raw === "string") {
                        try {
                            raw = JSON.parse(raw);
                        }
                        catch {
                            continue;
                        }
                    }
                    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
                        fingerprints[name] = { ...raw };
                    }
                }
                const pagination = body.pagination;
                if (!pagination || typeof pagination !== "object" || Array.isArray(pagination)) {
                    break;
                }
                const page = pagination;
                if (!page.has_more) {
                    break;
                }
                if (typeof page.next_skip !== "number" || page.next_skip <= skip) {
                    throw new FingerprintUpdateError(`Invalid fingerprint pagination from ${url}: expected increasing next_skip`);
                }
                skip = page.next_skip;
            }
        }
        finally {
            await session.close();
        }
        writeJsonFile(this.getFingerprintPath(env), fingerprints);
        return Object.keys(fingerprints).length;
    }
    static loadFingerprints(env = process.env) {
        const fingerprints = {};
        for (const target of NATIVE_IMPERSONATE_TARGETS) {
            fingerprints[target.target_name] = new Fingerprint({
                client: target.browser.toLowerCase(),
                client_version: target.version,
                os: target.os,
                os_version: target.os_version,
            });
        }
        const fingerprintPath = this.getFingerprintPath(env);
        if (existsSync(fingerprintPath)) {
            const custom = parseFingerprintPayload(readJsonFile(fingerprintPath));
            Object.assign(fingerprints, custom);
        }
        return fingerprints;
    }
    static getFingerprint(target, env = process.env) {
        const fingerprints = this.loadFingerprints(env);
        const fingerprint = fingerprints[target];
        if (!fingerprint) {
            throw new Error(`Fingerprint target not found: ${target}`);
        }
        return cloneFingerprint(fingerprint);
    }
    static listFingerprints(env = process.env) {
        const nativeLookup = new Map(NATIVE_IMPERSONATE_TARGETS.map((target) => [target.target_name, target]));
        const fingerprints = this.loadFingerprints(env);
        return Object.entries(fingerprints)
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([name, fingerprint]) => {
            const native = nativeLookup.get(name);
            if (native) {
                return {
                    type: "builtin",
                    name,
                    browser: native.browser,
                    version: native.version,
                    os: native.os,
                    os_version: native.os_version,
                    h3_fingerprints: native.h3_fingerprints,
                };
            }
            return {
                type: "custom",
                name,
                browser: fingerprint.client || "",
                version: fingerprint.client_version || "",
                os: fingerprint.os || "",
                os_version: fingerprint.os_version || "",
                h3_fingerprints: fingerprint.http_version === "v3" || fingerprint.http_version === "v3only",
            };
        });
    }
}
export function getFingerprint(target) {
    return FingerprintManager.getFingerprint(target);
}
//# sourceMappingURL=fingerprints.js.map