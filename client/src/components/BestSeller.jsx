import React from "react";
import { useAppContext } from "../context/AppContext";
import FoodCard from "./FoodCard"; // assuming this is in a separate file

const FoodList = () => {
  const { product, currency } = useAppContext();

  return (
    <>
    <p className="text-2xl mt-10 font-bold mb-10">Best Seller</p>
    <div className="flex flex-wrap items-center justify-center gap-4">
      { product.filter((products)=>products.available).slice(0,10).map((item) => (
        <FoodCard key={item.id} product={item} currency={currency} />
      ))}
    </div>
    </>
  );
};

export default FoodList;
