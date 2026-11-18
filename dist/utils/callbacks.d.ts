export type WriteCallback = (chunk: Buffer) => number | void;
export type ReadCallback = (size: number) => Buffer | string | null | undefined;
export declare function wrapWriteCallback(fn: WriteCallback): unknown;
export declare function wrapReadCallback(fn: ReadCallback): unknown;
//# sourceMappingURL=callbacks.d.ts.map