import { addDoc, collection, getDocs, limit, query, where ,orderBy, onSnapshot, serverTimestamp, updateDoc,doc} from 'firebase/firestore';
import { db,auth } from '../firebase';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { QuerySnapshot } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';


const CreateGroup = () => {
    const uid=auth.currentUser.uid;
    const [uid1,setUid1]=useState("");
    const [groups,setGroups]=useState([]);
    const [groupName,setGroupName]=useState("");
    const [groupMembers,setGroupMembers]=useState([]);
    const [addedUsers,setAddedUsers]=useState([]);
    const [groupIconUrl,setGroupIconUrl]=useState("");
    const [storageGroupIconUrl,setStorageGroupIconUrl]=useState("");
    const [groupIcon,setGroupIcon]=useState();
    const [newGroupId,setNewGroupId]=useState("");
    const [groupCreated,setGroupCreated]=useState(false);
    const storage=getStorage();

    const getUser = async() =>{
        const q = query(collection(db,"Users"),where("uid","==",uid),limit(1));
        const querySnapShot = await getDocs(q);
        //const user1 = querySnapShot.data()[0];
        querySnapShot.forEach((doc)=>{
            setUid1(doc.id);
        })
    }
    const createGroup = async(event) =>{
        event.preventDefault();
        await getUser();
        if(uid1==="")return;
        let tempId=uuidv4();
        const groupsRef = ref(storage, 'images/groups-'+tempId+'.jpg');
        const metadata = {
            contentType: 'image/jpeg',
          };
        await uploadBytes(groupsRef, groupIcon, metadata).then(async()=>(
        await getDownloadURL(groupsRef).then((url)=>{
            setStorageGroupIconUrl(url);
        }))).then(async()=>{
            const q=query(collection(db,"Groups"));
            
            await addDoc(q,{
                groupName: groupName,
                createdAt: serverTimestamp(),
                groupIconUrl: storageGroupIconUrl,
            }).then(async(docRef)=>{
                setNewGroupId(docRef.id);
            
            const q1=query(collection(db,"Users/"+uid1+"/Groups"));
            await addDoc(q1,{
                gid: newGroupId,
                groupName: groupName,
                createdAt: serverTimestamp(),
                groupIconUrl: storageGroupIconUrl,
            })
            addedUsers.map(async(user)=>{
                console.log(user);
                const q2=query(collection(db,"Users/"+user.id+"/Groups"));
                await addDoc(q2,{
                    gid: newGroupId,
                    groupName: groupName,
                    createdAt: serverTimestamp(),
                    groupIconUrl: storageGroupIconUrl,
                }).catch((error)=>{
                    alert(error.message);
                })
            })
            console.log(newGroupId);
            if(storageGroupIconUrl!==""){
                setGroupCreated(true);
            }
        })
    });
    

    }
    const handleFileUpload = (e) => {
        //console.log(e.target.files);
        setGroupIconUrl(URL.createObjectURL(e.target.files[0]));
        setGroupIcon(e.target.files[0]);
        //console.log(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(()=>{
        const q1 = query(collection(db,"Users/"));
        
        let users = [];
        const unsubscribe = onSnapshot(q1,(QuerySnapshot) => {
            //console.log(doc.data());
            QuerySnapshot.forEach((doc)=>{
                users.push({... doc.data(), id: doc.id});
                //console.log(doc.data());
            })
            setGroupMembers(users);
            //console.log(users);
        })
        return ()=>unsubscribe;
    },[])
    useEffect(()=>{
        getUser();
    },[]);
    const addUser = ({user}) => {
        if(addedUsers.includes(user))return;
        //console.log(addedUsers);
        let newList = addedUsers.map((item) => {
            return item;
          });
        newList.push(user);
        setAddedUsers(newList);
    }
  return (
    <div >
        {groupCreated?(<div className='flex justify-center my-40'>Group Created Succesfully!</div>):(
        <div>
            <div className='text-[40px] flex justify-center'>
            Create Group
        </div>
        <div class="flex justify-center p-12 text-[40px]">
        
        <div class="mx-auto w-full max-w-[550px]">
            <form onSubmit={(e)=>createGroup(e)}>
            <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                    <label
                    for="group-name"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Enter Group Name
                    </label>
                    <input
                    type="text"
                    name="group-name"
                    onChange={(e)=>(setGroupName(e.target.value))}
                    id="group-name"
                    placeholder="Group Name"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                    <label
                    for="lName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Upload Group Icon
                    </label>
                    {(groupIconUrl)?(<img src={groupIconUrl} className='rounded-full h-32 w-32'/>):(
                    <div>
                        <input
                    type="file"
                    name="group-icon"
                    id="group-icon"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={handleFileUpload}
                    /></div>)}
                    
                </div>
                </div>
            </div>

            <div class="-mx-3 flex flex-wrap border-black border-b-2">
                <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                    <label
                    class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Select users to add
                    </label>
                    <div className='flex flex-col w-[600px] h-[200px] border-r-2 border-black b-2 overflow-x-hidden overflow-y-auto text-[20px]'>
                        {groupMembers.map((user)=>{
                            if(!addedUsers.includes(user)&&user.id!==uid1){
                                if(user.name){
                                    
                                return(
                                
                                <button id={user.id} type="button" className={`${addedUsers.includes(user.uid)?"text-red":"text-blue"}border-black border-b-2 p-2`} onClick={()=>(addUser({user}))} >
                                    <div className='flex justify-center'>
                                    <img
                                        src={user.photoURL}
                                        class="object-cover h-8 w-8 rounded-full cursor-pointer"
                                        alt=""
                                    />
                                    {user.name}
                                    </div>
                                </button>
                                )
                                }
                                else{
                                    return (<div />);
                                }
                            }
                        })}
                    </div>

                </div>
                <div class="mb-5">
                    <label
                    class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Added users
                    </label>
                    <div className='flex flex-col w-[600px] h-[200px] border-r-2 border-black b-2 overflow-x-hidden overflow-y-auto text-[20px]'>
                        {addedUsers.map((user)=>{
                
                                if(user.name){
                                    
                                return(
                                
                                <div id={user.id} type="button" className="border-black border-b-2 p-2" >
                                    <div className='flex justify-center'>
                                    <img
                                        src={user.photoURL}
                                        class="object-cover h-8 w-8 rounded-full cursor-pointer"
                                        alt=""
                                    />
                                    {user.name}
                                    </div>
                                </div>
                                )
                                }
                                else{
                                    return (<div />);
                                }
                        })}
                    </div>
                    
                </div>
                </div>
            </div>

            

            <div>
                <button
                class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                Submit
                </button>
            </div>
            </form>
        </div>
        </div>
        </div>
        )}
        
        {/* <button onClick={displayGroups}>
            <div className='border-b-2 p-2 border-black'>
                Display Groups
            </div>
        </button> */}
        
    </div>
  )
}

export default CreateGroup