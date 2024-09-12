
import { useState } from 'react';
import './App.css'
import { Locations } from './locations/Locations'
import { Login } from './login/Login';



function App() {
  const [user, setUser] = useState<string>();

  return (
    <>
      {!user && <Login onLogin={(user: string) => setUser(user)} />}
      {user && <Locations user={user} />}
    </>
  )
}

export default App
