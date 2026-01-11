export const ANIMATION_TIMINGS = {
  // Nav animations
  nav: {
    container: { delay: 0, duration: 600 },
    ballsRollIn: { delay: 300, duration: 800, stagger: 150 },
    textFadeIn: { delay: 1400, duration: 500 },
    linksFadeIn: { delay: 2100, duration: 400, stagger: 100 }
  },
  navComplete: 2700,
  
  // Hero section animations
  hero: {
    courtFadeIn: { delay: 2900, duration: 800 },
    iconsFadeIn: { delay: 3700, duration: 600, stagger: 150 },
  },
  heroComplete: 4750, // Court (800) + icons (600) + stagger (450)
  
  // Featured section
  featured: {
    fadeIn: { delay: 4750, duration: 800 } // Starts right after hero completes
  }
};