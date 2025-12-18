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
      <Link className='featured-post-card' key={post.id} href={`/posts/${post.slug}`}>

        <div className="featured-post-card-image-wrapper">

          <Image
            className="featured-post-card-image"
            id={``}
            alt={``}
            src={post["_embedded"]["wp:featuredmedia"][0].source_url}
            key={`-${index}`}
            style={{'--index': index + 1}}
            width={400}
            height={400}
          />
          
        </div>

        <div className="featured-post-card-content-container">

          <p className="featured-post-title featured-posts-text">
            {parse(post.title.rendered).toUpperCase()}
          </p>

          <p className="featured-post-excerpt featured-posts-text">
            {parse(post.excerpt.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '').slice(0, 300).trim())}
          </p>

          <p className="featured-post-date featured-posts-text">
            {`${postMonth}.${postDate}.${postYear}`}
          </p>

          <p className="featured-post-read-estimate featured-posts-text">
            5 MIN READ
          </p>

          <p className="featured-post-CTA featured-posts-text">
            READ MORE
          </p>
          
        </div>
        
      </Link>
    )
  })


  return (
    <div className='featured-section-container'>

      <div className="featured-section-content-container">

        <p className='section-title featured-posts-text featured-posts-title'>
          FEATURED POSTS
        </p>

        <div className="featured-post-cards-container">

          {FEATUREDPOSTSJSX}

        </div>

      </div>

    </div>
  )
}