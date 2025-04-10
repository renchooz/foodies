import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext()

export const AppContextProvider = ({children})=>{
    const nevigate = useNavigate()
    const [User, setUser] = useState(null)
    const [isSeller, setisSeller] = useState(false)
    const [showuserLogin, setshowUserLogin] = useState(false)
  const categories= [
  { name: "Non-Veg", image: "/non-veg.png", path: "/category/non-veg" },
  { name: "Chinese", image: "/chinese.jpg", path: "/category/chinese" },
  { name: "Noodles", image: "/noodle.png", path: "/category/noodles" },
  { name: "Veg", image: "/veg.png", path: "/category/veg" },
  { name: "Fast Food", image: "/fastfood.webp", path: "/category/fast-food" },
  { name: "Diet Food", image: "/dietfood.webp", path: "/category/diet-food" },
];

    const value = {nevigate,User,setUser,isSeller,setisSeller,setshowUserLogin,showuserLogin,categories}
          return <AppContext.Provider value={value}>
            {children}
          </AppContext.Provider>
}
export const useAppContext =()=>{
    return useContext(AppContext)
}