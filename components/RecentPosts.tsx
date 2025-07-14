import Link from 'next/link'
import PostCard from '@/components/PostCard'
import type { Post } from '@/types'

interface RecentPostsProps {
  posts: Post[]
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Recent Stories
          </h2>
          <Link
            href="/posts"
            className="text-primary hover:text-primary-600 font-medium"
          >
            View All Posts →
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}