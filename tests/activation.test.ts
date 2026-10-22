import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {describe,expect,it} from 'vitest';
import {activateProject} from '../src/agent/artifacts';
import {makePlan} from '../src/agent/planner';

describe('project activation isolation',()=>{it('removes stale public audio and assets when the new project does not provide them',()=>{const base=join(tmpdir(),`jm-activate-${Date.now()}`),project=join(base,'project'),workspace=join(base,'workspace');mkdirSync(join(project,'assets'),{recursive:true});mkdirSync(join(project,'audio'),{recursive:true});mkdirSync(join(workspace,'public/audio'),{recursive:true});mkdirSync(join(workspace,'public/project-assets'),{recursive:true});writeFileSync(join(project,'storyboard.json'),JSON.stringify(makePlan('问题是什么？这里解释变化过程。最后形成结论。',30).storyboard));writeFileSync(join(project,'assets/manifest.json'),JSON.stringify({version:'1.0.0',assets:[]}));writeFileSync(join(workspace,'public/audio/current-voice.wav'),'stale');writeFileSync(join(workspace,'public/project-assets/old.txt'),'stale');activateProject(project,workspace);expect(existsSync(join(workspace,'public/audio/current-voice.wav'))).toBe(false);expect(existsSync(join(workspace,'public/project-assets/old.txt'))).toBe(false);const runtime=JSON.parse(readFileSync(join(workspace,'src/generated/current-runtime.json'),'utf8'));expect(runtime.voiceAvailable).toBe(false)})});
