import React, { useEffect, useState } from "react";
import { myOrders } from "../products";

const MyOrders = () => {
  const [Orders, setOrders] = useState([]);

  const fetchOrders = () => {
    setOrders(myOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mt-10 px-4">
      <div className="flex flex-col items-end w-24 mb-6">
        <p className="text-2xl text-[#E9AB54]">Products</p>
        <div className="w-12 h-[1px] bg-black/50"></div>
      </div>

      <div className="w-full flex flex-col gap-10">
        {Orders.map((order, index) => (
          <div
            key={index}
            className=" bg-[#E9AB54]/20 border-black rounded-lg p-4"
          >
            <div className="grid grid-cols-4 text-center text-sm font-medium text-gray-700 mb-2">
              <span>Order ID: {order._id}</span>
              <span
                className={
                  order.status === "Delivered"
                    ? "text-green-700"
                    : order.status === "Pending"
                    ? "text-yellow-600"
                    :order.status === "Canceled"
                    ? "text-red-700"
                    :null
                }
              >
                Status: {order.status}
              </span>
              <span>Date: {order.orderDate}</span>
              <span>Payment: {order.paymentMethod}</span>
            </div>
            <div className="mt-3">
              <div className="grid grid-cols-4 font-semibold text-center text-gray-600 pb-1 mb-2">
                <span>Product</span>
                <span>Quantity</span>
                <span>Price</span>

                <span>Total</span>
              </div>
              {order.products.map((product, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 text-center text-sm py-1 "
                >
                  <span>{product.name}</span>
                  <span>{product.quantity}</span>
                  <span>{product.price}</span>
                  <span>₹{product.quantity * product.price}</span>
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
