import Link from 'next/link'
import { getCategoryColorClass } from '@/lib/utils'
import type { Category } from '@/types'

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null

  return (
    <section className="py-16">
      <div className="container-responsive">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Explore by Category
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const name = category.metadata?.name || category.title
            const description = category.metadata?.description
            const colorClass = getCategoryColorClass(category.slug)
            
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group block"
              >
                <div className="card h-full hover:shadow-lg transition-shadow">
                  <div className={`p-6 ${colorClass} text-center`}>
                    <h3 className="text-xl font-bold mb-2">
                      {name}
                    </h3>
                    {description && (
                      <p className="text-white/90 text-sm">
                        {description}
                      </p>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <span className="text-primary font-medium group-hover:underline">
                      Explore {name} →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}