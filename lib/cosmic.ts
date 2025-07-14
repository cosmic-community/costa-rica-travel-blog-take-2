import { createBucketClient } from '@cosmicjs/sdk'
import type { Post, Category, Author, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all posts with author and category data
export async function getPosts(limit?: number): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit || 100)
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

// Fetch a single post by slug
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .depth(1)
    
    if (!response.object) {
      return null
    }
    
    return response.object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch post: ${slug}`)
  }
}

// Fetch posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.category.slug': categorySlug 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch posts for category: ${categorySlug}`)
  }
}

// Fetch posts by author
export async function getPostsByAuthor(authorSlug: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.author.slug': authorSlug 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch posts for author: ${authorSlug}`)
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(100)
    
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Fetch a single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
    
    if (!response.object) {
      return null
    }
    
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch category: ${slug}`)
  }
}

// Fetch all authors
export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(100)
    
    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch authors')
  }
}

// Fetch a single author by slug
export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
    
    if (!response.object) {
      return null
    }
    
    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch author: ${slug}`)
  }
}

// Fetch featured posts (latest 3)
export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(3)
    
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured posts')
  }
}