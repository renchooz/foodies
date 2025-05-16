import { useEffect, useState } from "react";
import React from "react";
import { useAppContext } from "../context/AppContext";
import { FaPlus } from "react-icons/fa";
import { dummyAddresses } from "../products";

import AddAddress from "./AddAddress";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    product,
    nevigate,
    updateCartItem,
    removeformCart,
    getCartItems,
    CardItems,
    addCartItem,
    CalculateAmount,
    User,
  } = useAppContext();
  const [cartArray, setcartArray] = useState([]);
  const [Address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAdress, setselectedAdress] = useState(null);
  const [paymentOption, setpaymentOption] = useState("COD");
  const [addAddress, setaddAddress] = useState(false);
  const getCart = () => {
    let Temparr = [];
    for (const key in CardItems) {
      let productItem = product.find((item) => item._id == key);
      if (productItem) {
        productItem.quantity = CardItems[key];
        Temparr.push(productItem);
      }
    }
    setcartArray(Temparr);
  };

  const updateAdress = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/address/get");
      if (data.status) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setselectedAdress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

 

let PlaceOrder = async () => {
  try {
    if (paymentOption === "COD") {
      const itemsArray = Object.entries(CardItems).map(([productId, quantity]) => ({
        product: productId,
        quantity,
      }));

      const response = await axios.post(
        "http://localhost:4000/api/orders/cod",
        {
          address: selectedAdress,
          items: itemsArray, // ✅ now it's iterable
        },
        { withCredentials: true }
      );

      if (response.data.status) {
      console.log(itemsArray)
        toast.success("Order Placed Successfully");
        // redirect or clear cart logic here
      } else {
        
        toast.error(response.data.message);
      }
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to place order");
  }
};


  useEffect(() => {
    if (product.length > 0 && CardItems) {
      getCart();
    }
  }, [product, CardItems]);
  useEffect(() => {
    if (User) {
      updateAdress();
    }
  }, [User,addAddress]);

  console.log(CardItems);
  return product.length > 0 && CardItems ? (
    <div className="flex  flex-col md:flex-row mt-5  w-full ">
      {!addAddress ? (
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-10">
            Shopping Cart{" "}
            <span className="text-sm text-[#E9AB54]">{getCartItems()}</span>
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {cartArray.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
            >
              <div
                onClick={() => {
                  nevigate(`/category/${product.category}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="flex items-center md:gap-6 gap-3"
              >
                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                  <img
                    className="max-w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div>
                  <p className="hidden md:block font-semibold">
                    {product.name}
                  </p>
                  <div className="font-normal text-gray-500/70">
                    <p>
                      Size: <span>{product.size || "N/A"}</span>
                    </p>
                    <div className="flex items-center gap-3  ">
                      <p>Qty {product.quantity}</p>
                      <p
                        onClick={(e) => {
                          addCartItem(product._id);
                          e.stopPropagation();
                        }}
                        className="text-red  hover:bg-green-200 rounded-full"
                      >
                        <FaPlus />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center">
                ₹{product.offerPrice * product.quantity}
              </p>
              <button
                onClick={() => removeformCart(product._id)}
                className="cursor-pointer mx-auto"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                    stroke="#FF532E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}

          <button
            onClick={() => nevigate("/product")}
            className="group cursor-pointer flex items-center mt-8 gap-2 text-[#E9AB54]
        font-medium"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <AddAddress adress={setaddAddress} />
      )}

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAdress
                ? `${selectedAdress.street} ${selectedAdress.city} ${selectedAdress.state} ${selectedAdress.country}, ${selectedAdress.pinCode}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-[#E9AB54] hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {Address.slice(0, 3).map((adress, id) => (
                  <p
                    key={id}
                    onClick={() => {
                      setselectedAdress(adress), setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {adress.street} {adress.city} ,{adress.country}{" "}
                    {adress.pinCode}
                  </p>
                ))}

                <p
                  onClick={() => {
                    setShowAddress(false);
                    setaddAddress(true);
                    scrollTo(0, 0);
                  }}
                  className="text-[#E9AB54] text-center cursor-pointer p-2 hover:hover:bg-[#8d6834] transition hover:text-white"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setpaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{CalculateAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-[#E9AB54]">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{(CalculateAmount() * 2) / 100}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>₹{CalculateAmount() + (CalculateAmount() * 2) / 100}</span>
          </p>
        </div>

        <button
          onClick={PlaceOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-[#E9AB54] text-white font-medium hover:bg-[#8d6834] transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed To Pay"}
        </button>
      </div>
    </div>
  ) : null;
};
export default Cart;
