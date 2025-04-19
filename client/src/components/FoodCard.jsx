import React from "react";
import { IoIosStar } from "react-icons/io";
import { useAppContext } from "../context/AppContext";
const FoodCard = ({ product, currency }) => {
  let { addCartItem, nevigate, updateCartItem, removeformCart, CardItems } =
    useAppContext();
  // console.log(product)

  return (
    <div
      onClick={() => {
        nevigate(`/category/${product.category}/${product.id}`);
        window.scrollTo(0,0)
      }}
      className="border  border-gray-500/20 rounded-md md:px-4  py-2 bg-[#F7F7F7] min-w-40 max-w-40 md:min-w-60 md:max-w-60 w-full"
    >
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 mix-blend-multiply object-contain  h-36 transition "
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="text-gray-500/60 text-sm px-2">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.name}
        </p>
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) =>
              product.rating > i ? (
                <div key={i}>
                  {" "}
                  <IoIosStar />{" "}
                </div>
              ) : (
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                    fill="#615fff"
                    fill-opacity="0.35"
                  />
                </svg>
              )
            )}
          <p>({product.rating})</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-[#E9AB54]">
            {currency}₹{product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              ₹{product.price}
            </span>
          </p>
          <div
            onClick={(e) => {
              e.stopPropagation;
            }}
            className="text-[#E9AB54]"
          >
            {!CardItems[product.id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-[#E9AB54] border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-white font-medium"
                onClick={() => addCartItem(product.id)}
              >
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-[#fff2d8] rounded select-none">
                <button
                  onClick={() => {
                    removeformCart(product.id);
                  }}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{CardItems[product.id]}</span>
                <button
                  onClick={() => {
                    addCartItem(product.id);
                  }}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
