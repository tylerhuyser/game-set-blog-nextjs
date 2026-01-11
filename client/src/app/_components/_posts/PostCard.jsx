import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import parse from 'html-react-parser';
import { estimateReadTime } from '@/app/utils/estimateReadTime';

import './PostCard.css'

export default function PostCard({ postData }) {
  
  const htmlContent = postData.content.rendered
  .toString()
  .slice(postData.content.rendered.indexOf("<p>"));

  const readTime = estimateReadTime(htmlContent);

  return (
  
    <Link className="post-card-container pseudo-wrapper" key={postData.id} href={`/posts/${postData.slug}`} >

      <div className="post-card-content-container">

        <p className="post-card-title">
          {parse(postData.title.rendered).toUpperCase()}
        </p>
      
        <div className='image-wrapper post-card-image-wrapper'>

          <Image
            className="post-card-image image"
            src={postData["_embedded"]["wp:featuredmedia"][0].source_url}
            alt={`post-card-image-${postData.id}`}
            width={400}
            height={300}
          />
              
        </div>

        <p className='post-card-excerpt'>
          {parse(postData.excerpt.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '').slice(0, 300).trim())}
        </p>

        <div className='post-card-meta-container'>
          <p className="post-card-date post-card-meta">
            {(([y,m,d]) => `${m}.${d}.${y}`)(postData.date.slice(0,10).split("-"))}
          </p>

          <p className="post-card-read-estimate post-card-meta">
            {`${readTime}`}
          </p>

          <div className='post-card-meta button post-card-cta-container'>
            <p className="post-card-CTA post-card-meta">
              READ MORE
            </p>
          </div>
        </div>

      </div> 
        
    </Link>

  )
}