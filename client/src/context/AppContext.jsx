import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

export const AppContextProvider = ({children})=>{
    const nevigate = useNavigate()
    const [User, setUser] = useState(null)
    const [isSeller, setisSeller] = useState(false)
    const [showuserLogin, setshowUserLogin] = useState(false)

    const value = {nevigate,User,setUser,isSeller,setisSeller,setshowUserLogin,showuserLogin}
          return <AppContext.Provider value={value}>
            {children}
          </AppContext.Provider>
}
export const useAppContext =()=>{
    return useContext(AppContext)
}