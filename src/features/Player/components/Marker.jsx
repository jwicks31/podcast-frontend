import React from 'react';

const IMAGE = 'image';
const TEXT = 'text';
const AD = 'ad';

export const Marker = ({ type, content, link }) => (
  <React.Fragment>
    {type === IMAGE && (
      <img className="marker image" src={`http://localhost:1337${content}`} />
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
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: center;
      }
      .image {
        align-self: center;
        height: 50px;
        width: 50px;
      }
    `}</style>
  </React.Fragment>
);
