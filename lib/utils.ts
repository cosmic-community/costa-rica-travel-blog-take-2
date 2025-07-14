import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) {
    return 'Recently'
  }
  
  // Check if the date string is valid
  const date = new Date(dateString)
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Recently'
  }
  
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  } catch (error) {
    // Fallback if date formatting fails
    return 'Recently'
  }
}

export function getOptimizedImageUrl(
  baseUrl: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'jpg' | 'png'
    fit?: 'crop' | 'scale' | 'fill' | 'max'
  } = {}
): string {
  if (!baseUrl) return ''
  
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = 'auto',
    fit = 'crop'
  } = options
  
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    q: quality.toString(),
    auto: format === 'auto' ? 'format,compress' : format,
    fit
  })
  
  return `${baseUrl}?${params.toString()}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getCategoryColorClass(category: string): string {
  const colorMap: Record<string, string> = {
    'adventure': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'culture': 'bg-purple-100 text-purple-800 border-purple-200',
    'food': 'bg-orange-100 text-orange-800 border-orange-200',
    'nature': 'bg-green-100 text-green-800 border-green-200',
    'beaches': 'bg-blue-100 text-blue-800 border-blue-200',
    'wildlife': 'bg-amber-100 text-amber-800 border-amber-200',
    'travel-tips': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'accommodation': 'bg-pink-100 text-pink-800 border-pink-200',
    'transportation': 'bg-gray-100 text-gray-800 border-gray-200',
    'budget': 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
  
  // Default color for unknown categories
  return colorMap[category.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200'
}