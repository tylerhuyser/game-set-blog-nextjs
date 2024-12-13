import { api } from "./api-config"

export const getComments = async () => {
  const data = api(`comments?&per_page=100`)
  return data
}

export const getCommentsPerPost = async (postID) => {
  const data = api(`comments?&post=${postID}`)
  return data
}

export const getComment = async (ID) => {
  const data = api(`comments/${ID}`)
  return data
}

export const postComment = async (commentData) => {
  const data = api(`comments`, {
    method: 'POST',
    body: JSON.stringify(commentData),
  })
  return data
}