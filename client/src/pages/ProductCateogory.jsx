import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import FoodCard from '../components/FoodCard'

const ProductCateogory = () => {
    let {product,categories} = useAppContext()
    let {cateogory} = useParams()
    let cateogryName = categories.find((item)=>item.path.toLowerCase() === cateogory)
    let filteredItems = product.filter((item)=>item.category.toLowerCase() === cateogory)
    console.log(cateogryName)
  return (
    <div className="mt-10">
       <div>
        {cateogryName &&(
          <div className='flex flex-col  w-full '>
          <p className="text-2xl text-[#E9AB54]">{cateogryName.name.toUpperCase()}</p>
          <div className="w-12 h-[1px] bg-black/50"></div>
          </div>
        )}
        {filteredItems.length > 0 ?(
          <div className='flex  md:justify-start justify-center mt-10 gap-6'>
            {filteredItems.map((product)=>(
              <FoodCard key={product.id} product={product}/>

            ))}
          </div>
        ):(
          <div className='h-screen w-full text-center text-2xl'><p>No Items Found</p></div>
        )}
       </div>
    </div>
  )
}

export default ProductCateogory