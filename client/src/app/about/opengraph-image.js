import { ImageResponse } from 'next/og'
import OGImageHome from "../_components/_shared/_ogimage/OGImageHome"
 
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

  const [oswaldBold, serenaBuffer, djokovicBuffer, nadalBuffer, federerBuffer] = 
  await Promise.all([
    fetch(`${baseUrl}/fonts/Oswald-Bold.ttf`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/assets/images/icons-illustrations/serena-illustration-white(900x1350).png`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/assets/images/icons-illustrations/djokovic-illustration-white(900x1350).png`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/assets/images/icons-illustrations/nadal-illustration-white(900x1350).png`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/assets/images/icons-illustrations/federer-illustration-white(900x1350).png`).then(res => res.arrayBuffer()),
  ])

  // Convert images to base64 data URLs
  const iconImages = [serenaBuffer, djokovicBuffer, nadalBuffer, federerBuffer].map(buffer => 
    `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
  )


  return new ImageResponse(
    (
      <OGImageHome
        iconImages={iconImages}
      />
    ),
    {
      ...size,
      fonts: [{
        name: 'Oswald',
        data: oswaldBold,
        style: 'normal',
        weight: 700,
      }]
    }
  )
}