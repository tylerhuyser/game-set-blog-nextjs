'use client'
import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import parse from 'html-react-parser';
import { estimateReadTime } from '@/app/utils/estimateReadTime';
import { useAnimationState } from '../_shared/_animations/AnimationContext'

import './Featured.css'

export default function Featured({ data, key }) {

  const { featuredAnimationStarted } = useAnimationState()

  const FEATUREDPOSTSJSX = data.map((post, index) => {

      const htmlContent = post.content.rendered
      .toString()
      .slice(post.content.rendered.indexOf("<p>"));
    
      const readTime = estimateReadTime(htmlContent);

    return (
      <Link className='post-card post-card-featured' key={post.id} href={`/posts/${post.slug}`}>

        <div className="image-wrapper pseudo-wrapper image-wrapper-post-card image-wrapper-post-card-featured">

          <div className='zoom-clipper'>

            <Image
              className="image image-post-card image-post-card-featured"
              alt={`Featured Post Card Image ${post.id}`}
              src={post["_embedded"]["wp:featuredmedia"][0].source_url}
              key={`-${index}`}
              style={{'--index': index + 1}}
              width={400}
              height={400}
            />
            
          </div>
          
        </div>

        <div className="post-card-content-container-featured">

          <p className="text-featured featured-post-title">
            {parse(post.title.rendered).toUpperCase()}
          </p>

          <p className="text-featured featured-post-excerpt">
            {parse(post.excerpt.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '').slice(0, 300).trim())}
          </p>

          <div className='featured-meta-container'>

            <p className="text-featured featured-meta featured-post-date">
              {(([y,m,d]) => `${m}.${d}.${y}`)(post.date.slice(0,10).split("-"))}
            </p>

            <p className="text-featured featured-meta featured-post-read-estimate">
              {readTime}
            </p>

            <div className='featured-meta button featured-post-cta-container'>
              <p className="text-featured featured-meta featured-post-CTA">
                READ MORE
              </p>
            </div>
          </div>
        </div>
      </Link>
    )
  })


  return (
    <div className="section-container section-container-home" id="featured-section-container">

      <div className={`content-container content-container-home featured-content-container ${featuredAnimationStarted ? 'featured-fade-in' : ''}`}>

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