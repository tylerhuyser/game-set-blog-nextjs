'use client'
import React, { useState, useEffect } from 'react';
import anime from 'animejs';
import LoaderLogo from '../_logos/LoaderLogo'

import './Loader.css'


export default function Loader() {
  
  const animate = () => {
    const loader = anime.timeline();

    loader
      .add({
        targets: '#logo polygon',
        delay: 300,
        duration: 1500,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo svg g',
        duration: 700,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo',
        delay: 500,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  const [isLoaderMounted, setIsLoaderMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaderMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (

    <div className="loader-container">

      <div className="logo-wrapper" style={
        isLoaderMounted ? {opacity: 1} : {opacity: 0}
      }>

        <LoaderLogo fill="white" stroke="white" />

      </div>

    </div>
      

  );
};