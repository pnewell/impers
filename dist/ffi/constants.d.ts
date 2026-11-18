/**
 * libcurl constants
 * Based on curl-impersonate 2.3.1 (curl 8.23.0) headers.
 */
/**
 * CURLcode - Error codes returned by libcurl functions
 */
export declare const CurlCode: {
    readonly CURLE_OK: 0;
    readonly CURLE_UNSUPPORTED_PROTOCOL: 1;
    readonly CURLE_FAILED_INIT: 2;
    readonly CURLE_URL_MALFORMAT: 3;
    readonly CURLE_NOT_BUILT_IN: 4;
    readonly CURLE_COULDNT_RESOLVE_PROXY: 5;
    readonly CURLE_COULDNT_RESOLVE_HOST: 6;
    readonly CURLE_COULDNT_CONNECT: 7;
    readonly CURLE_WEIRD_SERVER_REPLY: 8;
    readonly CURLE_REMOTE_ACCESS_DENIED: 9;
    readonly CURLE_FTP_ACCEPT_FAILED: 10;
    readonly CURLE_FTP_WEIRD_PASS_REPLY: 11;
    readonly CURLE_FTP_ACCEPT_TIMEOUT: 12;
    readonly CURLE_FTP_WEIRD_PASV_REPLY: 13;
    readonly CURLE_FTP_WEIRD_227_FORMAT: 14;
    readonly CURLE_FTP_CANT_GET_HOST: 15;
    readonly CURLE_HTTP2: 16;
    readonly CURLE_FTP_COULDNT_SET_TYPE: 17;
    readonly CURLE_PARTIAL_FILE: 18;
    readonly CURLE_FTP_COULDNT_RETR_FILE: 19;
    readonly CURLE_OBSOLETE20: 20;
    readonly CURLE_QUOTE_ERROR: 21;
    readonly CURLE_HTTP_RETURNED_ERROR: 22;
    readonly CURLE_WRITE_ERROR: 23;
    readonly CURLE_OBSOLETE24: 24;
    readonly CURLE_UPLOAD_FAILED: 25;
    readonly CURLE_READ_ERROR: 26;
    readonly CURLE_OUT_OF_MEMORY: 27;
    readonly CURLE_OPERATION_TIMEDOUT: 28;
    readonly CURLE_OBSOLETE29: 29;
    readonly CURLE_FTP_PORT_FAILED: 30;
    readonly CURLE_FTP_COULDNT_USE_REST: 31;
    readonly CURLE_OBSOLETE32: 32;
    readonly CURLE_RANGE_ERROR: 33;
    readonly CURLE_HTTP_POST_ERROR: 34;
    readonly CURLE_SSL_CONNECT_ERROR: 35;
    readonly CURLE_BAD_DOWNLOAD_RESUME: 36;
    readonly CURLE_FILE_COULDNT_READ_FILE: 37;
    readonly CURLE_LDAP_CANNOT_BIND: 38;
    readonly CURLE_LDAP_SEARCH_FAILED: 39;
    readonly CURLE_OBSOLETE40: 40;
    readonly CURLE_FUNCTION_NOT_FOUND: 41;
    readonly CURLE_ABORTED_BY_CALLBACK: 42;
    readonly CURLE_BAD_FUNCTION_ARGUMENT: 43;
    readonly CURLE_OBSOLETE44: 44;
    readonly CURLE_INTERFACE_FAILED: 45;
    readonly CURLE_OBSOLETE46: 46;
    readonly CURLE_TOO_MANY_REDIRECTS: 47;
    readonly CURLE_UNKNOWN_OPTION: 48;
    readonly CURLE_SETOPT_OPTION_SYNTAX: 49;
    readonly CURLE_OBSOLETE50: 50;
    readonly CURLE_OBSOLETE51: 51;
    readonly CURLE_GOT_NOTHING: 52;
    readonly CURLE_SSL_ENGINE_NOTFOUND: 53;
    readonly CURLE_SSL_ENGINE_SETFAILED: 54;
    readonly CURLE_SEND_ERROR: 55;
    readonly CURLE_RECV_ERROR: 56;
    readonly CURLE_OBSOLETE57: 57;
    readonly CURLE_SSL_CERTPROBLEM: 58;
    readonly CURLE_SSL_CIPHER: 59;
    readonly CURLE_PEER_FAILED_VERIFICATION: 60;
    readonly CURLE_BAD_CONTENT_ENCODING: 61;
    readonly CURLE_OBSOLETE62: 62;
    readonly CURLE_FILESIZE_EXCEEDED: 63;
    readonly CURLE_USE_SSL_FAILED: 64;
    readonly CURLE_SEND_FAIL_REWIND: 65;
    readonly CURLE_SSL_ENGINE_INITFAILED: 66;
    readonly CURLE_LOGIN_DENIED: 67;
    readonly CURLE_TFTP_NOTFOUND: 68;
    readonly CURLE_TFTP_PERM: 69;
    readonly CURLE_REMOTE_DISK_FULL: 70;
    readonly CURLE_TFTP_ILLEGAL: 71;
    readonly CURLE_TFTP_UNKNOWNID: 72;
    readonly CURLE_REMOTE_FILE_EXISTS: 73;
    readonly CURLE_TFTP_NOSUCHUSER: 74;
    readonly CURLE_OBSOLETE75: 75;
    readonly CURLE_OBSOLETE76: 76;
    readonly CURLE_SSL_CACERT_BADFILE: 77;
    readonly CURLE_REMOTE_FILE_NOT_FOUND: 78;
    readonly CURLE_SSH: 79;
    readonly CURLE_SSL_SHUTDOWN_FAILED: 80;
    readonly CURLE_AGAIN: 81;
    readonly CURLE_SSL_CRL_BADFILE: 82;
    readonly CURLE_SSL_ISSUER_ERROR: 83;
    readonly CURLE_FTP_PRET_FAILED: 84;
    readonly CURLE_RTSP_CSEQ_ERROR: 85;
    readonly CURLE_RTSP_SESSION_ERROR: 86;
    readonly CURLE_FTP_BAD_FILE_LIST: 87;
    readonly CURLE_CHUNK_FAILED: 88;
    readonly CURLE_NO_CONNECTION_AVAILABLE: 89;
    readonly CURLE_SSL_PINNEDPUBKEYNOTMATCH: 90;
    readonly CURLE_SSL_INVALIDCERTSTATUS: 91;
    readonly CURLE_HTTP2_STREAM: 92;
    readonly CURLE_RECURSIVE_API_CALL: 93;
    readonly CURLE_AUTH_ERROR: 94;
    readonly CURLE_HTTP3: 95;
    readonly CURLE_QUIC_CONNECT_ERROR: 96;
    readonly CURLE_PROXY: 97;
    readonly CURLE_SSL_CLIENTCERT: 98;
    readonly CURLE_UNRECOVERABLE_POLL: 99;
    readonly CURLE_TOO_LARGE: 100;
    readonly CURLE_ECH_REQUIRED: 101;
};
export type CurlCode = (typeof CurlCode)[keyof typeof CurlCode];
/**
 * CURLoption - Options for curl_easy_setopt
 */
export declare const CurlOpt: {
    readonly WRITEDATA: number;
    readonly URL: number;
    readonly PORT: number;
    readonly PROXY: number;
    readonly USERPWD: number;
    readonly PROXYUSERPWD: number;
    readonly RANGE: number;
    readonly READDATA: number;
    readonly ERRORBUFFER: number;
    readonly WRITEFUNCTION: number;
    readonly READFUNCTION: number;
    readonly TIMEOUT: number;
    readonly INFILESIZE: number;
    readonly POSTFIELDS: number;
    readonly REFERER: number;
    readonly FTPPORT: number;
    readonly USERAGENT: number;
    readonly LOW_SPEED_LIMIT: number;
    readonly LOW_SPEED_TIME: number;
    readonly RESUME_FROM: number;
    readonly COOKIE: number;
    readonly HTTPHEADER: number;
    readonly SSLCERT: number;
    readonly KEYPASSWD: number;
    readonly CRLF: number;
    readonly QUOTE: number;
    readonly HEADERDATA: number;
    readonly COOKIEFILE: number;
    readonly SSLVERSION: number;
    readonly TIMECONDITION: number;
    readonly TIMEVALUE: number;
    readonly CUSTOMREQUEST: number;
    readonly STDERR: number;
    readonly POSTQUOTE: number;
    readonly VERBOSE: number;
    readonly HEADER: number;
    readonly NOPROGRESS: number;
    readonly NOBODY: number;
    readonly FAILONERROR: number;
    readonly UPLOAD: number;
    readonly POST: number;
    readonly DIRLISTONLY: number;
    readonly APPEND: number;
    readonly NETRC: number;
    readonly FOLLOWLOCATION: number;
    readonly TRANSFERTEXT: number;
    readonly XFERINFODATA: number;
    readonly AUTOREFERER: number;
    readonly PROXYPORT: number;
    readonly POSTFIELDSIZE: number;
    readonly HTTPPROXYTUNNEL: number;
    readonly INTERFACE: number;
    readonly SSL_VERIFYPEER: number;
    readonly CAINFO: number;
    readonly MAXREDIRS: number;
    readonly FILETIME: number;
    readonly TELNETOPTIONS: number;
    readonly MAXCONNECTS: number;
    readonly FRESH_CONNECT: number;
    readonly FORBID_REUSE: number;
    readonly CONNECTTIMEOUT: number;
    readonly HEADERFUNCTION: number;
    readonly HTTPGET: number;
    readonly SSL_VERIFYHOST: number;
    readonly COOKIEJAR: number;
    readonly SSL_CIPHER_LIST: number;
    readonly HTTP_VERSION: number;
    readonly FTP_USE_EPSV: number;
    readonly SSLCERTTYPE: number;
    readonly SSLKEY: number;
    readonly SSLKEYTYPE: number;
    readonly SSLENGINE: number;
    readonly SSLENGINE_DEFAULT: number;
    readonly DNS_CACHE_TIMEOUT: number;
    readonly PREQUOTE: number;
    readonly DEBUGFUNCTION: number;
    readonly DEBUGDATA: number;
    readonly COOKIESESSION: number;
    readonly CAPATH: number;
    readonly BUFFERSIZE: number;
    readonly NOSIGNAL: number;
    readonly SHARE: number;
    readonly PROXYTYPE: number;
    readonly ACCEPT_ENCODING: number;
    readonly PRIVATE: number;
    readonly HTTP200ALIASES: number;
    readonly UNRESTRICTED_AUTH: number;
    readonly FTP_USE_EPRT: number;
    readonly HTTPAUTH: number;
    readonly SSL_CTX_FUNCTION: number;
    readonly SSL_CTX_DATA: number;
    readonly FTP_CREATE_MISSING_DIRS: number;
    readonly PROXYAUTH: number;
    readonly SERVER_RESPONSE_TIMEOUT: number;
    readonly IPRESOLVE: number;
    readonly MAXFILESIZE: number;
    readonly INFILESIZE_LARGE: number;
    readonly RESUME_FROM_LARGE: number;
    readonly MAXFILESIZE_LARGE: number;
    readonly NETRC_FILE: number;
    readonly USE_SSL: number;
    readonly POSTFIELDSIZE_LARGE: number;
    readonly TCP_NODELAY: number;
    readonly FTPSSLAUTH: number;
    readonly FTP_ACCOUNT: number;
    readonly COOKIELIST: number;
    readonly IGNORE_CONTENT_LENGTH: number;
    readonly FTP_SKIP_PASV_IP: number;
    readonly FTP_FILEMETHOD: number;
    readonly LOCALPORT: number;
    readonly LOCALPORTRANGE: number;
    readonly CONNECT_ONLY: number;
    readonly MAX_SEND_SPEED_LARGE: number;
    readonly MAX_RECV_SPEED_LARGE: number;
    readonly FTP_ALTERNATIVE_TO_USER: number;
    readonly SOCKOPTFUNCTION: number;
    readonly SOCKOPTDATA: number;
    readonly SSL_SESSIONID_CACHE: number;
    readonly SSH_AUTH_TYPES: number;
    readonly SSH_PUBLIC_KEYFILE: number;
    readonly SSH_PRIVATE_KEYFILE: number;
    readonly FTP_SSL_CCC: number;
    readonly TIMEOUT_MS: number;
    readonly CONNECTTIMEOUT_MS: number;
    readonly HTTP_TRANSFER_DECODING: number;
    readonly HTTP_CONTENT_DECODING: number;
    readonly NEW_FILE_PERMS: number;
    readonly NEW_DIRECTORY_PERMS: number;
    readonly POSTREDIR: number;
    readonly SSH_HOST_PUBLIC_KEY_MD5: number;
    readonly OPENSOCKETFUNCTION: number;
    readonly OPENSOCKETDATA: number;
    readonly COPYPOSTFIELDS: number;
    readonly PROXY_TRANSFER_MODE: number;
    readonly SEEKFUNCTION: number;
    readonly SEEKDATA: number;
    readonly CRLFILE: number;
    readonly ISSUERCERT: number;
    readonly ADDRESS_SCOPE: number;
    readonly CERTINFO: number;
    readonly USERNAME: number;
    readonly PASSWORD: number;
    readonly PROXYUSERNAME: number;
    readonly PROXYPASSWORD: number;
    readonly NOPROXY: number;
    readonly TFTP_BLKSIZE: number;
    readonly SOCKS5_GSSAPI_NEC: number;
    readonly SSH_KNOWNHOSTS: number;
    readonly SSH_KEYFUNCTION: number;
    readonly SSH_KEYDATA: number;
    readonly MAIL_FROM: number;
    readonly MAIL_RCPT: number;
    readonly FTP_USE_PRET: number;
    readonly RTSP_REQUEST: number;
    readonly RTSP_SESSION_ID: number;
    readonly RTSP_STREAM_URI: number;
    readonly RTSP_TRANSPORT: number;
    readonly RTSP_CLIENT_CSEQ: number;
    readonly RTSP_SERVER_CSEQ: number;
    readonly INTERLEAVEDATA: number;
    readonly INTERLEAVEFUNCTION: number;
    readonly WILDCARDMATCH: number;
    readonly CHUNK_BGN_FUNCTION: number;
    readonly CHUNK_END_FUNCTION: number;
    readonly FNMATCH_FUNCTION: number;
    readonly CHUNK_DATA: number;
    readonly FNMATCH_DATA: number;
    readonly RESOLVE: number;
    readonly TRANSFER_ENCODING: number;
    readonly CLOSESOCKETFUNCTION: number;
    readonly CLOSESOCKETDATA: number;
    readonly GSSAPI_DELEGATION: number;
    readonly DNS_SERVERS: number;
    readonly ACCEPTTIMEOUT_MS: number;
    readonly TCP_KEEPALIVE: number;
    readonly TCP_KEEPIDLE: number;
    readonly TCP_KEEPINTVL: number;
    readonly SSL_OPTIONS: number;
    readonly MAIL_AUTH: number;
    readonly SASL_IR: number;
    readonly XFERINFOFUNCTION: number;
    readonly XOAUTH2_BEARER: number;
    readonly DNS_INTERFACE: number;
    readonly DNS_LOCAL_IP4: number;
    readonly DNS_LOCAL_IP6: number;
    readonly LOGIN_OPTIONS: number;
    readonly SSL_ENABLE_ALPN: number;
    readonly EXPECT_100_TIMEOUT_MS: number;
    readonly PROXYHEADER: number;
    readonly HEADEROPT: number;
    readonly PINNEDPUBLICKEY: number;
    readonly UNIX_SOCKET_PATH: number;
    readonly SSL_VERIFYSTATUS: number;
    readonly PATH_AS_IS: number;
    readonly PROXY_SERVICE_NAME: number;
    readonly SERVICE_NAME: number;
    readonly PIPEWAIT: number;
    readonly DEFAULT_PROTOCOL: number;
    readonly STREAM_WEIGHT: number;
    readonly TFTP_NO_OPTIONS: number;
    readonly CONNECT_TO: number;
    readonly TCP_FASTOPEN: number;
    readonly KEEP_SENDING_ON_ERROR: number;
    readonly PROXY_CAINFO: number;
    readonly PROXY_CAPATH: number;
    readonly PROXY_SSL_VERIFYPEER: number;
    readonly PROXY_SSL_VERIFYHOST: number;
    readonly PROXY_SSLVERSION: number;
    readonly PROXY_SSLCERT: number;
    readonly PROXY_SSLCERTTYPE: number;
    readonly PROXY_SSLKEY: number;
    readonly PROXY_SSLKEYTYPE: number;
    readonly PROXY_KEYPASSWD: number;
    readonly PROXY_SSL_CIPHER_LIST: number;
    readonly PROXY_CRLFILE: number;
    readonly PROXY_SSL_OPTIONS: number;
    readonly PRE_PROXY: number;
    readonly PROXY_PINNEDPUBLICKEY: number;
    readonly ABSTRACT_UNIX_SOCKET: number;
    readonly SUPPRESS_CONNECT_HEADERS: number;
    readonly REQUEST_TARGET: number;
    readonly SOCKS5_AUTH: number;
    readonly SSH_COMPRESSION: number;
    readonly MIMEPOST: number;
    readonly TIMEVALUE_LARGE: number;
    readonly HAPPY_EYEBALLS_TIMEOUT_MS: number;
    readonly RESOLVER_START_FUNCTION: number;
    readonly RESOLVER_START_DATA: number;
    readonly HAPROXYPROTOCOL: number;
    readonly DNS_SHUFFLE_ADDRESSES: number;
    readonly TLS13_CIPHERS: number;
    readonly PROXY_TLS13_CIPHERS: number;
    readonly DISALLOW_USERNAME_IN_URL: number;
    readonly DOH_URL: number;
    readonly UPLOAD_BUFFERSIZE: number;
    readonly UPKEEP_INTERVAL_MS: number;
    readonly CURLU: number;
    readonly TRAILERFUNCTION: number;
    readonly TRAILERDATA: number;
    readonly HTTP09_ALLOWED: number;
    readonly ALTSVC_CTRL: number;
    readonly ALTSVC: number;
    readonly MAXAGE_CONN: number;
    readonly SASL_AUTHZID: number;
    readonly MAIL_RCPT_ALLOWFAILS: number;
    readonly SSLCERT_BLOB: number;
    readonly SSLKEY_BLOB: number;
    readonly PROXY_SSLCERT_BLOB: number;
    readonly PROXY_SSLKEY_BLOB: number;
    readonly ISSUERCERT_BLOB: number;
    readonly PROXY_ISSUERCERT: number;
    readonly PROXY_ISSUERCERT_BLOB: number;
    readonly SSL_EC_CURVES: number;
    readonly HSTS_CTRL: number;
    readonly HSTS: number;
    readonly HSTSREADFUNCTION: number;
    readonly HSTSREADDATA: number;
    readonly HSTSWRITEFUNCTION: number;
    readonly HSTSWRITEDATA: number;
    readonly AWS_SIGV4: number;
    readonly DOH_SSL_VERIFYPEER: number;
    readonly DOH_SSL_VERIFYHOST: number;
    readonly DOH_SSL_VERIFYSTATUS: number;
    readonly CAINFO_BLOB: number;
    readonly PROXY_CAINFO_BLOB: number;
    readonly SSH_HOST_PUBLIC_KEY_SHA256: number;
    readonly PREREQFUNCTION: number;
    readonly PREREQDATA: number;
    readonly MAXLIFETIME_CONN: number;
    readonly MIME_OPTIONS: number;
    readonly SSH_HOSTKEYFUNCTION: number;
    readonly SSH_HOSTKEYDATA: number;
    readonly PROTOCOLS_STR: number;
    readonly REDIR_PROTOCOLS_STR: number;
    readonly WS_OPTIONS: number;
    readonly CA_CACHE_TIMEOUT: number;
    readonly QUICK_EXIT: number;
    readonly HAPROXY_CLIENT_IP: number;
    readonly SERVER_RESPONSE_TIMEOUT_MS: number;
    readonly ECH: number;
    readonly TCP_KEEPCNT: number;
    readonly UPLOAD_FLAGS: number;
    readonly SSL_SIGNATURE_ALGORITHMS: number;
    readonly HTTPSIG_ALGORITHM: number;
    readonly HTTPSIG_KEY: number;
    readonly HTTPSIG_KEYID: number;
    readonly HTTPSIG_HEADERS: number;
    readonly IMPERSONATE: number;
    readonly HTTPBASEHEADER: number;
    readonly SSL_SIG_HASH_ALGS: number;
    readonly SSL_ENABLE_ALPS: number;
    readonly SSL_CERT_COMPRESSION: number;
    readonly SSL_ENABLE_TICKET: number;
    readonly HTTP2_PSEUDO_HEADERS_ORDER: number;
    readonly HTTP2_SETTINGS: number;
    readonly SSL_PERMUTE_EXTENSIONS: number;
    readonly HTTP2_WINDOW_UPDATE: number;
    readonly HTTP2_STREAMS: number;
    readonly TLS_GREASE: number;
    readonly TLS_EXTENSION_ORDER: number;
    readonly STREAM_EXCLUSIVE: number;
    readonly TLS_KEY_USAGE_NO_CHECK: number;
    readonly TLS_SIGNED_CERT_TIMESTAMPS: number;
    readonly TLS_STATUS_REQUEST: number;
    readonly TLS_DELEGATED_CREDENTIALS: number;
    readonly TLS_RECORD_SIZE_LIMIT: number;
    readonly TLS_KEY_SHARES_LIMIT: number;
    readonly TLS_USE_NEW_ALPS_CODEPOINT: number;
    readonly HTTP2_NO_PRIORITY: number;
    readonly PROXY_CREDENTIAL_NO_REUSE: number;
    readonly SPLIT_COOKIES: number;
    readonly FORM_BOUNDARY: number;
    readonly HTTP3_PSEUDO_HEADERS_ORDER: number;
    readonly HTTP3_SETTINGS: number;
    readonly QUIC_TRANSPORT_PARAMETERS: number;
    readonly HTTP3_SIG_HASH_ALGS: number;
    readonly HTTP3_TLS_EXTENSION_ORDER: number;
    readonly HTTPHEADER_ORDER: number;
    readonly HTTP3_HTTPHEADER: number;
    readonly HTTP3_HTTPHEADER_ORDER: number;
    readonly HTTP3_SSL_EC_CURVES: number;
    readonly WS_HTTPHEADER: number;
    readonly WS_HTTPHEADER_ORDER: number;
    readonly WS_SSL_DISABLE_TICKET: number;
    readonly WS_SSL_CERT_COMPRESSION: number;
    readonly QUIC_CID_LENGTH: number;
    readonly HTTP3_SSL_PERMUTE_EXTENSIONS: number;
    readonly TLS_TRUST_ANCHORS: number;
    readonly QUIC_INITIAL_PACKET_NUMBER: number;
};
export type CurlOpt = (typeof CurlOpt)[keyof typeof CurlOpt];
/**
 * CURLINFO - Options for curl_easy_getinfo
 */
export declare const CurlInfo: {
    readonly TEXT: 0;
    readonly EFFECTIVE_URL: number;
    readonly RESPONSE_CODE: number;
    readonly TOTAL_TIME: number;
    readonly NAMELOOKUP_TIME: number;
    readonly CONNECT_TIME: number;
    readonly PRETRANSFER_TIME: number;
    readonly SIZE_UPLOAD_T: number;
    readonly SIZE_DOWNLOAD_T: number;
    readonly SPEED_DOWNLOAD_T: number;
    readonly SPEED_UPLOAD_T: number;
    readonly HEADER_SIZE: number;
    readonly REQUEST_SIZE: number;
    readonly SSL_VERIFYRESULT: number;
    readonly FILETIME: number;
    readonly FILETIME_T: number;
    readonly CONTENT_LENGTH_DOWNLOAD_T: number;
    readonly CONTENT_LENGTH_UPLOAD_T: number;
    readonly STARTTRANSFER_TIME: number;
    readonly CONTENT_TYPE: number;
    readonly REDIRECT_TIME: number;
    readonly REDIRECT_COUNT: number;
    readonly PRIVATE: number;
    readonly HTTP_CONNECTCODE: number;
    readonly HTTPAUTH_AVAIL: number;
    readonly PROXYAUTH_AVAIL: number;
    readonly OS_ERRNO: number;
    readonly NUM_CONNECTS: number;
    readonly SSL_ENGINES: number;
    readonly COOKIELIST: number;
    readonly FTP_ENTRY_PATH: number;
    readonly REDIRECT_URL: number;
    readonly PRIMARY_IP: number;
    readonly APPCONNECT_TIME: number;
    readonly CERTINFO: number;
    readonly CONDITION_UNMET: number;
    readonly RTSP_SESSION_ID: number;
    readonly RTSP_CLIENT_CSEQ: number;
    readonly RTSP_SERVER_CSEQ: number;
    readonly RTSP_CSEQ_RECV: number;
    readonly PRIMARY_PORT: number;
    readonly LOCAL_IP: number;
    readonly LOCAL_PORT: number;
    readonly ACTIVESOCKET: number;
    readonly TLS_SSL_PTR: number;
    readonly HTTP_VERSION: number;
    readonly PROXY_SSL_VERIFYRESULT: number;
    readonly SCHEME: number;
    readonly TOTAL_TIME_T: number;
    readonly NAMELOOKUP_TIME_T: number;
    readonly CONNECT_TIME_T: number;
    readonly PRETRANSFER_TIME_T: number;
    readonly STARTTRANSFER_TIME_T: number;
    readonly REDIRECT_TIME_T: number;
    readonly APPCONNECT_TIME_T: number;
    readonly RETRY_AFTER: number;
    readonly EFFECTIVE_METHOD: number;
    readonly PROXY_ERROR: number;
    readonly REFERER: number;
    readonly CAINFO: number;
    readonly CAPATH: number;
    readonly XFER_ID: number;
    readonly CONN_ID: number;
    readonly QUEUE_TIME_T: number;
    readonly USED_PROXY: number;
    readonly POSTTRANSFER_TIME_T: number;
    readonly EARLYDATA_SENT_T: number;
    readonly HTTPAUTH_USED: number;
    readonly PROXYAUTH_USED: number;
    readonly SIZE_DELIVERED: number;
    readonly COOKIECHANGES: number;
    readonly REDIRECT_HISTORY: number;
    readonly LASTONE: 1001;
};
export type CurlInfo = (typeof CurlInfo)[keyof typeof CurlInfo];
/**
 * CURLMcode - Error codes for curl_multi functions
 */
export declare const CurlMCode: {
    readonly CURLM_CALL_MULTI_PERFORM: -1;
    readonly CURLM_OK: 0;
    readonly CURLM_BAD_HANDLE: 1;
    readonly CURLM_BAD_EASY_HANDLE: 2;
    readonly CURLM_OUT_OF_MEMORY: 3;
    readonly CURLM_INTERNAL_ERROR: 4;
    readonly CURLM_BAD_SOCKET: 5;
    readonly CURLM_UNKNOWN_OPTION: 6;
    readonly CURLM_ADDED_ALREADY: 7;
    readonly CURLM_RECURSIVE_API_CALL: 8;
    readonly CURLM_WAKEUP_FAILURE: 9;
    readonly CURLM_BAD_FUNCTION_ARGUMENT: 10;
    readonly CURLM_ABORTED_BY_CALLBACK: 11;
    readonly CURLM_UNRECOVERABLE_POLL: 12;
};
export type CurlMCode = (typeof CurlMCode)[keyof typeof CurlMCode];
/**
 * CURLMoption - Options for curl_multi_setopt
 */
export declare const CurlMOpt: {
    readonly CURLMOPT_SOCKETFUNCTION: 20001;
    readonly CURLMOPT_SOCKETDATA: 10002;
    readonly CURLMOPT_PIPELINING: 3;
    readonly CURLMOPT_TIMERFUNCTION: 20004;
    readonly CURLMOPT_TIMERDATA: 10005;
    readonly CURLMOPT_MAXCONNECTS: 6;
    readonly CURLMOPT_MAX_HOST_CONNECTIONS: 7;
    readonly CURLMOPT_MAX_PIPELINE_LENGTH: 8;
    readonly CURLMOPT_CONTENT_LENGTH_PENALTY_SIZE: 30009;
    readonly CURLMOPT_CHUNK_LENGTH_PENALTY_SIZE: 30010;
    readonly CURLMOPT_PIPELINING_SITE_BL: 10011;
    readonly CURLMOPT_PIPELINING_SERVER_BL: 10012;
    readonly CURLMOPT_MAX_TOTAL_CONNECTIONS: 13;
    readonly CURLMOPT_PUSHFUNCTION: 20014;
    readonly CURLMOPT_PUSHDATA: 10015;
    readonly CURLMOPT_MAX_CONCURRENT_STREAMS: 16;
};
export type CurlMOpt = (typeof CurlMOpt)[keyof typeof CurlMOpt];
/**
 * CURLMSG - Messages from curl_multi_info_read
 */
export declare const CurlMsg: {
    readonly CURLMSG_NONE: 0;
    readonly CURLMSG_DONE: 1;
};
export type CurlMsg = (typeof CurlMsg)[keyof typeof CurlMsg];
/**
 * HTTP versions
 */
export declare const CurlHttpVersion: {
    readonly CURL_HTTP_VERSION_NONE: 0;
    readonly CURL_HTTP_VERSION_1_0: 1;
    readonly CURL_HTTP_VERSION_1_1: 2;
    readonly CURL_HTTP_VERSION_2_0: 3;
    readonly CURL_HTTP_VERSION_2TLS: 4;
    readonly CURL_HTTP_VERSION_2_PRIOR_KNOWLEDGE: 5;
    readonly CURL_HTTP_VERSION_3: 30;
    readonly CURL_HTTP_VERSION_3ONLY: 31;
};
export type CurlHttpVersion = (typeof CurlHttpVersion)[keyof typeof CurlHttpVersion];
/**
 * SSL versions
 */
export declare const CurlSslVersion: {
    readonly CURL_SSLVERSION_DEFAULT: 0;
    readonly CURL_SSLVERSION_TLSv1: 1;
    readonly CURL_SSLVERSION_SSLv2: 2;
    readonly CURL_SSLVERSION_SSLv3: 3;
    readonly CURL_SSLVERSION_TLSv1_0: 4;
    readonly CURL_SSLVERSION_TLSv1_1: 5;
    readonly CURL_SSLVERSION_TLSv1_2: 6;
    readonly CURL_SSLVERSION_TLSv1_3: 7;
    readonly CURL_SSLVERSION_MAX_DEFAULT: 65536;
    readonly CURL_SSLVERSION_MAX_TLSv1_0: 262144;
    readonly CURL_SSLVERSION_MAX_TLSv1_1: 327680;
    readonly CURL_SSLVERSION_MAX_TLSv1_2: 393216;
    readonly CURL_SSLVERSION_MAX_TLSv1_3: 458752;
};
export type CurlSslVersion = (typeof CurlSslVersion)[keyof typeof CurlSslVersion];
/**
 * Authentication types
 */
export declare const CurlAuth: {
    readonly CURLAUTH_NONE: 0;
    readonly CURLAUTH_BASIC: number;
    readonly CURLAUTH_DIGEST: number;
    readonly CURLAUTH_NEGOTIATE: number;
    readonly CURLAUTH_NTLM: number;
    readonly CURLAUTH_DIGEST_IE: number;
    readonly CURLAUTH_NTLM_WB: number;
    readonly CURLAUTH_BEARER: number;
    readonly CURLAUTH_AWS_SIGV4: number;
    readonly CURLAUTH_HTTPSIG: number;
    readonly CURLAUTH_ONLY: number;
    readonly CURLAUTH_ANY: number;
    readonly CURLAUTH_ANYSAFE: number;
};
export type CurlAuth = (typeof CurlAuth)[keyof typeof CurlAuth];
/** HTTP Message Signature algorithms for CURLOPT_HTTPSIG_ALGORITHM. */
export declare const CurlHttpSig: {
    readonly CURLHTTPSIG_NONE: 0;
    readonly CURLHTTPSIG_ED25519: 1;
    readonly CURLHTTPSIG_HMAC_SHA256: 2;
};
export type CurlHttpSig = (typeof CurlHttpSig)[keyof typeof CurlHttpSig];
/**
 * Proxy types
 */
export declare const CurlProxyType: {
    readonly CURLPROXY_HTTP: 0;
    readonly CURLPROXY_HTTP_1_0: 1;
    readonly CURLPROXY_HTTPS: 2;
    readonly CURLPROXY_HTTPS2: 3;
    readonly CURLPROXY_SOCKS4: 4;
    readonly CURLPROXY_SOCKS5: 5;
    readonly CURLPROXY_SOCKS4A: 6;
    readonly CURLPROXY_SOCKS5_HOSTNAME: 7;
};
export type CurlProxyType = (typeof CurlProxyType)[keyof typeof CurlProxyType];
/**
 * Socket action for curl_multi_socket_action
 */
export declare const CurlPoll: {
    readonly CURL_POLL_NONE: 0;
    readonly CURL_POLL_IN: 1;
    readonly CURL_POLL_OUT: 2;
    readonly CURL_POLL_INOUT: 3;
    readonly CURL_POLL_REMOVE: 4;
};
export type CurlPoll = (typeof CurlPoll)[keyof typeof CurlPoll];
/**
 * Socket callback events
 */
export declare const CurlCSelect: {
    readonly CURL_CSELECT_IN: 1;
    readonly CURL_CSELECT_OUT: 2;
    readonly CURL_CSELECT_ERR: 4;
};
export type CurlCSelect = (typeof CurlCSelect)[keyof typeof CurlCSelect];
/**
 * Special socket value for timeout
 */
export declare const CURL_SOCKET_TIMEOUT = -1;
/**
 * WebSocket flags
 */
export declare const CurlWsFlag: {
    readonly CURLWS_TEXT: number;
    readonly CURLWS_BINARY: number;
    readonly CURLWS_CONT: number;
    readonly CURLWS_CLOSE: number;
    readonly CURLWS_PING: number;
    readonly CURLWS_PONG: number;
    readonly CURLWS_OFFSET: number;
};
export type CurlWsFlag = (typeof CurlWsFlag)[keyof typeof CurlWsFlag];
/**
 * WebSocket options for CURLOPT_WS_OPTIONS
 */
export declare const CurlWsOpt: {
    readonly CURLWS_RAW_MODE: number;
    readonly CURLWS_NOAUTOPONG: number;
    /** curl-impersonate 2.3.0+: negotiate permessage-deflate (requires zlib). */
    readonly CURLWS_PERMESSAGE_DEFLATE: number;
};
export type CurlWsOpt = (typeof CurlWsOpt)[keyof typeof CurlWsOpt];
/**
 * IP resolve options
 */
export declare const CurlIpResolve: {
    readonly CURL_IPRESOLVE_WHATEVER: 0;
    readonly CURL_IPRESOLVE_V4: 1;
    readonly CURL_IPRESOLVE_V6: 2;
};
export type CurlIpResolve = (typeof CurlIpResolve)[keyof typeof CurlIpResolve];
/**
 * Netrc options
 */
export declare const CurlNetrc: {
    readonly CURL_NETRC_IGNORED: 0;
    readonly CURL_NETRC_OPTIONAL: 1;
    readonly CURL_NETRC_REQUIRED: 2;
};
export type CurlNetrc = (typeof CurlNetrc)[keyof typeof CurlNetrc];
/**
 * Time condition options
 */
export declare const CurlTimeCond: {
    readonly CURL_TIMECOND_NONE: 0;
    readonly CURL_TIMECOND_IFMODSINCE: 1;
    readonly CURL_TIMECOND_IFUNMODSINCE: 2;
};
export type CurlTimeCond = (typeof CurlTimeCond)[keyof typeof CurlTimeCond];
/**
 * Header options for CURLOPT_HEADEROPT
 */
export declare const CurlHeader: {
    readonly CURLHEADER_UNIFIED: 0;
    readonly CURLHEADER_SEPARATE: number;
};
export type CurlHeader = (typeof CurlHeader)[keyof typeof CurlHeader];
/**
 * Post redirect options
 */
export declare const CurlRedir: {
    readonly CURL_REDIR_GET_ALL: 0;
    readonly CURL_REDIR_POST_301: 1;
    readonly CURL_REDIR_POST_302: 2;
    readonly CURL_REDIR_POST_303: 4;
    readonly CURL_REDIR_POST_ALL: 7;
};
export type CurlRedir = (typeof CurlRedir)[keyof typeof CurlRedir];
/**
 * SSL options for CURLOPT_SSL_OPTIONS
 */
export declare const CurlSslOpt: {
    readonly CURLSSLOPT_ALLOW_BEAST: number;
    readonly CURLSSLOPT_NO_REVOKE: number;
    readonly CURLSSLOPT_NO_PARTIALCHAIN: number;
    readonly CURLSSLOPT_REVOKE_BEST_EFFORT: number;
    readonly CURLSSLOPT_NATIVE_CA: number;
    readonly CURLSSLOPT_AUTO_CLIENT_CERT: number;
};
export type CurlSslOpt = (typeof CurlSslOpt)[keyof typeof CurlSslOpt];
/**
 * GSSAPI delegation options
 */
export declare const CurlGssApi: {
    readonly CURLGSSAPI_DELEGATION_NONE: 0;
    readonly CURLGSSAPI_DELEGATION_POLICY_FLAG: number;
    readonly CURLGSSAPI_DELEGATION_FLAG: number;
};
export type CurlGssApi = (typeof CurlGssApi)[keyof typeof CurlGssApi];
/**
 * Use SSL options
 */
export declare const CurlUseSsl: {
    readonly CURLUSESSL_NONE: 0;
    readonly CURLUSESSL_TRY: 1;
    readonly CURLUSESSL_CONTROL: 2;
    readonly CURLUSESSL_ALL: 3;
};
export type CurlUseSsl = (typeof CurlUseSsl)[keyof typeof CurlUseSsl];
/**
 * MIME options
 */
export declare const CurlMimeOpt: {
    readonly CURLMIMEOPT_FORMESCAPE: number;
};
export type CurlMimeOpt = (typeof CurlMimeOpt)[keyof typeof CurlMimeOpt];
/**
 * Pipelining options for CURLMOPT_PIPELINING
 */
export declare const CurlPipe: {
    readonly CURLPIPE_NOTHING: 0;
    readonly CURLPIPE_HTTP1: 1;
    readonly CURLPIPE_MULTIPLEX: 2;
};
export type CurlPipe = (typeof CurlPipe)[keyof typeof CurlPipe];
/**
 * curl-impersonate specific CURLOPT options for TLS/HTTP2 fingerprinting
 */
export declare const CurlImpersonateOpt: {
    /** Impersonation target (string, name[:yes|no]) */
    readonly CURLOPT_IMPERSONATE: number;
    /** Base headers for impersonation (curl_slist) */
    readonly CURLOPT_HTTPBASEHEADER: number;
    /** Signature hash algorithms (string, comma-separated) */
    readonly CURLOPT_SSL_SIG_HASH_ALGS: number;
    /** Enable ALPS extension (long, 0 or 1) */
    readonly CURLOPT_SSL_ENABLE_ALPS: number;
    /** Certificate compression algorithm (string: "zlib" or "brotli") */
    readonly CURLOPT_SSL_CERT_COMPRESSION: number;
    /** Enable session ticket extension (long, 0 or 1) */
    readonly CURLOPT_SSL_ENABLE_TICKET: number;
    /** HTTP/2 pseudo header order (string, e.g., "masp") */
    readonly CURLOPT_HTTP2_PSEUDO_HEADERS_ORDER: number;
    /** HTTP/2 SETTINGS frame values (string, e.g., "1:65536;3:1000") */
    readonly CURLOPT_HTTP2_SETTINGS: number;
    /** Permute TLS extensions randomly (long, 0 or 1) */
    readonly CURLOPT_SSL_PERMUTE_EXTENSIONS: number;
    /** HTTP/2 initial window update value (long) */
    readonly CURLOPT_HTTP2_WINDOW_UPDATE: number;
    /** HTTP/2 streams configuration (string) */
    readonly CURLOPT_HTTP2_STREAMS: number;
    /** Enable TLS GREASE (long, 0 or 1) */
    readonly CURLOPT_TLS_GREASE: number;
    /** TLS extension order (string, dash-separated extension IDs) */
    readonly CURLOPT_TLS_EXTENSION_ORDER: number;
    /** HTTP/2 stream exclusive flag (long, 0 or 1) */
    readonly CURLOPT_STREAM_EXCLUSIVE: number;
    /** Disable TLS key usage check (long, 0 or 1) */
    readonly CURLOPT_TLS_KEY_USAGE_NO_CHECK: number;
    /** Enable signed certificate timestamps (long, 0 or 1) */
    readonly CURLOPT_TLS_SIGNED_CERT_TIMESTAMPS: number;
    /** Enable OCSP status request (long, 0 or 1) */
    readonly CURLOPT_TLS_STATUS_REQUEST: number;
    /** Delegated credentials (string) */
    readonly CURLOPT_TLS_DELEGATED_CREDENTIALS: number;
    /** TLS record size limit (long) */
    readonly CURLOPT_TLS_RECORD_SIZE_LIMIT: number;
    /** TLS key shares limit (long) */
    readonly CURLOPT_TLS_KEY_SHARES_LIMIT: number;
    /** Use new ALPS codepoint (long, 0 or 1) */
    readonly CURLOPT_TLS_USE_NEW_ALPS_CODEPOINT: number;
    /** Disable HTTP/2 priority frames (long, 0 or 1) */
    readonly CURLOPT_HTTP2_NO_PRIORITY: number;
    /** Prevent connection reuse across different proxy credentials (long) */
    readonly CURLOPT_PROXY_CREDENTIAL_NO_REUSE: number;
    /** Do not combine Cookie headers (long, 0 or 1) */
    readonly CURLOPT_SPLIT_COOKIES: number;
    /** Multipart form boundary (string) */
    readonly CURLOPT_FORM_BOUNDARY: number;
    /** HTTP/3 pseudo header order (string) */
    readonly CURLOPT_HTTP3_PSEUDO_HEADERS_ORDER: number;
    /** HTTP/3 SETTINGS frame values (string) */
    readonly CURLOPT_HTTP3_SETTINGS: number;
    /** QUIC transport parameters (string) */
    readonly CURLOPT_QUIC_TRANSPORT_PARAMETERS: number;
    /** HTTP/3 signature hash algorithms (string) */
    readonly CURLOPT_HTTP3_SIG_HASH_ALGS: number;
    /** HTTP/3 TLS extension order (string) */
    readonly CURLOPT_HTTP3_TLS_EXTENSION_ORDER: number;
    /** HTTP header order (string) */
    readonly CURLOPT_HTTPHEADER_ORDER: number;
    /** HTTP/3 headers (curl_slist) */
    readonly CURLOPT_HTTP3_HTTPHEADER: number;
    /** HTTP/3 header order (string) */
    readonly CURLOPT_HTTP3_HTTPHEADER_ORDER: number;
    /** HTTP/3 supported groups (string) */
    readonly CURLOPT_HTTP3_SSL_EC_CURVES: number;
    /** WebSocket headers (curl_slist) */
    readonly CURLOPT_WS_HTTPHEADER: number;
    /** WebSocket header order (string) */
    readonly CURLOPT_WS_HTTPHEADER_ORDER: number;
    /** Disable WebSocket TLS session tickets (long, 0 or 1) */
    readonly CURLOPT_WS_SSL_DISABLE_TICKET: number;
    /** WebSocket certificate compression algorithms (string) */
    readonly CURLOPT_WS_SSL_CERT_COMPRESSION: number;
    /** QUIC connection ID length profile (string: webkit or firefox) */
    readonly CURLOPT_QUIC_CID_LENGTH: number;
    /** Permute HTTP/3 TLS extensions (long, 0 or 1) */
    readonly CURLOPT_HTTP3_SSL_PERMUTE_EXTENSIONS: number;
    /** TLS trust anchor identifiers (string, comma-separated relative OIDs) */
    readonly CURLOPT_TLS_TRUST_ANCHORS: number;
    /** Initial QUIC packet number (long, -1 for randomization or 0..INT32_MAX) */
    readonly CURLOPT_QUIC_INITIAL_PACKET_NUMBER: number;
};
export type CurlImpersonateOpt = (typeof CurlImpersonateOpt)[keyof typeof CurlImpersonateOpt];
/**
 * Version info feature bits
 */
export declare const CurlVersion: {
    readonly CURLVERSION_NOW: 11;
    readonly CURL_VERSION_IPV6: number;
    readonly CURL_VERSION_KERBEROS4: number;
    readonly CURL_VERSION_SSL: number;
    readonly CURL_VERSION_LIBZ: number;
    readonly CURL_VERSION_NTLM: number;
    readonly CURL_VERSION_GSSNEGOTIATE: number;
    readonly CURL_VERSION_DEBUG: number;
    readonly CURL_VERSION_ASYNCHDNS: number;
    readonly CURL_VERSION_SPNEGO: number;
    readonly CURL_VERSION_LARGEFILE: number;
    readonly CURL_VERSION_IDN: number;
    readonly CURL_VERSION_SSPI: number;
    readonly CURL_VERSION_CONV: number;
    readonly CURL_VERSION_CURLDEBUG: number;
    readonly CURL_VERSION_TLSAUTH_SRP: number;
    readonly CURL_VERSION_NTLM_WB: number;
    readonly CURL_VERSION_HTTP2: number;
    readonly CURL_VERSION_GSSAPI: number;
    readonly CURL_VERSION_KERBEROS5: number;
    readonly CURL_VERSION_UNIX_SOCKETS: number;
    readonly CURL_VERSION_PSL: number;
    readonly CURL_VERSION_HTTPS_PROXY: number;
    readonly CURL_VERSION_MULTI_SSL: number;
    readonly CURL_VERSION_BROTLI: number;
    readonly CURL_VERSION_ALTSVC: number;
    readonly CURL_VERSION_HTTP3: number;
    readonly CURL_VERSION_ZSTD: number;
    readonly CURL_VERSION_UNICODE: number;
    readonly CURL_VERSION_HSTS: number;
    readonly CURL_VERSION_GSASL: number;
    readonly CURL_VERSION_THREADSAFE: number;
};
export type CurlVersion = (typeof CurlVersion)[keyof typeof CurlVersion];
//# sourceMappingURL=constants.d.ts.map