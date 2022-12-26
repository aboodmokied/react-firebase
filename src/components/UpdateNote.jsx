import React, { useState } from 'react'
import {updateDoc,doc} from '@firebase/firestore'
import {AiOutlineCloseCircle} from 'react-icons/ai'
function UpdateNote({setReload,db,id,setShowUpdate}) {
    const initailValue={title:'',body:''}
    const [newNote,addNewNote]=useState(initailValue)
    const updateNote=async(e)=>{
        e.preventDefault()
        const newObj={}
        if(newNote.title)newObj.title=newNote.title
        if(newNote.body)newObj.body=newNote.body

        const objRef=doc(db,"notes",id)
        if(newNote.title||newNote.body){

            await updateDoc(objRef,newObj)
            setReload(prev=>!prev)
        }
        addNewNote(initailValue)
        setShowUpdate(false)
    }
  return (
    <div className='relative w-screen h-screen bg-zinc-900/60'>
        <span
        onClick={()=>setShowUpdate(false)}
        className='absolute top-5 right-5 text-2xl text-white cursor-pointer hover:text-red-500 duration-150'><AiOutlineCloseCircle/></span>
        <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-5 bg-green-400 rounded-lg'>
        <h1 className='text-white font-bold text-lg mb-3'>Update Note:</h1>
        <form onSubmit={(e)=>updateNote(e)} className='flex flex-col items-center gap-3'>
        <input className='p-1 rounded outline-0' type="text" placeholder='Add Title'  value={newNote.title} onChange={e=>addNewNote(prev=>({...prev,title:e.target.value}))} />
        <input className='p-1 rounded outline-0' type="text" placeholder='Add Body'  value={newNote.body} onChange={e=>addNewNote(prev=>({...prev,body:e.target.value}))} />
        <button className='bg-white p-3 rounded-lg font-semibold hover:shadow-md'>Update</button>  
        </form>
        </div>
    </div>
  )
}

export default UpdateNote