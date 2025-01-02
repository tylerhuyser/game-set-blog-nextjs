import React from 'react'

import Posts from './_components/_posts/Posts'

import { getPosts } from './_services/posts'

import './notfound.css'

export const metadata = {
  title: 'Page Not Found | Game Set Blog',
}

export default async function PageNotFound() {

  const posts = await getPosts({
    id: null,
    page: 1,
    perPage: 5
  })

  // console.log(posts)
   
  return(
    <div className="page-not-found-container">

      <p className="page-not-found-title">{`Sorry, the page you requested cannot be found.`}</p>
      
      <Posts postsData={posts.data} totalPages={posts.totalPages} mode={"General Posts"} sourceID={null} />   
      
    </div>
  )
}