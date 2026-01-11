import React from "react"
import Image from "next/image"
import ScrollFadeIn from "../_components/_shared/_animations/ScrollFadeIn";

import aboutImageData from "../_content/01-about-image-data.json"
import SocialIcon from "../_components/_shared/_socialIcon/SocialIcon";
import socialIcons from "../_content/00-social-icons.json"
import {
  faYoutube,
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  faYoutube,
  faInstagram,
  faFacebook,
  faTwitter,
  faEnvelope,
};

import "./About.css"

export const metadata = {
  title: 'About | Game, Set, Blog',
  alternates: {
    canonical: `/about`,
  },
  openGraph: {
    title: 'About | Game, Set, Blog',
    url: `https://gamesetblog.com/about`,
  },
  twitter: {
    title: 'About | Game, Set, Blog',
  }
}

export default function About() {

  const ABOUTIMAGESJSX = aboutImageData.map((image, index) => {
    const isLarge = index === 0;
    
    return (
      <div 
        key={`about-image-${index}`}
        className={`image-wrapper pseudo-wrapper image-wrapper-about ${isLarge ? 'image-wrapper-large' : 'image-wrapper-small'}`}
        id={`${!isLarge ? `grid-item-${index}` : ""}`}
      >
        <div className='zoom-clipper'>
          <Image
            className={`image image-about hero-image ${isLarge ? 'hero-image-large' : 'hero-image-small'} image-fade-in`}
            alt={image.name}
            src={image.path}
            width={900}
            height={900}
            style={{
              '--index': index + 1,
              animationDelay: `${index * 150}ms`
            }}
          />
        </div>
      </div>
    )
  })

  return (
    <div className="page-container" id="page-container-about">
      {/* HERO SECTION WITH IMAGES */}
      <div className="section-container section-container-about" id="hero-section-container-about">
        <ScrollFadeIn>
          <div className="content-container content-container-about" id="hero-content-container-about">
            
            <div className="subsection-container subsection-container-about hero-subsection-container-about" id="large-image-container">
              {ABOUTIMAGESJSX.slice(0, 1)}
            </div>

            <div className="subsection-container subsection-container-about hero-subsection-container-about" id="small-images-container">
              {ABOUTIMAGESJSX.slice(1)}
            </div>
          
          </div>
          </ScrollFadeIn>
      </div>

    
      {/* BODY SECTION WITH BIO AND SOCIAL */}
      <div className="section-container section-container-about" id="body-section-container-about">
        <ScrollFadeIn>
          <div className="content-container content-container-about" id="body-content-container-about">

          <div className="subsection-container subsection-container-about body-subsection-container-about" id="about-bio-container">

            <p className='section-title text-about body-text-about' id='about-title'>
              A LITTLE BIT ABOUT ME
            </p>

            <p className="section-subtitle text-about body-text-about" id="about-subtitle">"I live through the achievements of others."</p>

            <div className="bio-content-container text-about body-text-about">

              <p className="text-about body-text-about content-text-about">
                After Google Search informed me that I visited Simona Halep's Wikipedia page 57 times in the past month, I finally decided to admit I have a problem. This blog is the solution.
              </p>

              <p className="text-about body-text-about content-text-about">
                A timeline of my unclaimed tennis dream:
              </p>

              <ul className="text-about body-text-about content-text-about">
                <li><span className="tennis-ball-bullet" />2005: Losing to Anthony "Beans" Palicciono in both the singles & doubles finals of the YMCA tennis camp. </li>
                <li><span className="tennis-ball-bullet" />2007–2009: Watching my childhood hero, Andy Roddick, lose at the Legg Mason Tennis Classic three years running. (Was I his bad luck charm?) </li>
                <li><span className="tennis-ball-bullet" />2012: 2x High School Record Holder for most aces & double faults in one match (28 aces to 23 double faults). </li>
                <li><span className="tennis-ball-bullet" />2014: Wimbledon Doubles Champion (Nintendo Wii). </li>
                <li><span className="tennis-ball-bullet" />2017: US Open ball kid reject.</li>
              </ul>

            </div>
              
          </div>

          <div className="subsection-container subsection-container-about body-subsection-container-about" id="social-container">
              
            <p className='section-title text-about body-text-about' id='social-title'>
              FEELING SOCIAL?
            </p>
              
            <span className="text-about body-text-about content-text-about social-cta">
              For general inquiries, collaborations, or even if you’re looking for a doubles partner, I can be reached at <a className="email-link" href="mailto:tyler@gameset.blog" target="_blank" rel="noopener noreferrer">tyler@gameset.blog</a>.
            </span>
              
            <span className="text-about body-text-about content-text-about social-cta">
              If you like what you’re reading and want to keep the rally going, feel free to follow me on the social channels below.
            </span>

            <div className="social-icons-container-about">

                {socialIcons.map((social, index) => {
                  const icon = iconMap[social.icon]
                  return (
                    <div className="link-container-about" key={`${social.name}-${index}`}>
                      <SocialIcon
                        social={social}
                        icon={icon}
                        context="about"
                        key={`${social.name}-${index}`}
                      />
                    </div>
                  )
                })}
                
            </div>
          </div>

          </div>
        </ScrollFadeIn>
      </div>

    </div>
  )
}