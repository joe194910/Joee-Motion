import {readFileSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {AssetManifestSchema,StoryboardSchema} from '../schemas/index';

export function bindAsset(project:string,assetId:string,sceneId:string,mode:'evidence'|'cinematic'='evidence'){
  const root=resolve(project),manifestPath=join(root,'assets/manifest.json'),storyPath=join(root,'storyboard.json');
  const manifest=AssetManifestSchema.parse(JSON.parse(readFileSync(manifestPath,'utf8'))),story=StoryboardSchema.parse(JSON.parse(readFileSync(storyPath,'utf8')));
  const asset=manifest.assets.find(x=>x.id===assetId),scene=story.scenes.find(x=>x.stableId===sceneId);
  if(!asset)throw new Error(`Unknown asset: ${assetId}`);if(!scene)throw new Error(`Unknown scene: ${sceneId}`);if(asset.status==='blocked')throw new Error(`Asset is blocked: ${assetId}`);
  asset.sceneIds=[...new Set([...asset.sceneIds,sceneId])];scene.assetIds=[...new Set([...scene.assetIds,assetId])];
  scene.props={...scene.props,assetPath:asset.file,assetMediaType:asset.mediaType,assetLicense:asset.license,assetGeneration:asset.generation};
  if(asset.mediaType==='image')scene.componentId=mode==='cinematic'?'CinematicImageScene':'ImageEvidence';
  if(asset.mediaType==='video')scene.componentId='VideoEvidence';
  scene.visualType=scene.componentId;
  writeFileSync(manifestPath,JSON.stringify(manifest,null,2));writeFileSync(storyPath,JSON.stringify(story,null,2));
  return {assetId,sceneId,componentId:scene.componentId,file:asset.file,mode};
}

const tokens=(text:string)=>new Set(text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(x=>x.length>1));
export function autoBindAssets(project:string){
  const root=resolve(project),manifest=AssetManifestSchema.parse(JSON.parse(readFileSync(join(root,'assets/manifest.json'),'utf8'))),story=StoryboardSchema.parse(JSON.parse(readFileSync(join(root,'storyboard.json'),'utf8'))),results=[] as Array<Record<string,unknown>>;
  for(const asset of manifest.assets){if(asset.status==='blocked'||asset.sceneIds.length)continue;const source=tokens([asset.description,asset.extractedText,...asset.keywords,asset.originalName].filter(Boolean).join(' '));let best:{id:string;score:number}|undefined;for(const scene of story.scenes){const target=tokens([scene.props.text,...scene.conceptIds].join(' '));let hit=0;for(const t of source)if(target.has(t))hit++;const score=hit/Math.max(1,Math.min(source.size,target.size));if(!best||score>best.score)best={id:scene.stableId,score}}if(best&&best.score>=.12){results.push({...bindAsset(root,asset.id,best.id,asset.generation?'cinematic':'evidence'),score:best.score,method:'keyword-overlap'})}else results.push({assetId:asset.id,status:'unmatched',reason:asset.status==='needs_analysis'?'semantic analysis required':'no reliable scene match'})}
  return results;
}
