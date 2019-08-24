import React from 'react';

const IMAGE = 'image';
const TEXT = 'text';
const AD = 'ad';

export const Marker = ({
  type,
  content,
  link
}) => (
  <span>
    {type === IMAGE && (
      <img
        className="marker image"
        src={`http://localhost:1337${content}`}
      />
    )}
    {type === TEXT && <div className="marker">{content}</div>}
    {type === AD && (
      <a className="marker" target="blank" href={link}>
        {content}
      </a>
    )}
    <style jsx>{`
      .marker {
        color: white;
      }
      .image {
        height: 50px;
        width: 50px;
      }
    `}</style>
  </span>
);
  