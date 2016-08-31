import React from 'react';
import styles from './ListHeader.css';

const ListHeader = (props) => (
  <header className={styles.list_header}>
    <div>{props.list.name}</div>
    <div>{props.list.cards.length} Tasks</div>
  </header>
);

export default ListHeader;
