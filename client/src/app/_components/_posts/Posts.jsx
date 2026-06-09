'use client'

import React, { useState, useEffect } from 'react'
import { useInView } from "react-intersection-observer";

import Loader from '../_shared/_loader/Loader'
import PostCard from "./PostCard"

import { getPosts, getPostsByCategory, getPostsByTag } from '@/app/_services/posts'

import Masonry from 'react-masonry-css';

import './Posts.css'

export default function Posts({ postsData, totalPages, mode, sourceID }) {

  const [posts, setPosts] = useState(postsData)
  const [currentPage, setCurrentPage] = useState(mode === "General Posts" ? 2 : 1)
  const [ref, inView] = useInView()

  let getPostsMethod 

  if (mode === "Posts by Category") {
    getPostsMethod = getPostsByCategory
  } else if (mode === "Posts by Tag") {
    getPostsMethod = getPostsByTag
  } else if (mode === "General Posts") {
    getPostsMethod = getPosts
  }

  async function loadMorePosts() {
    const nextPage = currentPage + 1
    const response = await getPostsMethod({
      id: sourceID,
      page: nextPage,
      perPage: 5
    })
    if (response.data && response.data.length) {
      const validPosts = response.data.filter(post =>
        post.content?.rendered &&
        post._embedded?.['wp:featuredmedia']?.[0]
      );
    
      if (validPosts.length > 0) {
        setCurrentPage(nextPage)
        setPosts(prevState => [...prevState, ...validPosts])
      }
    }
  }

  useEffect(() => {
    if (inView && (currentPage < totalPages )) {
      loadMorePosts()
    }
  }, [inView])

  const breakpointColumns = {
    default: 2,
    768: 1
  };
  
  return (
    
    <Masonry
      breakpointCols={breakpointColumns}
      className="post-cards-container"
      columnClassName='post-cards-column'
    >
      
      {posts.map((post, index) => {
        return (

          <PostCard
            postData={post}
            key={`${post.id}${index}`}
          />
        )
      })}

      {currentPage < totalPages && <Loader ref={ref} />}

    </Masonry>
  )
}