'use client'
import React from "react"
import Image from "next/image"
import "./TennisCourt.css"

export default function TennisCourt({
  orientation = "horizontal",
  iconImages = [],
  textContent = [],
  showIcons = true,
  animated = false,
  className = ''
}) {

  const isVertical = orientation == 'vertical'
  const useText = textContent.length > 0
  const useIcons = iconImages.length > 0 && !useText

  return (
    <div 
      className={`tennis-court tennis-court-${orientation} ${animated ? 'court-fade-in' : ''} ${className}`}
    >
      <div className={`court-section alley ${isVertical ? 'alley-left' : 'alley-top'}`} data-section="alley-1">
        {useText && textSections[0] && (
          <div className="section-text" id={`${isVertical ? 'section-text-alley-left' : 'section-text-alley-top'}`}>
            {textSections[0].title && <h3>{textSections[0].title}</h3>}
            {textSections[0].text && <p>{textSections[0].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section alley ${isVertical ? 'alley-right' : 'alley-bottom'}`} data-section="alley-2">
        {useText && textSections[1] && (
          <div className="section-text" id={`${isVertical ? 'section-text-alley-right' : 'section-text-alley-bottom'}`}>
            {textSections[1].title && <h3>{textSections[1].title}</h3>}
            {textSections[1].text && <p>{textSections[1].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section baseline ${isVertical ? 'baseline-top' : 'baseline-left'}`} data-section="baseline-1">
        {useText && textSections[2] && (
          <div className="section-text" id={`${isVertical ? 'section-text-baseline-top' : 'section-text-baseline-left'}`}>
            {textSections[2].title && <h3>{textSections[2].title}</h3>}
            {textSections[2].text && <p>{textSections[2].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section baseline ${isVertical ? 'baseline-bottom' : 'baseline-right'}`} data-section="baseline-2">
        {useText && textSections[3] && (
          <div className="section-text" id={`${isVertical ? 'section-text-baseline-bottom' : 'section-text-baseline-right'}`}>
            {textSections[3].title && <h3>{textSections[3].title}</h3>}
            {textSections[3].text && <p>{textSections[3].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section service-box ${isVertical ? 'service-box-top-left' : 'service-box-top-left'}`} data-section="service-1">
        {useText && textSections[4] && (
          <div className="section-text" id={`${isVertical ? 'section-text-service-box-top-left' : 'service-box-top-left'}`}>
            {textSections[4].title && <h3>{textSections[4].title}</h3>}
            {textSections[4].text && <p>{textSections[4].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section service-box ${isVertical ? 'service-box-bottom-left' : 'service-box-top-right'}`} data-section="service-2">
        {useText && textSections[5] && (
          <div className="section-text" id={`${isVertical ? 'section-text-service-box-bottom-left' : 'section-text-service-box-top-right'}`}>
            {textSections[5].title && <h3>{textSections[5].title}</h3>}
            {textSections[5].text && <p>{textSections[5].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section service-box ${isVertical ? 'service-box-top-right' : 'service-box-bottom-left'}`} data-section="service-3">
        {useText && textSections[6] && (
          <div className="section-text" id={`${isVertical ? 'section-text-service-box-top-right' : 'section-text-service-box-bottom-left'}`}>
            {textSections[6].title && <h3>{textSections[6].title}</h3>}
            {textSections[6].text && <p>{textSections[6].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section service-box ${isVertical ? 'service-box-bottom-right' : 'service-box-bottom-right'}`} data-section="service-4">
        {useText && textSections[7] && (
          <div className="section-text" id={`${isVertical ? 'section-text-service-box-bottom-right' : 'section-text-service-box-bottom-right'}`}>
            {textSections[7].title && <h3>{textSections[7].title}</h3>}
            {textSections[7].text && <p>{textSections[7].text}</p>}
          </div>
        )}
      </div>
      
      {/* Court overlay and border */}
      <div className="court-overlay" />
      <div className="court-border" />
      
      {/* Icon images for hero */}
      {!useText && showIcons && iconImages.map((img, index) => (
        <Image
          key={`icon-${index}`}
          className={`icon-illustration ${animated ? 'icon-fade-in' : ''}`}
          alt={`Tennis player ${index + 1}`}
          src={img}
          width={900}
          height={1350}
          style={{
            '--index': index + 1,
            animationDelay: `${index * 150}ms`
          }}
        />
      ))}
    </div>
  )
}