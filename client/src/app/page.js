import Image from "next/image";
// import styles from "./page.module.css";
import './page.css'

import { getPosts } from "./_services/posts";
import { getTags } from "./_services/tags";
import { getCategories } from "./_services/categories";
import { getUsers } from "./_services/users";

export default async function Home() {

  const postsData = getPosts(1)
  const tagsData = getTags()
  const categoriesData = getCategories()
  const usersData = getUsers()

  const [posts, tags, categories, users] = await Promise.all([postsData, tagsData, categoriesData, usersData])

  // console.log(posts)
  // console.log(tags)
  // console.log(categories)
  // console.log(users)

  return (
    <div className="home-container">

    </div>
  );
}