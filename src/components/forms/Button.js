import React from 'react';
import styles from './Button.css';

const Button = (props) => {
  const { children, ...rest } = props;
  return <a className={styles.button} {...rest} >{children}</a>
};

export default Button;
