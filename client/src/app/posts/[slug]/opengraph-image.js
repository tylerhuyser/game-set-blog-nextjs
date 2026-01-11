import { ImageResponse } from 'next/og'
import OGImage from "../../_components/_shared/_ogimage/OGImage"
 
export const runtime = 'edge'
 
// Image Size Metadata
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

export async function generateMetadata({ params }) {
  const { slug } = await params

  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    alt: `${title} – Game, Set, Blog`,
  }
}

export default async function Image({ params }) {

  const { slug } = await params
  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev
    ? 'http://localhost:3000'
    : 'https://gamesetblog.com';

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
  
  const oswaldBold = await fetch(
    `${baseUrl}/fonts/Oswald-Bold.ttf`
  ).then(res => res.arrayBuffer())
  

  return new ImageResponse(
    (
      <OGImage
        featuredImage={featuredImageUrl}
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