import koffi from "koffi";
type CurlHandle = unknown;
type CurlMultiHandle = unknown;
type CurlSList = unknown;
type CurlMime = unknown;
type CurlMimePart = unknown;
declare const CURL: unknown;
declare const CURLM: unknown;
declare const curl_slist_ptr: unknown;
declare const curl_mime_ptr: unknown;
declare const curl_mimepart_ptr: unknown;
declare const curl_easy_init: (...args: unknown[]) => unknown;
declare const curl_easy_cleanup: (...args: unknown[]) => unknown;
declare const curl_easy_perform: (...args: unknown[]) => unknown;
/**
 * Async version of curl_easy_perform that runs in a worker thread
 * via Koffi's .async() support. This avoids blocking the event loop,
 * which is critical when the mock server runs in the same process.
 */
declare function curl_easy_perform_async(handle: CurlHandle): Promise<number>;
declare const curl_easy_duphandle: (...args: unknown[]) => unknown;
declare const curl_easy_reset: (...args: unknown[]) => unknown;
declare const curl_easy_strerror: (...args: unknown[]) => unknown;
declare function curl_easy_setopt_long(handle: CurlHandle, option: number, value: number): number;
declare function curl_easy_setopt_string(handle: CurlHandle, option: number, value: string): number;
declare function curl_easy_setopt_ptr(handle: CurlHandle, option: number, value: unknown): number;
declare function curl_easy_setopt_int64(handle: CurlHandle, option: number, value: bigint): number;
declare function curl_easy_setopt_blob(handle: CurlHandle, option: number, data: Buffer, flags: number): number;
declare function curl_easy_getinfo_long(handle: CurlHandle, info: number): {
    code: number;
    value: number;
};
declare function curl_easy_getinfo_double(handle: CurlHandle, info: number): {
    code: number;
    value: number;
};
declare function curl_easy_getinfo_string(handle: CurlHandle, info: number): {
    code: number;
    value: string | null;
};
declare function curl_easy_getinfo_slist(handle: CurlHandle, info: number): {
    code: number;
    value: CurlSList | null;
};
declare function curl_easy_getinfo_off_t(handle: CurlHandle, info: number): {
    code: number;
    value: bigint;
};
declare function curl_easy_getinfo_socket(handle: CurlHandle, info: number): {
    code: number;
    value: number;
};
declare function curl_easy_getinfo_ptr(handle: CurlHandle, info: number): {
    code: number;
    value: unknown;
};
declare const curl_version: (...args: unknown[]) => unknown;
declare function curl_version_info(age: number): unknown;
declare const curl_slist_append: (...args: unknown[]) => unknown;
declare const curl_slist_free_all: (...args: unknown[]) => unknown;
declare const curl_multi_init: (...args: unknown[]) => unknown;
declare const curl_multi_cleanup: (...args: unknown[]) => unknown;
declare const curl_multi_add_handle: (...args: unknown[]) => unknown;
declare const curl_multi_remove_handle: (...args: unknown[]) => unknown;
declare const curl_multi_strerror: (...args: unknown[]) => unknown;
declare const curl_multi_wakeup: (...args: unknown[]) => unknown;
declare function curl_multi_socket_action(multi: CurlMultiHandle, socket: number, evBitmask: number): {
    code: number;
    runningHandles: number;
};
declare function curl_multi_perform(multi: CurlMultiHandle): {
    code: number;
    runningHandles: number;
};
declare function curl_multi_poll(multi: CurlMultiHandle, timeoutMs: number): {
    code: number;
    numfds: number;
};
/**
 * curl_multi_poll on a worker thread via Koffi's .async() support.
 * Until it settles, only curl_multi_wakeup may be called on the handle.
 */
declare function curl_multi_poll_async(multi: CurlMultiHandle, timeoutMs: number): Promise<number>;
declare function curl_multi_timeout(multi: CurlMultiHandle): {
    code: number;
    timeoutMs: number;
};
interface MultiInfoMessage {
    msg: number;
    easyHandle: CurlHandle;
    result: number;
}
declare function curl_multi_info_read(multi: CurlMultiHandle): {
    message: MultiInfoMessage | null;
    msgsInQueue: number;
};
declare function curl_multi_setopt_long(multi: CurlMultiHandle, option: number, value: number): number;
declare function curl_multi_setopt_ptr(multi: CurlMultiHandle, option: number, value: unknown): number;
declare function curl_multi_setopt_off_t(multi: CurlMultiHandle, option: number, value: bigint): number;
interface WsFrame {
    flags: number;
    offset: bigint;
    bytesleft: bigint;
    len: number;
}
declare function curl_ws_recv(handle: CurlHandle, buffer: Buffer): {
    code: number;
    received: number;
    frame: WsFrame | null;
};
declare function curl_ws_send(handle: CurlHandle, buffer: Buffer, flags: number, fragsize?: bigint): {
    code: number;
    sent: number;
};
declare function curl_ws_meta(handle: CurlHandle): WsFrame | null;
declare const curl_mime_init: (...args: unknown[]) => unknown;
declare const curl_mime_free: (...args: unknown[]) => unknown;
declare const curl_mime_addpart: (...args: unknown[]) => unknown;
declare const curl_mime_name: (...args: unknown[]) => unknown;
declare const curl_mime_filename: (...args: unknown[]) => unknown;
declare const curl_mime_type: (...args: unknown[]) => unknown;
declare const curl_mime_data: (...args: unknown[]) => unknown;
declare const curl_mime_filedata: (...args: unknown[]) => unknown;
declare const curl_mime_subparts: (...args: unknown[]) => unknown;
declare const curl_mime_headers: (...args: unknown[]) => unknown;
declare const curl_mime_encoder: (...args: unknown[]) => unknown;
declare let curl_easy_impersonate: ((handle: CurlHandle, target: string, defaultHeaders: number) => number) | null;
declare function hasImpersonateSupport(): boolean;
export { koffi, type CurlHandle, type CurlMultiHandle, type CurlSList, type CurlMime, type CurlMimePart, type WsFrame, type MultiInfoMessage, CURL, CURLM, curl_slist_ptr, curl_mime_ptr, curl_mimepart_ptr, curl_easy_init, curl_easy_cleanup, curl_easy_perform, curl_easy_perform_async, curl_easy_duphandle, curl_easy_reset, curl_easy_strerror, curl_easy_setopt_long, curl_easy_setopt_string, curl_easy_setopt_ptr, curl_easy_setopt_int64, curl_easy_setopt_blob, curl_easy_getinfo_long, curl_easy_getinfo_double, curl_easy_getinfo_string, curl_easy_getinfo_slist, curl_easy_getinfo_off_t, curl_easy_getinfo_socket, curl_easy_getinfo_ptr, curl_version, curl_version_info, curl_slist_append, curl_slist_free_all, curl_multi_init, curl_multi_cleanup, curl_multi_add_handle, curl_multi_remove_handle, curl_multi_perform, curl_multi_poll, curl_multi_poll_async, curl_multi_socket_action, curl_multi_timeout, curl_multi_info_read, curl_multi_setopt_long, curl_multi_setopt_ptr, curl_multi_setopt_off_t, curl_multi_strerror, curl_multi_wakeup, curl_ws_recv, curl_ws_send, curl_ws_meta, curl_mime_init, curl_mime_free, curl_mime_addpart, curl_mime_name, curl_mime_filename, curl_mime_type, curl_mime_data, curl_mime_filedata, curl_mime_subparts, curl_mime_headers, curl_mime_encoder, curl_easy_impersonate, hasImpersonateSupport, getHandleAddress, };
/**
 * Get the address of a koffi External handle as a string.
 * This allows comparing handles that point to the same memory.
 */
declare function getHandleAddress(handle: unknown): string;
//# sourceMappingURL=libcurl.d.ts.map