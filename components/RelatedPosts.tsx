import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import type { Post } from '@/types'

interface RelatedPostsProps {
  categorySlug: string
  currentPostId: string
}

export default async function RelatedPosts({ categorySlug, currentPostId }: RelatedPostsProps) {
  const posts = await getPosts()
  
  // Filter posts by category and exclude current post
  const relatedPosts = posts
    .filter(post => 
      post.metadata?.category?.slug === categorySlug && 
      post.id !== currentPostId
    )
    .slice(0, 3)
  
  if (relatedPosts.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-responsive">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Related Stories
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}