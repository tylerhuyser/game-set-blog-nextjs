import { getPosts } from "./_services/posts";
import { getCategories } from "./_services/categories";
import { getTags } from "./_services/tags";

import Hero from "./_components/_hero/Hero";
import Featured from "./_components/_featured/Featured";
import HomeCategories from "./_components/_categories/HomeCategories";
import HomeTags from "./_components/_tags.jsx/HomeTags";
import Posts from "./_components/_posts/Posts";

import "./home.css"

export default async function Home() {

  const postsData = getPosts({
    id: null,
    page: 1,
    perPage: 10
  })

  const [posts] = await Promise.all([postsData])

  const categoriesData = await getCategories()

  const tagsData = await getTags()

  return (

    <>
      
      <Hero />
      
      <Featured data={posts.data.slice(0, 3)} />

      <div className="home-section split-section-container">

        <div className="home-section-content-container split-section-content-container">
          
          <div className="latest-posts-container">

            <p className='section-title latest-posts-text latest-posts-title'>
              LATEST POSTS
            </p>
            
            <Posts postsData={posts.data.slice(5)} totalPages={Math.ceil(parseInt(posts.totalPosts) / 5)} mode={"General Posts"} sourceID={null}  />
            
          </div>
          

          <div className="home-categories-tags-container">

            <HomeCategories data={categoriesData.sort((a, b) => b - a).slice(0, 5)} />
            <HomeTags data={tagsData.sort((a, b) => b - a).slice(0, 10)} />

          </div>
          
        </div>

        
      </div>


    </>

  );
}