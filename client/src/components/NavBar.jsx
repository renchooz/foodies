import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "/logo.png"
import { useAppContext } from '../context/AppContext'

const NavBar = () => {
    const [open, setOpen] = React.useState(false)
    let {User , setUser, nevigate, setshowUserLogin} = useAppContext()
    let logout  = async() =>{
       setUser(null)
       nevigate("/")
    }
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-[#3AAFA9] relative transition-all">

          <NavLink to={'/'}>
            <img className='rounded-full  w-20' src={logo} alt="" />
          </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 ">
                <NavLink to={"/"} className="hover:text-white">Home</NavLink>
                <NavLink to={"/about"} className="hover:text-white">About</NavLink>
                <NavLink to={"/product"} className="hover:text-white">Todays Special</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border bg-[#DEF2F1] px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-black bg-[#DEF2F1] w-[18px] h-[18px] rounded-full">3</button>
                </div>

                <button className="cursor-pointer px-8 py-2 bg-[#DEF2F1] hover:bg-white transition text-black rounded-full">
                    Login
                </button>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div
  className={`absolute left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden transition-all duration-200 ease-in-out
    ${open ? 'flex top-[100px] opacity-100 pointer-events-auto' : 'top-0 opacity-0 pointer-events-none flex'}
  `}
>
  <NavLink to={"/"} onClick={() => setOpen(false)}>Home</NavLink>
  <NavLink to={"/products"} onClick={() => setOpen(false)}>Special Offers</NavLink>
  <NavLink to={"/about"} onClick={() => setOpen(false)}>About</NavLink>
  {
    User &&
  <NavLink to={"/about"} onClick={() => setOpen(false)}>My Orders</NavLink>

  }
{!User ?(
   <button
   onClick={()=>{setOpen(false);
    setshowUserLogin(true)}
   }
   
   className="cursor-pointer px-6 py-2 mt-2 bg-[#3AAFA9] hover:bg-[#DEF2F1] transition text-white rounded-full text-sm">
   Login
 </button>
):(
  <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-[#3AAFA9] hover:bg-[#DEF2F1] transition text-white rounded-full text-sm">
  Log Out
</button>
)}
 
</div>


        </nav>
  )
}

export default NavBar