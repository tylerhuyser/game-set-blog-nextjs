'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ANIMATION_TIMINGS } from './AnimationTimings';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [navAnimationComplete, setNavAnimationComplete] = useState(false);
  const [heroAnimationStarted, setHeroAnimationStarted] = useState(false);
  const [featuredAnimationStarted, setFeaturedAnimationStarted] = useState(false);

  useEffect(() => {
    const navTimer = setTimeout(() => {
      setNavAnimationComplete(true);
      setHeroAnimationStarted(true);
    }, ANIMATION_TIMINGS.navComplete);

    const featuredTimer = setTimeout(() => {
      setFeaturedAnimationStarted(true);
    }, ANIMATION_TIMINGS.heroComplete);

    return () => {
      clearTimeout(navTimer);
      clearTimeout(featuredTimer);
    };
  }, []);

  return (
    <AnimationContext.Provider value={{
      navAnimationComplete,
      heroAnimationStarted,
      featuredAnimationStarted,
      timings: ANIMATION_TIMINGS
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationState = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationState must be used within AnimationProvider');
  }
  return context;
};