/**
 * Case-insensitive HTTP headers with multi-value support
 */
export type HeadersInit = Headers | Record<string, string | string[]> | Iterable<[string, string]> | Array<string | [string, string]>;
export interface HeaderSegment {
    statusCode: number;
    statusText: string;
    headers: Headers;
}
/**
 * Headers - Case-insensitive HTTP headers container
 *
 * Stores headers with lowercase keys internally but preserves
 * original case for output. Supports multiple values per header.
 */
export declare class Headers implements Iterable<[string, string]> {
    private data;
    constructor(init?: HeadersInit);
    /**
     * Get the first value for a header
     */
    get(name: string): string | null;
    /**
     * Get all values for a header
     */
    getAll(name: string): string[];
    /**
     * Set a header, replacing any existing values
     */
    set(name: string, value: string): void;
    /**
     * Append a value to a header (allows multiple values)
     */
    append(name: string, value: string): void;
    /**
     * Delete a header
     */
    delete(name: string): boolean;
    /**
     * Check if a header exists
     */
    has(name: string): boolean;
    /**
     * Get all header names (lowercase)
     */
    keys(): IterableIterator<string>;
    /**
     * Get all header values (first value per header)
     */
    values(): IterableIterator<string>;
    /**
     * Iterate over all header entries
     * For headers with multiple values, yields each value separately
     */
    entries(): IterableIterator<[string, string]>;
    /**
     * Iterate over all headers (same as entries)
     */
    [Symbol.iterator](): IterableIterator<[string, string]>;
    /**
     * Execute a callback for each header
     */
    forEach(callback: (value: string, name: string, headers: Headers) => void): void;
    /**
     * Extend headers from another source
     */
    extend(init: HeadersInit): void;
    /**
     * Convert to curl header format: ["Header-Name: value", ...]
     */
    toCurlHeaders(): string[];
    /**
     * Convert to a plain object (first value per header)
     */
    toObject(): Record<string, string>;
    /**
     * Convert to a plain object with all values
     */
    toMultiObject(): Record<string, string[]>;
    /**
     * Get the number of unique header names
     */
    get size(): number;
    /**
     * Split raw headers buffer into per-response segments.
     * When curl follows redirects, the header callback receives headers
     * for every response in the chain. Each HTTP/ status line starts a new segment.
     */
    static splitRawByResponse(raw: string | Buffer): Array<HeaderSegment>;
    /**
     * Create Headers from an array of "Name: Value" lines
     */
    private static fromHeaderLines;
    /**
     * Create Headers from curl response headers
     * Parses raw header lines (including status line)
     */
    static fromRaw(raw: string | Buffer): Headers;
    /**
     * Parse a single Set-Cookie or other multi-value header
     */
    static parseHeaderValue(value: string): string[];
    /**
     * Create a copy of these headers
     */
    clone(): Headers;
    /**
     * String representation
     */
    toString(): string;
}
//# sourceMappingURL=headers.d.ts.map