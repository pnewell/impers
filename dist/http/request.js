/**
 * HTTP Request representation
 */
import { Headers } from "./headers.js";
/**
 * Request - Represents an HTTP request
 */
export class Request {
    method;
    url;
    headers;
    body;
    constructor(method, url, init) {
        this.method = method.toUpperCase();
        this.url = typeof url === "string" ? new URL(url) : url;
        this.headers = new Headers(init?.headers);
        this.body = init?.body ? this.normalizeBody(init.body) : null;
    }
    /**
     * Normalize body to Buffer
     */
    normalizeBody(body) {
        if (Buffer.isBuffer(body)) {
            return body;
        }
        if (typeof body === "string") {
            return Buffer.from(body, "utf-8");
        }
        if (body instanceof URLSearchParams) {
            return Buffer.from(body.toString(), "utf-8");
        }
        // Assume JSON-serializable object
        return Buffer.from(JSON.stringify(body), "utf-8");
    }
    /**
     * Get the full URL as string
     */
    get href() {
        return this.url.href;
    }
    /**
     * Get the hostname
     */
    get hostname() {
        return this.url.hostname;
    }
    /**
     * Get the pathname
     */
    get pathname() {
        return this.url.pathname;
    }
    /**
     * Get query string
     */
    get search() {
        return this.url.search;
    }
    /**
     * Check if body exists
     */
    get hasBody() {
        return this.body !== null && this.body.length > 0;
    }
    /**
     * Get body as string
     */
    get text() {
        return this.body ? this.body.toString("utf-8") : null;
    }
    /**
     * Clone the request
     */
    clone() {
        return new Request(this.method, this.url, {
            headers: this.headers.clone(),
            body: this.body ? Buffer.from(this.body) : undefined,
        });
    }
}
//# sourceMappingURL=request.js.map