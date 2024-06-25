import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={`${styles.loader} `}>
      
      <div className={`${styles.textWrapper}`}>
        <span className={styles.letter}>t</span>
        <span className={styles.letter}>i</span>
        <span className={styles.letter}>m</span>
        <span className={styles.letter}>e</span>
        <span className={styles.letter}>d</span>
        <span className={styles.letter}>r</span>
        <span className={styles.letter}>o</span>
        <span className={styles.letter}>i</span>
        <span className={styles.letter}>d</span>
        <span className={styles.letter}>i</span>
        <span className={styles.letter}>o</span>
      </div>
      {/* <p className='text-black'>Your website is being put together for you ☺️</p> */}
    </div>
  );
};

export default Loading;
