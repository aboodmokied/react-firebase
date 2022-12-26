import { useState,useEffect } from 'react';
import {getDocs,collection,doc,deleteDoc} from '@firebase/firestore'
//getDocs(CollectionRef)
//addDoc(CollectionRef,obj)
//updateDoc(objRef,{newValues})
//deleteDoc(objRef)
//doc(db,colRef,id) >> make ref for spicific obj

import { db } from './firebase-config';
import './App.css';
import Note from './components/Note';
import AddNote from './components/AddNote';
import UpdateNote from './components/UpdateNote';

function App() {
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  const [notes,setNotes]=useState([]);
  const [list,setList]=useState([])
  const [reload,setReload]=useState(false)
  const [showUpdate,setShowUpdate]=useState(false)
  const [updateId,setUpdateId]=useState(null)
  const notesCollectionRef=collection(db,"notes")
  useEffect(()=>{
    const getPosts=async()=>{
      try{
        const data=await getDocs(notesCollectionRef)
        // data => docs[0].data()
        //id => docs[0].id
        const notes=data.docs.map(doc=>({...doc.data(),id:doc.id}))
        setNotes(notes)
      }catch(err){
        setError(err.message)
      }finally{
        setLoading(false)
      }
    }
    getPosts()
  },[reload])

  const makeList=()=>{
    let list=[]
    if(notes.length>0){
      list=notes.map(n=><Note key={n.id} id={n.id} body={n.body} title={n.title} showUpdate={showUpdateHandler} deleteNote={deleteNote}/>)
      
    }
    return list
  }

  useEffect(()=>{
    setList(makeList())
  },[notes])


  const deleteNote=async(id)=>{
    const objRef=doc(db,"notes",id)
    await deleteDoc(objRef)
    setReload(prev=>!prev)
  }
  
  const showUpdateHandler=(id)=>{
    setUpdateId(id)
    setShowUpdate(true)
  }
  return (
    <div className='relative'>
     {showUpdate&&(<div className='absolute top-0 left-0 z-10'>
    <UpdateNote setReload={setReload} db={db} id={updateId} setShowUpdate={setShowUpdate}/>
      </div> )}

    <div className='p-5'>
    <AddNote
    setReload={setReload}
    collectionRef={notesCollectionRef}
    />
    <h1 className='text-center font-bold text-xl my-5'>Notes:</h1>
    {loading?<h1 className='text-center'>Loading</h1>:list.length==0?<h1 className='text-center text-red-500 font-bold'>No Notes..</h1>:
    (<div className="flex flex-col gap-5 items-center ">{list}</div>)
  }
    
    </div>
  </div>
  );
}

export default App;

// loading at first
// first fetch will stop the loading (show data or empty or error)