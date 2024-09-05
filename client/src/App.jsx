import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home'
import Checkout from './components/Checkout'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/signup" element = {<Signup/>} />
        <Route path = "/" element = {<Home/>} />
        <Route path = "/checkout" element = {<Checkout />}/>
     
      
      </Routes>
      </Router>
    </>
  )
}

export default App
