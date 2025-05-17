import React, { useEffect, useState } from 'react';
import { dummyOrders } from '../../products';
import axios from 'axios';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async() => {
  try {
     const {data} = await axios.get("https://foodies-backend-vkuo.onrender.com/api/orders/admin",{
  withCredentials: true,
})
   if(data.status){
    setOrders(data.orders)
   }
  } catch (error) {
    toast.error(error.message)
  }
  };
  console.log(orders)

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Your Orders</h2>

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 grid md:grid-cols-5 gap-6 items-center"
            >
              {/* Product Image and Names */}
              <div className="flex gap-4 items-center">
                <img 
                  className="w-14 h-14 rounded-md object-cover opacity-70" 
                  src="https://thumbs.dreamstime.com/b/serving-food-icon-symbol-service-serving-food-icon-sign-hand-waiter-serving-tray-waiter-serving-isolated-symbol-148100509.jpg" 
                  alt="Order"
                />
                <div className="flex flex-col space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-gray-700 font-medium">
                      {item.name} 
                      <span className={`ml-2 text-sm text-indigo-500 ${item.quantity < 2 && 'hidden'}`}>
                        x {item.quantity}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Address Details */}
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-1">{order.address.name}</p>
                <p>{order.address.street}, {order.address.city}</p>
                <p>{order.address.state} - {order.address.pinCode}</p>
                <p>{order.address.country}</p>
                <p className="mt-1">📞 {order.address.phone}</p>
              </div>

              {/* Price Details */}
              <div className="flex flex-col space-y-1 text-gray-800">
                {order.items.map((item, id) => (
                  <p key={id} className="text-base font-semibold">₹{order.amount}</p>
                ))}
              </div>

              {/* Payment and Status */}
              <div className="flex flex-col space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">Method:</span> {order.paymentMethod}</p>
                <p><span className="font-semibold">Date:</span> {order.orderDate}</p>
              </div>

              {/* Order Status */}
              <div className="flex justify-start">
                <span 
                  className={`
                    px-4 py-2 text-sm font-semibold rounded-full 
                    ${order.status === 'Delivered' && 'bg-green-100 text-green-600'}
                    ${order.status === 'Pending' && 'bg-yellow-100 text-yellow-600'}
                    ${order.status === 'Out for Delivery' && 'bg-blue-100 text-blue-600'}
                  `}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
