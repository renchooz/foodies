import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "/logo.png";
import profile from "/logo.png";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  let {
    User,
    setUser,
    nevigate,
    setshowUserLogin,
    SearchQuerry,
    setSearchQuerry,
    getCartItems,
    setCardItems
  } = useAppContext();
  let prod = useLocation().pathname.includes("product");

  let logout = async () => {
    try {
      const {data} = await axios.post("https://foodies-backend-mu0d.onrender.com/api/user/logout",{
  withCredentials: true,
})
      if(data.status){
        setUser(null)
        toast.success(data.message)
        setCardItems({})
        nevigate("/")
      }
      else{
         toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  };
  
  useEffect(() => {
    if (SearchQuerry.length > 0) {
      nevigate("/product");
    }
  }, [SearchQuerry]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm relative transition-all duration-300">
      <NavLink
        to={"/"}
        onClick={() => {
          setOpen(false);
        }}
        className="transform hover:scale-105 transition-transform duration-200"
      >
        {!prod && (
          <div className="relative">
            <img className="rounded-full w-20 shadow-lg ring-2 ring-[#E9AB54]/20" src={logo} alt="" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E9AB54]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink 
          to={"/"} 
          className={({ isActive }) => 
            `relative hover:text-[#E9AB54] transition-all duration-300 font-medium ${
              isActive ? 'text-[#E9AB54]' : 'text-gray-700'
            } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#E9AB54] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300`
          }
        >
          Home
        </NavLink>
        <NavLink 
          to={"/seller"} 
          className={({ isActive }) => 
            `relative hover:text-[#E9AB54] transition-all duration-300 font-medium ${
              isActive ? 'text-[#E9AB54]' : 'text-gray-700'
            } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#E9AB54] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300`
          }
        >
          About
        </NavLink>
        <NavLink 
          to={"/product"} 
          className={({ isActive }) => 
            `relative hover:text-[#E9AB54] transition-all duration-300 font-medium ${
              isActive ? 'text-[#E9AB54]' : 'text-gray-700'
            } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#E9AB54] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300`
          }
        >
          Today's Special
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border-2 border-[#DEF2F1] bg-[#DEF2F1]/50 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-[#E9AB54]/30">
          <input
            onChange={(e) => setSearchQuerry(e.target.value)}
            className="py-1 w-full bg-transparent outline-none placeholder-gray-500 text-[#E9AB54] font-medium"
            type="text"
            placeholder="Search delicious food..."
          />
          <div className="p-1 rounded-full hover:bg-[#E9AB54]/20 transition-colors duration-200 cursor-pointer">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                clipRule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div
          onClick={() => nevigate("/cart")}
          className="relative cursor-pointer group"
        >
          <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:scale-110 transition-transform duration-200"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 text-xs text-white bg-[#E9AB54] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
            {getCartItems()}
          </div>
        </div>

        {!User ? (
          <button
            onClick={() => setshowUserLogin(true)}
            className="cursor-pointer px-6 py-2.5 bg-[#E9AB54] hover:bg-[#E9AB54]/90 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-white font-semibold rounded-full shadow-md"
          >
            Login
          </button>
        ) : (
          <div className="relative group rounded-full flex flex-col items-center justify-center">
            <div className="relative">
              <img
                className="w-12 h-12 rounded-full shadow-lg ring-2 ring-[#E9AB54]/30 hover:ring-[#E9AB54]/60 transition-all duration-300"
                src={logo}
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="bg-white shadow-xl rounded-xl absolute text-sm top-16 border border-gray-100 w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <div className="py-2">
                <div
                  onClick={() => nevigate("/orders")}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  My Orders
                </div>
                <div
                  onClick={logout}
                  className="px-4 py-3 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors duration-200 flex items-center gap-2 border-t border-gray-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {prod && (
        <div className="md:hidden w-full max-w-xs mx-4">
          <div className="relative">
            <input
              onChange={(e) => setSearchQuerry(e.target.value)}
              className="py-2.5 w-full border-2 border-[#DEF2F1] text-center rounded-full bg-[#DEF2F1]/30 outline-none placeholder-gray-500 text-[#E9AB54] font-medium focus:ring-2 focus:ring-[#E9AB54]/30 transition-all duration-300"
              type="text"
              placeholder="Search products"
            />
          </div>
        </div>
      )}

      <div className="flex sm:hidden gap-4 items-center">
        <div
          onClick={() => nevigate("/cart")}
          className="relative cursor-pointer group"
        >
          <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:scale-110 transition-transform duration-200"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#615fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 text-xs text-white bg-[#E9AB54] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg">
            {getCartItems()}
          </div>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
        >
          <div className="space-y-1.5">
            <div className={`w-6 h-0.5 bg-[#426287] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#426287] transition-all duration-300 ${open ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#426287] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 w-full bg-white/95 backdrop-blur-md z-10 shadow-xl py-6 flex-col items-start gap-4 px-6 text-sm md:hidden transition-all duration-300 ease-in-out rounded-b-2xl border-t border-gray-200
          ${
            open
              ? "flex top-[100%] opacity-100 pointer-events-auto transform translate-y-0"
              : "top-[80%] opacity-0 pointer-events-none flex transform -translate-y-4"
          }
        `}
      >
        <NavLink 
          to={"/"} 
          onClick={() => setOpen(false)}
          className="hover:text-[#E9AB54] transition-colors duration-200 py-2 font-medium"
        >
          🏠 Home
        </NavLink>
        <NavLink 
          to={"/product"} 
          onClick={() => setOpen(false)}
          className="hover:text-[#E9AB54] transition-colors duration-200 py-2 font-medium"
        >
          ⭐ Special Offers
        </NavLink>
        <NavLink 
          to={"/seller"} 
          onClick={() => setOpen(false)}
          className="hover:text-[#E9AB54] transition-colors duration-200 py-2 font-medium"
        >
          ℹ️ About
        </NavLink>
        {User && (
          <NavLink 
            to={"/orders"} 
            onClick={() => setOpen(false)}
            className="hover:text-[#E9AB54] transition-colors duration-200 py-2 font-medium"
          >
            📦 My Orders
          </NavLink>
        )}
        <div className="w-full h-px bg-gray-200 my-2"></div>
        {!User ? (
          <button
            onClick={() => {
              setOpen(false);
              setshowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-3 bg-[#E9AB54] hover:bg-[#E9AB54]/90 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-white rounded-full text-sm font-semibold shadow-md"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-white rounded-full text-sm font-semibold shadow-md"
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;