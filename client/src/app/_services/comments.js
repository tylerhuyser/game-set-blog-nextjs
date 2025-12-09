import { api } from "./api-config"

export const getComments = async () => {
  return await api(
    'comments?&per_page=100',
    {},
    {
      tags: ['all-comments'],
      revalidate: 600
    }
  )
}

export const getCommentsPerPost = async (postID) => {
  return await api(
    `comments?&post=${postID}`,
    {},
    {
      tags: [`post-${postID}-comments`, 'all-comments'],
      revalidate: 600
    }
  )
}

export const getComment = async (ID) => {
  return await api(
    `comments/${ID}`,
    {},
    {
      tags: [`comment-${ID}`],
      revalidate: 600
    }
  )
}
export const postComment = async (commentData) => {
  return await api(
    'comments',
    {
      method: 'POST',
      body: JSON.stringify(commentData),
    }
  )
}