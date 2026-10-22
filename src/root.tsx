import React from 'react';
import {Composition} from 'remotion';
import {AirplaneFilm, filmSchema, defaultFilmProps} from './compositions/AirplaneFilm';
import {DynamicFilm,dynamicDuration} from './compositions/DynamicFilm';
import current from './generated/current.json';

export const RemotionRoot: React.FC = () => <><Composition
  id="AirplaneExplainer"
  component={AirplaneFilm}
  width={1920}
  height={1080}
  fps={30}
  durationInFrames={3600}
  schema={filmSchema}
  defaultProps={defaultFilmProps}
/><Composition id="DynamicExplainer" component={DynamicFilm} width={current.aspectRatio==='9:16'?1080:1920} height={current.aspectRatio==='9:16'?1920:1080} fps={30} durationInFrames={dynamicDuration}/></>;
