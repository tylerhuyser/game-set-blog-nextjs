import { getPosts } from "./_services/posts";

import Hero from "./_components/_hero/Hero";
import Featured from "./_components/_featured/Featured";
import Posts from "./_components/_posts/Posts";

import "./home.css"

export default async function Home() {

  const postsData = getPosts({
    id: null,
    page: 1,
    perPage: 10
  })

  const [posts] = await Promise.all([postsData])

  return (

    <>
      
      <Hero />
      
      <Featured data={posts.data.slice(0, 3)} />

    <div className="home-container">

      <p className='home-page-copy posts-title' id="latest-posts-title">LATEST POSTS</p>

      <Posts postsData={posts.data.slice(5)} totalPages={Math.ceil(parseInt(posts.totalPosts) / 5)} mode={"General Posts"} sourceID={null}  />

    </div>

    </>

  );
}