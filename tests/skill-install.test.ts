import {existsSync, mkdtempSync, readFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {afterEach, describe, expect, it} from 'vitest';
import {installSkill} from '../src/install/skills';

const created: string[] = [];
afterEach(() => {
  for (const path of created.splice(0)) rmSync(path, {recursive: true, force: true});
});

describe('Agent Skill 安装器', () => {
  it('可以把完整 Skill 安装到自定义目录', () => {
    const root = mkdtempSync(join(tmpdir(), 'joee-motion-skill-'));
    created.push(root);
    const result = installSkill('agents', {directory: root});
    const skill = join(root, 'joee-motion', 'SKILL.md');
    expect(result.installed).toEqual([join(root, 'joee-motion')]);
    expect(existsSync(skill)).toBe(true);
    expect(readFileSync(skill, 'utf8')).toContain('name: joee-motion');
  });

  it('默认不覆盖已有 Skill', () => {
    const root = mkdtempSync(join(tmpdir(), 'joee-motion-existing-'));
    created.push(root);
    installSkill('agents', {directory: root});
    expect(() => installSkill('agents', {directory: root})).toThrow('--force');
  });
});
