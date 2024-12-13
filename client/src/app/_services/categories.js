import { api } from "./api-config"

export const getCategories = async () => {
  const data = api(`categories`)
  return data
}

export const getCategory = async (ID) => {
  const data = api(`categories/${ID}`)
  return data
}