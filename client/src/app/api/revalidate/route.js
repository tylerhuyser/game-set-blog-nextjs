import { revalidatePath, revalidateTag } from "next/cache";

const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://www.admin.gamesetblog.com/wp-json/wp/v2';

async function getPostData(slug) {
  try {
    const res = await fetch(
      `${WP_API_URL}/posts?slug=${slug}&_embed`,
      { cache: 'no-store' } // Don't cache this fetch
    );
    
    if (!res.ok) return null;
    
    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post data:', error);
    return null;
  }
}

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
              console.log(`✅ Revalidated /categories/${category.id}/${category.slug}`);
            }

            // Revalidate all tag pages this post belongs to
            const tags = postData._embedded['wp:term']?.[1] || [];
            for (const tag of tags) {
              revalidatePath(`/tags/${tag.id}/${tag.slug}`);
              console.log(`✅ Revalidated /tags/${tag.id}/${tag.slug}`);
            }
          }
        }

        // Revalidate Homepage
        revalidatePath(`/`)
        console.log('Revalidated Homepage')

        revalidateTag('all-posts', 'layout');
        console.log(`Revalidated all-posts tag`)

        console.log(`Revalidation Complete`)

        break;
      
      case 'post_deleted':
          // When a post is deleted, revalidate listings
        revalidatePath('/');
        revalidateTag('all-posts', 'layout');
          
        console.log(`✅ Revalidated after post deletion`);
        break;
      
      case 'comment_added':
      case 'comment_approved':
        if (slug) {
          revalidatePath(`/posts/${slug}`)
          console.log(`Revalidated /posts/${slug} after approved comment.`)
        }
        break
      
      case 'category_updated':
        // Revalidate specific category page
        const { termId, termSlug } = body;
        if (termId && termSlug) {
          revalidatePath(`/categories/${termId}/${termSlug}`);
          console.log(`✅ Revalidated /categories/${termId}/${termSlug}`);
        }
        break;
      
      case 'tag_updated':
        // Revalidate specific tag page
        const tagId = body.termId;
        const tagSlug = body.termSlug;
        if (tagId && tagSlug) {
          revalidatePath(`/tags/${tagId}/${tagSlug}`);
          console.log(`✅ Revalidated /tags/${tagId}/${tagSlug}`);
        }
      break;
      
      case 'revalidate_all':
        // Nuclear option: revalidate everything
        revalidatePath('/', 'layout');
        revalidateTag('all-posts', 'layout');
        console.log(`✅ Revalidated all pages`);
        break;

      default:
        console.warn(`⚠️  Unknown webhook type: ${type}`);
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

export async function GET(request) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({message: 'Invalid Secret'}, {status: 401})
  }

  return Response.json({
    message: 'Revalidation API is working.',
    usage: "Send POST request with JSON body: {type, slug, postID}",
    types: [
      'post_published',
      'post_updated',
      'post_deleted',
      'comment_added',
      'comment_approved',
      'category_updated',
      'tag_updated',
      'revalidate_all'
    ],
    note: 'Categories and tags are automatically revalidated when a post is updated'
  });
}