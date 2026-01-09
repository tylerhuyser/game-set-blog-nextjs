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

  return (
    <div 
      className={`tennis-court tennis-court-${orientation} ${animated ? 'court-fade-in' : ''} ${className}`}
    >
      <div className={`court-section alley ${isVertical ? 'alley-left' : 'alley-top'}`} data-section="alley-1">
        {useText && textContent[0] && (
          <div className="section-text" id={`${isVertical ? 'section-text-alley-left' : 'section-text-alley-top'}`}>
            {textContent[0].title.length > 0 && textContent[0].title && <h3>{textContent[0].title}</h3>}
            {textContent[0].text.length > 0 && textContent[0].text && <p>{textContent[0].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section alley ${isVertical ? 'alley-right' : 'alley-bottom'}`} data-section="alley-2">
        {useText && textContent[1] && (
          <div className="section-text" id={`${isVertical ? 'section-text-alley-right' : 'section-text-alley-bottom'}`}>
            {textContent[1].title.length > 0 && textContent[1].title && <h3>{textContent[1].title}</h3>}
            {textContent[1].text.length > 0 && textContent[1].text && <p>{textContent[1].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section baseline ${isVertical ? 'baseline-top' : 'baseline-left'}`} data-section="baseline-1">
        {useText && textContent[2] && (
          <div className="section-text" id={`${isVertical ? 'section-text-baseline-top' : 'section-text-baseline-left'}`}>
            {textContent[2].title.length > 0 && textContent[2].title && <h3>{textContent[2].title}</h3>}
            {textContent[2].text.length > 0 && textContent[2].text && <p>{textContent[2].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section baseline ${isVertical ? 'baseline-bottom' : 'baseline-right'}`} data-section="baseline-2">
        {useText && textContent[3] && (
          <div className="section-text" id={`${isVertical ? 'section-text-baseline-bottom' : 'section-text-baseline-right'}`}>
            {textContent[3].title.length > 0 && textContent[3].title && <h3>{textContent[3].title}</h3>}
            {textContent[3].text.length > 0 && textContent[3].text && <p>{textContent[3].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section service-box ${isVertical ? 'service-box-top-left' : 'service-box-top-left'}`} data-section="service-1">
        {useText && textContent[4] && (
          <div className="section-text" id={`${isVertical ? 'section-text-service-box-top-left' : 'service-box-top-left'}`}>
            {textContent[4].title.length > 0 && textContent[4].title && <h3>{textContent[4].title}</h3>}
            {textContent[4].text.length > 0 && textContent[4].text && <p>{textContent[4].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section service-box ${isVertical ? 'service-box-bottom-left' : 'service-box-top-right'}`} data-section="service-2">
        {useText && textContent[5] && (
          <div className="section-text" id={`${isVertical ? 'section-text-service-box-bottom-left' : 'section-text-service-box-top-right'}`}>
            {textContent[5].title.length > 0 && textContent[5].title && <h3>{textContent[5].title}</h3>}
            {textContent[5].text.length > 0 && textContent[5].text && <p>{textContent[5].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section service-box ${isVertical ? 'service-box-top-right' : 'service-box-bottom-left'}`} data-section="service-3">
        {useText && textContent[6] && (
          <div className="section-text" id={`${isVertical ? 'section-text-service-box-top-right' : 'section-text-service-box-bottom-left'}`}>
            {textContent[6].title.length > 0 && textContent[6].title && <h3>{textContent[6].title}</h3>}
            {textContent[6].text.length > 0 && textContent[6].text && <p>{textContent[6].text}</p>}
          </div>
        )}
      </div>
      
      <div className={`court-section service-box ${isVertical ? 'service-box-bottom-right' : 'service-box-bottom-right'}`} data-section="service-4">
        {useText && textContent[7] && (
          <div className="section-text" id={`${isVertical ? 'section-text-service-box-bottom-right' : 'section-text-service-box-bottom-right'}`}>
            {textContent[7].title.length > 0 && textContent[7].title && <h3>{textContent[7].title}</h3>}
            {textContent[7].text.length > 0 && textContent[7].text && <p>{textContent[7].text}</p>}
          </div>
        )}
      </div>
      
      {/* Court overlay and border */}
      <div className="court-overlay" />
      <div className="court-border" />
      
      {/* Icon images for hero */}
      {showIcons && iconImages.map((img, index) => (
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