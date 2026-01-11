export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/?p=',              // Stop crawling old GUIDs
        '/*opengraph-image', // Stop crawling dynamic images
        '/wp-json/'
      ],
    },
    sitemap: 'https://gamesetblog.com/sitemap.xml',
  }
}