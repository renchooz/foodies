import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import FoodCard from "../components/FoodCard";

const AllProducts = () => {
  let { product, SearchQuerry } = useAppContext();
  const [FilterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    if (SearchQuerry.length > 0) {
      setFilterProducts(
        product.filter((product) =>
          product.name.toLowerCase().includes(SearchQuerry.toLowerCase())
        )
      );
    }else{
        setFilterProducts(product)
    }
  }, [SearchQuerry, product]);





  return <div className="mt-10">
    <div className="flex flex-col items-end w-24 ">
        <p className="text-2xl text-[#E9AB54]">Products</p>
        <div className="w-12 h-[1px] bg-black/50"></div>
    </div>
    <div className="flex flex-wrap gap-5 mt-5  justify-center">
        {FilterProducts.filter((product)=> product.available).map((product)=>(
            <FoodCard key={product.id} product={product}/>
        ))}
    </div>
  </div>;
};

export default AllProducts;
