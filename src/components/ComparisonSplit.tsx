import React from 'react';
import {useCurrentFrame} from 'remotion';
import {enter} from '../animation';

export const ComparisonSplit:React.FC<{left:{title:string;body:string};right:{title:string;body:string};colors:[string,string];textColor:string}>=({left,right,colors,textColor})=>{
  const frame=useCurrentFrame();
  return <div style={{position:'absolute',inset:'150px 100px 100px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:34}}>{[left,right].map((item,index)=>{const progress=enter(frame,10+index*10),color=colors[index];return <div key={`${item.title}-${index}`} style={{border:`1px solid ${color}88`,borderRadius:28,padding:58,background:`${color}14`,opacity:progress,transform:`translateX(${(1-progress)*(index?90:-90)}px)`}}><div style={{fontSize:62,fontWeight:800,color}}>{item.title}</div><div style={{fontSize:38,lineHeight:1.55,color:textColor,marginTop:35}}>{item.body}</div></div>})}</div>;
};
