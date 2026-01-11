import { api } from "./api-config"

export const getTags = async (props) => {
  const data = await api(
    `tags?_embed&page=${props.page}&per_page=${props.perPage}`,
    {},
    {
      tags: ['all-tags'],
      revalidate: 3600
    }
  )
  return data
}

export const getTopTags = async (props) => {
  const data = await api(
    `tags?_embed&orderby=count&order=desc&page=${props.page}&per_page=${props.perPage}`,
    {},
    {
      tags: ['all-tags'],
      revalidate: 3600
    }
  )
  return data
}

export const getTag = async (ID) => {
  const data = await api(
    `tags/${ID}`,
    {},
    {
      tags: [`tag-${ID}`, 'all-tags'],
      revalidate: 3600
    }
  )
  return data
}