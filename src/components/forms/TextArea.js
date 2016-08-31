import React from 'react';
import styles from './TextArea.css';

const TextArea = (props) => (
  <textarea className={styles.text_area} {...props} />
);

export default TextArea;
