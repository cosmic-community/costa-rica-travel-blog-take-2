import Link from 'next/link'
import { formatDate, getOptimizedImageUrl } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`}>
        <div className="card h-full">
          <div className="relative aspect-video">
            {post.metadata?.featured_image && (
              <img
                src={getOptimizedImageUrl(post.metadata.featured_image.imgix_url, { width: 400, height: 300 })}
                alt={post.metadata?.title || post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute top-4 left-4">
              {post.metadata?.category && (
                <CategoryBadge category={post.metadata.category} />
              )}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              {post.metadata?.title || post.title}
            </h3>
            {post.metadata?.excerpt && (
              <p className="text-gray-600 mb-4">
                {post.metadata.excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatDate(post.published_at || post.created_at)}</span>
              {post.metadata?.read_time && (
                <span>{post.metadata.read_time} min read</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}