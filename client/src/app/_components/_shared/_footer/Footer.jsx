import React from 'react'
import Link from "next/link"

import { faYoutube, faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import SocialIcon from '../_socialIcon/SocialIcon';
import socialIcons from "../../../_content/00-social-icons.json"

import './Footer.css'

const iconMap = {
  faYoutube,
  faInstagram,
  faFacebook,
  faTwitter,
  faEnvelope,
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

          {socialIcons.map((social, index) => {
            const icon = iconMap[social.icon]
            return (
              <SocialIcon
                social={social}
                icon={icon}
                context="footer"
                key={`${social.name}-${index}`}
              />
            )
          })}

        </div>

            <p className="footer-text">ALL RIGHTS RESERVED. © 2026</p>

        </div>
    </>
  )
}