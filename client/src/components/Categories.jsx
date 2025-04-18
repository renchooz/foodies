import React, { useContext } from "react";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  let { categories , nevigate } = useAppContext();
  return (
    <div className="mt-14 w-full  ">
    <h1 className="text-2xl font-bold mb-10">Categories</h1>
    <div className="flex flex-wrap gap-16 items-center justify-center">
      {categories.map((category, idx) => (
        <div key={idx} onClick={()=>{
            nevigate(`/category/${category.path.toLowerCase()}`)
            scrollTo(0,0)

        }} className="">
          <img
            className="w-24 h-24 md:w-36 md:h-36 sm:w-32 sm:h-32 hover:scale-110 transition object-cover  mix-blend-screen rounded-full border"
            src={category.image}
            alt={category.name}
          />
          <p className="text-lg text-center font-medium mt-2">{category.name}</p>
        </div>
      ))}
    </div>
  </div>
  
  
  );
};

export default Categories;
