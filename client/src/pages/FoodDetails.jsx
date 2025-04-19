import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const FoodDetails = () => {
  const { id } = useParams();
  const { product, nevigate, addCartItem } = useAppContext();

  const food = product.find((item) => String(item.id) === String(id));
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (food?.image?.[0]) {
      setThumbnail(food.image[0]);
    } else {
      setThumbnail(null);
    }
  }, [food]);

  useEffect(() => {
    if (product.length > 0 && food) {
      const related = product
        .filter(
          (item) => item.category === food.category && item.id !== food.id
        )
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [product, food]);

  if (!food) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Food item not found!
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 md:mt-10 mt-3 bg-white shadow-xl rounded-2xl">
      <div className="flex h-[30%] flex-col   ">
        <img
          src={food.image}
          alt={food.name}
          className=" object-cover h-80  object-center rounded-xl shadow-md"
        />
        <div className="mt-4">
          <h2 className="text-3xl font-bold mb-2">{food.name}</h2>
          <p className="text-gray-600 mb-2">{food.description}</p>
          <div className="text-lg mb-2">
            <span className="font-semibold">Category:</span> {food.category}
          </div>
          <div className="flex items-center gap-1">
            <div className=" font-semibold text-black/50 mb-4 relative">
              ₹{food.offerPrice}
              <div className="w-full absolute bg-black h-0.5 top-3"></div>
            </div>

            <div className="text-2xl font-semibold text-[#E9AB54] mb-4">
              ₹{food.price}
            </div>
          </div>

          <button
            onClick={() => addCartItem(food)}
            className="px-4 py-2 bg-[#E9AB54] hover:bg-[#d1943f] text-white rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-4">Related Items</h3>
          <div className="grid grid-cols-2  md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="bg-gray-100 p-4 rounded-xl shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h4 className="text-lg font-bold">{item.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{item.category}</p>

                <div className="flex  justify-between items-center">
                  <div className="text-[#E9AB54] font-semibold">
                    ₹{item.price}
                    </div>
                    <button
                      onClick={() => addCartItem(food)}
                      className="md:px-4 md:py-2 px-2 py-1 bg-[#E9AB54] hover:bg-blue-700 text-white text-sm rounded-xl"
                    >
                      Add
                    </button>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
