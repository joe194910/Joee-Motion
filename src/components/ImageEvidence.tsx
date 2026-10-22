import React from 'react';
import {Img,interpolate,useCurrentFrame} from 'remotion';

export const ImageEvidence:React.FC<{src?:string;text:string;accent:string}>=({src,text,accent})=>{
  const frame=useCurrentFrame(),progress=interpolate(frame,[0,30],[0,1],{extrapolateRight:'clamp'});
  return <div style={{position:'absolute',inset:'120px 110px',display:'grid',gridTemplateColumns:'1.25fr .75fr',gap:52}}><div style={{borderRadius:28,overflow:'hidden',background:`${accent}22`,border:`1px solid ${accent}66`,transform:`scale(${.96+.04*progress})`}}>{src?<Img src={src} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<div style={{height:'100%',display:'grid',placeItems:'center',fontSize:30,color:accent}}>需要关联图片素材</div>}</div><div style={{alignSelf:'center',fontSize:48,lineHeight:1.45}}>{text}</div></div>;
};
