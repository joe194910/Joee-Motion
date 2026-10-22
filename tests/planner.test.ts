import {describe,it,expect} from 'vitest';
import {extractValues,makePlan,preflightPlan} from '../src/agent/planner';

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
  it('turns Chinese tax language into source-derived visual grammar instead of cards',()=>{
    const text='每月发工资，为什么到手的钱比合同少？个税不是对全部工资征税，而是对扣除后的应纳税所得额征税。我国采用七级超额累进税率，从百分之三到百分之四十五。税额等于应纳税所得额乘以税率再减去速算扣除数。举个例子，全年应纳税所得额二十万元适用税率百分之二十，速算扣除数一万六千九百二十元，最终应纳税额是两万三千零八十元。记住只有超出部分才进入更高税率。';
    const plan=makePlan(text,60);
    expect(plan.direction.id).toBe('public-ledger');
    expect(plan.storyboard.scenes.map(x=>x.componentId)).toEqual(['QuestionReveal','DeductionFlow','ThresholdStaircase','EquationBuild','CalculationWalkthrough','VisualRecap']);
    expect(extractValues(text)).toEqual(expect.arrayContaining([7,3,45,200000,20,16920,23080]));
    expect(extractValues('每一档税率只作用于对应的一段收入')).toEqual([]);
    expect(plan.storyboard.scenes[1].props.deductionResult).toBe('应纳税所得额');
    expect(plan.storyboard.scenes[4].props.labels).toEqual(['应纳税所得额','适用税率','速算扣除数','最终应纳税额']);
    expect(plan.storyboard.scenes.filter(x=>['EvidenceCard','SummaryCard','ComparisonSplit'].includes(x.componentId))).toHaveLength(0);
    expect(preflightPlan(plan.storyboard)).toEqual([]);
  });
});
