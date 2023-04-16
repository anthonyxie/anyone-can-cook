import React from 'react';
import styles from '@/styles/Home.module.css';

const MainImage = ({ src, alt, ...props }) => {
  return <img style={{
    borderRadius: '10px',
    fontSize: '16px',
    cursor:'pointer',
    border: '5px solid grey',
  }} className={styles.girlImage}
  src={src} alt={alt} {...props} />;
};

export default MainImage;