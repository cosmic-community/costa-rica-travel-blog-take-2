import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Costa Rica Travel Blog',
  description: 'Discover the beauty of Costa Rica through our travel blog featuring wildlife, beaches, adventures, and cultural experiences.',
  keywords: 'Costa Rica, travel, blog, wildlife, beaches, adventure, culture, conservation',
  authors: [{ name: 'Costa Rica Travel Blog' }],
  creator: 'Costa Rica Travel Blog',
  publisher: 'Costa Rica Travel Blog',
  openGraph: {
    title: 'Costa Rica Travel Blog',
    description: 'Discover the beauty of Costa Rica through our travel blog featuring wildlife, beaches, adventures, and cultural experiences.',
    url: 'https://your-domain.com',
    siteName: 'Costa Rica Travel Blog',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/6cb85190-607e-11f0-a051-23c10f41277a-photo-1618477388954-7852f32655ec-1752475655292.jpg?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Costa Rica Travel Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Costa Rica Travel Blog',
    description: 'Discover the beauty of Costa Rica through our travel blog featuring wildlife, beaches, adventures, and cultural experiences.',
    images: ['https://imgix.cosmicjs.com/6cb85190-607e-11f0-a051-23c10f41277a-photo-1618477388954-7852f32655ec-1752475655292.jpg?w=1200&h=630&fit=crop&auto=format,compress'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}