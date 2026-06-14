import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, Quote, Code, Link2, Image,
  AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Heading3, Undo2, Redo2,
  Table, Highlighter, Minus,
} from 'lucide-react'

function ToolbarButton({ onClick, active, title, children, disabled = false }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      disabled={disabled}
      className="p-1.5 rounded-lg transition-colors text-sm flex items-center justify-center"
      style={{
        background: active ? '#01696f20' : 'transparent',
        color: active ? '#01696f' : 'var(--color-text-muted)',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 mx-0.5 shrink-0" style={{ background: 'var(--color-border)' }} />
}

export default function TipTapToolbar({ editor }) {
  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('Image URL:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const addLink = () => {
    const url = window.prompt('URL:')
    if (url) editor.chain().focus().setLink({ href: url }).run()
    else editor.chain().focus().unsetLink().run()
  }

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  return (
    <div
      className="flex flex-wrap items-center gap-0.5 p-2"
      style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-alt)' }}
    >
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
        <Undo2 size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
        <Redo2 size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="H1">
        <Heading1 size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2">
        <Heading2 size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="H3">
        <Heading3 size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
        <Bold size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
        <Italic size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
        <Underline size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
        <Strikethrough size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">
        <Highlighter size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left">
        <AlignLeft size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align center">
        <AlignCenter size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align right">
        <AlignRight size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
        <List size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered list">
        <ListOrdered size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
        <Quote size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">
        <Code size={14} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Add link">
        <Link2 size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={addImage} title="Add image">
        <Image size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={addTable} title="Insert table">
        <Table size={14} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
        <Minus size={14} />
      </ToolbarButton>
    </div>
  )
}
