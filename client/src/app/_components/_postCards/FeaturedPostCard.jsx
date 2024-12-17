import React from 'react'
// import { usePathname } from 'next/navigation'
import Link from 'next/link'

import parse from 'html-react-parser';

import './FeaturedPostCard.css'

export default function FeaturedPostCard({ postData, users }) {
  // const pathname = usePathname()

  const postDate = new Date(postData.date).getDate();
  const postMonth = new Date(postData.date).getMonth() + 1;
  const postYear = new Date(postData.date).getFullYear();

  // const handlePost = () => {
  //   // Navigate to the post's dynamic route
  //   router.push(`/posts/${postData.slug}`);
  // };

  if (!postData || !users) {
    return null; // Render nothing if data is missing
  }

  console.log(postData)


  return (
  
    <>

        <>

          <Link className="featured-post-card-container" key={postData.id} href={`/posts/${postData.slug}`} >

            <div className="featured-post-card-content-container">

              <div className='featured-post-card-header-container'>

                <p className="featured-post-card-title">{parse(postData.title.rendered).toUpperCase()}</p>
                <p className="featured-post-card-date">{`${postMonth}.${postDate}.${postYear}`}</p>
                
              </div>

              <div className='featured-post-card-excerpt-container'>

                <div className="featured-post-card-excerpt">{parse(postData.excerpt.rendered.slice(0, 250).slice(0, postData.excerpt.rendered.slice(0, 250).lastIndexOf(".")).trim("Continue reading").concat("", "."))}</div>

              <p className="featured-post-card-link">Read More.</p>

              </div>

            </div>

            <div className='featured-post-card-image-container'>

              <img className="featured-post-card-image" src={postData.featured_img} alt="featured-postCard-image" />
  
            </div>
            
          </Link>

        </>

    </>
  )
}