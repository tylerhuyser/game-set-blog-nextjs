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

  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev
    ? 'http://localhost:3000'
    : 'https://gamesetblog.com';
  
  console.log(`${baseUrl}/assets/fonts/bogart-semibold.otf`)

  const font = await fetch(
    `${baseUrl}/assets/fonts/bogart-semibold.otf`
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <OGImage pageTitle={"About"} baseUrl={baseUrl} />
    ),
    {
      ...size,
      fonts: [{
        name: "bogart-semibold",
        data: font,
      }]
    }
  )
}