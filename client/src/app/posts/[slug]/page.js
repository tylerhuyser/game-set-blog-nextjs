import React, { Suspense } from 'react';
import parse from 'html-react-parser';

import { getPosts, getPostBySlug } from "@/app/_services/posts"; 
import { notFound } from 'next/navigation'

import "./page.css"

export const revalidate = 3600 // Pages are considered stale after 1 hour -- revalidate upon first page visit after 1 hour.
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const posts = getPosts({
      page: 1,
      perPage: 100
    })

    console.log(`Generating Static Params for ${posts.length} posts.`)

    return posts.map((post) => ({
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
    featuredImage: postData._embedded?.['wp:featuredmedia']?.[0]?.source_url,
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
      images: metaData.featuredImage ? [featuredImage] : [],
      type: "article",
      publishedTime: metaData.date,
      modifiedTime: metaData.modified,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.title,
      description: metaData.description,
      images: featuredImage ? [featuredImage] : [],
    }
  }
}

import Categories from '@/app/_components/_categories/Categories';
import Tags from '@/app/_components/_tags.jsx/Tags';
import Comments from '@/app/_components/_comments/Comments';

export default async function PostDetail({ params }) {

  const { slug } = await params

  const postData = await getPostBySlug(slug)

  if (!postData) {
		return notFound()
	}

  const postDate = new Date(postData.date).getDate();
  const postMonth = new Date(postData.date).getMonth() + 1;
  const postYear = new Date(postData.date).getFullYear();

  // console.log(postData.content.rendered.toString().slice(postData.content.rendered.toString().indexOf("<p>")).replaceAll('gamesetblog.com/wp-content/', 'admin.gamesetblog.com/wp-content/'))

  
  return (
    <div className="post-container">

    <div className='post-hero-container'>
      
      <div className="post-image-container" id='post-hero-image-container'>

        {/* <img className="post-image" id="post-hero-image" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} atl="post-hero-image" /> */}
        {parse(postData.content.rendered.toString().slice(postData.content.rendered.toString().indexOf("<img"), postData.content.rendered.toString().indexOf('<div class="wp-block-cover__inner-container')))}

      </div>

      <div className="post-hero-content-container">

        <h1 className="post-title">{parse(postData.title.rendered)}</h1>

        <p className="post-date">{`${postMonth}.${postDate}.${postYear}`}</p>

        <div className="post-content-container">{parse(postData.content.rendered.toString().slice(postData.content.rendered.toString().indexOf("<p>")))}</div>

      </div>

    </div>
    
    <div className='post-categories-container'>

      <p className="post-categories-tags-container-title" id="post-categories-container-title">CATEGORIES</p>

      <Categories postCategories={postData["_embedded"]["wp:term"][0]} />
      
    </div>

    <div className='post-tags-container'>

      <p className="post-categories-tags-container-title" id="post-tags-container-title">TAGS</p>

      <Tags postTags={postData["_embedded"]["wp:term"][1]} />
      
    </div>

      <Suspense fallback={<div>Loading...</div>}>
      
        <Comments postData={postData} />
        
      </Suspense>
    
  </div>
  )
}