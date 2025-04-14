import React from 'react'
import { useAppContext } from '../context/AppContext'
import { NavLink } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaBowlFood } from "react-icons/fa6";

const FixedBtm = () => {
    let {nevigate} = useAppContext
  return (
   
   <div className='fixed md:hidden bottom-0 h-[15vw] bg-white shadow-inner border-black  px-1 rounded-sm w-[88%] py-[2vw]'>
        <ul className='flex items-center justify-between'>
          
           <NavLink className='items-center flex gap-1 bg-[#E9AB54] px-5 py-2 rounded-2xl' to={"search"}><CiSearch />Search</NavLink>
           <NavLink className='items-center flex gap-1 bg-[#E9AB54] px-5 py-2 rounded-2xl' to={"profile"}><CgProfile />Profile</NavLink>

        </ul>
    </div>
    
  )
}

export default FixedBtm