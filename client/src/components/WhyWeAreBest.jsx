import React from 'react'
import WeAre from "/WeAreBest.jpg"
import Mob from "/MobView.jpg"
import { useAppContext } from '../context/AppContext'
import { whyWeAreBest } from '../products'

const WhyWeAreBest = () => {
  let {WhyWeBestData} = useAppContext()
 
  return (
    <div className='md:mt-20 mt-10'>
      <div className=' relative '>
      <img className='hidden rounded-xl md:block  ' src={WeAre} alt="" />
      <img className='md:hidden rounded-xl  ' src={Mob} alt="" />
      <h1 className='absolute md:text-[4vw] text-[4.5vw] font-bold  top-0 md:mt-[2vw] mt-4 right-0 md:w-[50%] w-[70%]  text-center'>Why We Are Best!</h1>
      <div className='flex right-0 md:gap-4 gap-2 md:px-3 px-1 flex-col justify-center md:w-[47%] w-[60%] absolute  top-0 md:h-full h-[100%] pt-[4vw]   '>
{WhyWeBestData.map((data,idx)=>(
  <div key={idx} className='flex gap-3 h-100%'>
        <img src={data.img} alt={data.title} className='md:w-10 md:h-10 w-7 h-7'  />
        <div className='gap-4 '>
        <h3 className='md:text-[1.5vw] font-semibold text-[4vw] '>{data.title}</h3>
        <p className='text-[3vw] md:text-[1vw]'>{data.description}</p>
        </div>
        
      </div>
))}</div>
      
    </div>
    </div>
  )
}

export default WhyWeAreBest