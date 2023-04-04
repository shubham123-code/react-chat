
import React from 'react'
import GoogleSignin from '../img/btn_google_signin_dark_focus_web.png'
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const Welcome = () => {
    const [user]=useAuthState(auth);
    const googleSignin = () =>{
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth,provider)
    }
    const googleSignout = () =>{
        auth.signOut()
    }
    return (
        <div className='my-10'>
            <div className='text-center text-[50px] my-2'>
                Chat App
            </div>
            <div className='text-center'>react based chat app for CS358</div>
            <div className='text-center my-12'>
            {user?(
            <button className='text-center px-5 py-3 bg-gradient-to-tr from-blue-500 to-black text-white' onClick={googleSignout} alt="sign out" type="button">
                Sign Out
            </button>):(<button className='text-center'>
            <img onClick={googleSignin} src={GoogleSignin} alt="sign in with google" type="button" />
            </button>)}
            </div>
        </div>

    )
}

export default Welcome