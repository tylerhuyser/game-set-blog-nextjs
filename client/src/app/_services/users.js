import { api } from "./api-config"

export const getUsers = async () => {
  const data = api(`users`)
  return data
}

export const getUser = async (ID) => {
  const data = api(`users/${ID}`)
  return data
}