import React from 'react'
import SendMessage from './SendMessage'
import { useEffect, useState, useRef } from 'react'
import { query, collection, orderBy, onSnapshot, limit, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import Message from './Message'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, serverTimestamp } from 'firebase/firestore';
import ReactModal from 'react-modal'
import CreateGroup from './CreateGroup'

const ChatBox = () => {
    const [messages,setMessages]=useState([]);
    const [group,setGroup]=useState("");
    const bottomRef=useRef(null);
    const [user]=useAuthState(auth);
    const [isOpen, setIsOpen] = useState(false); 
    const createNewUser = async() => {
      //event.preventDefault();
      const {uid, displayName, photoURL}=auth.currentUser
      const q = query(collection(db, "Users"), where("uid", "==", uid));
      const querySnapShot=await getDocs(q);
      if(querySnapShot.empty){
        console.log("User not found");
        
        await addDoc(collection(db, "Users"),{
          name: displayName,
          photoURL: photoURL,
          uid,
        });
      }
      console.log("User found");
    }
    const createGroup = async() =>{

    }
    useEffect(() => {
      const doit = () => {
        
      }
      if(group!=""){
        const q = query(collection(db,"messages"),orderBy("createdAt"),limit(50))
        const unsubscirbe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach((doc) => {
                messages.push({... doc.data(), id: doc.id});
            })
            setMessages(messages);
        });
       
        return () => unsubscirbe;
      }
      else{
        return ()=>doit;
      }

    },[])
    useEffect(()=>{
      createNewUser();
  } ,[]);
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])
    const googleSignout = () =>{
      auth.signOut()
    }
    return (
       
    <div className='w-screen h-screen'> 
    
    <div className="shadow-lg rounded-lg text-white w-screen h-screen">
    <div className="px-5 py-5 flex justify-between items-center bg-gray-800 border-b-black">
      <div className="font-semibold text-2xl">ChatApp</div>
      <div className="w-1/2">
        <input
          type="text"
          name=""
          id=""
          placeholder="search IRL"
          className="rounded-2xl bg-gray-500 py-3 px-5 w-full"
        />
      </div>
      <button 
        className="rounded-2xl bg-gray-500 py-3 px-5 w-[100px]"
        onClick={setIsOpen}
      >
        Create Group
      </button>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <CreateGroup  
          user={user}
        />
      </ReactModal>
      <button
        className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
        onClick={googleSignout}
      >
        RA
      </button>
    </div>
    <div className="flex flex-row justify-between bg-gray-600">
      
      <div className="flex flex-col w-[600px] border-r-2 border-black overflow-y-auto">
        
        <div className="border-b-2 border-black py-4 px-2">
          <input
            type="text"
            placeholder="search chats or contacts"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
        </div>
        
        <div
          className="flex flex-row py-4 px-2 justify-center items-center border-b-2 border-black"
        >
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Luis1994</div>
            <span className="text-gray-500">Pick me at 9:00 Am</span>
          </div>
        </div>
        <div className="flex flex-row py-4 px-2 items-center border-b-2 border-black">
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/otT2199XwI8/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Everest Trip 2021</div>
            <span className="text-gray-500">Hi Sam, Welcome</span>
          </div>
        </div>
        <div
          className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
        >
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">MERN Stack</div>
            <span className="text-gray-500">Lusi : Thanks Everyone</span>
          </div>
        </div>
        <div className="flex flex-row py-4 px-2 items-center border-b-2 border-black">
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Javascript Indonesia</div>
            <span className="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div>
        <div className="flex flex-row py-4 px-2 items-center border-b-2 border-black">
          <div className="w-1/4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Javascript Indonesia</div>
            <span className="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div>

        <div className="flex flex-row py-4 px-2 items-center border-b-2 border-black">
          <div className="">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">Javascript Indonesia</div>
            <span className="text-gray-500">Evan : some one can fix this</span>
          </div>
        </div>
        
      </div>
      
      <div className="w-[1000px] px-5 py-10">
        <div className='overflow-x-hidden overflow-y-auto h-[482px]'>
        {messages?.map((message)=>(
                <div key={message.id}>
                <Message message={message} key={message.id} />
                <br />
                </div>
              ))}
        <div ref={bottomRef}/>
          
        </div>
        <SendMessage/>
      </div>
      
      <div className="w-[600px] border-l-2 px-5 border-black">
        <div className="flex flex-col">
          <div className="font-semibold text-xl py-4">Mern Stack Group</div>
          <img
            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
            className="object-cover rounded-xl h-64"
            alt=""
          />
          <div className="font-semibold py-4">Created 22 Sep 2021</div>
          <div className="font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            perspiciatis!
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
}

export default ChatBox