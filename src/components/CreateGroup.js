import { addDoc, collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useState } from 'react'

const CreateGroup = ({ user }) => {
    console.log(user);
    const uid=user.uid;
    const [uid1,setUid1]=useState("");
    const createGroup = async() =>{
        const q = query(collection(db,"Users"),where("uid","==",uid),limit(1));
        const querySnapShot = await getDocs(q);
        //const user1 = querySnapShot.data()[0];
        querySnapShot.forEach((doc)=>{
            setUid1(doc.id);
        })
        await addDoc(collection(db,"Groups"),{
            name: "Hello",
        })
        await addDoc(collection(db,"Users/"+uid1+"/Groups"),{
            Gid: "124142",
        })
    }
  return (
    <div>
        <button onClick={createGroup}>
            create group
        </button>
    </div>
  )
}

export default CreateGroup