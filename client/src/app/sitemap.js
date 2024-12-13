import { api } from "./_services/api-config";
import { baseUrl } from './_services/baseUrl.js/index.js'

const getPosts = async () => {
  const data = api(`/posts?_embed&per_page=100`)
  return data
}

export default async function sitemap() {

  const getPosts = async () => {
    const data = api(`/posts?_embed&per_page=100`)
    return data
  }

  try {

    const postsData = await getPosts()

    let posts = []

    for(var i = 0; i < postsData.length; i++) {
      posts.push({
        url: `${baseUrl}${postsData[i].slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      });
    }

    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${baseUrl}about`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      ...posts
    ]

  } catch (error) {
    console.log(error)
  }

 }