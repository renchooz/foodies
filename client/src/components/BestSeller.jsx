import React from "react";
import { useAppContext } from "../context/AppContext";
import FoodCard from "./FoodCard"; // assuming this is in a separate file

const FoodList = () => {
  const { product, currency } = useAppContext();

  return (
    <div className="flex flex-wrap gap-4">
      {product.map((item) => (
        <FoodCard key={item.id} product={item} currency={currency} />
      ))}
    </div>
  );
};

export default FoodList;
