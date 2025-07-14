import Link from 'next/link'
import { formatDate, getOptimizedImageUrl } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'
import type { Post } from '@/types'

interface FeaturedPostsProps {
  posts: Post[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  const mainPost = posts[0]
  const sidePosts = posts.slice(1)

  if (!mainPost) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-responsive">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Stories
        </h2>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main Featured Post */}
          <article className="lg:row-span-2">
            <Link href={`/posts/${mainPost.slug}`} className="group block">
              <div className="card h-full">
                <div className="relative aspect-video">
                  {mainPost.metadata?.featured_image?.imgix_url && (
                    <img
                      src={getOptimizedImageUrl(mainPost.metadata.featured_image.imgix_url, { width: 800, height: 600 })}
                      alt={mainPost.metadata?.title || mainPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-4 left-4">
                    {mainPost.metadata?.category && (
                      <CategoryBadge category={mainPost.metadata.category} />
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {mainPost.metadata?.title || mainPost.title}
                  </h3>
                  {mainPost.metadata?.excerpt && (
                    <p className="text-gray-600 mb-4 text-lg">
                      {mainPost.metadata.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{formatDate(mainPost.published_at || mainPost.created_at)}</span>
                    {mainPost.metadata?.read_time && (
                      <span>{mainPost.metadata.read_time} min read</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </article>

          {/* Side Posts */}
          <div className="space-y-6">
            {sidePosts.map((post) => (
              <article key={post.id}>
                <Link href={`/posts/${post.slug}`} className="group block">
                  <div className="card">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {post.metadata?.featured_image?.imgix_url && (
                          <img
                            src={getOptimizedImageUrl(post.metadata.featured_image.imgix_url, { width: 200, height: 150 })}
                            alt={post.metadata?.title || post.title}
                            className="w-24 h-18 object-cover rounded group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {post.metadata?.category && (
                            <CategoryBadge category={post.metadata.category} size="small" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {post.metadata?.title || post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{formatDate(post.published_at || post.created_at)}</span>
                          {post.metadata?.read_time && (
                            <span>{post.metadata.read_time} min read</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}