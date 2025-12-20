import React, { useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from "next/image"
import parse from 'html-react-parser';

import './PostCard.css'

export default function PostCard ({ postData }) {

  const postDate = new Date(postData.date).getDate()
  const postMonth = new Date(postData.date).getMonth() + 1
  const postYear = new Date(postData.date).getFullYear()

  return (
  
    <Link className="post-card-container" key={postData.id} href={`/posts/${postData.slug}`} >

      <div className="post-card-content-container">

        <p className="post-card-title">
          {parse(postData.title.rendered).toUpperCase()}
        </p>
      
        <div className='post-card-image-wrapper'>

          <img className="post-card-image" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} alt={`post-card-image-${postData.id}`} />
              
        </div>

        <p className='post-card-excerpt'>
          {parse(postData.excerpt.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '').slice(0, 300).trim())}
        </p>

        <p className="post-card-date">{`${postMonth}.${postDate}.${postYear}`}</p>

        <p className="post-card-read-estimate">
          5 MIN READ
        </p>

        <p className="post-card-CTA">
          READ MORE
        </p>

      </div> 
        
    </Link>

  )
}