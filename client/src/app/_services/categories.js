import { api } from "./api-config"

export const getCategories = async (props) => {
  const data = await api(
    `categories?_embed&page=${props.page}&per_page=${props.perPage}`,
    {},
    {
      tags: ['all-categories'],
      revalidate: 3600
    }
  )
  return data
}

export const getTopCategories = async (props) => {
  const data = await api(
    `categories?_embed&orderby=count&order=desc&page=${props.page}&per_page=${props.perPage}`,
    {},
    {
      tags: ['all-categories'],
      revalidate: 3600
    }
  )
  return data
}

export const getCategory = async (ID) => {
  const data = await api(
    `categories/${ID}`,
    {},
    {
      tags: [`category-${ID}`, 'all-categories'],
      revalidate: 3600
    }
  )
  return data
}