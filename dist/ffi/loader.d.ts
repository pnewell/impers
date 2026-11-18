export interface LibraryInfo {
    path: string;
    isImpersonate: boolean;
}
export declare const LIBCURL_IMPERSONATE_VERSION = "v2.3.2";
export declare const LIBCURL_IMPERSONATE_RELEASE_URL = "https://api.github.com/repos/lexiforest/curl-impersonate/releases/tags/v2.3.2";
type ExtractedEntry = {
    name: string;
    data?: Buffer;
    linkName?: string;
    type: "file" | "symlink";
};
/** @internal Exported for archive extraction regression tests. */
export declare function writeExtractedEntries(entries: ExtractedEntry[], targetDir: string, platform: string): void;
/**
 * Resolve libcurl library path with priority:
 * 1. LIBCURL_IMPERSONATE_PATH env var (for curl-impersonate)
 * 2. LIBCURL_PATH env var (explicit path)
 * 3. Auto-detect curl-impersonate in common locations
 * 4. Download curl-impersonate into cache (optional)
 * 5. System libcurl
 */
export declare function resolveLibrary(): Promise<LibraryInfo>;
/**
 * Get just the library path
 */
export declare function resolveLibcurlPath(): Promise<string>;
/**
 * Check if we're using curl-impersonate
 */
export declare function isUsingImpersonate(): Promise<boolean>;
/**
 * Get platform information
 */
export declare function getPlatformInfo(): {
    platform: string;
    arch: string;
    isAppleSilicon: boolean;
};
export {};
//# sourceMappingURL=loader.d.ts.map