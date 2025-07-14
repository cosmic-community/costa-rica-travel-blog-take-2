'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getCategoryColorClass } from '@/lib/utils'
import type { Category } from '@/types'

interface NavigationProps {
  categories: Category[]
}

export default function Navigation({ categories }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-gray-700 hover:text-primary font-medium">
          Home
        </Link>
        
        {categories.map((category) => {
          const name = category.metadata?.name || category.title
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="text-gray-700 hover:text-primary font-medium"
            >
              {name}
            </Link>
          )
        })}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden">
          <div className="container-responsive py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {categories.map((category) => {
                const name = category.metadata?.name || category.title
                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="text-gray-700 hover:text-primary font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}