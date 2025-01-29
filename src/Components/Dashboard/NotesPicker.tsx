import React, { useState } from 'react'
import Tiptap from './Tiptap';

const NotesPicker = () => {
    const [content,setcontent] = useState<string>("");

    const handlecontent = (e:string)=>{
        setcontent(e);
    }
  return (
    <>
    <form className=' w-full grid place-items-center mx-auto p-10 pt-10 mb-10'>
        <div className='mx-auto'>
            <h2>Reports</h2>
        </div>
        <Tiptap 
         content = {content}
         onChange = {(e:any)=>handlecontent(e)}
        />
    </form>
    </>
  )
}

export default NotesPicker
