export default function netlifyImageLoader({ src, width, quality }) {
  // Remove leading slash to avoid double slashes in URL
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  const q = quality || 75;
  return `/${normalizedSrc}?nf_resize=fit&w=${width}&q=${q}`;
}