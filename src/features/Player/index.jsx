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

const getCurrentMarker = (markers, currentTime) =>
  markers.filter(marker => {
    return isBetween(marker.start, marker.duration, currentTime);
  })[0];

export const Player = ({ audio, markers, name }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [requestedTime, setRequestedTime] = useState(null);
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
    const marker = getCurrentMarker(markers, currentTime);
    if (!!requestedTime && requestedTime <= currentTime) {
      setRequestedTime(null);
    }
    if (!!marker) {
      if (currentMarker.content !== marker.content) {
        if (!!requestedTime) {
          onTimeChange(requestedTime, true);
          return setRequestedTime(null);
        }
        return setCurrentMarker(marker);
      }
    }
    if (!marker) return setCurrentMarker({});
  }, [currentTime, markers, setCurrentMarker, setRequestedTime, onTimeChange]);

  const onTimeChange = (value, skipCheck) => {
    if (
      !skipCheck &&
      isBetween(currentMarker.start, currentMarker.duration, currentTime) &&
      value > currentTime
    ) {
      return setRequestedTime(value);
    }
    player.current.currentTime = value;
  };

  const rewindClick = e => {
    e.preventDefault();
    if (!!requestedTime) setRequestedTime(null);
    onTimeChange(currentTime - 5, true);
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
