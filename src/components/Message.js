import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const Message = ({message}) => {
  const img = message.avatar
  const [user]=useAuthState(auth)
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
            <div
              class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
            >
              {message.text}
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          </div>):(
          <div class="flex justify-start mb-4">
          <img
            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div
            class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
          >
            {message.text}
          </div>
        </div>)}
    </div>
          
  )
}

export default Message