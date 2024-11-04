import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';



function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/editor/*' element={<Admin />} ></Route>
      </Routes>
    </div>
  )
}

export default App
