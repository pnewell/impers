import { type CurlMime as CurlMimeHandle } from "../ffi/libcurl.js";
import { Curl } from "./easy.js";
export interface CurlMimePartOptions {
    name: string;
    data?: string | Buffer;
    filename?: string;
    filepath?: string;
    contentType?: string;
}
export declare class CurlMime {
    private handle;
    private buffers;
    constructor(curl: Curl);
    get pointer(): CurlMimeHandle;
    addPart(options: CurlMimePartOptions): void;
    attach(curl: Curl): void;
    free(): void;
}
//# sourceMappingURL=mime.d.ts.map