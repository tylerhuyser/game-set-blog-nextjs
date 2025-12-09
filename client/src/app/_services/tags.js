import { api } from "./api-config"

export const getTags = async () => {
  const data = await api(
    `tags`,
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