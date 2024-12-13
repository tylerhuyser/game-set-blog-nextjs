import { api } from "./api-config"

export const getPosts = async (page) => {
  const data = api(`posts?_embedpage=${page}&per_page=5`)
  return data
}

export const getPost = async (ID) => {
  api(`posts/${ID}?_embed`)
}

export const getPostBySlug = async (slug) => {
  const data = api(`posts?slug=${slug}&_embed`)
  console.log(data)
  return data[0]
}

export const getPostsByCategory = async (categoryID, page) => {
  api(`posts?categories=${categoryID}&_embed&page=${page}&per_page=5`)
}

export const getPostsByTag = async (tagID, page) => {
  api(`posts?tags=${tagID}&_embed&page=${page}&per_page=5`)
}