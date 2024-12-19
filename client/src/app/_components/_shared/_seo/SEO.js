import OGImage from "../../../_assets/metadataImage.png"

const defaultData = {
  title: "Game, Set, Blog",
  description: "GameSetBlog.com - Tennis news, analysis, and opinion delivered with deadpan humor and a touch of sass. Grand Slams, ATP, and WTA forehands, backhands, overheads, tweeners, and dropshots.",
  siteUrl: "https://gamesetblog.com/",
  image: OGImage,
}


export const SEO = {
  title: {
    default: defaultData.title,
    // template: `%s | ${defaultData.title}`
  },
  description: defaultData.description,

  generator: "Next.js",
  applicationName: defaultData.title,
  referrer: 'origin-when-cross-origin',
  keywords: ['tennis', 'atp', 'wta', 'itf', 'grand slam', 'australian open', 'french open', 'roland garros', 'wimbledon', 'us open'],
  authors: { name: 'Tyler Huyser' },

  metadataBase: new URL(defaultData.siteUrl),
  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: defaultData.title,
    description: defaultData.description,
    images: defaultData.image,
    url: defaultData.siteUrl,
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: defaultData.title,
    description: defaultData.description,
    creator: "@GameSet_Blog",
    images: [`${defaultData.siteUrl}metadataImage.png`]
  }
}