export default function netlifyImageLoader({ src, width, quality }) {
    // If it's an external URL (starts with http:// or https://), return it as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
    // For local images, use Netlify's image optimization
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  const q = quality || 75;
  return `/${normalizedSrc}?nf_resize=fit&w=${width}&q=${q}`;
}