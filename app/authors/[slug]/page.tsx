// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { getOptimizedImageUrl } from '@/lib/utils'
import PostCard from '@/components/PostCard'
import SocialLinks from '@/components/SocialLinks'
import type { Metadata } from 'next'
import type { Author } from '@/types'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.',
    }
  }

  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio || `Read posts by ${name}`
  const imageUrl = author.metadata?.profile_photo?.imgix_url

  return {
    title: `${name} | Costa Rica Travel Blog`,
    description: bio,
    openGraph: {
      title: `${name} | Costa Rica Travel Blog`,
      description: bio,
      images: imageUrl ? [
        {
          url: getOptimizedImageUrl(imageUrl, { width: 1200, height: 630 }),
          width: 1200,
          height: 630,
          alt: name,
        }
      ] : undefined,
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const [author, posts] = await Promise.all([
    getAuthor(slug),
    getPostsByAuthor(slug)
  ])

  if (!author) {
    notFound()
  }

  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const profilePhoto = author.metadata?.profile_photo
  const email = author.metadata?.email
  const website = author.metadata?.website
  const instagram = author.metadata?.instagram
  const twitter = author.metadata?.twitter

  return (
    <div className="py-8">
      <div className="container-responsive">
        {/* Author Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-shrink-0">
              {profilePhoto ? (
                <img
                  src={getOptimizedImageUrl(profilePhoto.imgix_url, { width: 200, height: 200 })}
                  alt={name}
                  width={200}
                  height={200}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl md:text-4xl font-bold text-gray-500">
                    {name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {name}
              </h1>
              
              {bio && (
                <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                  {bio}
                </p>
              )}
              
              <SocialLinks
                email={email}
                website={website}
                instagram={instagram}
                twitter={twitter}
              />
            </div>
          </div>
        </header>

        {/* Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Posts by {name} ({posts.length})
          </h2>
          
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No posts found by this author yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}