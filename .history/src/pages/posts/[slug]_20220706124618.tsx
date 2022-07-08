import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from './post.module.scss';

import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';

export default function Post() {
  return (
    <>
      <Head>
        <title>Content | Bootcamp</title>
      </Head>
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

    }
  }
}