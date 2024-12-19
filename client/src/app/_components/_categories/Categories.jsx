import React from 'react'
import Link from 'next/link'

export default function Categories(props) {
  
  const { postCategories } = props
  
  const CATEGORIESJSX = postCategories && postCategories?.map((category, index) => (
    <Link className="post-category-copy" key={category.id} href={`/categories/${category.id}/${category.slug}`}>{category.name.replace('&amp;', "&")}</Link>
  ))

  return (
    <div className="categories-container">
      {CATEGORIESJSX}
    </div>
  )
}