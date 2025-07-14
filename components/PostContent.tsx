import { marked } from 'marked'

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
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