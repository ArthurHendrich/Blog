import { GetStaticProps } from 'next';

import Head from 'next/head';

import styles from '../styles/home.module.scss';

import Image from 'next/image';
import techsImage from '../../public/images/techs.svg'
import { useEffect } from 'react';

import Aos from 'aos';
import 'aos/dist/aos.css';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';


type Content = {
  title: string;
  titleContent: string;
  link_action: string;
  mobileTitle: string;
  mobileContent: string;
  mobileBanner: string;
  webTitle: string;
  webContent: string;
  webBanner: string;
}

interface ContentProps {
  content: Content
}

export default function Home({ content }: ContentProps) {
  useEffect(() => {
    Aos.init({ duration: 1500});
  }, [])

  return (
    <>
    <Head>
      <title>Home | Bootcamp</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.containerHeader} data-aos="fade-up">
        <section className={styles.ctaText}>
          <h1>{content.title}</h1>
          <span>{content.titleContent}</span>
          <a href={content.link_action}>
            <button>
              COMEÇAR AGORA
            </button>
          </a>
        </section>
          <img src="/images/banner-conteudos.png" alt="Conteúdos" />
      </div>

      <hr className={styles.divisor} />

      <div className={styles.sectionContent}>
        <section data-aos="fade-right">
          <h2>{content.mobileTitle}</h2>
          <span>{content.mobileContent}</span>
        </section>

        <img data-aos="fade-left" src={content.mobileBanner} />      
      </div>

      <hr className={styles.divisor} />

      <div className={styles.sectionContent} >
        <img data-aos="fade-right" src={content.webBanner} alt="dev Aplicação web" />      
        
        <section data-aos="fade-left">
          <h2>{content.webTitle}</h2>
          <span>{content.webContent}</span>
        </section>
      </div>

    
      <div className={styles.nextLevelContent} >
        <Image data-aos="zoom-in" quality={100} src={techsImage} alt="techs" />
        <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
        <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
        <a href={content.link_action}>
          <button>ACESSAR TURMA!</button>
        </a>
      </div>
    
    
    </main>


    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const primic = getPrismicClient()

  const response = await primic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  console.log(response.results[0].data)

  const {
    title, sub_title, link_action, 
    mobile, mobile_content, mobile_banner, 
    title_web, web_content, web_banner
  } = response.results[0].data


  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    link_action: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 60 // 1 hour
  }
}