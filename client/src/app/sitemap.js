import { api } from "./_services/api-config";

export default async function sitemap() {

  const getPosts = async () => {

    try {

      const firstPageData = await api(`posts?_embed&per_page=100`)

      if (!firstPageData || !firstPageData.data) {
        return [];
      }

      const totalPages = parseInt(firstPageData.totalPages || 1);
      let allPosts = [...firstPageData.data];

      console.log(`Sitemap: Total pages of posts to fetch: ${totalPages}`);

      if (totalPages > 1) {
        const pagePromises = [];

        for (let page = 2; page <= totalPages; page++) {
          pagePromises.push(
            api(`posts?_embed&per_page=100&page=${page}`)
          );
        }

        const remainingPages = await Promise.all(pagePromises);

        remainingPages.forEach(pageData => {
          if (pageData && pageData.data) {
            allPosts = [...allPosts, ...pageData.data];
          }
        });
      }
      
      return allPosts


    } catch (error) {
      console.error('Error fetching all posts for sitemap:', error);
      return [];
    }
  }

  try {

    const postsData = await getPosts()

    let posts = []

    for(const post of postsData) {
      posts.push({
        url: `https://gamesetblog.com/posts/${post.slug}`,
        lastModified: post.modified ? new Date(post.modified).toISOString() : new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      });
    }

    return [
      {
        url: `https://gamesetblog.com/`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `https://gamesetblog.com/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      },
      ...posts
    ]

  } catch (error) {
    console.log(error)
  }

 }