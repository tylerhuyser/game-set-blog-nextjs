import React from 'react'
import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faVimeo, faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

import socialIcons from "../../../_content/00-social-icons.json"

import './Footer.css'

const iconMap = {
  faYoutube,
  faVimeo,
  faInstagram,
  faFacebook,
  faTwitter,
};

export default function Footer() {

  const links = [
    { name: 'HOME', path: '/', external: false },
    { name: 'ABOUT', path: '/about', external: false },
    { name: 'RANKINGS', path: 'https://rankings.gamesetblog.com/', external: true },
  ];
  
  return(
    <>
      <div className="footer-container">

        <div className="internal-links-container-footer">

          {links.map((link, index) => {
            const linkProps = {
              className: `internal-link-footer ${link.external ? 'external-link-foooter' : ''}`,
              href: link.path,
              ...(link.external && { 
                target: "_blank",
                rel: "noopener noreferrer" 
              })
            }

            return <Link key={index} {...linkProps}>{link.name}</Link>;
          })}

        </div>
        
        <div className='social-icons-container-footer'>

          {socialIcons.map((social) => {
            const icon = iconMap[social.icon]
            return (
              <a
                key={social.name}
                className="social-link-footer"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={icon}
                  className={social.class} 
                />
              </a>
            )
          })}

        </div>

            <p className="footer-text">ALL RIGHTS RESERVED. © 2026</p>

        </div>
    </>
  )
}