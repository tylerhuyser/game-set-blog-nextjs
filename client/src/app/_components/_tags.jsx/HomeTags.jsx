import React from 'react'
import Link from 'next/link'

import "./HomeTags.css"

export default function HomeTags({data}) {

  const TAGSJSX = data.map((tag, index) => (
    <Link className="home-tag-card" key={tag.id} href={`/tags/${tag.id}/${tag.slug}`}>
      <div className='home-tag-card-content-container'>
          <p className="tag-name">{tag.name.replace('&amp;', "&").toUpperCase()}</p>
          <p className='tag-count'>{tag.count.toString()}</p>
        </div>
    </Link>
  ))

  return (
    <div className="home-tags-container">
      <p className='section-title home-tags-text home-tags-title'>
        TAGS
      </p>

      <div className='home-tag-cards-container'>
        {TAGSJSX}
      </div>
    </div>
  )
}