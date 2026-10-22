import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {enter} from '../animation';

export const QuestionReveal:React.FC<{question:string;kicker?:string;accent:string;secondary:string}>=({question,kicker='核心问题',accent,secondary})=>{
  const frame=useCurrentFrame(),progress=enter(frame,8);
  return <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center'}}><div style={{width:1500}}><div style={{fontSize:30,color:accent,opacity:progress,transform:`translateY(${(1-progress)*24}px)`}}>{kicker}</div><div style={{fontWeight:800,fontSize:122,lineHeight:1.15,letterSpacing:-6,opacity:progress,transform:`translateY(${(1-progress)*54}px)`}}>{question}</div><div style={{height:8,width:interpolate(progress,[0,1],[0,920]),background:`linear-gradient(90deg,${accent},${secondary})`,marginTop:38}}/></div></div>;
};
