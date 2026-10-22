import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

// CLI 可以从任意目录调用，但渲染源码和内部脚本始终位于 npm 包根目录。
export const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

// 启动器会保留用户调用 jm 时所在的目录，用户输入的相对路径都基于这里解析。
export const callerRoot = resolve(process.env.JOEE_MOTION_CALLER_CWD || process.cwd());

export const resolveUserPath = (value: string) => resolve(callerRoot, value);
export const resolvePackagePath = (...parts: string[]) => resolve(packageRoot, ...parts);

const require = createRequire(import.meta.url);
export const resolveDependency = (specifier: string) => require.resolve(specifier);
export const remotionCliPath = resolve(dirname(require.resolve('@remotion/cli/package.json')), 'remotion-cli.js');
