import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { foodItems, whyWeAreBest } from "../products";
import toast from "react-hot-toast";
import axios from "axios"


axios.defaults.withCredentials = true;

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
    const fetchSeller = async()=>{
      try {
        const {data}=  await axios.get("http://localhost:4000/api/seller/is-auth",{
  withCredentials: true,
})
        if(data.status){
          setisSeller(true)
        }
        else{
          setisSeller(false)
        }
      } catch (error) {
        setisSeller(false)
      }
    }

    const fetchUser = async()=>{
      try {
        const {data} = await axios.get("http://localhost:4000/api/user/is-auth",{
  withCredentials: true,
})
        if(data.status){
          setUser(data.user)
          setCardItems(data.user.cartItems)
        }
      } catch (error) {
          setUser(null)
         toast.error(error.message)
      }
    }
   

     
    let fetchProducts = async ()=>{
      try {
        const {data} = await axios.get("http://localhost:4000/api/product/list",{
  withCredentials: true,
})
        if(data.status){
          setproduct(data.product)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
        
      }
    }
   useEffect(() => {
  const CartUpdate = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/cart/update", {
        userId: User._id, 
        cartItems: CardItems,
      },{
  withCredentials: true,
});
      if (!data.status) {
        toast.error(data.message);

      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (User) {
    CartUpdate();
  }
  
}, [CardItems,User]);



    useEffect(() => {
    fetchProducts()
    fetchSeller()
    
fetchUser()
    
    
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
    const getCartItems = ()=>{
      let TotalCount = 0;
      for(const item in CardItems ){
        TotalCount += CardItems[item]
      }
      return TotalCount
    }
    const CalculateAmount = () => {
  let totalAmount = 0;
  for (const itemId in CardItems) {
    const quantity = CardItems[itemId];
    if (quantity > 0) {
      const itemInfo = product.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.offerPrice * quantity;
      }
    }
  }
  return Math.floor(totalAmount * 100) / 100;
};

    
  const categories= [
   
  { name: "Non-Veg", image: "/non-veg.png", path: "non-veg" },
  { name: "Chinese", image: "/chinese.jpg", path: "chinese" },
  { name: "Noodles", image: "/noodle.png", path: "noodles" },
  { name: "Veg", image: "/veg.png", path: "veg" },
  { name: "Fast Food", image: "/fastfood.webp", path: "fast food" },
  { name: "Diet Food", image: "/dietfood.webp", path: "diet food" },
];

    const value = {nevigate,User,setUser,isSeller,setisSeller,setshowUserLogin,showuserLogin,categories,product,currency,addCartItem,updateCartItem,removeformCart,CardItems,WhyWeBestData,SearchQuerry,setSearchQuerry,getCartItems,CalculateAmount,fetchProducts,setCardItems, }
          return <AppContext.Provider value={value}>
            {children}
          </AppContext.Provider>
}
export const useAppContext =()=>{
    return useContext(AppContext)
}