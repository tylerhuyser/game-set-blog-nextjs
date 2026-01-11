'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useScrollDirection, useWindowSize } from '../../../_hooks'
import { ANIMATION_TIMINGS } from '../_animations/AnimationTimings';

import NavLinks from './NavLinks';
import NavMenuIcons from './NavMenuIcons';

import './Nav.css'

export default function Nav() {

  // Mobile Navigation Menu Visibility State & Functions:
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [navVisibility, setNavVisibility] = useState(false)

  // Track which animations have completed
  const [animationStage, setAnimationStage] = useState({
    ballsVisible: false,
    textVisible: false,
    linksVisible: false
  });

  useEffect(() => {
    // Trigger animation sequence on mount
    const ballsTimer = setTimeout(() => {
      setAnimationStage(prev => ({ ...prev, ballsVisible: true }));
    }, ANIMATION_TIMINGS.nav.ballsRollIn.delay);

    const textTimer = setTimeout(() => {
      setAnimationStage(prev => ({ ...prev, textVisible: true }));
    }, ANIMATION_TIMINGS.nav.textFadeIn.delay);

    const linksTimer = setTimeout(() => {
      setAnimationStage(prev => ({ ...prev, linksVisible: true }));
      setIsInitialLoad(false);
    }, ANIMATION_TIMINGS.nav.linksFadeIn.delay);

    return () => {
      clearTimeout(ballsTimer);
      clearTimeout(textTimer);
      clearTimeout(linksTimer);
    };
  }, []);

  function toggleVisibility (navVisibility) {
    if (!navVisibility) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow')
    }
    setNavVisibility(!navVisibility)
  }

  let windowSize = useWindowSize()

  useEffect(() => {
    if (windowSize.width >= 1024) {
      setNavVisibility(false)
      const layoutContainer = document.getElementsByClassName('layout-container')
      if (layoutContainer.length > 0) {
        const element = layoutContainer[0]
        element.style.removeProperty('position')
      }
    }
  }, [windowSize])


  // Scroll Direction State and Effect:

  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledToTop(window.scrollY < 50);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
return (
  <>
    
    <div className={`nav-container ${
          isInitialLoad ? 'nav-initial-load' : 'slide-in-top-nav'
        } ${
          scrollDirection === 'down' && !scrolledToTop && !navVisibility
            ? 'nav-container-hidden'
            : 'nav-container-visible'
        }`}
      >
      
      <Link href="/" className="nav-logo-container">

        <p className="nav-logo-title">
          GAME
          <span
            className={`nav-logo-title-period ${
              animationStage.ballsVisible ? 'ball-roll-in' : ''
            }`}
            id="first-period"
            style={{
              animationDelay: '0ms',
              opacity: animationStage.ballsVisible ? 1 : 0
            }}
          ></span>
          SET
          <span
            className={`nav-logo-title-period ${
              animationStage.ballsVisible ? 'ball-roll-in' : ''
            }`}
            id="second-period"
            style={{
              animationDelay: `${ANIMATION_TIMINGS.nav.ballsRollIn.stagger}ms`,
              opacity: animationStage.ballsVisible ? 1 : 0
            }}
          ></span>
          BLOG
          <span
            className={`nav-logo-title-period ${
              animationStage.ballsVisible ? 'ball-roll-in' : ''
            }`}
            id="third-period"
            style={{
              animationDelay: `${ANIMATION_TIMINGS.nav.ballsRollIn.stagger * 2}ms`,
              opacity: animationStage.ballsVisible ? 1 : 0
            }}
          ></span>
        </p>
          
      </Link>

      <NavLinks
        context="desktop"
        onLinkClick={null}
        navVisibility={null}
        isVisible={animationStage.linksVisible}
      />
        
      <NavMenuIcons
        onClick={() =>
          toggleVisibility(navVisibility)}
          navVisibility={navVisibility}
      />

    </div>
    
    <NavLinks
      context="mobile"
      onLinkClick={() =>
        toggleVisibility(navVisibility)}
      navVisibility={navVisibility}
      isVisible={animationStage.linksVisible}
    />
    
  </>

)}