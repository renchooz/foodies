import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import FixedBtm from './components/FixedBtm'
import Footer from './components/Footer'

import { useAppContext } from './context/AppContext'
import Login from './components/Login'



const App = () => {
  let isSeller = useLocation().pathname.includes("seller")
 
  let {showuserLogin} = useAppContext()
  return (
    <div>
      {isSeller ? null : <NavBar/>}
      {showuserLogin ?<Login/>:null}
      <Toaster/>
      
      <div className={`${isSeller ?"":"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
       
      </div>
     
     {!isSeller ?<Footer/> : null}
    </div>
  )
}

export default App