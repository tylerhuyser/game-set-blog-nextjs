import React from 'react'
import Link from 'next/link'

import "./HomeCategories.css"

export default function HomeCategories({ data }) {

  const CATEGORIESJSX = data.map((category, index) => {
    return (
      <Link className="home-category-card" key={category.id} href={`/categories/${category.id}/${category.slug}`}>
        <div className='home-category-card-content-container'>
          <p className="category-name">{category.name.replace('&amp;', "&").toUpperCase()}</p>
          {category.count ? <p className='category-count'>{category.count.toString()}</p> : <></>}
        </div>
      </Link>
    )
  })

  return (
    <div className="home-categories-container">

      <p className='section-title text-home-categories' id='categories-title-home'>
        CATEGORIES
      </p>

      <div className='home-category-cards-container'>
        {CATEGORIESJSX}
      </div>
    </div>
  )
}