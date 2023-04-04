import React, { useState } from 'react'
import { auth,db } from "../firebase";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SendMessage = () => {
  const [message,setMessage]=useState("")
  const sendMessage = async(event) => {
    event.preventDefault();
    if(message.trim()===""){
      alert("Enter valid message");
      return;
    }
    const {uid, displayName, photoURL}=auth.currentUser
    await addDoc(collection(db, "messages"),{
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("")
  }
  return (
    <div className='w-1/2'>
      <form className='flex' onSubmit={(event) => sendMessage(event)}>
        <label htmlFor="messageInput" hidden>
          Enter Message
        </label>
        <input value={message} onChange={(e)=>(setMessage(e.target.value))} className='w-full h-10 text-[20px] px-2' placeholder='Type message ..' />
        <button type='submit' className='px-2 bg-gradient-to-tr from-blue-500 to-black text-white'>Send!</button>
      </form>
    </div>
  )
}

export default SendMessage