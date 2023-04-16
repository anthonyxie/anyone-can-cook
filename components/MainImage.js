import React from 'react';

const MainImage = ({ src, alt, ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

export default MainImage;