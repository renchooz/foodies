import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import FixedBtm from './components/FixedBtm'
import Footer from './components/Footer'

import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCateogory from './pages/ProductCateogory'
import FoodDetails from './pages/FoodDetails'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'




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
          <Route path='/product' element={<AllProducts/>}/>
          <Route path='/category/:cateogory' element={<ProductCateogory/>}/>
          <Route path='/category/:cateogory/:id' element={<FoodDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/orders' element={<MyOrders/>}/>

   





        </Routes>
       
      </div>
     
     {!isSeller ?<Footer/> : null}
    </div>
  )
}

export default App