import { getPosts, getCategories, getFeaturedPosts } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import FeaturedPosts from '@/components/FeaturedPosts'
import CategoryGrid from '@/components/CategoryGrid'
import RecentPosts from '@/components/RecentPosts'
import type { Post, Category } from '@/types'

export default async function HomePage() {
  const [featuredPosts, categories, recentPosts] = await Promise.all([
    getFeaturedPosts(),
    getCategories(),
    getPosts(6)
  ])

  return (
    <div>
      <HeroSection />
      <FeaturedPosts posts={featuredPosts} />
      <CategoryGrid categories={categories} />
      <RecentPosts posts={recentPosts} />
    </div>
  )
}

export const revalidate = 60