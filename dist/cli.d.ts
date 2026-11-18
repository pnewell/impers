#!/usr/bin/env node
interface CliIO {
    stdout: (text: string) => void;
    stderr: (text: string) => void;
}
export declare function runCli(argv?: string[], io?: CliIO, env?: NodeJS.ProcessEnv): Promise<number>;
export {};
//# sourceMappingURL=cli.d.ts.map