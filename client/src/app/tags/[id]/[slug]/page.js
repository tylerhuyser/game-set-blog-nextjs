'use server'

import { getPostsByTag } from "@/app/_services/posts";
import { notFound } from 'next/navigation'

import Posts from "@/app/_components/_posts/Posts";

import "./PostsByTag.css"

export async function generateMetadata({ params }) {
  
  const { id, slug } = await params

  const metaData = {
    title: `${slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")} | Game, Set, Blog`,
  }

  return {
    title: metaData.title,
    description: metaData.description,
    alternates: {
      canonical: `${id}/${slug}`,
    },
    openGraph: {
      title: metaData.title,
      url: `https://gamesetblog.com/${slug}`,
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
          
          <p className="posts-by-tag-title">{`There are 0 posts tagged with ${slug.split("-").join(" ")}.`}</p>

        :
      
        <>
          
          <p className="posts-by-tag-title">{`Posts tagged with: ${slug.split("-").map((word) => {return word[0].toUpperCase() + word.substring(1)}).join(" ")}`}</p>

          <Posts postsData={posts.data} totalPages={posts.totalPages} mode={"Posts by Tag"} sourceID={id} />

        </>
      
      }

    </div>
    
  )
}