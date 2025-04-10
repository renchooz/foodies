import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {
  let isSeller = useLocation().pathname.includes("seller")
  return (
    <div>
      {isSeller ? null : <NavBar/>}
      
      <div className={`${isSeller ?"":"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App