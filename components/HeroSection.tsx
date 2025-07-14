import Link from 'next/link'
import { getOptimizedImageUrl } from '@/lib/utils'

export default function HeroSection() {
  const heroImage = "https://imgix.cosmicjs.com/6cb85190-607e-11f0-a051-23c10f41277a-photo-1618477388954-7852f32655ec-1752475655292.jpg"

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={getOptimizedImageUrl(heroImage, { width: 1920, height: 1080 })}
          alt="Costa Rica Beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Discover Costa Rica's Natural Wonders
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-balance">
          Explore pristine beaches, incredible wildlife, and rich culture through our travel stories and conservation adventures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/categories/beaches"
            className="btn btn-primary px-8 py-3 text-lg"
          >
            Explore Beaches
          </Link>
          <Link
            href="/categories/wildlife"
            className="btn bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Wildlife Stories
          </Link>
        </div>
      </div>
    </section>
  )
}