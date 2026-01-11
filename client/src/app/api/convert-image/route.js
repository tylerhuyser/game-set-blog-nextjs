import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')
  
  if (!imageUrl) {
    return NextResponse.json({ error: 'URL required' }, { status: 400 })
  }

  try {

    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch image')
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const pngBuffer = await sharp(buffer)
      .png()
      .toBuffer()
    
    const base64 = pngBuffer.toString('base64')
    const dataUrl = `data:image/png;base64,${base64}`
    
    return NextResponse.json({ dataUrl })
  } catch (error) {
    console.error('Error converting image:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}