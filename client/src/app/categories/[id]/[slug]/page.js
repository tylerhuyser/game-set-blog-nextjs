'use server'

import Posts from "@/app/_components/_posts/Posts";

import { getCategories } from '@/app/_services/categories'
import { getPostsByCategory } from '@/app/_services/posts'
import { notFound } from 'next/navigation'

import "./PostsByCategory.css"

export async function generateStaticParams() {
  try {

    const firstPage = await getCategories({
      page: String(1),
      perPage: String(100)
    })

    const totalPages = parseInt(firstPage.totalPages)
    let allCategories = [...firstPage.data]
    console.log(`Total pages of CATEGORIES to fetch: ${totalPages}`)

    if (totalPages > 1) {
      const pagePromises = []

      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(
          getCategories({
            page: String(page),
            perPage: String(100)
          })
        )
      }

      const remainingPages = await Promise.all(pagePromises)

      remainingPages.forEach(pageData => {
        allCategories = [...allPosts, ...pageData.data]
      })
    }

    console.log(`Generating Static Params for ${allCategories.length} categories.`)


    return allCategories.map((category) => ({
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
      canonical: `/categories/${id}/${slug}`,
    },
    robots: {
      index: false,
      googleBot: {
        index: false
      }
    },
    openGraph: {
      title: metaData.title,
      url: `https://gamesetblog.com/categories/${id}/${slug}`,
      type: "website"
    },
    twitter: {
      title: metaData.title,
    }
  }
}


export default async function PostsByCategory({ params }) {

  const { id, slug } = await params

  const posts = await getPostsByCategory({
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
    ? `There are 0 posts categorized as ${formattedSlug}.`
    : `There are ${postCount} posts categorized as: ${formattedSlug}`;


  return (
   
    <div className="page-container" id="page-container-posts-by-category">

      <div className="section-container section-container-posts-by-category">

        <div className="content-container content-container-posts-by-category">

          <h1 className="section-title text-posts-by-category title-posts-by-category">
            {titleText}
          </h1>

          {postCount > 0 && (
            <Posts
              postsData={posts.data}
              totalPages={posts.totalPages}
              mode="Posts by Category"
              sourceID={id}
            />
          )}

        </div>

      </div>

    </div>

  )
}