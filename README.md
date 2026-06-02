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
<br>
<br>
<br>

### 4. Infinite Scroll

![Infinite Scroll](https://res.cloudinary.com/tylerhuyser/image/upload/v1780282527/Game%2C%20Set%2C%20Blog/GSB%20-%20Infinte%20Scroll.gif)

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
<br>
<br>
<br>

### 5. Animation Context System

![GSB - Animation Provider](https://res.cloudinary.com/tylerhuyser/image/upload/v1780281939/Game%2C%20Set%2C%20Blog/GSB%20-%20Animation%20Context%20Provider.gif)

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

<br>
<br>
<br>

### 6. Post Excerpt Truncation & Read Time Estimation

![Read Estimate - GSB](https://res.cloudinary.com/tylerhuyser/image/upload/v1780282943/Game%2C%20Set%2C%20Blog/Read%20Estimate%20-%20GSB.png)

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

<br>
<br>
<br>

### 7. Utility: Date Formatting for Rankings

![Rankings - Time](https://res.cloudinary.com/tylerhuyser/image/upload/v1780282886/Game%2C%20Set%2C%20Blog/Time%20Reformatting%20-%20Rankings.png)

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







