import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { foodItems, whyWeAreBest } from "../products";
import toast from "react-hot-toast";


export const AppContext = createContext()

export const AppContextProvider = ({children})=>{
  const currency = import.meta.VITE_CURRENCY;
    const nevigate = useNavigate()
    const [User, setUser] = useState(null)
    const [isSeller, setisSeller] = useState(false)
    const [showuserLogin, setshowUserLogin] = useState(false)
    const [product, setproduct] = useState([])
    const [CardItems, setCardItems] = useState({})
    const [SearchQuerry, setSearchQuerry] = useState({})

    const WhyWeBestData = whyWeAreBest
     
    let fetchProducts = async ()=>{
      setproduct(foodItems)
    }
    useEffect(() => {
    fetchProducts()
    },[])
    //add product to cart
    let addCartItem = (itemId)=>{
      let cartData = structuredClone(CardItems)
     if(cartData[itemId]){
      cartData[itemId] += 1
     }else{
      cartData[itemId] = 1
     }
     setCardItems(cartData)
     toast.success("added to cart")
    }

    let updateCartItem = (itemId,quantity) =>{
      let cartData = structuredClone(CardItems)
      cartData[itemId] = quantity
      setCardItems(cartData)
      toast.success("Items Updated")

    }
    let removeformCart = (itemId)=>{
      let cartData = structuredClone(CardItems)
      if (cartData){
        cartData[itemId] -= 1
        if(cartData[itemId] === 0){
          delete cartData[itemId]
        }
      }
      setCardItems(cartData)
      toast.success("Item deleted")


    }
    
  const categories= [
   
  { name: "Non-Veg", image: "/non-veg.png", path: "/category/non-veg" },
  { name: "Chinese", image: "/chinese.jpg", path: "/category/chinese" },
  { name: "Noodles", image: "/noodle.png", path: "/category/noodles" },
  { name: "Veg", image: "/veg.png", path: "/category/veg" },
  { name: "Fast Food", image: "/fastfood.webp", path: "/category/fast-food" },
  { name: "Diet Food", image: "/dietfood.webp", path: "/category/diet-food" },
];

    const value = {nevigate,User,setUser,isSeller,setisSeller,setshowUserLogin,showuserLogin,categories,product,currency,addCartItem,updateCartItem,removeformCart,CardItems,WhyWeBestData,SearchQuerry,setSearchQuerry}
          return <AppContext.Provider value={value}>
            {children}
          </AppContext.Provider>
}
export const useAppContext =()=>{
    return useContext(AppContext)
}