import './index.css';

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className='bg-gradient-to-br from-blue-800 to-black h-screen'>
      {user?(<ChatBox/>):(<Welcome/>)}
      {/* <Example /> */}
    </div>
  );
}

export default App;
