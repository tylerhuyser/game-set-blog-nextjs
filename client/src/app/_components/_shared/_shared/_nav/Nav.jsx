'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
// import { loaderDelay } from '../../utils';
import { useScrollDirection } from '../../../../_hooks';
import useWindowSize from '../../../../_utils/useWindowSize'

import NavLinks from './NavLinks';
import NavMenuIcons from './NavMenuIcons';
import IconLogo from '../_logos/IconLogo';

import './Nav.css'

export default function Nav(props) {

  // Mobile Navigation Menu Visibility State & Functions:

  const [navVisibility, setNavVisibility] = useState(false)
  const [iconVisibility, setIconVisibility] = useState(false)

  function toggleVisibility (navVisibility, iconVisibility) {
    setNavVisibility(!navVisibility)
    setIconVisibility(!iconVisibility)
  }

  // Scroll Direction State and Effect:

  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);

  const handleScroll = () => {
    setScrolledToTop(window.scrollY < 50);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      // setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let windowSize = useWindowSize()
  
return (
  <>
    
  <div className='nav-container slide-in-top-nav' style={

    (windowSize.width <= 758 && scrollDirection === 'up' && !scrolledToTop && !navVisibility) ?
      { transform: 'translateY(0px)',
        boxShadow: 'none',
        height: "calc(75px - 20px)"
      }
      :
      (windowSize.width <= 758 && scrollDirection === 'down' && !scrolledToTop && !navVisibility) ?
        {
          transform: 'translateY(-75px)',
          boxShadow: 'none',
          height: "calc(75px - 20px)"
        }
        :
        (windowSize.width > 758 && scrollDirection === 'up' && !scrolledToTop && !navVisibility) ?
        { transform: 'translateY(0px)',
          boxShadow: 'none',
          height: "calc(100px - 20px)"
        }
        :   
        (windowSize.width > 758 && scrollDirection === 'down' && !scrolledToTop && !navVisibility) ?
        {
          transform: 'translateY(-100px)',
          boxShadow: 'none',
          height: "calc(100px - 20px)"
          }
          :
          { transform: 'none' }
    }>
      
    <Link href="/" className="nav-logo-container">

      <IconLogo />

      <p className="nav-logo-title">GAME, SET, BLOG</p>
        
    </Link>

    <NavLinks context="desktop" iconVisibility={iconVisibility} onLinkClick={null} navVisibility={null} />
      
    <NavMenuIcons onClick={() => toggleVisibility(navVisibility, iconVisibility)} />

  </div>
    
  <NavLinks context="mobile" navVisibility={navVisibility} onLinkClick={() => toggleVisibility(navVisibility, iconVisibility)} />
    
  </>
)}