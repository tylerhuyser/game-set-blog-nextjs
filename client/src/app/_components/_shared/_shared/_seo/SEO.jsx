import Head from "next/head";

export default function SEO() {
  
  return (
    <Head>

        <link rel="canonical" href={`${metadata.siteURL}${pathname}`} />
    </Head>
  )
}