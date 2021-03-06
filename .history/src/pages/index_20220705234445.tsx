import Head from 'next/head';
import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <>
    <Head>
      <title>Home | Bootcamp</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.containerHeader}>
        <section className={styles.ctaText}>
          <h1>Levando você ao próximo nível!</h1>
          <span>Uma plataforma com cursos que vão do zero até o profissional na pratica, direto ao ponto aplicando o que usamos no mercado de trabalho. 👊</span>
          <a>
            <button>
              COMEÇAR AGORA
            </button>
          </a>
          <img src="/images/banner-conteudos.png" alt="Conteúdos" />
        </section>
      </div>
    </main>
    </>
  )
}
