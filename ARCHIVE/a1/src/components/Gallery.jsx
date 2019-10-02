
import React from 'react';

import Image from './image';

export default function Gallery(props) {
  const images = props.images.map((image, index) =>
    <Image url={image.url} description={image.description} key={image.id} />
  );

  return (
    <div className="gallery">{images}</div>
  );
}
