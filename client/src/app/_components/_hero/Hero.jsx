'use client'
import React, { useState, useEffect } from "react"
import Image from "next/image"
import ImageData from "../../_content/00-hero-image-data.json"
import { useAnimationState } from '../_shared/_animations/AnimationContext'

import "./Hero.css"

export default function Hero() {

  const { heroAnimationStarted } = useAnimationState()
  const [iconsVisible, setIconsVisible] = useState(false)

  useEffect(() => {
    if (heroAnimationStarted) {
      const timer = setTimeout(() => {
        setIconsVisible(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [heroAnimationStarted])


  const HEROIMAGESJSX = ImageData.map((data, index) => {
    return (
      <Image
        className={`icon-illustration ${iconsVisible ? 'icon-fade-in' : ''}`}
        id={data.name}
        alt={data.name}
        src={data.path}
        key={`${data.name}-${index}`}
        width={900}
        height={1350}
        style={{
          '--index': index + 1,
          animationDelay: `${index * 150}ms`,
        }}
      />
    )
  })

  

  return (
    <div className="section-container section-container-home" id="hero-section-container">

      <div className="content-container content-contaier-home" id="hero-content-container">

        <div className={`tennis-court ${heroAnimationStarted ? 'court-fade-in' : ''}`}>

          <div className="tennis-court-alley" id="top-alley" />
          <div className="tennis-court-alley" id="bottom-alley" />
          <div className="service-box service-box-top service-box-left" id="top-left" />
          <div className="service-box service-box-top service-box-right" id="top-right" />
          <div className="service-box service-box-bottom service-box-left" id="bottom-left" />
          <div className="service-box service-box-bottom service-box-right" id="bottom-right" />
          <div className="baseline-box" id="baseline-box-left" />
          <div className="baseline-box" id="baseline-box-right" />

          <div className="court-overlay" />
          <div className="court-border" />

          {HEROIMAGESJSX}

        </div>

      </div>

    </div>
  )
}