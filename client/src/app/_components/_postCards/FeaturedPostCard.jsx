import React from 'react'
import Link from 'next/link'

import parse from 'html-react-parser';

import './FeaturedPostCard.css'

export default function FeaturedPostCard({ postData }) {

  const postDate = new Date(postData.date).getDate();
  const postMonth = new Date(postData.date).getMonth() + 1;
  const postYear = new Date(postData.date).getFullYear();

  return (

    <Link className="featured-post-card-container" key={postData.id} href={`/posts/${postData.slug}`} >

      <div className="featured-post-card-content-container">

              <div className='featured-post-card-header-container'>

                <p className="featured-post-card-title">{parse(postData.title.rendered).toUpperCase()}</p>
                <p className="featured-post-card-date">{`${postMonth}.${postDate}.${postYear}`}</p>
                
              </div>

              <div className='featured-post-card-excerpt-container'>

                <div className="featured-post-card-excerpt">{parse(postData.content.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '').slice(0, 300).trim().concat("..."))}</div>

              <p className="featured-post-card-link">Read More.</p>

              </div>

            </div>

            <div className='featured-post-card-image-container'>

              <img className="featured-post-card-image" src={postData["_embedded"]["wp:featuredmedia"][0].source_url} alt="featured-postCard-image" />
  
            </div>
            
    </Link>      

  )
}