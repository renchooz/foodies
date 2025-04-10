import React from 'react'
import banner from '/banner.jpeg'
import banner2 from "/homepage.jpg"

const MainBanner = () => {
  return (
    <div className='relative' >
        <img src={banner} alt="banner" className= ' w-full h-[70vh] object-cover hidden md:block sm:block rounded-xl '/>
        {/* mobile banner */}
        <img src={banner2} alt="banner" className=' w-full md:hidden rounded-2xl sm:hidden h-96 border border-gray-800  object-cover' />
            <div className='absolute w-[50%] md:w-[60%]   h-full  top-0 hidden md:flex sm:flex flex-col justify-center   pl-4 md:pl-6  '>
                <h1 className='text-[4vw] sm:text-[6vw] md:text-[5vw]'> From your favorite, Restaurants to your Table</h1>
              <div className='md:flex sm:flex hidden mt-4 md:mt-9  gap-4 text-xl font-normal'>
              <button className='backdrop-blur-xl px-4 py-2 rounded-xl border border-black hover:text-red-700 hover:bg-white transition'>View Offers</button>
              <button className='hover:bg-red-700 hover:text-white transition backdrop-blur-xl px-4 py-2 rounded-xl border border-black'>View Offers</button>
              </div>
            
            </div>
            {/* mobile btn */}
            <div className='absolute md:hidden sm:hidden top-0 h-full w-full flex flex-col items-center justify-center text-center'>
            <h1 className='text-[5vw] w-[40%] '> From your favorite, Restaurants to your Table</h1>
            <button className='hover:bg-red-700 hover:text-white transition backdrop-blur-xl mt-6 px-4 py-2 rounded-xl border border-black'>View Offers</button>
            </div>
        
    </div>
  )
}

export default MainBanner