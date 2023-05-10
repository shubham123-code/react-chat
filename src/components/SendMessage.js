import React, { useState } from 'react'
import { auth,db } from "../firebase";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import SendBtn from "../img/icons8-send-24.png";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SendMessage = ({groupId}) => {

  const toastOptions = {
    position:'bottom-right',
    autoClass:8000,
    pauseOnHover:true,
    draggable: true,
    theme:"dark", 
  };

  const [message,setMessage]=useState("")
  const sendMessage = async(event) => {
    event.preventDefault();
    if(message.trim()===""){
      toast.error('Enter a valid message', toastOptions);
      return;
    }
    const {uid, displayName, photoURL}=auth.currentUser
    await addDoc(collection(db, "messages"),{
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      groupId: groupId,
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
        <ToastContainer />
    </div>
    
   
  )
}

export default SendMessage