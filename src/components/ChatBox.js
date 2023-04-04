import React from 'react'
import SendMessage from './SendMessage'
import { useEffect, useState, useRef } from 'react'
import { query, collection, orderBy, onSnapshot, limit, QuerySnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import Message from './Message'

const ChatBox = () => {
    const [messages,setMessages]=useState([]);
    const bottomRef=useRef(null);
    useEffect(() => {
        const q = query(collection(db,"messages"),orderBy("createdAt"),limit(50))
        const unsubscirbe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach((doc) => {
                messages.push({... doc.data, id: doc.id});
            })
            setMessages(messages);
        });
    },[])
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])
    return (
        <div >
        <div className='flex justify-center'>
        <div className='overflow-x-hidden overflow-y-auto h-[500px] w-[1200px] bg-white rounded-lg m-5 text-[50px]'>
            {messages?.map((message)=>(
                <Message message={message} id={message.id} />
            ))}
            <div ref={bottomRef}/>
        </div>
        </div>
        <div className='flex justify-center items-center'>
            
            <SendMessage />
        </div>
        </div>
    )
}

export default ChatBox