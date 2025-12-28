import React from 'react'
import Image from "next/image"
import parse from 'html-react-parser';

import TennisPlayerIcon from "../../../../public/assets/tennis-player-2-svgrepo-com.svg"

export default function CommentCard({commentData}) {

  const commentDate = new Date(commentData.date).getDate()
  const commentMonth = new Date(commentData.date).getMonth() + 1
  const commentYear = new Date(commentData.date).getFullYear()
  
  return (

    <div className="comment-card-container" key={commentData.id}>

      <div className='comment-card-content-container'>
        
        <Image
          className="image image-comment-card"
          id={`commment-card-image-${commentData.id}`}
          alt={`comment-card-avatar`}
          src={TennisPlayerIcon} 
          style={{'--id': commentData.id}}
          width={100}
          height={100}
        />

          <p className="comment-text" id="comment-author-name">{commentData.author_name.toUpperCase()}</p>

          <p className="comment-text" id="comment-date">{`${commentDate}.${commentMonth}.${commentYear}`}</p>        

        <div className="comment-text" id="comment-body">{parse(commentData.content.rendered.toString())}</div>
        
      </div>

    </div>
        
  )
}