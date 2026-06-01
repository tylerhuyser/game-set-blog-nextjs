![GAME, SET, BLOG - Home Page](https://res.cloudinary.com/tylerhuyser/image/upload/v1780277250/Game%2C%20Set%2C%20Blog/Blog_-_Home_Page_knoi1h.png)

# GAME, SET, BLOG

**GAME, SET, BLOG** is a tennis-themed personal blog cataloging analysis and opinion on ATP, WTA, and Grand Slam tennis.

The application features a React frontend (built with Next.js) and a headless-Wordpress backend for content management.

In addition to the blog content, **ACE TENNIS RANKINGS** provides users with up-to-date Singles, Doubles, and Race rankings for both the ATP and WTA tours.

![Ace Tennis Rankings](https://res.cloudinary.com/tylerhuyser/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1780280161/Game%2C%20Set%2C%20Blog/Ace_Tennis_Rankings_Home_ukc4vu.png)

Lastly, to power this companion application, I created a custom, web-scraping API, **TENNIS-API**, which periodically crawls the ATP and WTA sites to populate live rankings acorss endpoints. 

Deployed Sites can be found below:
- [Game, Set, Blog](https://gamesetblog.com/)
- [Ace Tennis Rankings](https://rankings.gamesetblog.com/)
- [Tennis-API](https://tennis-api.fly.dev/api/atp/rankings/singles)

## RENDERS
 
Game, Set, Blog - Home (Desktop)

<img src="https://res.cloudinary.com/tylerhuyser/image/upload/v1780277214/Game%2C%20Set%2C%20Blog/Blog_-_Home_Animation_qjwz4d.gif" width=60% />

Game, Set, Blog - Home (Mobile)

![GAME, SET, BLOG - Home Page - Mobile Animation](https://res.cloudinary.com/tylerhuyser/image/upload/v1780277678/Game%2C%20Set%2C%20Blog/Blog_-_Home_Mobile_Animation_rx6q2s.gif)

Game, Set, Blog - Post

![Game, Set, Blog - Post](https://res.cloudinary.com/tylerhuyser/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1780279145/Game%2C%20Set%2C%20Blog/Game%20Set%20Blog%20-%20Post.gif)

## TECHNOLOGY STACK

| **Layer** | **Technologies** |
| -------- | -------- |
| Frontend (Blog) | React + Next.js|
| Backend (Blog) | Wordpress |
| Frontend (Rankings) | React + Vite |
| Backend (Rankings + API) | Node.js, Express.js, Fly.io |
| Styling | Custom CSS, CSS Grid, CSS Flexbox |
| Deployment | Netlify (blog + rankings), Fly.io (API), and BlueHost (Wordpress) |

## KEY IMPLEMENTATIONS:

### 1. Rendering Strategy

Game, Set, Blog's rendering strategy evolved through three distinct phases, each teaching valuable lessons about web performance and SEO.

**Phase 1: WordPress.com (2017)**
The original blog launched on WordPress.com, providing out-of-the-box SEO and search engine discoverability. However, it lacked customization and control.

**Phase 2: Single-Page Applications and Client-Side Rendering (Post-Bootcamp)**
After completing a coding bootcamp, I rebuilt the site as a React SPA with full design control. The downside was immediate: search engine traffic plummeted. Client-side rendering meant crawlers couldn't access content until JavaScript executed, severely impacting SEO and initial page loads.

**Phase 3: Server-Side Rendering (SSR Experiment)**
To regain discoverability, I migrated to SSR. While this solved SEO issues and was crawlable, every page request required server computation, resulting in slow response times and poor Core Web Vitals.

**Phase 4: Incremental Static Regeneration (ISR) — Final Solution**
The breakthrough came with ISR: pages are statically generated at build time for lightning-fast performance, but regenerated on-demand when content changes via webhook revalidation. This provides the best of all worlds: SEO discoverability, fast load times, and real-time content updates.

**Implementation: Webhook-Triggered Revalidation**

When a post is published, updated, or deleted in WordPress, a webhook triggers smart revalidation that updates not just the post itself, but all affected pages (home, categories, tags):

```

// _components/_posts/Posts.jsx

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    console.error('Invalid Revalidation Secret!')
    return Response.json(
      { message: 'Invalid Revalidation Secret!' },
      { status: 401 }
    );
  }

  let body
  try {
    body = await request.json()
  } catch (error) {
    console.error('Invalid JSON Payload!')
    return Response.json(
      { message: 'Invalid JSON' },
      { status: 400 }
    );
  }

  const { type, slug, postID } = body
  console.log(`Webhook Received: ${type} for ${slug || postID}`)

  try {
    switch (type) {
      case 'post_published':
      case 'post_updated':
        if (slug) {
          revalidatePath(`/posts/${slug}`)
          console.log(`Revalidated /posts/${slug}`)

          // Fetch post data to get categories and tags
          const postData = await getPostData(slug);
          
          if (postData && postData._embedded) {

            // Revalidate all category pages this post belongs to
            const categories = postData._embedded['wp:term']?.[0] || [];
            for (const category of categories) {
              revalidatePath(`/categories/${category.id}/${category.slug}`);
              console.log(`Revalidated /categories/${category.id}/${category.slug}`);
            }

            // Revalidate all tag pages this post belongs to
            const tags = postData._embedded['wp:term']?.[1] || [];
            for (const tag of tags) {
              revalidatePath(`/tags/${tag.id}/${tag.slug}`);
              console.log(`Revalidated /tags/${tag.id}/${tag.slug}`);
            }
          }
        }

        // Revalidate Homepage
        revalidatePath(`/`)
        console.log('Revalidated Homepage')

        revalidateTag('all-posts', 'max');
        console.log(`Revalidated all-posts tag`)

        console.log(`Revalidation Complete`)

        break;
      
      case 'post_deleted':
          // When a post is deleted, revalidate listings
        revalidatePath('/');
        revalidateTag('all-posts', 'max');
          
        console.log(`Revalidated after post deletion`);
        break;
      
      case 'comment_added':
      case 'comment_approved':
        if (slug) {
          revalidatePath(`/posts/${slug}`)
          console.log(`Revalidated /posts/${slug} after approved comment.`)
        }
        break
      
      case 'category_updated':
        const { termId, termSlug } = body;
        if (termId && termSlug) {
          revalidatePath(`/categories/${termId}/${termSlug}`);
          console.log(`Revalidated /categories/${termId}/${termSlug}`);
        }
        break;
      
      case 'tag_updated':
        const tagId = body.termId;
        const tagSlug = body.termSlug;
        if (tagId && tagSlug) {
          revalidatePath(`/tags/${tagId}/${tagSlug}`);
          console.log(`Revalidated /tags/${tagId}/${tagSlug}`);
        }
      break;
      
      case 'revalidate_all':
        // Nuclear option: revalidate everything
        revalidatePath('/', 'layout');
        revalidateTag('all-posts', 'max');
        console.log(`Revalidated all pages`);
        break;

      default:
        console.warn(`Unknown webhook type: ${type}`);
        return Response.json(
          { message: 'Unknown webhook type' }, 
          { status: 400 }
        );
    }

    return Response.json({ 
      revalidated: true, 
      type,
      slug,
      timestamp: Date.now() 
    });

  } catch (error) {
    console.error('Error during revalidation:', error);
    return Response.json(
      { message: 'Error revalidating', error: error.message }, 
      { status: 500 }
    );
  }
}

```

![Responsive CSS](https://res.cloudinary.com/tylerhuyser/image/upload/v1780280424/Game%2C%20Set%2C%20Blog/GSB%20-%20Responsive%20CSS.gif)

### 2. Responsive CSS (Grid + Flexbox)

Game, Set, Blog features responsive styling that adapts across different breakpoints and screen sizes. 

To achieve this, I used css tools such as clamps and media queries:

```
:root {
  --fs-title: clamp(2rem, 1rem + 2vw, 2.25rem);
  --fs-heading: clamp(1.5rem, 0.9rem + 1.25vw, 1.75rem);
  --fs-body: clamp(1.25rem, 0.9rem + 0.75vw, 1.5rem);
  --fs-label: clamp(1rem, 0.75rem + 0.4vw, 1.25rem);
}

.section-container {
  width: 100%;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
}

@media only screen and (min-width: 1024px) {

  .section-container {
    padding: 4rem 2rem;
  }
}

```

Additionally, while previous projects have given me good experience with CSS Flexbox, I wanted to elevate my designs using CSS Grid.

Ultimately, I leared that Flexbox can be best at distributing groups of items, either horizontally or vvertically, whereas Grid can be leveraged to handle content across multiple planes.

#### Featured Post Cards (arranged with Flexbox)

![Featured Post Card](https://res.cloudinary.com/tylerhuyser/image/upload/v1780278580/Game%2C%20Set%2C%20Blog/Featured_Post_Card_f3wv68.png)

### Featured Post Card (individually designed with Grid)

![Individual Post Card](https://res.cloudinary.com/tylerhuyser/image/upload/v1780280568/Game%2C%20Set%2C%20Blog/Featured%20Post%20Card%20%28CSS%20-%20FlexBox%29.png)

```

#post-cards-container-featured {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
}

@media only screen and (min-width: 768px) {
  #post-cards-container-featured {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (min-width: 1024px) {
  #post-cards-container-featured {
    grid-template-columns: repeat(3, 1fr);
  }
}

.post-card {
  display: inline-grid;
  grid-template-columns: auto;
  grid-auto-rows: auto;
}

.image-wrapper {
  grid-row: 1 / span 2;
  grid-column: 1;
}

.post-content {
  grid-row: 2 / span 2;
  grid-column: 1;
}

```

### 3. Pinterest-like Masonry Grid

For the blog post archive and category pages, a Pinterest-style masonry layout provides visual interest while optimizing space.

I tried using properties, such as 'grid-template-columns' or 'display: grid-lanes' but these properties did not work. Either boxes were split across the top of bottom of the parent container or they were mis-aligned.

Ultimately, I used a plug-in: react-masonry-css.

```javascript
// _components/_posts/Posts.jsx
import Masonry from 'react-masonry-css';

export default function Posts({ postsData, totalPages }) {
  const breakpointColumns = {
    default: 2,    // 2 columns on desktop
    768: 1         // 1 column on tablet/mobile
  };
  
  return (
    
      {postsData.map((post) => (
        
      ))}
    
  );
}
```

### 4. Infinite Scroll

As users scroll through the masonry grid, new posts load automatically when they reach the bottom of the page. This is made possible through Intersection Observer.

```
// _components/_posts/Posts.jsx
import { useInView } from "react-intersection-observer";

export default function Posts({ postsData, totalPages, mode, sourceID }) {
  const [posts, setPosts] = useState(postsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [ref, inView] = useInView(); 

  async function loadMorePosts() {
    const nextPage = currentPage + 1;
    const response = await getPostsMethod({
      id: sourceID,
      page: nextPage,
      perPage: 5
    });
    
    if (response.data.length) {
      setCurrentPage(nextPage);
      setPosts(prevState => [...prevState, ...response.data]);
    }
  }

  useEffect(() => {
    // Load more when ref element comes into view AND more pages exist
    if (inView && currentPage < totalPages) {
      loadMorePosts();
    }
  }, [inView]);

  return (
    
      {posts.map((post) => (
        
      ))}
      {/* Loader appears at bottom; when visible, triggers loadMorePosts */}
      {currentPage < totalPages && }
    
  );
}
```

### 5. Animation Context System

In order to make the website feel more lively upon interaction, I used an Animation Context component to coordinate animations and micro-interactions.

```

// _components/_shared/_animations/AnimationContext.jsx

export const AnimationProvider = ({ children }) => {

  const [navAnimationComplete, setNavAnimationComplete] = useState(false);

  const [heroAnimationStarted, setHeroAnimationStarted] = useState(false);

  const [featuredAnimationStarted, setFeaturedAnimationStarted] = useState(false);

  useEffect(() => {

    // Nav balls roll in (300ms delay, 800ms duration)

    const navTimer = setTimeout(() => {

      setNavAnimationComplete(true);

      setHeroAnimationStarted(true);

    }, ANIMATION_TIMINGS.navComplete); // 2700ms

    // Featured section fades in after hero completes

    const featuredTimer = setTimeout(() => {

      setFeaturedAnimationStarted(true);

    }, ANIMATION_TIMINGS.heroComplete); // 4750ms

    return () => {

      clearTimeout(navTimer);

      clearTimeout(featuredTimer);

    };

  }, []);

  return (

    <AnimationContext.Provider value={{

      navAnimationComplete,

      heroAnimationStarted,

      featuredAnimationStarted,

      timings: ANIMATION_TIMINGS

    }}>

      {children}

    </AnimationContext.Provider>

  );

};

```

### 6. Post Excerpt Truncation & Read Time Estimation

Post excerpts are truncated to 300 characters and HTML tags are stripped for clean display. Read time is estimated based on average reading speed:

```javascript
// utils/estimateReadTime.js
export function estimateReadTime(html, wpm = 200) {
  if (!html) return null;

  // Strip HTML tags and count words
  const text = html
    .replace(/]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const wordCount = text.split(' ').length;
  const minutes = Math.ceil(wordCount / wpm);

  return formatReadTime(minutes);
}

function formatReadTime(minutes) {
  if (minutes <= 2) return "2 MIN READ";
  if (minutes <= 5) return "5 MIN READ";
  if (minutes <= 8) return "8 MIN READ";
  if (minutes <= 10) return "10 MIN READ";
  if (minutes <= 15) return "15 MIN READ";
  return "15+ MIN READ";
}
```

**Usage in PostCard:**

```javascript
const htmlContent = postData.content.rendered
  .toString()
  .slice(postData.content.rendered.indexOf(""));

const readTime = estimateReadTime(htmlContent);

return (
  
    {parse(postData.excerpt.rendered
      .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '') // Strip HTML
      .slice(0, 300) // Truncate
      .trim()
    )}
  
);
```

---

### 7. Utility: Date Formatting for Rankings

The Ace Tennis Rankings updates every Monday. A utility function calculates the most recent Monday for consistent publication date display:

```javascript
// utils/getMostRecentMonday.js
export function getMostRecentMonday(isoDateString) {
  const date = new Date(isoDateString);
  const day = date.getUTCDay();

  // Calculate days since Monday (1 = Monday, 0 = Sunday)
  const diff = (day === 1 ? 0 : (day === 0 ? 6 : day - 1));

  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - diff);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = months[monday.getUTCMonth()];
  const dayOfMonth = monday.getUTCDate();
  const year = monday.getUTCFullYear();

  return `${monthName} ${dayOfMonth}, ${year}`;
}
```

**Used in Rankings Component:**

```javascript
const publishDate = getMostRecentMonday(date);

return (
  
    {`${tour} ${type} Rankings`}
    {`Published ${publishDate}`}
  
);
```







