import React from 'react'
import Link from 'next/link'

import "./Categories.css"

export default function Categories({ data, context }) {

  const CATEGORIESJSX = data.map((category, index) => {
    return (
      <Link className={`category-card ${context}-category-card`} key={category.id} href={`/categories/${category.id}/${category.slug}`}>
        <div className={`category-card-content-container ${context}-category-card-content-container`}>
          <p className="category-name">{category.name.replace('&amp;', "&").toUpperCase()}</p>
          {category.count ? <p className='category-count'>{category.count.toString()}</p> : <></>}
        </div>
      </Link>
    )
  })

  return (
    <div className={`categories-container`} id={`${context}-categories-container`}>

      <p className={`section-title categories-title text-${context}-categories`} id={`categories-title-${context}`}>
        CATEGORIES
      </p>

      <div className={`category-cards-container`} id={`${context}-category-cards-container`}>
        {CATEGORIESJSX}
      </div>
    </div>
  )
}