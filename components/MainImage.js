import React from 'react';

const MainImage = ({ src, alt, ...props }) => {
  return <img style={{
    borderRadius: '10px',
    fontSize: '16px',
    cursor:'pointer',
    border: '5px solid grey',
  }}
  src={src} alt={alt} {...props} />;
};

export default MainImage;