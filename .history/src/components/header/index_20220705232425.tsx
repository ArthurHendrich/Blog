import Image from 'next/image';
import styles from './styles.module.scss';
import log from '../../../public/images/logo.svg';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image 
      </div>
    </header>
  )
}