import { marked } from 'marked'
import type { Post } from '@/types'

interface PostContentProps {
  post: Post
}

export default function PostContent({ post }: PostContentProps) {
  const content = post.metadata?.content || ''
  
  if (!content) return null

  return (
    <div className="prose prose-lg max-w-none">
      <div 
        dangerouslySetInnerHTML={{ 
          __html: marked(content, { 
            breaks: true,
            gfm: true 
          }) 
        }} 
      />
    </div>
  )
}