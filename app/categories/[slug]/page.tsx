// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic'
import { getCategoryColorClass } from '@/lib/utils'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'
import type { Category } from '@/types'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    }
  }

  const name = category.metadata?.name || category.title
  const description = category.metadata?.description || `Explore ${name} posts on Costa Rica Travel Blog`

  return {
    title: `${name} | Costa Rica Travel Blog`,
    description,
    openGraph: {
      title: `${name} | Costa Rica Travel Blog`,
      description,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, posts] = await Promise.all([
    getCategory(slug),
    getPostsByCategory(slug)
  ])

  if (!category) {
    notFound()
  }

  const name = category.metadata?.name || category.title
  const description = category.metadata?.description
  const colorClass = getCategoryColorClass(category.slug)

  return (
    <div className="py-8">
      <div className="container-responsive">
        {/* Header */}
        <header className="mb-12">
          <div className="text-center">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${colorClass}`}>
              {name}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {name} Stories
            </h1>
            {description && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        </header>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}