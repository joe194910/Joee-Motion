import {describe,it,expect} from 'vitest';
import {makePlan,preflightPlan} from '../src/agent/planner';

describe('content-driven planner',()=>{
  it('creates deterministic stable scenes and a project direction',()=>{
    const text='\u4e3a\u4ec0\u4e48\u4f1a\u4e0b\u96e8\uff1f\u6c34\u84b8\u6c14\u51b7\u5374\u5f62\u6210\u5c0f\u6c34\u6ef4\u3002\u56e0\u6b64\u4e91\u4e2d\u7684\u6c34\u6ef4\u9010\u6e10\u589e\u957f\u3002';
    const a=makePlan(text,30),b=makePlan(text,30);
    expect(a.storyboard).toEqual(b.storyboard);
    expect(a.storyboard.scenes).toHaveLength(3);
    expect(a.storyboard.scenes[0].props.directionId).toBeTruthy();
    expect(preflightPlan(a.storyboard)).toEqual([]);
  });
  it('blocks narration and visual text mismatches',()=>{
    const plan=makePlan('\u95ee\u9898\u4ece\u54ea\u91cc\u5f00\u59cb\uff1f\u8fd9\u662f\u7b2c\u4e8c\u53e5\u8bf4\u660e\u3002\u8fd9\u662f\u6700\u540e\u7684\u7ed3\u8bba\u3002',30);
    plan.storyboard.scenes[1].props.text='wrong content';
    expect(preflightPlan(plan.storyboard).some(x=>x.includes('differs from narration'))).toBe(true);
  });
});
