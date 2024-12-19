import { api } from "./api-config"

export const getComments = async () => {
  const data = await api(`comments?&per_page=100`)
  return data
}

export const getCommentsPerPost = async (postID) => {
  const data = await api(`comments?&post=${postID}`)
  return data
}

export const getComment = async (ID) => {
  const data = await api(`comments/${ID}`)
  return data
}

export const postComment = async (commentData) => {
  const data = await api(`comments`, {
    method: 'POST',
    body: JSON.stringify(commentData),
  })
  return data
}