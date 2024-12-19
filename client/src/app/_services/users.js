import { api } from "./api-config"

export const getUsers = async () => {
  const data = await api(`users`)
  return data
}

export const getUser = async (ID) => {
  const data = await api(`users/${ID}`)
  return data
}