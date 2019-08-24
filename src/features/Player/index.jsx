import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ReactSlider from 'react-slider';

import { Button, PLAY, REWIND, FAST_FORWARD } from './components/Button';
import { Player as PlayerComponent } from './components/Player';
import { Marker } from './components/Marker';

const PLAYING = 'playing';
const STOPPED = 'stopped';
const PAUSED = 'paused';

const isBetween = (start, duration, currentTime) =>
  start <= currentTime && start + duration >= currentTime;

const hasCurrentMarker = (markers, currentTime) =>
  markers.some(marker => {
    return isBetween(marker.start, marker.duration, currentTime);
  });

export const Player = ({ audio, markers, name }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerState, setPlayerState] = useState(STOPPED);
  const [currentMarker, setCurrentMarker] = useState({});
  const player = useRef(null);

  useEffect(() => {
    player.current.addEventListener('timeupdate', e => {
      setCurrentTime(e.target.currentTime);
      setDuration(e.target.duration);
    });
    return player.current.removeEventListener('timeudpate', () => {});
  }, [player, setCurrentTime, setDuration]);

  useEffect(() => {
    const noMarker = !hasCurrentMarker(markers, currentTime);
    if (noMarker) return setCurrentMarker({});

    markers.forEach(marker => {
      if (isBetween(marker.start, marker.duration, currentTime)) {
        if (currentMarker.content !== marker.content) {
          setCurrentMarker(marker);
        }
      }
    });
  }, [currentTime, setCurrentMarker]);

  const onTimeChange = value => player.current.currentTime = value;

  const rewindClick = e => {
    e.preventDefault();
    onTimeChange(currentTime - 5);
  };

  const playClick = e => {
    if (playerState === PLAYING) {
      setPlayerState(PAUSED);
      e.preventDefault();
      return player.current.pause();
    }
    setPlayerState(PLAYING);
    e.preventDefault();
    return player.current.play();
  };

  const fastForwardClick = e => {
    e.preventDefault();
    onTimeChange(currentTime + 5);
  };

  return (
    <div className="container">
      <h1>{name}</h1>
      {!currentMarker.content && <span className={'content-placeholder'} />}
      {!!currentMarker.content && (
        <Marker
          content={currentMarker.content}
          type={currentMarker.type}
          link={currentMarker.link}
        />
      )}
      <PlayerComponent
        onRewindClick={rewindClick}
        onPlayClick={playClick}
        onFastForwardClick={fastForwardClick}
        playerRef={player}
        setTime={onTimeChange}
        time={currentTime}
        duration={duration}
        state={playerState}
        audio={audio}
      />
      <style jsx>{`
        :global(.slider-bar) {
          background: black;
          height: 5px;
          top: 7px;
        }
        :global(.slider-horizontal) {
          background-color: white;
          margin-bottom: 25px;
        }
        :global(.slider-handle) {
          background-color: black;
          border-radius: 50%;
          width: 20px;
          height: 20px;
        }
        .container {
          display: flex;
          width: 50vw;
          flex-direction: column;
        }
        h1 {
          color: white;
          text-align: center;
        }
        .content-placeholder {
          height: 50px;
        }
      `}</style>
    </div>
  );
};
