import './index.css';

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';
import { useState } from 'react';

function App() {
  const [user] = useAuthState(auth);
  const [profileCreated,setProfileCreated] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState(false);
  return (
    <div >
      {(profileCreated || userSignedIn)?(<ChatBox setProfileCreated={setProfileCreated} setUserSignedIn={setUserSignedIn}/>):(<Welcome setProfileCreated={setProfileCreated} setUserSignedIn={setUserSignedIn}/>)}
      {/* <Example /> */}
    </div>
  );
}

export default App;
