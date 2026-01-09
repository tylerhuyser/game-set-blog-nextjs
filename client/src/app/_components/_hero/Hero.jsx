'use client'
import React, { useState, useEffect } from "react"
import ImageData from "../../_content/00-hero-image-data.json"
import TennisCourt from "../_tennisCourt/TennisCourt"
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

  return (
    <div className="section-container section-container-home" id="hero-section-container">

      <div className="content-container content-contaier-home" id="hero-content-container">

        <TennisCourt
          orientation="horizontal"
          iconImages={ImageData.map(d => d.path)}
          animated={heroAnimationStarted}
          showIcons={iconsVisible}
        />

      </div>

    </div>
  )
}