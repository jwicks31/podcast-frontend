import React from 'react';

const getTime = time => {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  }
}

export const TimeDisplay = ({
  time,
  duration,
}) => {
  return (
    <div className="container">
      {getTime(time)}/{getTime(duration)}
      <style jsx>{`
        .container {
          color: white;
        }
      `}</style>
    </div>
  );
};
