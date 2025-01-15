const defaultData = {
  title: "Game, Set, Blog",
  description: "GameSetBlog.com - Tennis news, analysis, and opinion delivered with deadpan humor and a touch of sass.",
  siteUrl: "https://gamesetblog.com",
}


export const SEO = {
  metadataBase: new URL('https://gamesetblog.com'),
  title: {
    default: defaultData.title,
    // template: `%s | ${defaultData.title}`
  },
  description: defaultData.description,

  generator: "Next.js",
  applicationName: defaultData.title,
  referrer: 'origin-when-cross-origin',
  keywords: ['tennis', 'atp', 'wta', 'itf', 'grand slam', 'australian open', 'french open', 'roland garros', 'wimbledon', 'us open', 'forehand', 'backhand', 'overhead', 'dropshot', 'ace', 'tweener'],
  authors: { name: 'Tyler Huyser' },

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: defaultData.title,
    // images: ['/_assets/metedataImage.png'],
    description: defaultData.description,
    url: defaultData.siteUrl,
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: defaultData.title,
    description: defaultData.description,
    creator: "@GameSet_Blog",
    // images: ['/_assets/metedataImage.png']
  },

  verification: {
    google: "UWdDiArrGivUbpWkJwWyFiGgMSkGbPiUXXYmB-DqkWE"
  }
}