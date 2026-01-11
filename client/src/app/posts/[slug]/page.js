'use server'

import React, { Suspense } from 'react';
import parse from 'html-react-parser';

import Categories from '@/app/_components/_categories/Categories';
import Tags from '@/app/_components/_tags.jsx/Tags';
import Comments from '@/app/_components/_comments/Comments';

import Loader from '@/app/_components/_shared/_loader/Loader';
import ScrollFadeIn from '@/app/_components/_shared/_animations/ScrollFadeIn';

import { getPosts, getPostBySlug } from "@/app/_services/posts";
import { notFound } from 'next/navigation'

import "./page.css"

export async function generateStaticParams() {
  try {

    const firstPage = await getPosts({
      page: String(1),
      perPage: String(100)
    })

    const totalPages = parseInt(firstPage.totalPages)
    let allPosts = [...firstPage.data]
    console.log(`Total pages of POSTS to fetch: ${totalPages}`)

    if (totalPages > 1) {
      const pagePromises = []

      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(
          getPosts({
            page: String(page),
            perPage: String(100)
          })
        )
      }

      const remainingPages = await Promise.all(pagePromises)

      remainingPages.forEach(pageData => {
        allPosts = [...allPosts, ...pageData.data]
      })
    }

    console.log(`Generating Static Params for ${allPosts.length} posts.`)

    return allPosts.map((post) => ({
      slug: post.slug,
    }));
  
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  
  const { slug } = await params

  const postData = await getPostBySlug(slug)

  if (!postData) {
    return {
      title: 'Post Not Found | Game, Set, Blog',
    };
  }

  const metaData = {
    title: parse(postData.title.rendered).slice(0, 60).trim(),
    description: postData.excerpt.rendered
      .replace(/<[^>]*>?/gm, '')
      .replace('&#038;', "&")
      .replace('&#8216;', "'")
      .replace('&#8217;', "'")
      .replace('&#8220;', "'")
      .replace('&#8221;', "'")
      .replace("\n", "")
      .slice(0, 120)
      .trim(),
    featuredImage: postData.featured_img,
    published: postData.date,
    modified: postData.modified
  }

  const tags = []
    postData["_embedded"]["wp:term"][1].map((tag) => {
    tags.push(tag.name)
  })

  return {
    title: metaData.title,
    description: metaData.description,
    keywords: tags,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      url: `https://gamesetblog.com/posts/${slug}`,
      images: metaData.featuredImage ? metaData.featuredImage : [],
      type: "article",
      publishedTime: metaData.date,
      modifiedTime: metaData.modified,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.title,
      description: metaData.description,
      images: metaData.featuredImage ? metaData.featuredImage : [],
    }
  }
}

export default async function PostDetail({ params }) {

  const { slug } = await params

  const postData = await getPostBySlug(slug)

  if (!postData) {
		return notFound()
  }
  
  return (
    <div className="page-container post-container">

      <div className="section-container section-container-post" id="hero-section-container-post">
        <ScrollFadeIn> 
          <div className="content-container content-container-post" id="hero-content-container">
              
            <div className='image-wrapper pseudo-wrapper post-image-wrapper' id='post-hero-image-wrapper'>

              {parse(postData.content.rendered.toString().slice(postData.content.rendered.toString().indexOf("<img"), postData.content.rendered.toString().indexOf('<div class="wp-block-cover__inner-container')))}

            </div>
              
            <h1 className="section-title" id="post-title">{parse(postData.title.rendered)}</h1>

            <p className='post-excerpt post-text post-hero-text'>
              {parse(postData.excerpt.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '').slice(0, 300).trim())}
            </p>

            <p className='post-date post-text post-hero-text'>
              {postData.absolute_dates.created}
            </p>

          </div>
        </ScrollFadeIn>

      </div>

      <div className="section-container section-container-post" id="body-section-container-post">

        <ScrollFadeIn threshold={0.01}>
          <div className="content-container content-container-post" id="body-content-container">

            <div className='article-container'>

              <div className="article-content-container">
                {parse(postData.content.rendered.toString().slice(postData.content.rendered.toString().indexOf("<p>")))}
              </div>


              <Suspense fallback={<Loader />}>
                <Comments postData={postData} />
              </Suspense>

            </div>

            <div className="post-categories-tags-container">
              <Categories data={postData["_embedded"]["wp:term"][0]} context={"post"} />
              <Tags data={postData["_embedded"]["wp:term"][1]} context={"post"} />
            </div>


          </div>
        </ScrollFadeIn>

      </div>

    </div>
  )
}