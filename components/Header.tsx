import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'

export default async function Header() {
  const categories = await getCategories()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary">
            Costa Rica Travel Blog
          </Link>
          
          <Navigation categories={categories} />
        </div>
      </div>
    </header>
  )
}