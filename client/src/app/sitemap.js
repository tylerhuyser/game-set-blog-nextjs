import { api } from "./_services/api-config";

export default async function sitemap() {

  const getPosts = async () => {
    const data = api(`posts?_embed&per_page=100`)
    return data
  }

  try {

    const postsData = await getPosts()

    let posts = []

    for(var i = 0; i < postsData.data.length; i++) {
      posts.push({
        url: `https://gamesetblog.com/posts/${postsData.data[i].slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      });
    }

    return [
      {
        url: `https://gamesetblog.com/`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `https://gamesetblog.com/about`,
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