import "./About.css"

import TennisCourt from "../_components/_tennisCourt/TennisCourt";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

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




  return (
    <div className="page-container" id="page-container-about">

      <div className="section-container section-container-about" id="hero-section-container-about">

        <div className="content-container" id="content-container-about">
          
          <div className="subsection-container subsection-container-about" id="hero-subsection-container-about">

            <div className="image-wrapper pseudo-wrapper post-image-wrapper" id='about-hero-image-wrapper'>

              <img className="about-hero-image" src="https://i.imgur.com/qp6aL3w.jpg" alt="about-me-hero" />

            </div>

            <div className="social-container">

              <span className="about-me-cta text-about">Follow me on Instagram: <a href='https://instagram.com/the.brown.tyler'>@tylerhuijser</a>. Or shoot me an email at <a href='mailto:tyler@gameset.blog'>tyler@gameset.blog</a>.</span>

              <div className="social-icons-container">

                <a className="link-about" href="https://twitter.com/GameSet_Blog" target="_blank" rel="noopener noreferrer" >
                    <FontAwesomeIcon icon={faTwitter} className="fab fa-twitter" />
                </a>

                <a className="link-about" href="https://instagram.com/the.brown.tyler" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="fab fa-instagram" />
                </a>

                <a className="link-about" href="mailto:tyler@gameset.blog" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faEnvelope} className="far fa-envelope" />
                </a>

              </div>

            </div>
          
          </div>

          <div className="subsection-container subsection-container-about" id="body-subsection-container-about">

            <div className='about-bio-container'>

              <p className='section-title text-about' id='about-title'>
                ABOUT ME
              </p>

              <p className="section-subtitle text-about" id="about-subtitle">“I live through the achievements of others.”</p>

              <div className="bio-container text-about body-text" id="about-body">

                <p>After Google Search informed me that I visited Simona Halep’s Wikipedia page 57 times in the past month, I finally decided to admit I have a problem.</p>

                <p>This blog is the solution.</p>

                <p>A timeline of my unclaimed tennis dream:</p>

                <ul>

                  <li><b>2005:</b> Losing to Anthony “Beans” Palicciono in both the singles & doubles finals of the YMCA tennis camp. </li>

                  <li><b>2007 – 2009:</b> Watching my childhood hero, Andy Roddick, lose at the Legg Mason Tennis Classic three years running. (Was I his bad luck charm?) </li>

                  <li><b>2012:</b> 2x High School Record Holder for most aces & double faults in one match (28 aces to 23 double faults). </li>

                  <li><b>2014:</b> Wimbledon Doubles Champion (Nintendo Wii). </li>

                  <li><b>2017:</b> US Open ball kid reject.</li>

                </ul>

              </div>

            </div>

          </div>

          <TennisCourt
              orientation="vertical"
              textSections={[
                { title: "Alley 1", text: "First section..." },
                { title: "Alley 2", text: "Second section..." },
                { title: "Baseline 1", text: "Third section..." },
                { title: "Baseline 2", text: "Fourth section..." },
                { title: "Service 1", text: "Fifth section..." },
                { title: "Service 2", text: "Sixth section..." },
                { title: "Service 3", text: "Seventh section..." },
                { title: "Service 4", text: "Eighth section..." }
              ]}
            />
          
        </div>
        
      </div>
    
    </div>
  )
}