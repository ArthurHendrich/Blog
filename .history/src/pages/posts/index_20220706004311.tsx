import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

import thumbImg from '../../../public/images/thumb.png';

export default function Posts() {
  return (
    <>
    <Head>
      <title>Post | Bootcamp</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.posts}>
        <Link href="/">
          <a>
            <Image src={thumbImg} alt="Posts" width={720} height={410} quality={100}/>
            <strong>Criando meu primeiro Aplicativo</strong>
            <time>6 Julho 2022</time>
            <p>Hoje vamos criar o controle de mostrar a senha no input, uma opção para os nossos formulários de cadastro e login. Mas chega de conversa e bora pro código junto comigo que o vídeo está show de bola!</p>
          </a>
        </Link>
      </div>
    </main>
    </>
  )
}