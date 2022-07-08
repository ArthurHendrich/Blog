import Image from 'next/image';
import styles from './styles.module.scss';
import log from '../../../public/images/logo.svg';
import { ActiveLink } from '../ActiveLink';


export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a>
        <Image src={log} alt="Logo"/>
        </a>

        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Conteudos</a>
          </ActiveLink>
          
          <ActiveLink href="/sobre" activeClassName={styles.active}>
            <a>Quem somos?</a>
          </ActiveLink>
        </nav>

        <a className={styles.readyButton} href="https://github.com/ArthurHendrich">Começar</a>
      </div>
    </header>
  )
}