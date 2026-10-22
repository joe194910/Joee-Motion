import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile} from 'remotion';
import {z} from 'zod';
import {ComparisonSplit} from '../components/ComparisonSplit';
import {ForceBalance} from '../components/ForceBalance';
import {KineticTypography} from '../components/KineticTypography';
import {MechanismFlow} from '../components/MechanismFlow';
import {QuestionReveal} from '../components/QuestionReveal';
import {Stage} from '../components/Stage';
import {theme} from '../theme';

export const filmSchema=z.object({title:z.string(),audioSrc:z.string().optional()});
export const defaultFilmProps={title:'为什么飞机能够飞起来？',audioSrc:'audio/airplane.wav'};
const colors={accent:theme.cyan,secondary:theme.amber,text:theme.ink};
const scenes=[
  {from:0,duration:420,label:'01 / 疑问',node:<QuestionReveal question="为什么飞机能够飞起来？" accent={colors.accent} secondary={colors.secondary}/>},
  {from:420,duration:450,label:'02 / 先看空气',node:<KineticTypography words={['空气','不是背景','而是参与者']} accentIndex={1} accentColor={colors.secondary} textColor={colors.text}/>},
  {from:870,duration:540,label:'03 / 常见误解',node:<ComparisonSplit left={{title:'错误直觉',body:'上下两股空气并不需要同时到达机翼后缘。'}} right={{title:'更准确的理解',body:'机翼改变周围流场，并使空气动量发生变化。'}} colors={[theme.red,theme.cyan]} textColor={theme.ink}/>},
  {from:1410,duration:660,label:'04 / 机制',node:<MechanismFlow nodes={['机翼迎角','流场改变','压力与动量变化','升力形成']} accent={colors.accent} secondary={colors.secondary}/>},
  {from:2070,duration:570,label:'05 / 核心镜头',node:<MechanismFlow nodes={['气流接近','机翼作用','空气向下偏转','飞机获得向上作用']} accent={colors.accent} secondary={colors.secondary} hero/>},
  {from:2640,duration:480,label:'06 / 四力平衡',node:<ForceBalance/>},
  {from:3120,duration:480,label:'07 / 归纳',node:<KineticTypography words={['形状','迎角','速度','共同塑造升力']} accentIndex={3} accentColor={colors.secondary} textColor={colors.text}/>}
];
export const AirplaneFilm:React.FC<z.infer<typeof filmSchema>>=({audioSrc})=><AbsoluteFill style={{background:theme.bg}}>{scenes.map(scene=><Sequence key={scene.from} from={scene.from} durationInFrames={scene.duration}><Stage label={scene.label}>{scene.node}</Stage></Sequence>)}<Audio src={staticFile('audio/ambient.wav')}/>{audioSrc?<Audio src={staticFile(audioSrc)}/>:null}</AbsoluteFill>;
