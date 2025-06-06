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
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './components/seller/SellerLayout'
import AddProducts from './pages/seller/AddProducts'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import Profile from './pages/Profile'





const App = () => {
  let seller = useLocation().pathname.includes("seller")
  let profilePage = useLocation().pathname.includes("profile")

 
  let {showuserLogin,isSeller} = useAppContext()
  return (
    <div>
      {seller || profilePage ? null : <NavBar/>}
      {showuserLogin ?<Login/>:null}
      <Toaster/>
      
      <div className={`${isSeller || profilePage ?"":"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/product' element={<AllProducts/>}/>
          <Route path='/category/:cateogory' element={<ProductCateogory/>}/>
          <Route path='/category/:cateogory/:id' element={<FoodDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
           <Route path='/profile' element={<Profile/>}/>
          <Route path='/orders' element={<MyOrders/>}/>

          <Route path='/seller' element={isSeller ? <SellerLayout/> :<SellerLogin/>}>
          <Route index element={isSeller ? <AddProducts/>:null}/>
          <Route path='product-list' element={<ProductList/>}/>
          <Route path='product-orders' element={<Orders/>}/>



          </Route>

         





        </Routes>
       
      </div>
     
     {seller || profilePage ? null : <Footer/>}
    </div>
  )
}

export default App