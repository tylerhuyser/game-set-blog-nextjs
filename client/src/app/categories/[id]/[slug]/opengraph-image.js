import { ImageResponse } from 'next/og'
import OGImageHome from "../../../_components/_shared/_ogimage/OGImageHome"
 
export const runtime = 'edge'
 
// Image metadata
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

export async function generateMetadata({ params }) {
  const { slug } = params

  const title = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() +
  word
    .slice(1)).join(" ");

  return {
    alt: `${title} – Game, Set, Blog`,
  }
}

export default async function Image() {

  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev
    ? 'http://localhost:3000'
    : 'https://gamesetblog.com';

  const [oswaldBold, serenaBuffer, djokovicBuffer, nadalBuffer, federerBuffer] = 
  await Promise.all([
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
      fonts: [{
        name: 'Oswald',
        data: oswaldBold,
        style: 'normal',
        weight: 700,
      }]
    }
  )
}