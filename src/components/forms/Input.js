import React from 'react';
import styles from './Input.css';

const Input = (props) => (
  <input className={styles.input} {...props} />
);

export default Input;
