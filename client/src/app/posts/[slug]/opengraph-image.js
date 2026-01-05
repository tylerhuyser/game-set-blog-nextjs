import { ImageResponse } from 'next/og'
import OGImage from "../../_components/_shared/_ogimage/OGImage"
 
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Post - Game, Set, Blog'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }) {

  const { slug } = await params
  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev
    ? 'http://localhost:3000'
    : 'https://gamesetblog.com';

  let title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  let featuredImageUrl = null

  try {
    const wpResponse = await fetch(
      `https://www.admin.gamesetblog.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
    )
  
    if (wpResponse.ok) {
      const [post] = await wpResponse.json()

      if (post) {
        const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]

        if (featuredMedia) {
          const { source_url, mime_type } = featuredMedia
          console.log('Featured media:', source_url)
          console.log('MIME type:', mime_type)
          

          if (mime_type === 'image/webp') {
            console.log('Converting WebP to PNG...')
            const convertResponse = await fetch(
              `${baseUrl}/api/convert-image?url=${encodeURIComponent(source_url)}`
            )
          
            if (convertResponse.ok) {
              const { dataUrl } = await convertResponse.json()
              featuredImageUrl = dataUrl
              console.log('WebP converted successfully')
            } else {
              console.log('Failed to convert WebP')
            }
          } else {
            featuredImageUrl = source_url
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching WordPress data:', error)
  }
  
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
      <OGImage
        pageTitle={title}
        iconImages={iconImages}
        featuredImage={featuredImageUrl}
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