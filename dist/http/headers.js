/**
 * Case-insensitive HTTP headers with multi-value support
 */
/**
 * Headers - Case-insensitive HTTP headers container
 *
 * Stores headers with lowercase keys internally but preserves
 * original case for output. Supports multiple values per header.
 */
export class Headers {
    // Maps lowercase key -> array of [originalKey, value] pairs
    data = new Map();
    constructor(init) {
        if (init) {
            this.extend(init);
        }
    }
    /**
     * Get the first value for a header
     */
    get(name) {
        const values = this.data.get(name.toLowerCase());
        return values && values.length > 0 ? values[0][1] : null;
    }
    /**
     * Get all values for a header
     */
    getAll(name) {
        const values = this.data.get(name.toLowerCase());
        return values ? values.map(([, v]) => v) : [];
    }
    /**
     * Set a header, replacing any existing values
     */
    set(name, value) {
        this.data.set(name.toLowerCase(), [[name, value]]);
    }
    /**
     * Append a value to a header (allows multiple values)
     */
    append(name, value) {
        const key = name.toLowerCase();
        const existing = this.data.get(key) || [];
        existing.push([name, value]);
        this.data.set(key, existing);
    }
    /**
     * Delete a header
     */
    delete(name) {
        return this.data.delete(name.toLowerCase());
    }
    /**
     * Check if a header exists
     */
    has(name) {
        return this.data.has(name.toLowerCase());
    }
    /**
     * Get all header names (lowercase)
     */
    keys() {
        return this.data.keys();
    }
    /**
     * Get all header values (first value per header)
     */
    *values() {
        for (const values of this.data.values()) {
            if (values.length > 0) {
                yield values[0][1];
            }
        }
    }
    /**
     * Iterate over all header entries
     * For headers with multiple values, yields each value separately
     */
    *entries() {
        for (const values of this.data.values()) {
            for (const [name, value] of values) {
                yield [name, value];
            }
        }
    }
    /**
     * Iterate over all headers (same as entries)
     */
    *[Symbol.iterator]() {
        yield* this.entries();
    }
    /**
     * Execute a callback for each header
     */
    forEach(callback) {
        for (const [name, value] of this.entries()) {
            callback(value, name, this);
        }
    }
    /**
     * Extend headers from another source
     */
    extend(init) {
        if (init instanceof Headers) {
            for (const [name, value] of init.entries()) {
                this.append(name, value);
            }
        }
        else if (Array.isArray(init)) {
            // Array of "Header: Value" strings
            for (const item of init) {
                if (typeof item === "string") {
                    const colonIdx = item.indexOf(":");
                    if (colonIdx > 0) {
                        const name = item.slice(0, colonIdx).trim();
                        const value = item.slice(colonIdx + 1).trim();
                        this.append(name, value);
                    }
                }
                else if (Array.isArray(item) && item.length >= 2) {
                    this.append(item[0], item[1]);
                }
            }
        }
        else if (typeof init === "object") {
            // Record<string, string | string[]>
            for (const [name, value] of Object.entries(init)) {
                if (Array.isArray(value)) {
                    for (const v of value) {
                        this.append(name, v);
                    }
                }
                else {
                    this.append(name, value);
                }
            }
        }
    }
    /**
     * Convert to curl header format: ["Header-Name: value", ...]
     */
    toCurlHeaders() {
        const result = [];
        for (const [name, value] of this.entries()) {
            if (value === "") {
                result.push(`${name};`);
            }
            else {
                result.push(`${name}: ${value}`);
            }
        }
        return result;
    }
    /**
     * Convert to a plain object (first value per header)
     */
    toObject() {
        const result = {};
        for (const values of this.data.values()) {
            if (values.length > 0) {
                result[values[0][0]] = values[0][1];
            }
        }
        return result;
    }
    /**
     * Convert to a plain object with all values
     */
    toMultiObject() {
        const result = {};
        for (const values of this.data.values()) {
            if (values.length > 0) {
                const name = values[0][0];
                result[name] = values.map(([, v]) => v);
            }
        }
        return result;
    }
    /**
     * Get the number of unique header names
     */
    get size() {
        return this.data.size;
    }
    /**
     * Split raw headers buffer into per-response segments.
     * When curl follows redirects, the header callback receives headers
     * for every response in the chain. Each HTTP/ status line starts a new segment.
     */
    static splitRawByResponse(raw) {
        const text = Buffer.isBuffer(raw) ? raw.toString("utf-8") : raw;
        const lines = text.split(/\r?\n/);
        const segments = [];
        let currentStatusCode = 0;
        let currentStatusText = "";
        let currentHeaderLines = [];
        for (const line of lines) {
            const statusMatch = line.match(/^HTTP\/[\d.]+\s+(\d{3})\s*(.*)/);
            if (statusMatch) {
                // Push previous segment if we have one
                if (currentStatusCode > 0) {
                    segments.push({
                        statusCode: currentStatusCode,
                        statusText: currentStatusText,
                        headers: Headers.fromHeaderLines(currentHeaderLines),
                    });
                }
                currentStatusCode = parseInt(statusMatch[1], 10);
                currentStatusText = statusMatch[2]?.trim() || "";
                currentHeaderLines = [];
                continue;
            }
            if (!line.trim())
                continue;
            // Handle continuation lines (starting with space/tab)
            if ((line.startsWith(" ") || line.startsWith("\t")) && currentHeaderLines.length > 0) {
                currentHeaderLines[currentHeaderLines.length - 1] += line;
            }
            else {
                currentHeaderLines.push(line);
            }
        }
        // Push the last segment
        if (currentStatusCode > 0) {
            segments.push({
                statusCode: currentStatusCode,
                statusText: currentStatusText,
                headers: Headers.fromHeaderLines(currentHeaderLines),
            });
        }
        return segments;
    }
    /**
     * Create Headers from an array of "Name: Value" lines
     */
    static fromHeaderLines(lines) {
        const headers = new Headers();
        for (const line of lines) {
            const colonIdx = line.indexOf(":");
            if (colonIdx <= 0)
                continue;
            const name = line.slice(0, colonIdx).trim();
            const value = line.slice(colonIdx + 1).trim();
            headers.append(name, value);
        }
        return headers;
    }
    /**
     * Create Headers from curl response headers
     * Parses raw header lines (including status line)
     */
    static fromRaw(raw) {
        const text = Buffer.isBuffer(raw) ? raw.toString("utf-8") : raw;
        const lines = text.split(/\r?\n/).filter((line) => line && !line.startsWith("HTTP/"));
        return Headers.fromHeaderLines(lines);
    }
    /**
     * Parse a single Set-Cookie or other multi-value header
     */
    static parseHeaderValue(value) {
        // Simple split by comma, but respect quoted values
        const result = [];
        let current = "";
        let inQuotes = false;
        for (const char of value) {
            if (char === '"') {
                inQuotes = !inQuotes;
                current += char;
            }
            else if (char === "," && !inQuotes) {
                result.push(current.trim());
                current = "";
            }
            else {
                current += char;
            }
        }
        if (current) {
            result.push(current.trim());
        }
        return result;
    }
    /**
     * Create a copy of these headers
     */
    clone() {
        const copy = new Headers();
        for (const [name, value] of this.entries()) {
            copy.append(name, value);
        }
        return copy;
    }
    /**
     * String representation
     */
    toString() {
        return this.toCurlHeaders().join("\r\n");
    }
}
//# sourceMappingURL=headers.js.map