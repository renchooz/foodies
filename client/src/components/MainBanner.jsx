import React from 'react'
import banner from '/banner.jpeg'
import banner2 from "/homepage.jpg"
import { FaLongArrowAltRight } from "react-icons/fa";

const MainBanner = () => {
  return (
    <div className='relative overflow-hidden group'>
      {/* Desktop Banner */}
      <div className="relative hidden md:block sm:block">
        <img 
          src={banner} 
          alt="banner" 
          className='w-full h-[75vh] object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out'
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent rounded-xl"></div>
        {/* Animated Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#E9AB54] rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-white/50 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-[#E9AB54]/70 rounded-full animate-bounce delay-500"></div>
      </div>
      
      {/* Mobile Banner */}
      <div className="relative md:hidden sm:hidden">
        <img 
          src={banner2} 
          alt="banner" 
          className='w-full h-96 border border-gray-800 object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-700 ease-out' 
        />
        {/* Mobile Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 rounded-2xl"></div>
      </div>

      {/* Desktop Content */}
      <div className='absolute overflow-hidden w-[55%] md:w-[60%] h-full top-0 hidden md:flex sm:flex flex-col justify-center pl-6 md:pl-8 space-y-6'>
        <div className="transform translate-x-0 opacity-100 animate-slideInLeft">
          <h1 className='text-[4vw] sm:text-[6vw] md:text-[4.5vw] font-bold leading-tight text-white drop-shadow-2xl'>
            From your 
            <span className="relative inline-block mx-2">
              <span className="text-[#E9AB54] relative z-10">favorite</span>
              <div className="absolute inset-0 bg-[#E9AB54]/20 blur-sm rounded-lg transform scale-110"></div>
            </span>
            Restaurants to your 
            <span className="block mt-2 text-[#E9AB54] animate-pulse">Table</span>
          </h1>
        </div>
        
        <div className='md:flex sm:flex hidden mt-6 md:mt-8 gap-4 text-lg font-medium animate-slideInLeft animation-delay-300'>
          <button className='group relative overflow-hidden backdrop-blur-xl bg-white/10 px-6 py-3 rounded-2xl border-2 border-white/30 hover:border-[#E9AB54] text-white hover:text-[#E9AB54] transition-all duration-300 transform hover:scale-105 hover:shadow-xl'>
            <span className="relative z-10">View Offers</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#E9AB54]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className='group relative overflow-hidden bg-[#E9AB54] hover:bg-[#E9AB54]/90 text-white px-6 py-3 rounded-2xl border-2 border-[#E9AB54] hover:border-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold'>
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Mobile Content */}
      <div className='absolute md:hidden sm:hidden top-0 h-full w-full flex flex-col items-center justify-center text-center px-4'>
        <div className="backdrop-blur-sm bg-black/30 rounded-3xl p-6 transform hover:scale-105 transition-transform duration-300">
          <h1 className='text-[6vw] font-bold text-white leading-tight mb-6 drop-shadow-xl'>
            From your 
            <span className="text-[#E9AB54] block mt-1 animate-pulse">favorite</span>
            Restaurants to your 
            <span className="text-[#E9AB54] block mt-1">Table</span>
          </h1>
          
          <button className='group w-[100%] relative overflow-hidden bg-[#E9AB54] hover:bg-[#E9AB54]/90 flex items-center gap-3 justify-center hover:scale-110 text-white transition-all duration-300 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-[#E9AB54] hover:border-white font-semibold shadow-xl hover:shadow-2xl transform'>
            <span className="relative z-10">View Offers</span>
            <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 hidden lg:block">
        <div className="w-4 h-4 bg-[#E9AB54]/60 rounded-full animate-ping"></div>
      </div>
      <div className="absolute bottom-1/3 right-1/4 hidden lg:block">
        <div className="w-6 h-6 border-2 border-white/40 rounded-full animate-spin"></div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E9AB54]/10 via-[#E9AB54]/5 to-transparent pointer-events-none rounded-b-xl"></div>
    </div>
  )
}

export default MainBanner

// CSS for custom animations (add to your global CSS or styled-components)
/*
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 300ms;
}
*/