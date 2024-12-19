import { api } from "./api-config"

export const getCategories = async () => {
  const data = await api(`categories`)
  return data
}

export const getCategory = async (ID) => {
  const data = await api(`categories/${ID}`)
  return data
}