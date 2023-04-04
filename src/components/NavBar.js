import React from 'react'
import GoogleSignin from '../img/btn_google_signin_dark_focus_web.png'
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const NavBar = () => {
    
    const [user]=useAuthState(auth);
    const googleSignin = () =>{
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth,provider)
    }
    const googleSignout = () =>{
        auth.signOut()
    }
    return (
        <div className='py-5 flex justify-between'>
            <div className='text-center text-[25px] my-2 mx-10'>
                Chat App
            </div>
            <div className='text-center'></div>
            <div className='text-center my-2 mx-10'>
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

export default NavBar