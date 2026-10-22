import {Easing, interpolate} from 'remotion';
export const ease = (f:number, from:number, to:number) => interpolate(f,[from,to],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.22,1,.36,1)});
export const enter = (f:number, delay=0) => ease(f,delay,delay+24);
