import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CharacterCount from '@tiptap/extension-character-count'

export const editorExtensions = [
  StarterKit,
  Image.configure({ inline: false, allowBase64: false }),
  Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
  Underline,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Highlight.configure({ multicolor: false }),
  Table.configure({ resizable: false }),
  TableRow,
  TableCell,
  TableHeader,
  CharacterCount,
]
