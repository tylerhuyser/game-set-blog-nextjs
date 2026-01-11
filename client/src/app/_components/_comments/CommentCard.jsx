import React from 'react'
import Image from "next/image"
import parse from 'html-react-parser';

import TennisPlayerIcon from "../../../../public/assets/tennis-player-2-svgrepo-com.svg"

export default function CommentCard({ commentData }) {
  
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

          <p className="comment-text" id="comment-date">{(([y,m,d]) => `${m}.${d}.${y}`)(commentData.date.slice(0,10).split("-"))}</p>        

        <div className="comment-text" id="comment-body">{parse(commentData.content.rendered.toString())}</div>
        
      </div>

    </div>
        
  )
}