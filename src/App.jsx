import { useContext, useState } from 'react';
import AdminPage from './components/AdminPage';
import Login from "./login/Login"
import { AuthContext } from './context/AuthContext';

function App() {

  const {auth} = useContext(AuthContext)

  return (
    <>
      {auth ? <AdminPage /> : <Login />}
    </>
  )
}

export default App
