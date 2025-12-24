import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import parse from 'html-react-parser';

import './Featured.css'

export default function Featured({ data, key }) {

  const FEATUREDPOSTSJSX = data.map((post, index) => {

    const postDate = new Date(post.date).getDate();
    const postMonth = new Date(post.date).getMonth() + 1;
    const postYear = new Date(post.date).getFullYear();

    return (
      <Link className='post-card post-card-featured' key={post.id} href={`/posts/${post.slug}`}>

        <div className="image-wrapper image-wrapper-post-card image-wrapper-post-card-featured">

          <Image
            className="image image-post-card image-post-card-featured"
            id={``}
            alt={``}
            src={post["_embedded"]["wp:featuredmedia"][0].source_url}
            key={`-${index}`}
            style={{'--index': index + 1}}
            width={400}
            height={400}
          />
          
        </div>

        <div className="post-card-content-container-featured">

          <p className="text-featured featured-post-title">
            {parse(post.title.rendered).toUpperCase()}
          </p>

          <p className="text-featured featured-post-excerpt">
            {parse(post.excerpt.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '').slice(0, 300).trim())}
          </p>

          <p className="text-featured featured-post-date">
            {`${postMonth}.${postDate}.${postYear}`}
          </p>

          <p className="text-featured featured-post-read-estimate">
            5 MIN READ
          </p>

          <p className="text-featured featured-post-CTA">
            READ MORE
          </p>
          
        </div>
        
      </Link>
    )
  })


  return (
    <div className="section-container section-container-home" id="featured-section-container">

      <div className="content-container content-contaier-home" id="featured-content-container">

        <p className='section-title text-featured' id='featured-posts-title'>
          FEATURED POSTS
        </p>

        <div className="post-cards-container" id="post-cards-container-featured">

          {FEATUREDPOSTSJSX}

        </div>

      </div>

    </div>
  )
}