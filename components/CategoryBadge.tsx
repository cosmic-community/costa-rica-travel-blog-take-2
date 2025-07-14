import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'small' | 'medium'
}

export default function CategoryBadge({ category, size = 'medium' }: CategoryBadgeProps) {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm'
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-flex items-center font-medium text-white bg-primary hover:bg-primary-600 rounded-full transition-colors ${sizeClasses[size]}`}
      style={{ backgroundColor: category.metadata?.color || '#3b82f6' }}
    >
      {category.metadata?.name || category.title}
    </Link>
  )
}