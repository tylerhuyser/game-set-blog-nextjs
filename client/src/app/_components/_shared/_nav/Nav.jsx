'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useScrollDirection, useWindowSize } from '../../../_hooks'

import NavLinks from './NavLinks';
import NavMenuIcons from './NavMenuIcons';

import './Nav.css'

export default function Nav() {

  // Mobile Navigation Menu Visibility State & Functions:

  const [navVisibility, setNavVisibility] = useState(false)

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
    
    <div className={`nav-container slide-in-top-nav ${
      scrollDirection === 'down' && !scrolledToTop && !navVisibility
        ? 'nav-container-hidden' 
        : 'nav-container-visible'
      }
    `}>
      
      <Link href="/" className="nav-logo-container">

        <p className="nav-logo-title">
          GAME<span className='nav-logo-title-period' id="first-period"></span>
          SET<span className='nav-logo-title-period' id="second-period"></span>
          BLOG<span className='nav-logo-title-period' id="third-period"></span>
        </p>
          
      </Link>

      <NavLinks
        context="desktop"
        onLinkClick={null}
        navVisibility={null}
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
    />
    
  </>

)}