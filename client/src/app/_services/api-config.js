const baseUrl = `https://www.gamesetblog.com/wp-json/wp/v2/`

export const api = async (endpoint, options = {}) => {
  const url = `${baseUrl}${endpoint}`
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const mergedOptions = {...defaultOptions, ...options}

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


    if (endpoint.includes("posts?")) {
      // As Headers are not included in Fetch Response, below returns Data, Total Pages, and Total Posts for getPosts, getPostsByCategories, and getPostsbyTag data fetching functions.
      return {
        data: await response.json(),
        totalPosts: response.headers.get('x-wp-total'),
        totalPages: response.headers.get('x-wp-totalpages')
      }
    } else {
      // Returns Data for all other data fetching functions.
      return await response.json();
    }

  } catch (error) {

    console.error(`API Request Error: ${error.message}`);
    throw error;
  
  }
}