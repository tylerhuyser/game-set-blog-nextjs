'use server'

import { getCategories } from '@/app/_services/categories'
import { getPostsByCategory } from '@/app/_services/posts'
import { notFound } from 'next/navigation'

import "./PostsByCategory.css"

export const revalidate = 3600 // Pages are considered stale after 1 hour -- revalidate upon first page visit after 1 hour.
export const dynamicParams = true;

export async function generateStaticParams({params}) {
  try {
    const categories = getCategories()

    console.log(`Generating Static Params for ${categories.length} categories.`)

    return categories.map((category) => ({
      id: category.id,
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

import Posts from '@/app/_components/_posts/Posts'

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


  return (
   
        <div className="posts-by-category-container">

          {posts.data.length === 0 ?
              
              <h1 className="posts-by-category-title">{`There are 0 posts categorized as ${slug.split("-").join(" ")}.`}</h1>

            :
          
            <>
              
              <h1 className="posts-by-category-title">{`There are ${posts.data.length} total posts categorized as: ${slug.split("-").map((word) => {return word[0].toUpperCase() + word.substring(1)}).join(" ")}.`}</h1>

              <Posts postsData={posts.data} totalPages={posts.totalPages} mode={"Posts by Category"} sourceID={id} />

            </>
          
          }

        </div>

  )
}