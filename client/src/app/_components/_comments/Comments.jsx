import React from 'react'

import CommentForm from './CommentForm'
import CommentCard from './CommentCard'

import { getCommentsPerPost } from '@/app/_services/comments'

import "./Comments.css"


export default async function Comments({postData}) {

  const commentsData = await getCommentsPerPost(postData.id)

  const COMMENTSJSX =
    commentsData && commentsData.length !== 0 && commentsData !== "No Comments." ? (
      <>
        <p
          className="section-title comments-section-title"
          id="comments-title"
        >
          COMMENTS
        </p>

        {commentsData.map(comment => (
          <CommentCard
            key={comment.id}
            commentData={comment}
          />
        ))}
      </>
    ) : null
  
  return (
        
    <div className="comments-container">

      <CommentForm postData={postData} />

      {COMMENTSJSX}   

    </div>

  )
}