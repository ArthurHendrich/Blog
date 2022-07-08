import Image from 'next/image';
import styles from './styles.module.scss';
import log from '../../../public/images/logo.svg';
import Link from 'next/link';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a>
        <Image src={log} alt="Logo"/>
        </a>

        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/post">
            <a>Conteudos</a>
          </Link>
          <Link href="/somos">
            <a>Quem somos?</a>
          </Link>
        </nav>

        <a className={styles.readyButton} href="https://github.com/ArthurHendrich">Começar</a>
      </div>
    </header>
  )
}