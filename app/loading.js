import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={`${styles.loader} `}>
      
      <div className={`${styles.textWrapper}`}>
        <span className={styles.letter}>H</span>
        <span className={styles.letter}>u</span>
        <span className={styles.letter}>r</span>
        <span className={styles.letter}>u</span>
        <span className={styles.letter}>n</span>
        <span className={styles.letter}> </span>
        <span className={styles.letter}>I</span>
        <span className={styles.letter}>n</span>
        <span className={styles.letter}>d</span>
        <span className={styles.letter}>i</span>
        <span className={styles.letter}>a</span>
      </div>
      {/* <p className='text-black'>Your website is being put together for you ☺️</p> */}
    </div>
  );
};

export default Loading;
