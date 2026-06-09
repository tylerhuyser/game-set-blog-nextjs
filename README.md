![GAME, SET, BLOG - Home Page](https://res.cloudinary.com/tylerhuyser/image/upload/v1780277250/Game%2C%20Set%2C%20Blog/Blog_-_Home_Page_knoi1h.png)

# GAME, SET, BLOG

**GAME, SET, BLOG** is a personal blog cataloging analysis and opinion on ATP, WTA, and Grand Slam tennis.

The application features a React frontend (built with Next.js) and a headless-Wordpress backend for content management.

In addition to the blog, a companion app, **ACE TENNIS RANKINGS**, provides users with up-to-date Singles, Doubles, and Race rankings information for both the ATP and WTA tours.

<img src="https://res.cloudinary.com/tylerhuyser/image/upload/v1780280161/Game%2C%20Set%2C%20Blog/Ace_Tennis_Rankings_Home_ukc4vu.png" width=50%/>

Powering this companion application is a custom, web-scraping API, **TENNIS-API**, which periodically crawls the ATP and WTA sites to populate current rankings across endpoints.

Deployed Sites can be found below:
- [Game, Set, Blog](https://gamesetblog.com/)
- [Ace Tennis Rankings](https://rankings.gamesetblog.com/)
- [Tennis-API](https://tennis-api.fly.dev/api/atp/rankings/singles)

## RENDERS
 
Game, Set, Blog - Home (Desktop)

![GSB - HOME - DESKTOP](https://res.cloudinary.com/tylerhuyser/image/upload/v1780277214/Game%2C%20Set%2C%20Blog/Blog_-_Home_Animation_qjwz4d.gif)

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

The rendering strategy for Game, Set, Blog evolved through trial and error. The main priority being to maximize web performance, discoverability, and SEO.

**_Phase 1: WordPress.com (2017)_**

I began the blog before I knew how to code.

As I did not (yet) possess the skills required to make a custom application, I instead used a simple template from Wordpress.com to get started.

While these pre-made templates lacked ability for customization or control, they came with stellar search enginer discoverability out-of-the-box.

**_Phase 2: Single-Page Applications and Client-Side Rendering (Post-Bootcamp)_**

After completing the General Assembly coding bootcamp and learning how to use React, I decided to build a custom version of the site. I wanted to make something less generic and more unique.

I used React to create a client-rendered Single Page Application (an SPA) and while it helped to provide a customized experience (and not to mention, save me money on a Wordpress.com subscription), it also had its drawbacks.

The biggest drawback was the total loss of traffic to my site. With only a bootcamp-level understanding of rendering strategies, I was ignorant to the fact that web crawlers would no longer be able to "see" my site's content until the underlying JavaScript could execute.

**_Phase 3: Server-Side Rendering (SSR Experiment)_**

In a quest to regain discoverability and rebuild traffic, I migrated to Server-Side Rendering (SSR). Instead of the application rendering on the client, the server would render content upon each request and serve it to the user.

While this rendering strategy would work *in theory*, instead it introdcued new challenges. Now, each page request required the server to compute the full HTML, resulting in slower response times. Worse, server costs increased due to the computational overhead.

I was at my lowest point. That's when I discovered Incremental Static Regeneration (ISR)...

**_Phase 4: Incremental Static Regeneration (ISR) — Final Solution_**

A breakthrough came when I learned about Incremental Static Regeneration (ISR). In this set-up, pages are statically generated at build time—leading to speedy performance.

Moreover, whenever content is created, edited, or destroyed, corresponding pages can be generated (or *regenerated*) using a webhook.

**_Implementation: Webhook-Triggered Revalidation_**

Whenever a post is published, updated, or deleted in WordPress, a custom function triggers a webhook that instructs my host (in this case Netlify) which pages to build or rebuild. 

For example, a new post on “Roger Federer” would cause my application to build that page and potentially update tags, such as “Wimbledon” or “Grand Slam Champions”. The “Home” page featuring the fresh post will be rebuilt too.


```javascript

// api/revalidate/route.js

export async function POST(request) {

  <!-- 1. AUTHENTICATE WEBHOOK -->

  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    console.error('Invalid Revalidation Secret!')
    return Response.json(
      { message: 'Invalid Revalidation Secret!' },
      { status: 401 }
    );
  }

  <!-- 2. PARSE PAYLOAD -->

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

  <!-- 3. ROUTE BY EVEN TYPE & TRIGGER REVALIDATION -->

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

    <!-- 4. RETURN SUCCESS RESPONSE -->

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

<br>
<br>
<br>

### 2. Responsive CSS

![Responsive CSS](https://res.cloudinary.com/tylerhuyser/image/upload/v1780280424/Game%2C%20Set%2C%20Blog/GSB%20-%20Responsive%20CSS.gif)

I wanted Game, Set, Blog to look equally polished across desktop and mobile device.

The foundation for this relies on three tools working in harmony:

**_1. Fluid Typography with clamp()_**

To achieve this, I used css tools such as clamps and media queries:

Instead of fixed font sizes that break at arbitrary breakpoints, `clamp()` scales typography smoothly across the entire viewport. 

This means text grows gradually as the screen widens—no jarring jumps.

```css

// global.css

:root {
  --fs-title: clamp(2rem, 1rem + 2vw, 2.25rem);
  --fs-heading: clamp(1.5rem, 0.9rem + 1.25vw, 1.75rem);
  --fs-body: clamp(1.25rem, 0.9rem + 0.75vw, 1.5rem);
  --fs-label: clamp(1rem, 0.75rem + 0.4vw, 1.25rem);
}

```

**_Relative Units for Spacing_**

Using `rem` (root em) and viewport-relative units instead of pixels creates proportional layouts:


```css

// global.css

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

**_Flexbox vs. Grid_**

While previous projects gave me solid experience with CSS Flexbox, I wanted to elevate my designs by leveraging CSS Grid. After playing around with both, here's what I discovered:

- **Flexbox** excels at distributing groups of items in a single dimension (horizontally or vertically)
- **Grid** handles content across multiple planes, enabling complex 2D layouts with precise control

**_Arranging Multiple Post Cards (Flexbox)_**

The featured section container uses Flexbox to arrange the card groups responsively:

![Featured Post Cards with Flexbox](https://res.cloudinary.com/tylerhuyser/image/upload/v1780280568/Game%2C%20Set%2C%20Blog/Featured%20Post%20Card%20%28CSS%20-%20FlexBox%29.png)

```css

/ _components/_posts/PostCard.css

.post-cards-container {
  width: calc(100% - 0.5rem);
  padding: 0 0.25rem;

  display: flex;
  gap: 2rem;
}

```

**_Designing an Individual Post Card (CSS Grid)_**

Each featured card itself uses Grid to create a 2D layout where the image and content can overlap and align precisely:

![Individual Post Card with Grid](https://res.cloudinary.com/tylerhuyser/image/upload/v1780278580/Game%2C%20Set%2C%20Blog/Featured_Post_Card_f3wv68.png)

```css
/ _components/_featured/Featured.css

/* Individual card - uses grid for 2D layout (image + content) */
.post-card-content-container-featured {

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  row-gap: 0.5rem;
  align-items: center;

  grid-row: 2 / span 2;
  grid-column: 1;
  align-self: end;
  justify-self: center;

  z-index: 3;
  
}

.featured-post-title {

  grid-column: 1 / -1;
  grid-row: 1 / span 1;

}

.featured-post-excerpt {

  grid-column: 1 / -1;
  grid-row: 2 / span 1;

}

.featured-meta-container {
  grid-row: 4;
  grid-column: 1 / -1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 1rem;
}

```

<br>
<br>
<br>

### 3. Pinterest-like Masonry Grid

<img src="https://res.cloudinary.com/tylerhuyser/image/upload/v1780281338/Game%2C%20Set%2C%20Blog/GSB%20-%20Masonry%20Grid.png" width=50%/>

For the blog post archive, I wanted to create a layout that provided visual interest and optimize space. I looked to Pinterest for inspiration...

To recreate Pinterest's iconic 'masonry'-style layout, I tried using Flexbox, Grid, and a few new CSS properties, such as "display: grid lanes"--however I ran into a few issues:

- Items wouldn't balance evenly across columns
- Taller cards created gaps and wasted vertical space
- Cards would 'rearrange' when paired with infinite scroll

Rather than fighting CSS limitations, I leveraged the [React-Masonry-CSS](https://www.npmjs.com/package/react-masonry-css). library, library, which handles the complexity of distributing variable-height cards evenly.

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
<br>
<br>
<br>

### 4. Infinite Scroll

![Infinite Scroll](https://res.cloudinary.com/tylerhuyser/image/upload/v1780282527/Game%2C%20Set%2C%20Blog/GSB%20-%20Infinte%20Scroll.gif)

To keep the browsing experience fluid and engaging, new posts load automatically as users scroll toward the bottom of the page—making the site feel alive and continuous rather than fragmented by pagination.

Beyond UX, this approach provides a significant **performance benefit**: instead of loading all posts and images upfront, only visible content loads initially. As users scroll, new posts (and their images) load on-demand, reducing initial page weight and allowing users with slower connections to start browsing immediately.

This seamless experience is powered by the **Intersection Observer API**, which detects when the user scrolls near a loading trigger at the bottom of the page. Once visible, it automatically fetches the next batch of posts without requiring users to click "Next Page" or leave their scrolling rhythm.

```javascript

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
<br>
<br>
<br>

### 5. Animation Context System

![GSB - Animation Provider](https://res.cloudinary.com/tylerhuyser/image/upload/v1780281939/Game%2C%20Set%2C%20Blog/GSB%20-%20Animation%20Context%20Provider.gif)

The blog features a sophisticated animation system that makes the initial page load feel polished and alive, while subtle micro-interactions keep users engaged as they browse.

**Initial Page Load Sequence**

On first visit, animations coordinate in a choreographed sequence:

1. **Tennis Ball Logo (0-600ms)** - Three animated balls roll in from the right, rotating 720° and settling into place
2. **Navigation Links (600-1400ms)** - Logo text fades in with staggered link animations
3. **Hero Section (1400-2700ms)** - Tennis court background fades in
4. **Hero Icons (2700-3700ms)** - Player illustrations fade and scale up with stagger
5. **Featured Section (3700-4750ms)** - Featured posts fade in from below

Rather than hard-coding delays, a **React Context** manages timing globally:

```javascript

// _components/_shared/_animations/AnimationContext.jsx

export const AnimationProvider = ({ children }) => {
  const [heroAnimationStarted, setHeroAnimationStarted] = useState(false);
  const [featuredAnimationStarted, setFeaturedAnimationStarted] = useState(false);

  useEffect(() => {
    // Hero starts after nav completes (2700ms)
    const heroTimer = setTimeout(() => {
      setHeroAnimationStarted(true);
    }, ANIMATION_TIMINGS.navComplete);

    // Featured starts after hero completes (4750ms)
    const featuredTimer = setTimeout(() => {
      setFeaturedAnimationStarted(true);
    }, ANIMATION_TIMINGS.heroComplete);

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(featuredTimer);
    };
  }, []);

  return (
    
      {children}
    
  );
};

```

**Micro-Interactions**

Beyond the initial sequence, subtle animations reward user interactions:

- **Post Cards**: Lift and shadow shift on hover
- **Category/Tag Cards**: Yellow pseudo-element extends on hover
- **Images**: Scale smoothly when hovered
- **Navigation**: Balls roll in with cubic-bezier easing for organic motion

These micro-interactions make the site feel responsive and intentional—users know their actions registered.

```css

.post-card:hover .post-card-content-container {
  transform: translate(0.1875rem, -0.1875rem);
  transition: transform 0.25s ease;
}

.post-card::after {
  transform: translate(-0.25rem, 0.25rem);
  transition: transform 0.25s ease;
}

.post-card:hover::after {
  transform: translate(-0.375rem, 0.375rem);
}

```

<br>
<br>
<br>

### 6. Post Excerpt Truncation & Read Time Estimation

![Read Estimate - GSB](https://res.cloudinary.com/tylerhuyser/image/upload/v1780282943/Game%2C%20Set%2C%20Blog/Read%20Estimate%20-%20GSB.png)

Post cards display truncated excerpts and estimated read time, helping users quickly decide if an article is worth their time. Excerpts are limited to 300 characters with HTML tags stripped for clean display, while read time is calculated based on average adult reading speed (200 words per minute).

**Read Time Estimation** 

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
**Post Excerpt Truncation**

```javascript

// utils/truncateText.js

export function truncateAtWordBoundary(text, maxLength = 300) {
  if (!text || text.length <= maxLength) {
    return text;
  }

  // Truncate to maxLength
  let truncated = text.slice(0, maxLength);

  // Find the last space within the truncated text
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  // If a space is found, cut there; otherwise return as-is
  if (lastSpaceIndex > 0) {
    truncated = truncated.slice(0, lastSpaceIndex);
  }

  // Remove trailing punctuation if desired
  truncated = truncated.replace(/[.,!?;:]+$/, '');

  return truncated + '...';
}

```
<br>
<br>
<br>

### 7. Utility: Date Formatting for Rankings

![Rankings - Time](https://res.cloudinary.com/tylerhuyser/image/upload/v1780282886/Game%2C%20Set%2C%20Blog/Time%20Reformatting%20-%20Rankings.png)

The ATP and WTA publish official rankings every Monday. To ensure accurate publication dates across the platform, a utility function accepts the API's timestamp and returns the most recent Monday:

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

### 8. Tennis API

To power Ace Tennis Rankings, a custom REST API built with Node.js and Express serves real-time ranking data. Deployed on Fly.io, it acts as the single source of truth for ATP and WTA rankings across the platform.

**Live Endpoints**

The API provides 8 endpoints covering all ranking types:

**ATP Rankings:**
- [ATP Singles](https://tennis-api.fly.dev/api/atp/rankings/singles)
- [ATP Doubles](https://tennis-api.fly.dev/api/atp/rankings/doubles)
- [ATP Singles Race](https://tennis-api.fly.dev/api/atp/rankings/singles-race)
- [ATP Doubles Race](https://tennis-api.fly.dev/api/atp/rankings/doubles-race)

**WTA Rankings:**
- [WTA Singles](https://tennis-api.fly.dev/api/wta/rankings/singles)
- [WTA Doubles](https://tennis-api.fly.dev/api/wta/rankings/doubles)
- [WTA Singles Race](https://tennis-api.fly.dev/api/wta/rankings/singles-race)
- [WTA Doubles Race](https://tennis-api.fly.dev/api/wta/rankings/doubles-race)

**Sample Response Format**

Each endpoint returns an array of player rankings with the following structure:

```json
{
  "ranking": 1,
  "name": "Jannik Sinner",
  "country": "ITA",
  "points": 11180,
  "tournamentsPlayed": 32,
  "lastUpdated": "2024-12-30T00:00:00Z"
}
```

**Scraping Strategy**

The API scrapes official ATP and WTA rankings every Monday and maintains fresh data through an automated weekly pipeline. This ensures Ace Tennis Rankings always displays current standings without requiring manual updates or database administration.

**Weekly Execution with Daily Fallback:**

- **Monday (Primary)**: Scrapes new rankings immediately upon release
- **If Scrape Fails**: Automatically retries up to 3 times with exponential backoff
- **If All Retries Fail**: Marks cache as "stale" but continues serving existing data
- **Daily Check**: Detects stale cache and attempts fresh scrape daily until successful

This ensures Ace Tennis Rankings is always available—with fresh data when possible, or gracefully degraded with slightly older data if the weekly scrape encounters network issues.

```javascript

// api/services/populateCache.js

export async function populateCache(tour, type) {
  const cacheKey = `${tour}:${type}`;
  const maxRetries = 3;
  let retryCount = 0;

  async function fetchWithRetry() {
    try {
      // Scrape rankings from official ATP/WTA source
      const rankings = await scrapeRankings(tour, type);
      
      if (!rankings || rankings.length === 0) {
        throw new Error('No rankings data returned');
      }

      // Store in cache with timestamp
      cache.set(cacheKey, {
        data: rankings,
        timestamp: new Date(),
        stale: false
      });

      console.log(`Cache populated for ${tour} ${type}`);
      return rankings;

    } catch (error) {
      retryCount++;
      console.error(`Scrape failed (Attempt ${retryCount}/${maxRetries}):`, error.message);

      if (retryCount < maxRetries) {
        // Retry after exponential backoff (1s, 2s, 4s)
        const delay = Math.pow(2, retryCount) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry();
      }

      // All retries exhausted
      console.error(`Max retries reached for ${tour} ${type}`);
      
      // Mark existing cache as stale but keep serving it
      const existing = cache.get(cacheKey);
      if (existing) {
        existing.stale = true;
        console.log(`Serving stale cache for ${tour} ${type}`);
      }

      throw error;
    }
  }

  return fetchWithRetry();
}
```







