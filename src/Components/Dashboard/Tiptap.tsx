'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar'

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
}

const Tiptap: React.FC<TiptapProps> = ({ content, onChange }) => {
 
    const handlechange = (e:string)=>{
        onChange(e)
    }

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps:{
        attributes:{
            class:"flex flex-col px-4 py-3 border-b border-r border-l border-gray-700 text-gray-400 text-start w-full gap-3 font-medium pt-4 outline-none"
        }
    },
     onUpdate:({editor})=>{
        handlechange(editor.getHTML())
     }
  })

  return (
  <div className='w-full'>
      <Toolbar editor = {editor} content={content}/>
      <EditorContent editor={editor} style={{whiteSpace:"pre-line"}}/>
  </div>
  )
}

export default Tiptap
