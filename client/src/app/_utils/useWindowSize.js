import React, { useState, useEffect } from 'react'

export default function useWindowSize() {
  
  const [windowSize, setwindowWSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleWindowResize = () => {
      setwindowWSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return windowSize
}