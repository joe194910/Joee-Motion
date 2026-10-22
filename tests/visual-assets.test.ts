import {describe,expect,it} from 'vitest';
import {existsSync,mkdtempSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makePlan} from '../src/agent/planner';
import {createVisualAssetPlan} from '../src/agent/visual-assets';

describe('visual asset planning',()=>{
  it('recommends generated images selectively and keeps formulas procedural',()=>{
    const root=mkdtempSync(join(tmpdir(),'jm-visual-plan-'));
    const planned=makePlan('工资为什么减少？一个真实人物正在查看工资单。税额等于所得额乘以税率再减去扣除数。最后总结规则。',40);
    const visual=createVisualAssetPlan(root,planned.storyboard,planned.brief);
    expect(existsSync(join(root,'visual-assets.json'))).toBe(true);
    expect(visual.scenes.some(x=>x.recommended)).toBe(true);
    expect(visual.scenes.find(x=>x.preferredComponent==='EquationBuild')?.strategy).toBe('procedural-motion');
    expect(readFileSync(join(root,'visual-assets.json'),'utf8')).toContain('no infographic cards');
  });
});
