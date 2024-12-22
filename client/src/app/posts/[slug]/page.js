import React, { Suspense } from 'react';
import parse from 'html-react-parser';

import Categories from '@/app/_components/_categories/Categories';
import Tags from '@/app/_components/_tags.jsx/Tags';
import Comments from '@/app/_components/_comments/Comments';

import { getPostBySlug } from "@/app/_services/posts"; 

import "./page.css"

export async function generateMetadata({ params }) {
  
  const { slug } = await params

  const postData = await getPostBySlug(slug)

  const metaData = {
    title: parse(postData.title.rendered).slice(0, 60).trim(),
    description: postData.excerpt.rendered.replace(/<[^>]*>?/gm, '').replace('&#038;', "&").replace('&#8216;', "'").replace('&#8217;', "'").replace('&#8220;', "'").replace('&#8221;', "'").replace("\n", "").slice(0,120).trim(),
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
      canonical: slug,
    },
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      url: `https://gamesetblog.com/${slug}`,
      type: "article"
    },
    twitter: {
      title: metaData.title,
      description: metaData.description,
    }
  }
}

export default async function PostDetail({ params }) {

  const { slug } = await params

  const postData = await getPostBySlug(slug)

  const postDate = new Date(postData.date).getDate();
  const postMonth = new Date(postData.date).getMonth() + 1;
  const postYear = new Date(postData.date).getFullYear();

  console.log(postData.content.rendered.toString().slice(postData.content.rendered.toString().indexOf("<p>")).replaceAll('gamesetblog.com/wp-content/', 'admin.gamesetblog.com/wp-content/'))

  
  return (
    <div className="post-container">

    <div className='post-hero-container'>
      
      <div className="post-image-container" id='post-hero-image-container'>

        {/* <img className="post-image" id="post-hero-image" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} atl="post-hero-image" /> */}
        {parse(postData.content.rendered.toString().slice(postData.content.rendered.toString().indexOf("<img"), postData.content.rendered.toString().indexOf('<div class="wp-block-cover__inner-container')).replace('gamesetblog.com/wp-content/', 'admin.gamesetblog.com/wp-content/'))}

      </div>

      <div className="post-hero-content-container">

        <p className="post-title">{parse(postData.title.rendered)}</p>

        <p className="post-date">{`${postMonth}.${postDate}.${postYear}`}</p>

        <div className="post-content-container">{parse(postData.content.rendered.toString().slice(postData.content.rendered.toString().indexOf("<p>")).replace('gamesetblog.com/wp-content/', 'admin.gamesetblog.com/wp-content/'))}</div>

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