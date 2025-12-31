'use client'
import ScrollFadeIn from '../_shared/_animations/ScrollFadeIn';
import HomeCategories from '../_categories/HomeCategories';
import HomeTags from '../_tags.jsx/HomeTags';
import Posts from '../_posts/Posts';

import "./SplitSection.css"

export default function SplitSection({ posts, categoriesData, tagsData }) {
  return (
    <div className="section-container section-container-home" id="split-section-container">
      <ScrollFadeIn>
        <div className="content-container content-container-home" id="split-content-container">
          
          <div className="latest-posts-container">
            <p className='section-title text-latest-posts' id='latest-posts-title'>
              LATEST POSTS
            </p>
            <Posts 
              postsData={posts.data.slice(3)} 
              totalPages={Math.ceil(parseInt(posts.totalPosts) / 5)} 
              mode={"General Posts"} 
              sourceID={null} 
            />
          </div>

          <div className="home-categories-tags-container">
            <HomeCategories data={categoriesData.data} context={"home"} />
            <HomeTags data={tagsData.data} context={"home"} />
          </div>
          
        </div>
      </ScrollFadeIn>
    </div>
  );
}