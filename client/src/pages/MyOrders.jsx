import React, { useEffect, useState } from "react";
import { myOrders } from "../products";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [Orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("https://foodies-backend-vkuo.onrender.com/api/orders/user",{
  withCredentials: true,
});
      if (data.status) {
        setOrders(data.orders);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  console.log(Orders);
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mt-12 px-6">
      <div className="mb-8 text-right">
        <h2 className="text-3xl font-bold text-[#E9AB54]">My Orders</h2>
        <div className="w-16 h-1 bg-black/60 mt-1 ml-auto rounded-full"></div>
      </div>

      <div className="space-y-8">
        {Orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-xl p-6"
          >
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 mb-4">
              <p>
                <span className="font-semibold text-gray-800">Order ID:</span>{" "}
                {order._id}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Date:</span>{" "}
                {order.createdAt}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Payment:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Canceled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>

            <div>
              <div className="grid grid-cols-4 gap-4 font-semibold text-center text-gray-700 border-b pb-2">
                <span>Product</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Total</span>
              </div>

              {order.items.map((product, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-4 text-center text-sm py-2 border-b last:border-none"
                >
                  <img
                    src={product.product.image}
                    alt={product.product.name}
                    className="h-16 w-16 object-cover rounded mx-auto"
                  />
                  <span>{product.quantity}</span>
                  <span>₹{product.product.offerPrice}</span>
                  <span className="font-medium">₹{order.amount}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
