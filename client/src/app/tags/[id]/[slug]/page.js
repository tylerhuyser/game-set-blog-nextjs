'use server'

import Posts from "@/app/_components/_posts/Posts";

import { getTags } from "@/app/_services/tags";
import { getPostsByTag } from "@/app/_services/posts";
import { revalidate, dynamicParams } from '@/app/utils/revalidation'; 
import { notFound } from 'next/navigation'

import "./PostsByTag.css"

export async function generateStaticParams({params}) {
  try {
    const tags = getTags()

    console.log(`Generating Static Params for ${tags.length} tags.`)

    return tags.map((tag) => ({
      id: tag.id,
      slug: tag.slug,
    }));
  
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  
  const { id, slug } = await params

  const metaData = {
    title: `${slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")} | Game, Set, Blog`,
  }

  return {
    title: metaData.title,
    alternates: {
      canonical: `/tags/${id}/${slug}`,
    },
    robots: {
      index: false,
      googleBot: {
        index: false
      }
    },
    openGraph: {
      title: metaData.title,
      url: `https://gamesetblog.com/tags/${id}/${slug}`,
      type: "website"
    },
    twitter: {
      title: metaData.title,
    }
  }
}

export default async function PostsByTag({ params }) {
  
  const { id, slug } = await params

  const posts = await getPostsByTag({
    id: id,
    page: 1,
    perPage: 5
  })


	if (!posts) {
		return notFound()
	}

  return (

    <div className="posts-by-tag-container">

      {posts.data.length === 0 ?
          
          <h1 className="posts-by-tag-title">{`There are 0 posts tagged with ${slug.split("-").join(" ")}.`}</h1>

        :
      
        <>
          
          <h1 className="posts-by-tag-title">{`There are ${posts.data.length} total posts tagged with: ${slug.split("-").map((word) => {return word[0].toUpperCase() + word.substring(1)}).join(" ")}`}</h1>

          <Posts postsData={posts.data} totalPages={posts.totalPages} mode={"Posts by Tag"} sourceID={id} />

        </>
      
      }

    </div>
    
  )
}