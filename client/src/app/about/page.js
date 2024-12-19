import "./About.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

export const metadata = {
  title: 'About'
}

export default function About() {
  return (
    <div className="about-container">

    <div className="about-hero-image-container">

        <img className="about-hero-image" src="https://i.imgur.com/qp6aL3w.jpg" alt="about-me-hero" />

    </div>

    <div className='about-content-container'>

      <div className="social-icons-container">

        <a className="about-link" href="https://twitter.com/GameSet_Blog" target="_blank" rel="noopener noreferrer" >
            <FontAwesomeIcon icon={faTwitter} className="fab fa-twitter" />
        </a>

        <a className="about-link" href="https://instagram.com/the.brown.tyler" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="fab fa-instagram" />
        </a>
        
        <a className="about-link" href="mailto:tyler@gameset.blog" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} className="far fa-envelope" />
        </a>

        </div>

        <div className='about-bio-container'>

          <p className="about-bio-subtitle">“I live through the achievements of others.”</p>

          <div className="about-bio">
        
            After Google Search informed me that I visited Simona Halep’s Wikipedia page 57 times in the past month, I finally decided to admit I have a problem.

            This blog is the solution.<br/><br/>

            A timeline of my unclaimed tennis dream:<br/>

            <ul>

              <li><b>2005:</b> Losing to Anthony “Beans” Palicciono in both the singles & doubles finals of the YMCA tennis camp. </li>

              <li><b>2007 – 2009:</b> Watching my childhood hero, Andy Roddick, lose at the Legg Mason Tennis Classic three years running. (Was I his bad luck charm?) </li>

              <li><b>2012:</b> 2x High School Record Holder for most aces & double faults in one match (28 aces to 23 double faults). </li>

              <li><b>2014:</b> Wimbledon Doubles Champion (Nintendo Wii). </li>

              <li><b>2017:</b> US Open ball kid reject.</li>

            </ul>

          <span className="about-me-cta">Follow me on Instagram: <a href='https://instagram.com/the.brown.tyler'>@tylerhuijser</a>. Or shoot me an email at <a href='mailto:tyler@gameset.blog'>tyler@gameset.blog</a>.</span>

        </div>

      </div>

    </div>
    
  </div>
   )
}