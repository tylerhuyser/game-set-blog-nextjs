'use server'

import Posts from "@/app/_components/_posts/Posts";

import { getTags } from "@/app/_services/tags";
import { getPostsByTag } from "@/app/_services/posts";
import { revalidate, dynamicParams } from '@/app/utils/revalidation'; 
import { notFound } from 'next/navigation'

import "./PostsByTag.css"

export async function generateStaticParams() {
  try {
    const firstPage = await getTags({
      page: String(1),
      perPage: String(100)
    })

    const totalPages = parseInt(firstPage.totalPages)
    let allTags = [...firstPage.data]
    console.log(`Total pages of TAGS to fetch: ${totalPages}`)

    if (totalPages > 1) {
      const pagePromises = []

      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(
          getTags({
            page: String(page),
            perPage: String(100)
          })
        )
      }

      const remainingPages = await Promise.all(pagePromises)

      remainingPages.forEach(pageData => {
        allTags = [...allPosts, ...pageData.data]
      })
    }

    console.log(`Generating Static Params for ${allTags.length} tags.`)


    return allTags.map((category) => ({
      id: String(category.id),
      slug: category.slug,
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
  
  const postCount = posts.data.length;
  const formattedSlug = slug
  .split("-")
  .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  
  const titleText =
  postCount === 0
    ? `There are 0 posts tagged with ${formattedSlug}.`
    : `There are ${postCount} posts tagged with: ${formattedSlug}`;

  return (

    <div className="posts-by-tag-container">

      <div className="section-posts-by-tag">

        <div className="content-container-posts-by-tag-body content-container-posts-by-tag content-container">

          <h1 className="section-title text-posts-by-tag title-posts-by-tag">
            {titleText}
          </h1>

          {postCount > 0 && (
            <Posts
              postsData={posts.data}
              totalPages={posts.totalPages}
              mode="Posts by Tag"
              sourceID={id}
            />
          )}

        </div>

      </div>

    </div>
    
  )
}