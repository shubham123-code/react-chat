import React, { useState } from 'react'
import { query, collection, orderBy, onSnapshot, limit, where, getDocs } from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { doc } from '@firebase/firestore'

const Message = ({message}) => {
  const [user]=useAuthState(auth)
  if(user){
  return (
    // <div className={`p-5 m-5 bg-gray-300 rounded-lg shadow-sm`}>
    //   <div className='flex w-full'>
    //   <div className='flex-row text-center'>
    //     {message.uid===user.uid?(<div>You</div>):(<div>{message.name}</div>)}
        
    //     <img src={img} alt="user avatar" className='rounded-full p-5 w-[90px] h-[90px]'/> 
    //   </div>
      
    //   <div className='p-5 break-all w-full border border-black'><p>{message.text}</p></div>
    //   </div>
    // </div>
    //<div class="flex flex-col mt-5">
    <div>

      {message.uid===user.uid?(
          <div class="flex justify-end mb-4">
            <div className='flex flex-row justify-between'>
            <div className="text-yellow">You</div>
            <div
              class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
            >
                          
            <div>{message.text}</div>
            </div>
            </div>
            <img
              src={user.photoURL}
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          
          </div>):(
          <div class="flex justify-start mb-4">
          <img
            src={message.avatar}
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div
            class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
          >
            
            <div>{message.text}</div>
          </div>
          <div className='p-2 text-yellow'>{message.name}</div>
        </div>)}
    </div>
          
  )
          }
}

export default Message