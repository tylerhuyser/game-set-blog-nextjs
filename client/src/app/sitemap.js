import { api } from "./_services/api-config";

export default async function sitemap() {

  const getPosts = async () => {
    const data = await api(`posts?_embed&per_page=100`)
    return data
  }

  const getCategories = async () => {
    const data = await api(`categories?_embed&per_page=100`)
    console.log(data)
    return data
  }

  const getTags = async () => {
    const data = await api(`tags?_embed&per_page=100`)
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

    const categoriesData = await getCategories()

    let categories = []

    for(var i = 0; i < categoriesData.data.length; i++) {
      categories.push({
        url: `https://gamesetblog.com/categories/${categoriesData.data[i].id}/${categoriesData.data[i].slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      });
    }

    const tagsData = await getTags()

    let tags = []

    for(var i = 0; i < tagsData.data.length; i++) {
      tags.push({
        url: `https://gamesetblog.com/categories/${tagsData.data[i].id}/${tagsData.data[i].slug}`,
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
      ...posts,
      ...categories,
      ...tags
    ]

  } catch (error) {
    console.log(error)
  }

 }