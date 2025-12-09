import { api } from "./api-config"

export const getCategories = async () => {
  const data = await api(
    `categories`,
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