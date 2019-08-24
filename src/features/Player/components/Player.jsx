import React from 'react';
import ReactSlider from 'react-slider';

import { Button, PLAY, PAUSE, REWIND, FAST_FORWARD } from './Button';
import { TimeDisplay } from './TimeDisplay';

export const Player = ({
  time,
  duration,
  state,
  audio,
  setTime,
  onTimeChange,
  onRewindClick,
  onPlayClick,
  onFastForwardClick,
  playerRef
}) => {
  return (
    <div className="container">
      <audio ref={playerRef} src={`http://localhost:1337${audio}`} />
      <ReactSlider
        className="slider-horizontal"
        barClassName="slider-bar"
        handleClassName="slider-handle"
        onChange={setTime}
        onSliderClick={setTime}
        max={duration}
        value={time}
        withBars
      />
      <span className="button-container">
        <Button onClick={onRewindClick} type={REWIND} />
        <Button
          onClick={onPlayClick}
          type={state === 'playing' ? PAUSE : PLAY}
        />
        <Button onClick={onFastForwardClick} type={FAST_FORWARD} />
        <TimeDisplay time={time} duration={duration} />
      </span>
      <style jsx>{`
        :global(.slider-horizontal) {
          background: #fac134 !important;
          margin: 25px 10px;
        }
        :global(.slider-bar) {
          background: #fac134 !important;
          height: 5px;
          top: 7px;
        }
        :global(.slider-handle) {
          background-color: #fac134 !important;
          border-radius: 50%;
          width: 20px;
          height: 20px;
        }
        .container {
          display: flex;
          flex-direction: column;
        }
        .button-container {
          width: 100px;
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </div>
  );
};
