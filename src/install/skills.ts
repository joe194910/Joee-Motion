import {cpSync, existsSync, mkdirSync, rmSync} from 'node:fs';
import {homedir} from 'node:os';
import {dirname, resolve} from 'node:path';
import {callerRoot, packageRoot} from '../runtime/paths';

export const skillTargets = ['agents', 'codex', 'claude', 'cursor', 'copilot', 'gemini'] as const;
export type SkillTarget = (typeof skillTargets)[number];

const destinationFor = (target: SkillTarget) => {
  const home = homedir();
  const destinations: Record<SkillTarget, string> = {
    agents: resolve(callerRoot, '.agents/skills/joee-motion'),
    codex: resolve(home, '.codex/skills/joee-motion'),
    claude: resolve(home, '.claude/skills/joee-motion'),
    cursor: resolve(callerRoot, '.cursor/skills/joee-motion'),
    copilot: resolve(callerRoot, '.github/skills/joee-motion'),
    gemini: resolve(home, '.gemini/skills/joee-motion'),
  };
  return destinations[target];
};

export function installSkill(target: SkillTarget | 'all', options: {force?: boolean; directory?: string} = {}) {
  const source = resolve(packageRoot, 'skills/joee-motion');
  if (!existsSync(resolve(source, 'SKILL.md'))) throw new Error(`npm 包中缺少 Skill：${source}`);

  const destinations = options.directory
    ? [resolve(options.directory, 'joee-motion')]
    : (target === 'all' ? [...skillTargets] : [target]).map(destinationFor);

  const existing = destinations.filter(existsSync);
  if (existing.length && !options.force) {
    throw new Error(`目标已存在，请添加 --force 后覆盖：\n${existing.join('\n')}`);
  }

  for (const destination of destinations) {
    if (existsSync(destination)) rmSync(destination, {recursive: true, force: true});
    mkdirSync(dirname(destination), {recursive: true});
    cpSync(source, destination, {recursive: true});
  }

  return {target, installed: destinations};
}
