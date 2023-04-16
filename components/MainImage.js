import React from 'react';
import styles from '@/styles/Home.module.css';

const MainImage = () => {
  const images = ['/images/bigsmile.png', '/images/open.png', '/images/smile.png', '/images/bigsmile.png']; // Store the images in an array
  const randomIndex = Math.floor(Math.random() * images.length); // Get a random index
  const randomSrc = images[randomIndex]; // Select a random image using the random index
  return <img style={{
    borderRadius: '10px',
    fontSize: '16px',
    cursor:'pointer',
    border: '5px solid grey',
  }} className={styles.girlImage}
  src={randomSrc} />;
};

export default MainImage;