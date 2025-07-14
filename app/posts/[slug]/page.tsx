// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/cosmic'
import { formatDate, getOptimizedImageUrl } from '@/lib/utils'
import PostContent from '@/components/PostContent'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'
import RelatedPosts from '@/components/RelatedPosts'
import type { Metadata } from 'next'
import type { Post } from '@/types'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }

  const title = post.metadata?.title || post.title
  const description = post.metadata?.excerpt || 'Read this amazing travel story about Costa Rica'
  const imageUrl = post.metadata?.featured_image?.imgix_url

  return {
    title: `${title} | Costa Rica Travel Blog`,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [
        {
          url: getOptimizedImageUrl(imageUrl, { width: 1200, height: 630 }),
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [getOptimizedImageUrl(imageUrl, { width: 1200, height: 630 })] : undefined,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const title = post.metadata?.title || post.title
  const excerpt = post.metadata?.excerpt
  const content = post.metadata?.content
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const readTime = post.metadata?.read_time
  const publishedAt = post.published_at || post.created_at

  return (
    <article className="py-8">
      <div className="container-responsive">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {category && <CategoryBadge category={category} />}
              <span className="text-gray-500">
                {formatDate(publishedAt)}
              </span>
              {readTime && (
                <span className="text-gray-500">
                  {readTime} min read
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
              {title}
            </h1>
            
            {excerpt && (
              <p className="text-xl text-gray-600 mb-6 text-balance">
                {excerpt}
              </p>
            )}
            
            {author && <AuthorCard author={author} />}
          </header>

          {/* Featured Image */}
          {featuredImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={getOptimizedImageUrl(featuredImage.imgix_url, { width: 1200, height: 600 })}
                alt={title}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          {content && <PostContent content={content} />}

          {/* Related Posts */}
          {category && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <RelatedPosts categorySlug={category.slug} currentPostId={post.id} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}