import React from 'react'
import parse from 'html-react-parser';

export default function CommentCard({commentData}) {

  const commentDate = new Date(commentData.date).getDate()
  const commentMonth = new Date(commentData.date).getMonth() + 1
  const commentYear = new Date(commentData.date).getFullYear()
  
  return (

    <div className="comment-card-container" key={commentData.id}>

      <div className="comment-card-hero-container">

        <i className="far fa-user"></i>

          <p className="comment-author-name">{commentData.author_name}</p>

          <p className="comment-date">{`${commentDate}.${commentMonth}.${commentYear}`}</p>  
            
      </div>

      <div className="comment-content">{parse(commentData.content.rendered.toString())}</div>

    </div>
        
  )
}