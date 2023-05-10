import React, { useState } from 'react'
import { query, collection, orderBy, onSnapshot, limit, where, getDocs } from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { doc } from '@firebase/firestore'
import ReactModal from 'react-modal'

const Message = ({message}) => {
  const [user]=useAuthState(auth)
  const [isOpen,setIsOpen]=useState(false);
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
              onClick={()=>(setIsOpen(true))}
              title='view profile'
              src={user.photoURL}
              class="object-cover h-8 w-8 rounded-full cursor-pointer"
              alt=""
            />
            
          </div>):(
          <div class="flex justify-start mb-4">
          <img
            onClick={()=>(setIsOpen(true))}
            title='view profile'
            src={message.avatar}
            class="object-cover h-8 w-8 rounded-full cursor-pointer"
            alt=""
          />
          <div
            class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
          >
            
            <div>{message.text}</div>
          </div>
          <div className='p-2 text-yellow'>{message.name}</div>
        </div>)}
        <div className="flex justify-center w-[600px]">
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
        
      >
        <section class=" bg-[#071e34] flex font-medium items-center justify-center h-[570px]">

<section class="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
    <div class="flex items-center justify-between">
        <span class="text-gray-400 text-sm">2d ago</span>
        <span class="text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </span>
    </div>
    <div class="mt-6 w-fit mx-auto">
        <img src={message.avatar} class="rounded-full w-28 " alt="profile picture" srcset="" />
    </div>

    <div class="mt-8 ">
        <h2 class="text-white font-bold text-2xl tracking-wide">{message.name}</h2>
    </div>
    <p class="text-emerald-400 font-semibold mt-2.5" >
        Active
    </p>

    <div class="h-1 w-full bg-black mt-8 rounded-full">
        <div class="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
    </div>
    <div class="mt-3 text-white text-sm">
        <span class="text-gray-400 font-semibold">Storage:</span>
        <span>40%</span>
    </div>

</section>


</section>
      </ReactModal>
      </div>
    </div>
          
  )
          }
}

export default Message