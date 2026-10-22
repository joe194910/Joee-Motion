import {writeFileSync} from 'node:fs';
import {join} from 'node:path';
import type {Storyboard} from '../schemas/index';

type Brief = {visualMotif: string; palette: string[]; typography: string};
const procedural = new Set(['ThresholdStaircase','EquationBuild','CalculationWalkthrough','DeductionFlow','MisconceptionTransform','VisualRecap','AnimatedChart','MechanismFlow']);

export function createVisualAssetPlan(project:string,storyboard:Storyboard,brief:Brief){
  const candidates=storyboard.scenes.filter((scene,index)=>index===0||(!procedural.has(scene.componentId)&&scene.narrativeRole!=='summary')).slice(0,3);
  const plan={version:'1.1.0',policy:'图像必须解释内容或建立真实情境；不得把 AI 图当无关装饰；生成记录必须包含模型、提示词和用途。',styleBible:{motif:brief.visualMotif,palette:brief.palette,typography:brief.typography,continuity:'同一影片保持光线、材质、镜头语言和人物设定一致；画面内不生成文字、数字或品牌标识。'},scenes:storyboard.scenes.map(scene=>{const recommended=candidates.some(x=>x.stableId===scene.stableId),text=String(scene.props.text??'');return {sceneId:scene.stableId,strategy:procedural.has(scene.componentId)?'procedural-motion':recommended?'generated-image-plus-motion':'type-or-shape-motion',recommended,purpose:recommended?`为“${text}”建立具体情境、空间深度和可动画的主体层级`:`由 ${scene.componentId} 直接解释关系，不用装饰性图片`,prompt:recommended?`16:9 cinematic editorial key visual for a Chinese explainer. Scene meaning: ${text}. Visual thesis: ${brief.visualMotif}. Palette reference: ${brief.palette.join(', ')}. Create a strong foreground subject, separable middle ground and atmospheric background for parallax animation. Commercial art direction, specific real-world details, confident composition, sophisticated lighting, no text, no letters, no numbers, no logos, no watermark, no infographic cards.`:undefined,negativePrompt:recommended?'generic corporate stock photo, dashboard UI, floating cards, presentation slide, text, watermark, logo, random decoration':undefined,preferredComponent:recommended?'CinematicImageScene':scene.componentId,status:recommended?'awaiting-generation':'not-needed'};})};
  writeFileSync(join(project,'visual-assets.json'),JSON.stringify(plan,null,2));
  return plan;
}
