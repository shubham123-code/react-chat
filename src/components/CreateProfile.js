import { updateDoc,doc} from 'firebase/firestore';
import { db,auth } from '../firebase';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { QuerySnapshot } from 'firebase/firestore';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateProfile = ({setProfileCreated, setCreateProfileMode}) => {
    const [user,setUser]=useState();
    const [displayName,setDisplayName]=useState("");
    const [photoUrl,setPhotoUrl]=useState("");
    const [photo,setPhoto]=useState();
    const [storageUrl,setStorageUrl]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const storage=getStorage();
    const createProfile = async(event)=>{
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        setUser(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        });
      await updateProfile(auth.currentUser, {
          displayName: displayName,
        }).then(()=>{
          
          setUser(auth.currentUser);
          
        })
      console.log(user);
      const imageRef = ref(storage, 'user-images/user-'+user.uid+'.jpg');
      const metadata = {
          contentType: 'image/jpeg',
        };
      await uploadBytes(imageRef, photo, metadata);
      getDownloadURL(ref(storage, 'user-images/user-'+user.uid+'.jpg')).then((url)=>{
          setStorageUrl(url);
      });
      await updateProfile(auth.currentUser,{
        photoURL: storageUrl,
      }).then(()=>{
        alert("profile created successfully");
        return (setProfileCreated(true))})
    }
    const handleFileUpload = (e) => {
        //console.log(e.target.files);
        setPhotoUrl(URL.createObjectURL(e.target.files[0]));
        setPhoto(e.target.files[0]);
        //console.log(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <div>
    
    <div>
    <div>
        <div className='text-[40px] flex justify-center'>
        Create Profile
    </div>
    <div class="flex justify-center p-12 text-[40px]">
    
    <div class="mx-auto w-full max-w-[550px]">
        <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
                <label
                for="name"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                Enter Your Name
                </label>
                <input
                type="text"
                name="name"
                onChange={(e)=>(setDisplayName(e.target.value))}
                id="name"
                placeholder="Your Name"
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
                Upload Profile Photo
                </label>
                {(photoUrl)?(<img src={photoUrl} className='rounded-full h-32 w-32'/>):(
                <div>
                    <input
                type="file"
                name="profile-photo"
                id="profile-icon"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={handleFileUpload}
                /></div>)}
                
            </div>
            </div>
        </div>
        <div class="-mx-3 flex justify-center">
            <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
                <label
                for="email"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                Enter Your Email
                </label>
                <input
                type="text"
                name="email"
                onChange={(e)=>(setEmail(e.target.value))}
                id="email"
                placeholder="Your Email"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
                <label
                for="password"
                class="mb-3 block text-base font-medium text-[#07074D]"
                >
                Enter Your Password
                </label>
                <input
                type="password"
                name="password"
                onChange={(e)=>(setPassword(e.target.value))}
                id="password"
                placeholder="Your Password"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            </div>
        </div>
        
        <div className='flex justify-center'>
            <button
            onClick={(event)=>(createProfile(event))}
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none "
            >
            Submit
            </button>
        </div>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400 my-10 flex justify-center">
                      Already have an account yet? <button onClick={()=>(setCreateProfileMode(false))} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</button>
                  </p>
    </div>
    </div>
    </div>
    </div>
  </div>
  )
}

export default CreateProfile