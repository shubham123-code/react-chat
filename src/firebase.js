// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiCPz9UpdqRGsstMxtM_FwzLbGB8iScuc",
  authDomain: "chat-c7ad9.firebaseapp.com",
  projectId: "chat-c7ad9",
  storageBucket: "chat-c7ad9.appspot.com",
  messagingSenderId: "967913939127",
  appId: "1:967913939127:web:e01df156b282799dbdad32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);