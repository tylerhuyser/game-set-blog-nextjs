import React from 'react'

import CommentForm from './CommentForm'
import CommentCard from './CommentCard'

import { getCommentsPerPost } from '@/app/_services/comments'


export default async function Comments({postData}) {

  const commentsData = await getCommentsPerPost(postData.id)
  
  return (
        
    <div className="comments-container">

      <CommentForm postData={postData} />

      {commentsData && commentsData !== "No Comments." ?

        commentsData && commentsData.map((comment) => (
          <CommentCard commentData={comment} key={comment.id} />
        ))
            
      :

      <></>
          
      }

    </div>

  )
}