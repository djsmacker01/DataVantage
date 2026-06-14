import { generateHTML } from '@tiptap/react'
import { editorExtensions } from '@/lib/editorExtensions'

export default function RichTextRenderer({ content }) {
  if (!content) return null

  let html = ''
  try {
    html = generateHTML(content, editorExtensions)
  } catch {
    return <div className="prose-content text-sm" style={{ color: 'var(--color-text-muted)' }}>Content unavailable.</div>
  }

  return (
    <div
      className="prose-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
