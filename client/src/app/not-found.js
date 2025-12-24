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
    perPage: 10
  })
   
  return(
    <div className="page-container" id="page-container-posts-by-page-not-found">

      <div className="section-container section-container-posts-by-page-not-found">

        <div className="content-container content-container-page-not-found">

          <p className="section-title text-page-not-found title-page-not-found ">{`Foot fault! Sorry, the page you requested cannot be found.`}</p>
      
          <Posts postsData={posts.data} totalPages={posts.totalPages} mode={"General Posts"} sourceID={null} />   
        
        </div>
      
      </div>
      
    </div>
  )
}