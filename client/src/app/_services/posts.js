import { api } from "./api-config"

export const getPosts = async (props) => {
  const response = await api(`posts?_embed&page=${props.page}&per_page=${props.perPage}`)
  return response
}

export const getPost = async (ID) => {
  const data = await api(`posts/${ID}?_embed`)
  return data
}

export const getPostBySlug = async (slug) => {
  const response = await api(`posts?slug=${slug}&_embed`)
  return response.data[0]
}

export const getPostsByCategory = async (props) => {
  const response = await api(`posts?categories=${props.id}&_embed&page=${props.page}&per_page=${props.perPage}`)
  return response
}

export const getPostsByTag = async (props) => {
  const response = await api(`posts?tags=${props.id}&_embed&page=${props.page}&per_page=${props.perPage}`)
  return response
}