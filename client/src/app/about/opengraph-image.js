import { ImageResponse } from 'next/og'
import OGImage from '../_components/_shared/_ogimage/OGImage'
 
export const runtime = 'edge'
 
// Image metadata
export const alt = 'About - Game, Set, Blog'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {

  return new ImageResponse(
    (
      <OGImage pageTitle={"About"} />
    ),
    {
      ...size,
    }
  )
}