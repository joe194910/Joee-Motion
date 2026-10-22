import React from 'react';
import {useCurrentFrame} from 'remotion';
import {enter} from '../animation';

export const SummaryCard:React.FC<{title:string;items:string[];palette:string[]}>=({title,items,palette})=>{
  const frame=useCurrentFrame(),accent=palette[2],secondary=palette[3],textColor=palette[1];
  return <div style={{position:'absolute',inset:'150px 140px 100px'}}><div style={{fontSize:30,color:accent,letterSpacing:5}}>核心结论</div><div style={{fontSize:72,fontWeight:850,lineHeight:1.25,margin:'28px 0 52px',maxWidth:1500}}>{title}</div><div style={{display:'flex',gap:24}}>{items.slice(0,4).map((item,index)=>{const progress=enter(frame,12+index*12),color=index%2?secondary:accent;return <div key={`${item}-${index}`} style={{flex:1,borderRadius:28,padding:'36px 30px',background:`${color}16`,border:`1px solid ${color}66`,opacity:progress,transform:`translateY(${(1-progress)*45}px)`}}><div style={{fontSize:25,color}}>0{index+1}</div><div style={{fontSize:38,lineHeight:1.4,fontWeight:750,color:textColor,marginTop:20}}>{item}</div></div>})}</div></div>;
};
