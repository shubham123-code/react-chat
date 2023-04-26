import React, { useState } from 'react'
import { auth,db } from "../firebase";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import SendBtn from "../img/icons8-send-24.png";

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
    <div className="py-5">
      <form className='flex' onSubmit={(event) => sendMessage(event)}>
          <input
            value={message} onChange={(e)=>(setMessage(e.target.value))}
            className="bg-gray-800 py-5 px-3 rounded-xl w-full"
            type="text"
            placeholder="type your message here..."
          />
          <button type='submit' className='p-4 mx-4 my-2 rounded-full bg-white hover:bg-blue-300 transition-transform'> <img src={SendBtn}/></button>
        </form>
    </div>
   
  )
}

export default SendMessage