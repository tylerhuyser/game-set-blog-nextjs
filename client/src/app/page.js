import { getPosts } from "./_services/posts";

import FeaturedPostCard from "./_components/_postCards/FeaturedPostCard";
import Posts from "./_components/_posts/Posts";

import "./home.css"

export default async function Home() {

  const postsData = getPosts({
    id: null,
    page: 1,
    perPage: 10
  })

  const [posts] = await Promise.all([postsData])

  const FEATUREDPOSTCARDSJSX = posts.data.slice(0, 5).map((post) => {
    
    return(
      <FeaturedPostCard postData ={post} key={post.id} />
    )
  })

  return (
    <div className="home-container">

      <div className='featured-post-cards-container'>
      
        {FEATUREDPOSTCARDSJSX[0]}

        <p className='home-page-copy posts-title' id="featured-posts-title">FEATURED POSTS</p>

        {FEATUREDPOSTCARDSJSX.slice(1)}

      </div>

      <p className='home-page-copy posts-title' id="latest-posts-title">LATEST POSTS</p>

      <Posts postsData={posts.data.slice(5)} totalPages={Math.ceil(parseInt(posts.totalPosts) / 5)} mode={"General Posts"} sourceID={null}  />

    </div>


  );
}