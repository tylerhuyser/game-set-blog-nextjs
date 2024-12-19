import { api } from "./api-config"

export const getTags = async () => {
  const data = await api(`tags`)
  return data
}

export const getTag = async (ID) => {
  const data = await api(`tags/${ID}`)
  return data
}