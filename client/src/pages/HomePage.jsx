import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import WhyWeAreBest from '../components/WhyWeAreBest'
import FixedBtm from '../components/FixedBtm'

const HomePage = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories/>
        <BestSeller/>
        <WhyWeAreBest/>
        <FixedBtm/>
        </div>
  )
}

export default HomePage