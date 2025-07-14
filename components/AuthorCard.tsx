import Link from 'next/link'
import { getOptimizedImageUrl } from '@/lib/utils'
import SocialLinks from '@/components/SocialLinks'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  if (!author.metadata) return null

  return (
    <div className="card">
      <div className="flex items-start gap-4">
        <Link href={`/authors/${author.slug}`}>
          <div className="flex-shrink-0">
            {author.metadata.profile_photo && (
              <img
                src={getOptimizedImageUrl(author.metadata.profile_photo.imgix_url, { width: 80, height: 80 })}
                alt={author.metadata.name || author.title}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
          </div>
        </Link>
        <div className="flex-1">
          <Link href={`/authors/${author.slug}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors">
              {author.metadata.name || author.title}
            </h3>
          </Link>
          {author.metadata.bio && (
            <p className="text-gray-600 mt-2">
              {author.metadata.bio}
            </p>
          )}
          <div className="mt-3">
            <SocialLinks 
              email={author.metadata.email}
              website={author.metadata.website}
              instagram={author.metadata.instagram}
              twitter={author.metadata.twitter}
            />
          </div>
        </div>
      </div>
    </div>
  )
}