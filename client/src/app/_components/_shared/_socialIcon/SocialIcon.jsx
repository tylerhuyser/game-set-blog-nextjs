import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialIcon({ social, icon, context }) {

  return (
    <a
      key={social.name}
      className={`link-${context} social-link-${context}`}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {context === "about" ? <p className='social-name'>{social.name}</p> : <></>}
      <FontAwesomeIcon
        icon={icon}
        className={`${social.class} social-icon-${context}`} 
      />
    </a>
  )
}