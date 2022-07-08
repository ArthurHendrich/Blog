import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';


import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight} from 'react-icons/fi';
import { GetStaticProps } from 'next';


import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import {RichText} from 'prismic-dom';
import { useState } from 'react';

// https: //png-pixel.com

type Post = {
  slug: string;
  title: string;
  cover: string;
  description: string;
  updatedAt: string;
}

interface PostProps{
  posts: Post[];
  page: string;
  totalPage: string;
}

export default function Posts({ posts: postsBlog, page, totalPage }: PostProps) {


  const [currentPage, setCurrentPage] = useState(Number(page));
  const [posts, setPosts] = useState(postsBlog || []);

  function navigatePage() {
    
  }

  return (
    <>
    <Head>
      <title>Post | Bootcamp</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.posts}>
        {posts.map(post => (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
          <a key={post.slug}>
            <Image 
            src={post.cover} 
            alt={post.title} 
            width={720} 
            height={410} 
            quality={100} 
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
            />
            <strong>{post.title}</strong>
            <time>{post.updatedAt}</time>
            <p>{post.description}</p>
          </a>
        </Link>
        ))}

        <div className={styles.buttonNavigate}>
          
          { Number(currentPage) >= 2 && (
          <div>
            <button onClick={() => navigatePage() } >
              <FiChevronsLeft size={25} color="#fff" />
            </button>
              <button onClick={() => navigatePage() }>
              <FiChevronLeft size={25} color="#fff" />
            </button>
          </div>
          )}


          { Number(currentPage) < Number(totalPage) && (
          <div>
            <button>
              <FiChevronRight size={25} color="#fff" /> 
            </button>
            <button>
             <FiChevronsRight size={25} color="#fff" />
            </button>
           </div>
          )}
        </div>
      </div>
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    orderings: '[document.last_publication_date desc]', // Order by last_publication_date, descending
    fetch: ['post.title', 'post.description', 'post.cover'],
    pageSize: 2
  })


  //   console.log(JSON.stringify(response, null, 2))

  const posts = response.results.map( post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts,
      page: response.page,
      totalPage: response.total_pages
    },
    revalidate: 60 * 30
  }
  
}