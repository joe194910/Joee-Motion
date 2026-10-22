import {describe,it,expect} from 'vitest';import {makePlan,preflightPlan} from '../src/agent/planner';
describe('multi-topic planning',()=>{it.each([
  ['history','A city changed in 1920. Later its industry expanded. Finally its culture transformed.','editorial-evidence'],
  ['system','Why does a network fail? A mechanism causes signals to change. Therefore the system needs redundancy.','living-system'],
  ['product','Why launch this product? Data grew by 42%. The product workflow creates a clearer outcome.','argument-construction']
])('%s produces a valid content-specific plan',(_name,text,expected)=>{const plan=makePlan(text,45);expect(plan.direction.id).toBe(expected);expect(plan.treatment.candidates.length).toBeGreaterThanOrEqual(2);expect(preflightPlan(plan.storyboard)).toEqual([])});it('creates a schema-valid deterministic 9:16 plan',()=>{const plan=makePlan('竖屏视频提出问题？随后解释内容关系。最后给出结论。',30,'9:16');expect(plan.storyboard.aspectRatio).toBe('9:16');expect(plan.storyboard.scenes.every(x=>x.props.formatMode==='derived-vertical-safe')).toBe(true);expect(preflightPlan(plan.storyboard)).toEqual([])})});
