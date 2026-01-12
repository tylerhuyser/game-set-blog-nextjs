export default function netlifyImageLoader({ src, width, quality, format }) {
    const q = quality || 75;
    const fm = format || 'webp'

  const remoteImage = src.startsWith('http://') || src.startsWith('https://');
  const normalizedSRC = remoteImage ? src : (src.startsWith('/') ? src : `/${src}`);

  return `https://gamesetblog.com/.netlify/images?url=${encodeURIComponent(normalizedSRC)}&w=${width}&q=${q}&fm=${fm}`;
}