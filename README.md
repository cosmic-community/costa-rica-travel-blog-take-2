# Costa Rica Travel Blog

![Costa Rica Travel Blog](https://imgix.cosmicjs.com/6cb85190-607e-11f0-a051-23c10f41277a-photo-1618477388954-7852f32655ec-1752475655292.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful, modern travel blog showcasing Costa Rica's incredible destinations, wildlife, and culture. Built with Next.js and powered by [Cosmic](https://www.cosmicjs.com) headless CMS.

## Features

- 🏝️ **Dynamic Content** - Posts, categories, and authors managed through Cosmic CMS
- 🎨 **Category-Based Design** - Color-coded categories for Adventure, Beaches, Wildlife, and Culture
- 👤 **Author Profiles** - Detailed author pages with bio, social links, and published posts
- 📱 **Responsive Design** - Beautiful on all devices with Tailwind CSS
- 🔍 **SEO Optimized** - Proper meta tags and structured data
- 📖 **Rich Content** - Markdown support with featured images and reading time

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=blog-production-9478bd30-607b-11f0-ae82-21883a5866db)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Add a new blog post for beaches about beach clean up and environemnt

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: "staging" in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh/)
- A Cosmic account with your blog content

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Copy the environment file:

```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Posts

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with author and category data
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a single post by slug
const post = await cosmic.objects
  .findOne({ type: 'posts', slug: 'your-post-slug' })
  .depth(1)
```

### Fetching Categories

```typescript
// Get all categories
const categories = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

### Fetching Authors

```typescript
// Get all authors
const authors = await cosmic.objects
  .find({ type: 'authors' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket structure:

- **Posts** - Blog articles with title, content, featured image, author, category, and tags
- **Categories** - Adventure, Beaches, Wildlife, Culture with color-coded themes
- **Authors** - Writer profiles with bio, photo, and social links

Visit the [Cosmic docs](https://www.cosmicjs.com/docs) to learn more about the Cosmic SDK.

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-repo)

### Environment Variables

Make sure to add your Cosmic credentials to your deployment platform:

- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

For production, set these environment variables in your hosting platform's dashboard.

<!-- README_END -->