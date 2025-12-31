import React from 'react'
import Link from 'next/link'
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

          <img className="post-card-image image" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} alt={`post-card-image-${postData.id}`} />
              
        </div>

        <p className='post-card-excerpt'>
          {parse(postData.excerpt.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '').slice(0, 300).trim())}
        </p>

        <p className="post-card-date">
          {(([y,m,d]) => `${m}.${d}.${y}`)(postData.date.slice(0,10).split("-"))}
        </p>

        <p className="post-card-read-estimate">
          {`${readTime}`}
        </p>

        <p className="post-card-CTA">
          READ MORE
        </p>

      </div> 
        
    </Link>

  )
}