import React from 'react';
import {Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const enter = (frame: number, delay = 0) => spring({frame: frame - delay, fps: 30, config: {damping: 16, stiffness: 105}});

export const MisconceptionTransform: React.FC<{before: string; after: string; accent: string; secondary: string}> = ({before, after, accent, secondary}) => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [18, 42], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const reveal = enter(frame, 38);
  return <div style={{position: 'absolute', inset: '130px 150px', display: 'grid', gridTemplateRows: '1fr 1fr', gap: 38}}>
    <div style={{position: 'relative', alignSelf: 'end', fontSize: 58, lineHeight: 1.25, opacity: .46, maxWidth: 1320}}>
      {before}
      <div style={{position: 'absolute', left: -20, top: '52%', width: `${strike}%`, height: 7, background: secondary, transform: 'rotate(-2deg)', borderRadius: 8}}/>
    </div>
    <div style={{fontSize: 76, lineHeight: 1.18, fontWeight: 850, color: accent, transform: `translateY(${(1-reveal)*60}px)`, opacity: reveal, maxWidth: 1450}}>{after}</div>
  </div>;
};

export const DeductionFlow: React.FC<{parts: string[]; accent: string; secondary: string; source?: string; deductions?: string[]; result?: string}> = ({parts, accent, secondary, source: sourceProp, deductions: deductionsProp, result: resultProp}) => {
  const frame = useCurrentFrame();
  const joined=parts.join('，');
  const source = sourceProp || ['全部工资','工资收入','收入总额','税前收入'].find(x=>joined.includes(x)) || parts[0] || '';
  const detected=[...joined.matchAll(/(?:五千元|\d+(?:\.\d+)?元)?起征点|三险一金|五险一金|专项附加扣除|各项扣除/g)].map(x=>x[0]);
  const deductions = deductionsProp?.length ? deductionsProp : detected.length ? detected : parts.slice(1, -1);
  const result = resultProp || ['应纳税所得额','税后收入','实际收入','净额'].find(x=>joined.includes(x)) || parts.at(-1) || source;
  const cut = interpolate(frame, [12, 64], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', inset: '120px 130px'}}>
    <div style={{fontSize: 30, letterSpacing: 4, color: accent, marginBottom: 45}}>从总额到实际计税部分</div>
    <div style={{height: 190, display: 'flex', borderRadius: 42, overflow: 'hidden', boxShadow: '0 35px 90px #0005'}}>
      <div style={{flex: Math.max(.25, 1-cut*.62), background: accent, padding: 38, fontSize: 38, fontWeight: 800, color: '#07111c'}}>{source}</div>
      {deductions.slice(0, 3).map((item, index) => <div key={item} style={{width: `${cut*16}%`, minWidth: cut ? 80 : 0, overflow: 'hidden', background: index%2 ? `${secondary}bb` : `${secondary}88`, padding: cut ? '38px 18px' : 0, fontSize: 24, color: '#fff'}}>{item}</div>)}
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 70, opacity: enter(frame, 50), transform: `translateX(${(1-enter(frame,50))*80}px)`}}>
      <div style={{width: 80, height: 5, background: accent}}/><div style={{fontSize: 70, fontWeight: 900, maxWidth: 1320}}>{result}</div>
    </div>
  </div>;
};

export const ThresholdStaircase: React.FC<{text: string; values: number[]; accent: string; secondary: string}> = ({text, values, accent, secondary}) => {
  const frame = useCurrentFrame();
  const steps = Math.max(4, Math.min(7, Math.round(values.find(v => v >= 4 && v <= 9) ?? 7)));
  const rates = values.filter(v => v >= 0 && v <= 100 && v !== steps);
  return <div style={{position: 'absolute', inset: '100px 110px 120px', display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 90, alignItems: 'end'}}>
    <div style={{height: 690, display: 'flex', alignItems: 'end', gap: 12}}>
      {Array.from({length: steps}, (_, index) => {
        const p = enter(frame, index*7);
        const height = 95 + index*78;
        const label = index===0&&rates[0]!==undefined?`${rates[0]}%`:index===steps-1&&rates.at(-1)!==undefined?`${rates.at(-1)}%`:'';
        return <div key={index} style={{flex: 1, height: height*p, minHeight: 4, background: `linear-gradient(180deg,${index===steps-1?secondary:accent},${accent}66)`, borderRadius: '18px 18px 2px 2px', position: 'relative'}}><span style={{position: 'absolute', top: -52, left: 0, right: 0, textAlign: 'center', fontSize: 30, fontWeight: 800}}>{label}</span></div>;
      })}
    </div>
    <div style={{alignSelf: 'center'}}><div style={{fontSize: 26, color: accent, letterSpacing: 5, marginBottom: 24}}>每一档只作用于对应区间</div><div style={{fontSize: 56, lineHeight: 1.3, fontWeight: 820}}>{text}</div></div>
  </div>;
};

export const EquationBuild: React.FC<{parts: string[]; accent: string; secondary: string}> = ({parts, accent, secondary}) => {
  const frame = useCurrentFrame();
  const source = parts.join('，');
  const tokens = source.split(/(等于|乘以|再减去|减去|加上)/).map(x => x.trim()).filter(Boolean).slice(0, 7);
  return <div style={{position: 'absolute', inset: '135px 115px', display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: 24}}>
    {tokens.map((token,index) => {const operator=/等于|乘以|减去|加上/.test(token),p=enter(frame,index*9);return <div key={`${token}-${index}`} style={{fontSize: operator?54:66,fontWeight:operator?500:850,color:operator?secondary:index===tokens.length-1?accent:'inherit',opacity:p,transform:`translateY(${(1-p)*(index%2?50:-50)}px)`,padding:operator?'10px 4px':'20px 16px'}}>{token}</div>})}
  </div>;
};

export const CalculationWalkthrough: React.FC<{text: string; values: number[]; labels?: string[]; accent: string; secondary: string}> = ({text, values, labels = [], accent, secondary}) => {
  const frame = useCurrentFrame();
  const visible = values.slice(0, 5);
  const semanticLabels=labels.length?labels:visible.map((value,index)=>{if(value>=10000&&text.includes('应纳税所得额')&&index===0)return '应纳税所得额';if(value<=7&&text.includes('档'))return `第 ${value} 档`;if(value<=100&&text.includes('税率'))return '适用税率';if(value>=10000&&text.includes('速算扣除数')&&index===visible.length-2)return '速算扣除数';if(value>=10000&&/最终应纳税额|结果是|应纳税额是/.test(text)&&index===visible.length-1)return '最终应纳税额';return '原稿数值'});
  return <div style={{position: 'absolute', inset: '105px 120px'}}>
    <div style={{fontSize: 30, letterSpacing: 4, color: accent}}>把例子放到同一条计算路径上</div>
    <div style={{position: 'absolute', left: 25, right: 25, top: 350, height: 8, background: `${accent}55`}}/>
    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 210}}>{visible.map((value,index)=>{const p=enter(frame,index*12);return <div key={`${value}-${index}`} style={{width: 250,textAlign:'center',transform:`scale(${.7+.3*p})`,opacity:p}}><div style={{fontSize:24,letterSpacing:2,color:index===visible.length-1?secondary:accent,marginBottom:20}}>{semanticLabels[index]}</div><div style={{width: 38,height:38,borderRadius:'50%',background:index===visible.length-1?secondary:accent,margin:'0 auto 28px',boxShadow:`0 0 35px ${accent}`}}/><div style={{fontSize:52,fontWeight:900}}>{value.toLocaleString('zh-CN')}{semanticLabels[index]==='适用税率'?'%':''}</div></div>})}</div>
    <div style={{position:'absolute',left:80,right:80,bottom:20,fontSize:38,lineHeight:1.35,textAlign:'center',opacity:.82}}>{text}</div>
  </div>;
};

export const VisualRecap: React.FC<{items: string[]; accent: string; secondary: string}> = ({items, accent, secondary}) => {
  const frame=useCurrentFrame();
  const {width,height}=useVideoConfig();
  const centerX=width/2,centerY=height/2;
  return <div style={{position:'absolute',inset:0}}><div style={{position:'absolute',left:centerX-135,top:centerY-135,width:270,height:270,borderRadius:'50%',background:`radial-gradient(circle,${accent},${accent}55 55%,transparent 72%)`,display:'grid',placeItems:'center',padding:28,textAlign:'center',fontSize:28,lineHeight:1.2,fontWeight:900,color:'#07111c'}}>{items[0]??'总结'}</div>{items.slice(1,6).map((item,index)=>{const angle=-Math.PI/2+index*(Math.PI*2/Math.min(5,Math.max(1,items.length-1))),r=index%2?310:370,x=centerX+Math.cos(angle)*r,y=centerY+Math.sin(angle)*r,p=enter(frame,index*8);return <React.Fragment key={item}><div style={{position:'absolute',left:centerX,top:centerY,width:r,height:2,background:`linear-gradient(90deg,${accent}88,transparent)`,transformOrigin:'0 0',transform:`rotate(${angle}rad) scaleX(${p})`}}/><div style={{position:'absolute',left:x-170,top:y-55,width:340,fontSize:30,lineHeight:1.25,fontWeight:750,textAlign:'center',color:index%2?secondary:'inherit',opacity:p,transform:`scale(${.8+.2*p})`}}>{item}</div></React.Fragment>})}</div>;
};

export const CinematicImageScene: React.FC<{src?: string; text: string; accent: string; focus?: string}> = ({src,text,accent,focus}) => {
  const frame=useCurrentFrame();
  const zoom=interpolate(frame,[0,240],[1.02,1.12],{extrapolateRight:'clamp'});
  return <div style={{position:'absolute',inset:0,overflow:'hidden'}}>{src?<Img src={src} style={{width:'100%',height:'100%',objectFit:'cover',transform:`scale(${zoom}) translateX(${Math.sin(frame/55)*12}px)`,filter:'saturate(.86) contrast(1.06)'}}/>:<div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 70% 35%,${accent}88,transparent 35%),linear-gradient(135deg,#151821,#05070a)`}}/>}<div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(4,7,10,.92) 0%,rgba(4,7,10,.48) 48%,rgba(4,7,10,.08) 78%)'}}/><div style={{position:'absolute',left:110,top:160,width:820}}>{focus?<div style={{fontSize:28,letterSpacing:5,color:accent,marginBottom:28}}>{focus}</div>:null}<div style={{fontSize:68,lineHeight:1.2,fontWeight:880,textShadow:'0 10px 40px #000'}}>{text}</div></div></div>;
};
