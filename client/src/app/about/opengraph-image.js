import { ImageResponse } from 'next/og'
import OGImageHome from "./_components/_shared/_ogimage/OGImageHome.jsx"
 
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

  const [oswaldLight, oswaldRegular, oswaldSemiBold, oswaldBold, serenaBuffer, djokovicBuffer, nadalBuffer, federerBuffer] = 
  await Promise.all([
    fetch(`${baseUrl}/fonts/Oswald-Light.ttf`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/fonts/Oswald-Regular.ttf`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/fonts/Oswald-SemiBold.ttf`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/fonts/Oswald-Bold.ttf`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/assets/_images/serena-illustration-white(900x1350).png`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/assets/_images/djokovic-illustration-white(900x1350).png`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/assets/_images/nadal-illustration-white(900x1350).png`).then(res => res.arrayBuffer()),
    fetch(`${baseUrl}/assets/_images/federer-illustration-white(900x1350).png`).then(res => res.arrayBuffer()),
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
      fonts: [
        {
          name: 'Oswald',
          data: oswaldLight,
          style: 'normal',
          weight: 300,
        },
        {
          name: 'Oswald',
          data: oswaldRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Oswald',
          data: oswaldSemiBold,
          style: 'normal',
          weight: 600,
        },
        {
          name: 'Oswald',
          data: oswaldBold,
          style: 'normal',
          weight: 700,
        }
      ]
    }
  )
}