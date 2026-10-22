import {mkdirSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {describe,expect,it} from 'vitest';
import {addCreativePattern,addResearchCase,matchVerifiedPatterns} from '../src/research/cases';

describe('compliant creative case research',()=>{it('keeps candidate observations out of planning and only matches evidence-backed verified patterns',()=>{const root=join(tmpdir(),`jm-research-${Date.now()}`);mkdirSync(root,{recursive:true});const ids=['a','b','c'].map((name,index)=>addResearchCase(root,{title:`案例${index+1}`,platform:'owned',sourceRef:`user:${name}`,accessMethod:'用户手动导入',license:'用户授权研究',notes:'测试案例'}).caseId);addCreativePattern(root,{trigger:['机制'],advice:'先让关系发生变化，再显示标签。',contraIndications:['静态定义'],supportingCases:[ids[0]],counterExamples:[],evidenceLevel:'observation',confidence:.4,testStatus:'candidate'});expect(matchVerifiedPatterns(root,'解释机制变化')).toHaveLength(0);addCreativePattern(root,{trigger:['机制'],advice:'先展示关系变化，再显示解释标签。',contraIndications:['没有因果关系'],supportingCases:[ids[0],ids[1]],counterExamples:[ids[2]],evidenceLevel:'cross-case',confidence:.78,testStatus:'verified'});expect(matchVerifiedPatterns(root,'解释机制变化')).toHaveLength(1)})});
