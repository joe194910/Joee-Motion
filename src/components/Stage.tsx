import React from 'react';
import {AbsoluteFill} from 'remotion';
import {theme} from '../theme';
export const Stage:React.FC<React.PropsWithChildren<{label?:string}>>=({children,label})=><AbsoluteFill style={{backgroundColor:theme.bg,color:theme.ink,fontFamily:theme.font,overflow:'hidden'}}>
  <AbsoluteFill style={{background:'radial-gradient(circle at 50% 48%, rgba(39,91,126,.24), rgba(7,17,31,.04) 58%, rgba(7,17,31,0) 78%)'}}/>
  <AbsoluteFill style={{backgroundImage:`linear-gradient(${theme.grid} 1px,transparent 1px),linear-gradient(90deg,${theme.grid} 1px,transparent 1px)`,backgroundSize:'72px 72px',maskImage:'linear-gradient(to bottom,black,transparent 92%)'}}/>
  {label&&<div style={{position:'absolute',top:46,left:64,fontSize:22,letterSpacing:4,color:theme.cyan}}>{label}</div>}{children}
</AbsoluteFill>;
