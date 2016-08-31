import React from 'react';
import styles from './Footer.css';
import GithubIcon from 'components/icons/Github';

const Footer = () => (
  <div className={styles.footer}>
    <a target='_blank' href='https://github.com/sarmadsangi/offline-kanban'>
      <GithubIcon className={styles.footer_github} />
    </a>
    <a className={styles.footer_link} target='_blank' href='http://sarmadsangi.com/'>Sarmad Sangi</a>
  </div>
);

export default Footer;
