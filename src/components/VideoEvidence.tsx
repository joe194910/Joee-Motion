import React from 'react';
import {OffthreadVideo,interpolate,useCurrentFrame} from 'remotion';

export const VideoEvidence:React.FC<{src?:string;text:string;accent:string;showSourceAudio?:boolean}>=({src,text,accent,showSourceAudio=false})=>{
  const frame=useCurrentFrame(),progress=interpolate(frame,[0,28],[0,1],{extrapolateRight:'clamp'});
  return <div style={{position:'absolute',inset:'105px 100px',display:'grid',gridTemplateRows:'1fr auto',gap:32}}><div style={{borderRadius:30,overflow:'hidden',background:`${accent}18`,border:`1px solid ${accent}66`,transform:`scale(${.97+.03*progress})`}}>{src?<OffthreadVideo src={src} volume={showSourceAudio?0.35:0} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<div style={{height:'100%',display:'grid',placeItems:'center',fontSize:30,color:accent}}>需要关联视频素材</div>}</div><div style={{fontSize:42,lineHeight:1.4,textAlign:'center'}}>{text}</div></div>;
};
