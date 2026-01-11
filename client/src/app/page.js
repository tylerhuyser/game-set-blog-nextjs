import { getPosts } from "./_services/posts";
import { getTopCategories } from "./_services/categories";
import { getTopTags } from "./_services/tags";

import Hero from "./_components/_hero/Hero";
import Featured from "./_components/_featured/Featured";
import SplitSection from "./_components/_splitSection/SplitSection";

import "./home.css"

export default async function Home() {

  const postsData = getPosts({
    page: 1,
    perPage: 10
  })

  const [posts] = await Promise.all([postsData])

  const categoriesData = await getTopCategories({
    page: 1,
    perPage: 5
  })

  const tagsData = await getTopTags({
    page: 1,
    perPage: 10
  })

  return (

    <div className="page-container" id="page-container-home">
      
      <Hero />
      
      <Featured data={posts.data.slice(0, 3)} />

      <SplitSection posts={posts} categoriesData={categoriesData} tagsData={tagsData} />

    </div>

  );
}