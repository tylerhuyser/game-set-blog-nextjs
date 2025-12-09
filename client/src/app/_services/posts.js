import { revalidate } from "../posts/[slug]/page"
import { api } from "./api-config"

export const getPosts = async (props) => {
  const response = await api(
    `posts?_embed&page=${props.page}&per_page=${props.perPage}`,
    {},
    {
      tags: ['all-posts'],
      revalidate: 3600
    }
  )
  return response
}

export const getPost = async (ID) => {
  const data = await api(
    `posts/${ID}?_embed`,
    {},
    {
      tags: [`post-id-${ID}`, 'all-posts'],
      revalidate: 3600
    }
  )
  return data
}

export const getPostBySlug = async (slug) => {
  const response = await api(
    `posts?slug=${slug}&_embed`,
    {},
    {
      tags: [`post-${slug}`, 'all-posts'],
      revalidate: 3600
    }
  )
  
  return response.data?.[0]
}

export const getPostsByCategory = async (props) => {
  return await api(
    `posts?categories=${props.id}&_embed&page=${props.page}&per_page=${props.perPage}`,
    {},
    {
      tags: [`category-${props.id}`, 'all-posts'],
      revalidate: 3600
    }
  )
}

export const getPostsByTag = async (props) => {
  return await api(
    `posts?tags=${props.id}&_embed&page=${props.page}&per_page=${props.perPage}`,
    {},
    {
      tags: [`tag-${props.id}`, 'all-posts'],
      revalidate: 3600
    }
  )
}