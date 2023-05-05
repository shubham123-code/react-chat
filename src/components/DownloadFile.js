import React from 'react';
import { getStorage, ref } from "firebase/storage";

const DownloadFile = ({imgUrl}) => {
    const storage = getStorage();

// Create a reference to 'mountains.jpg'
    const mountainsRef = ref(storage, 'mountains.jpg');

// Create a reference to 'images/mountains.jpg'
    const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name;           // true
    mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
    return (
        <div>DownloadFile</div>
    )
}

export default DownloadFile