import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {describe,expect,it} from 'vitest';
import {planProject} from '../src/agent/artifacts';
import {writeRenderManifest} from '../src/render/manifest';

describe('render manifest',()=>{it('records source hashes, tools and asset licenses without requiring a rendered video',()=>{const root=join(tmpdir(),`jm-manifest-${Date.now()}`),input=join(root,'input-source.md');mkdirSync(root,{recursive:true});writeFileSync(input,'问题从哪里开始？第二句解释内容。最后给出结论。');planProject(root,input,30);const manifest=writeRenderManifest(root,['preflight:pass']);expect(manifest.sourceHashes['storyboard.json']).toMatch(/^[a-f0-9]{64}$/);expect(manifest.sourceHashes['visual-assets.json']).toMatch(/^[a-f0-9]{64}$/);expect(manifest.toolVersions.joeeMotion).toBe('1.1.0');expect(manifest.qualityChecks).toContain('preflight:pass');expect(JSON.parse(readFileSync(join(root,'out/render-manifest.json'),'utf8')).outputFiles).toContain('visual-assets.json')})});
