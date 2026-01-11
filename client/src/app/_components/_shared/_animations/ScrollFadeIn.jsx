'use client'
import { useScrollAnimation } from "@/app/_hooks";
import "./ScrollFadeIn.css"

export default function ScrollFadeIn({ children, threshold = 0.1, className = '' }) {
  const [ref, isVisible] = useScrollAnimation(threshold);

  return (
    <div 
      ref={ref} 
      className={`scroll-fade-wrapper ${className} ${isVisible ? 'section-fade-in visible' : 'section-fade-in'}`}
    >
      {children}
    </div>
  );
}