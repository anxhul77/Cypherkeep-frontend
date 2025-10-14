import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home.jsx'
import { BrowserRouter as Router,Routes,Route,  } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Navbutton from './components/Navbutton.jsx'
function App() {


  return (
    <>
       <Navbar/>
      
    <Routes>
      <Route path="/" element={<Home/>}/>  
  
    </Routes>
 
   
    </>
  )
}

export default App
