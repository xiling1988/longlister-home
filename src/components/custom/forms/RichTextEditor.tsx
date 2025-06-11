import Label from '@/components/tailAdmin/form/Label'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { Bold, Italic, List, ListOrdered, Quote } from 'lucide-react'
import React from 'react'
import Select from '@/components/tailAdmin/form/Select'
import Button from '@/components/tailAdmin/ui/button/Button'

interface RichTextEditorProps {
  title: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({
  title,
  value = '',
  onChange,
  placeholder = 'Write something...',
  className = '',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading extension
      }),
      // Add custom heading extension with specific levels
      // This allows you to control which heading levels are available
      Heading.configure({
        levels: [1, 2, 3], // enable H1, H2, H3 — customize as needed
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
    editorProps: {
      attributes: {
        class:
          'prose max-w-none min-h-[150px] w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700',
      },
    },
  })

  if (!editor) return null

  return (
    <div className={className}>
      <Label className="">{title}</Label>
      <div className="mb-2 flex justify-between rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
        <div className="mb-2 flex flex-wrap gap-2 rounded-lg">
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`${editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''} rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`${editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''} rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${editor.isActive('bold') ? 'text-brand-red' : 'text-gray-600'} rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${editor.isActive('italic') ? 'text-brand-red' : 'text-gray-600'} rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <Italic size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${editor.isActive('bulletList') ? 'text-brand-red' : 'text-gray-600'} rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${editor.isActive('orderedList') ? 'text-brand-red' : 'text-gray-600'} rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <ListOrdered size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${editor.isActive('blockquote') ? 'text-brand-red' : 'text-gray-600'} rounded-md px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <Quote size={18} />
          </button>
        </div>
        <Button
          variant="plain"
          size="sm"
          className="ml-3"
          onClick={() => {
            const html = editor.getHTML()
            console.log('Preview HTML:', html)
            // You can implement a modal or a preview component here
          }}
          disabled={!value}
        >
          Preview
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="tiptap min-h-[200px] rounded-xl"
      />
      <p>{value}</p>
    </div>
  )
}
