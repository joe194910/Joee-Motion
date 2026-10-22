import {describe,expect,it} from 'vitest';
import {enhanceProjectWithAI} from '../src/agent/ai-director';

describe('AI director authorization',()=>{it('blocks paid creative enhancement without explicit confirmation',async()=>{await expect(enhanceProjectWithAI('missing-project','example-model',false)).rejects.toThrow('confirm-cost')})});
