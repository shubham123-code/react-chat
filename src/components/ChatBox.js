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


const ChatBox = ({setProfileCreated, setUserSignedIn}) => {
    const [messages,setMessages]=useState([]);
    const [groupId,setGroupId]=useState("");
    const [groupName,setGroupName]=useState();
    const [createdAt,setCreatedAt]=useState();
    const [userGroups,setUserGroups]=useState([]);
    const [groupIcon,setGroupIcon]=useState("");
    const bottomRef=useRef(null);
    const [user]=useAuthState(auth);
    const [isOpen, setIsOpen] = useState(false); 
    const [uid1,setUid1]=useState("");
    const createNewUser = async() => {
      //event.preventDefault();
      const {uid, displayName, photoURL}=auth.currentUser
      const q = query(collection(db, "Users"), where("uid", "==", uid));
      const querySnapShot = await getDocs(q);
      if(querySnapShot.empty){
        
        await addDoc(collection(db, "Users"),{
          name: displayName,
          photoURL: photoURL,
          createdAt: serverTimestamp(),
          uid,
        }).then((docRef)=>{
          setUid1(docRef.id);
        });
      }
      else{
          querySnapShot.forEach((doc)=>{
            setUid1(doc.id);
          })
      }
      
    }

    useEffect(() => {
        const q = query(collection(db,"messages"),orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach((doc) => {
                messages.push({... doc.data(), id: doc.id});
            })
            setMessages(messages);
        });
       
        return () => unsubscribe;
    },[])
    useEffect(() => {
      console.log("its running?")
      console.log(uid1);
      if(uid1!==""){
        console.log("its running!");
        const q = query(collection(db,"Users/"+uid1+"/Groups"),orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let userGroups = [];
            QuerySnapshot.forEach((doc) => {
                userGroups.push({... doc.data(), id: doc.id});
            })
            setUserGroups(userGroups);
            console.log(userGroups);
        });
        return ()=>unsubscribe;
      }
    },[uid1])

    useEffect(()=>{
      createNewUser();
  } ,[]);
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])
    const signOut = () =>{
      auth.signOut()
      setProfileCreated(false);
      setUserSignedIn(false);
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
          placeholder="Search Chat"
          className="rounded-2xl bg-gray-500 py-3 px-5 w-full"
        />
      </div>
      <button 
        className="border-2 border-blue-500 rounded-full py-3 px-5 w-[115px]"
        onClick={setIsOpen}
      >
        Create Chatroom
      </button>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
      <CreateGroup className="bg-[#071e34]"
        />
      </ReactModal>
      <button
        className="border-2 border-blue-500 p-2 rounded-full flex items-center justify-center"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
    <div className="flex flex-row justify-between bg-gray-600">
      
      <div className="h-[85vh] flex flex-col w-[600px] border-r-2 border-black overflow-y-auto">
        
        <div className="border-b-2 border-black py-4 px-2">
          <input
            type="text"
            placeholder="search chats or contacts"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full text-black"
          />
        </div>
      <div className='overflow-x-hidden overflow-y-auto h-[482px] border-b-2 border-gray-400'>
        {userGroups?.map((group)=>{
          if(group.groupIconUrl!==""){

            return (
              <button
              class={`flex flex-row py-4 px-2 justify-center ${group.gid===groupId?"bg-gray-800":''} items-center border-b-2 w-full`}
              onClick={()=>{
                setGroupName(group.groupName);
                setCreatedAt(group.createdAt);
                setGroupIcon(group.groupIconUrl);
                setGroupId(group.gid)}}
            >
              <div class="w-1/4">
                <img
                  src={group.groupIconUrl}
                  class="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div class="w-full">
                <div class="text-lg font-semibold">{group.groupName}</div>
                {/* <span class="text-gray-500">Pick me at 9:00 Am</span> */}
              </div>
            </button>)
          }
        }
      )}
      </div>
      </div>
      
      <div className="w-[1000px] px-5 py-10">
        <div className='overflow-x-hidden overflow-y-auto h-[482px]'>
        {messages?.map((message)=>{
          
          if(message.groupId===groupId&&groupId!==""){
          return (
                <div key={message.id}>
                <Message message={message} key={message.id} />
                <br />
                </div>
              )
}})}
        <div ref={bottomRef}/>
          
        </div>
        <SendMessage groupId={groupId}/>
      </div>
      
      <div className="w-[600px] border-l-2 px-5 border-black">
        <div className="flex flex-col">
          <div className="font-semibold text-xl py-4 flex justify-center">{groupName}</div>
          <img
            src={groupIcon}
            className="object-cover rounded-xl h-64"
            alt=""
          />
          <div className="font-semibold py-4"></div>
          <div className="font-bold font-mono flex justify-center">
            CHAT ROOM DP
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
}

export default ChatBox