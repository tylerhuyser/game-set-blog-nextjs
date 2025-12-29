import React from 'react'
import Link from 'next/link'

import "./HomeTags.css"

export default function HomeTags({data, context}) {

  const TAGSJSX = data.map((tag, index) => (
    <Link className={`tag-card ${context}-tag-card`} key={tag.id} href={`/tags/${tag.id}/${tag.slug}`}>
      <div className={`tag-card-content-container ${context}-tag-card-content-container`}>
          <p className="tag-name">{tag.name.replace('&amp;', "&").toUpperCase()}</p>
          { tag.count ? <p className='tag-count'>{tag.count.toString()}</p> : <></>}
        </div>
    </Link>
  ))

  return (
    <div className={`tags-container`} id={`${context}-tags-container`}>
      <p className={`section-title tags-title text-${context}-tags`} id={`tags-title-${context}`}>
        TAGS
      </p>

      <div className={`tag-cards-container`} id={`${context}-tag-cards-container`}>
        {TAGSJSX}
      </div>
    </div>
  )
}