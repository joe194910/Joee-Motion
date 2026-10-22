#!/usr/bin/env node
import {existsSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repositoryCli = resolve(here, '../../../bin/jm.js');
const args = process.argv.slice(2);

// 克隆整个仓库时直接使用同仓库 CLI；只安装 Skill 时自动从 GitHub 获取 npm 包。
const hasRepositoryCli = existsSync(repositoryCli);
let command = hasRepositoryCli ? process.execPath : 'npx';
let commandArgs = hasRepositoryCli
  ? [repositoryCli, ...args]
  : ['--yes', '--package=github:joe194910/Joee-Motion', 'jm', ...args];
let environment = process.env;

if (!hasRepositoryCli && process.platform === 'win32') {
  command = 'powershell.exe';
  environment = {
    ...process.env,
    JOEE_MOTION_NPX_ARGS: Buffer.from(JSON.stringify(args), 'utf8').toString('base64'),
  };
  commandArgs = [
    '-NoProfile',
    '-NonInteractive',
    '-Command',
    "$a=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($env:JOEE_MOTION_NPX_ARGS))|ConvertFrom-Json; if($null -eq $a){$a=@()} elseif($a -isnot [array]){$a=@($a)}; & npx.cmd --yes --package=github:joe194910/Joee-Motion jm @a; exit $LASTEXITCODE",
  ];
}

const result = spawnSync(command, commandArgs, {stdio: 'inherit', windowsHide: true, env: environment});
if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
