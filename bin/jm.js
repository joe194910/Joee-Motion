#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
const tsx=require.resolve('tsx/cli');
const cli=resolve(root,'src/cli/index.ts');
const result=spawnSync(process.execPath,[tsx,cli,...process.argv.slice(2)],{
  cwd:process.cwd(),
  env:{...process.env,JOEE_MOTION_CALLER_CWD:process.cwd()},
  stdio:'inherit',
  windowsHide:true,
});
if(result.error){console.error(result.error.message);process.exit(1)}
process.exit(result.status??1);
