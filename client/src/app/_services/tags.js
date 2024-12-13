import { api } from "./api-config"

export const getTags = async () => {
  const data = api(`tags`)
  return data
}

export const getTag = async (ID) => {
  const data = api(`tags/${ID}`)
  return data
}