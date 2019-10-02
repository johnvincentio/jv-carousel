import React from 'react';

export default function Image(props) {
  return (
    <div className="gallery-image">
      <img src={props.url} alt={props.description} />
      <p>{props.description}</p>
    </div>
  );
}
