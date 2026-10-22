import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';

export const DataStatement:React.FC<{text:string;accent:string}>=({text,accent})=>{
  const frame=useCurrentFrame(),progress=interpolate(frame,[0,35],[0,1],{extrapolateRight:'clamp'}),number=text.match(/[+-]?\d+(?:\.\d+)?(?:%|％|倍)?/)?.[0];
  return <div style={{position:'absolute',inset:120,display:'grid',gridTemplateColumns:number?'1fr 1.25fr':'1fr',alignItems:'center',gap:80}}>{number?<div style={{fontSize:170,fontWeight:900,color:accent,transform:`scale(${.7+.3*progress})`,opacity:progress}}>{number}</div>:null}<div style={{fontSize:54,lineHeight:1.45}}>{text}</div></div>;
};
