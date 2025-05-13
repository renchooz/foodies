import React from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const { product, fetchProducts } = useAppContext();

  const handleToggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/product/stock",
        { id, inStock }
      );
      if (data.status) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-md rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left hidden md:table-cell">
                    Selling Price
                  </th>
                  <th className="px-6 py-4 text-left">In Stock</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-gray-600">
                {product.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    {/* Product Image + Name */}
                    <td className="px-6 py-4 flex items-center space-x-4">
                      <div className="w-16 h-16 flex-shrink-0 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-gray-900 font-medium truncate block">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">{item.category}</td>

                    {/* Selling Price */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      ₹{item.offerPrice}
                    </td>

                    {/* In Stock Toggle */}
                    <td className="px-6 py-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.inStock}
                          onChange={() =>
                            handleToggleStock(item._id, !item.inStock)
                          }
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full relative peer-checked:bg-[#E9AB54] transition-colors duration-300">
                          <span className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-[24px]"></span>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
