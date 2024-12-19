import React from 'react'
import Link from 'next/link'

export default function Tags(props) {
  
  const { postTags } = props

  const TAGSJSX = postTags && postTags?.map((tag, index) => (
    <Link className="post-tag-copy" key={tag.id} href={`/tags/${tag.id}/${tag.slug}`}>{tag.name.replace('&amp ;', "&")}</Link>
  ))

  return (
    <div className="tags-container">
      {TAGSJSX}
    </div>
  )
}