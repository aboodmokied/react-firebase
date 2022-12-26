import React from 'react'
import {AiOutlineClose} from 'react-icons/ai' 
import {BsPencilSquare} from 'react-icons/bs' 
function Note({title,body,id,deleteNote,showUpdate}) {
  return (
    <div className='p-5 bg-green-400 rounded-lg w-full relative'>
      <h1 className='font-bold text-lg text-white my-3'>{title}</h1>
      <div className='bg-white rounded-lg text-black p-4'>{body}</div>
      <div className='absolute top-3 right-3 flex items-center gap-3'>
      <button
      onClick={()=>showUpdate(id)}
      className=' text-white text-lg  duration-150 hover:text-zinc-700 cursor-pointer'><BsPencilSquare/></button>
      <button 
      onClick={()=>deleteNote(id)}
      className=' text-white bg-red-500 p-[4px] rounded-full text-sm hover:shadow duration-150 hover:shadow-black cursor-pointer'><AiOutlineClose/>
      </button>
      </div>
    </div>
  )
}

export default Note
