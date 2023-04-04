import './index.css';

import NavBar from './components/NavBar';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className='bg-gradient-to-br from-yellow-300 to-orange-500 h-screen'>
      <NavBar />
      {user?(<ChatBox className='text-center'/>):(<Welcome/>)}
      
    </div>
  );
}

export default App;
