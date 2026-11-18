import { curl_slist_append, curl_slist_free_all } from "../ffi/libcurl.js";
export class SList {
    pointer;
    constructor() {
        this.pointer = null;
    }
    append(value) {
        this.pointer = curl_slist_append(this.pointer, value);
        return this;
    }
    free() {
        if (this.pointer) {
            curl_slist_free_all(this.pointer);
            this.pointer = null;
        }
    }
}
//# sourceMappingURL=slist.js.map