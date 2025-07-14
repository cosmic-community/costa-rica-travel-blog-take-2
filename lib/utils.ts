import { format } from 'date-fns'
import type { CategoryColor } from '@/types'

export function formatDate(dateString: string): string {
  return format(new Date(dateString), 'MMMM d, yyyy')
}

export function getReadingTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function getCategoryColor(categorySlug: string): CategoryColor {
  const colorMap: Record<string, CategoryColor> = {
    adventure: 'adventure',
    beaches: 'beaches',
    wildlife: 'wildlife',
    culture: 'culture',
  }
  
  return colorMap[categorySlug] || 'beaches'
}

export function getCategoryColorClass(categorySlug: string): string {
  const colorMap: Record<string, string> = {
    adventure: 'bg-adventure text-white',
    beaches: 'bg-beaches text-white',
    wildlife: 'bg-wildlife text-white',
    culture: 'bg-culture text-white',
  }
  
  return colorMap[categorySlug] || 'bg-beaches text-white'
}

export function getCategoryBorderClass(categorySlug: string): string {
  const colorMap: Record<string, string> = {
    adventure: 'border-adventure',
    beaches: 'border-beaches',
    wildlife: 'border-wildlife',
    culture: 'border-culture',
  }
  
  return colorMap[categorySlug] || 'border-beaches'
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function extractTags(tagsString: string): string[] {
  if (!tagsString) return []
  return tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
}

export function getImageUrl(url: string, width: number, height: number): string {
  if (!url) return ''
  
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    fit: 'crop',
    auto: 'format,compress'
  })
  
  return `${url}?${params.toString()}`
}

export function getOptimizedImageUrl(url: string, options: {
  width?: number
  height?: number
  quality?: number
  fit?: 'crop' | 'fill' | 'scale'
} = {}): string {
  if (!url) return ''
  
  const {
    width = 800,
    height = 600,
    quality = 75,
    fit = 'crop'
  } = options
  
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    fit,
    auto: 'format,compress',
    q: quality.toString()
  })
  
  return `${url}?${params.toString()}`
}