import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import { editorExtensions } from '@/lib/editorExtensions'
import TipTapToolbar from './TipTapToolbar'

export default function TipTapEditor({ content, onChange, placeholder = 'Start writing your article…' }) {
  const editor = useEditor({
    extensions: [
      ...editorExtensions,
      Placeholder.configure({ placeholder }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
    editorProps: {
      attributes: {
        class: 'prose-content min-h-[400px] p-5 outline-none',
      },
    },
  })

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
    >
      <TipTapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
