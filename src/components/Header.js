import React from 'react';
import styles from './Header.css';
import Logo from 'components/icons/Logo';

const Header = (props) => (
  <div className={styles.header}>
    <div className={styles.logo_container}>
      <Logo className={styles.logo} />
      <h2>Offline Kanban</h2>
    </div>
    <div>
      Total Tasks #{props.totalTasks}
    </div>
  </div>
);

export default Header;
