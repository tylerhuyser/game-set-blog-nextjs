import { getPosts } from "./_services/posts";
import { getTopCategories } from "./_services/categories";
import { getTopTags } from "./_services/tags";

import Hero from "./_components/_hero/Hero";
import Featured from "./_components/_featured/Featured";
import HomeCategories from "./_components/_categories/HomeCategories";
import HomeTags from "./_components/_tags.jsx/HomeTags";
import Posts from "./_components/_posts/Posts";

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

            <HomeCategories data={categoriesData} />
            <HomeTags data={tagsData} />

          </div>
          
        </div>

        
      </div>


    </>

  );
}