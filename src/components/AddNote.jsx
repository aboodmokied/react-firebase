import React, { useState } from 'react'
import {addDoc} from '@firebase/firestore'

function AddNote({setReload,collectionRef}) {
    const initailValue={title:'',body:''}
    const [newNote,addNewNote]=useState(initailValue)
    const addNote=async(e)=>{
        e.preventDefault()
        const newObj={
            title:newNote.title,
            body:newNote.body
        }
        await addDoc(collectionRef,newObj)
        addNewNote(initailValue)
        setReload(prev=>!prev)
    }
  return (
    <div className='p-5 bg-green-400 rounded-lg '>
    <h1 className='text-white font-bold text-lg mb-3'>Add Note:</h1>
    <form onSubmit={(e)=>addNote(e)} className='flex flex-col items-center gap-3'>
      <input className='p-1 rounded outline-0' type="text" placeholder='Add Title' required value={newNote.title} onChange={e=>addNewNote(prev=>({...prev,title:e.target.value}))} />
      <input className='p-1 rounded outline-0' type="text" placeholder='Add Body' required value={newNote.body} onChange={e=>addNewNote(prev=>({...prev,body:e.target.value}))} />
      <button className='bg-white p-3 rounded-lg font-semibold hover:shadow-md'>ADD</button>  
    </form>
    </div>
  )
}

export default AddNote
