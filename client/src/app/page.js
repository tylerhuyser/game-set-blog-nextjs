import Image from "next/image";
import "./globals.css"
import styles from "./page.module.css";

import { getPosts } from "./_services/posts";
import { getTags } from "./_services/tags";
import { getCategories } from "./_services/categories";
import { getUsers } from "./_services/users";

import FeaturedPostCard from "./_components/_postCards/FeaturedPostCard";

import "./home.css"

export default async function Home() {

  const postsData = getPosts(1)
  const tagsData = getTags()
  const categoriesData = getCategories()
  const usersData = getUsers()

  const [posts, tags, categories, users] = await Promise.all([postsData, tagsData, categoriesData, usersData])

  const FEATUREDPOSTCARDSJSX = posts && posts?.slice(0, 5).map((post) => {
    
    return(
      <FeaturedPostCard postData ={post} users={users} key={post.id} />
    )
  })

  return (
    <div className="home-container" style={styles}>

      {FEATUREDPOSTCARDSJSX}

    </div>
  );
}