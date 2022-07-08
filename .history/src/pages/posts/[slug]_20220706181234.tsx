import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from './post.module.scss';

import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import Image from 'next/image';


interface PostProps {
  post: {
    slug: string;
    title: string;
    description: string;
    cover: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title}| Bootcamp</title>
      </Head>

      <main className={styles.Container}>
        <article className={styles.post}>
          <Image 
          quality={100}
          src={post.cover} 
          width={720} 
          height={410} 
          alt={post.title} 
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          />
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.description }}></div>
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params}) => {
  const { slug } = params;
  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID('post', String(slug), {});

  if(!response) {
    return{
      redirect: {
        destination: '/posts',
        permanent: false
      }
    }
  }

  const post = {
    slug: slug,
    title: RichText.asText(response.data.title),
    description: RichText.asHtml(response.data.description),
    cover: response.data.cover.url,
    updatedAt: new Date(response.last_publication_date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    }
  }
}