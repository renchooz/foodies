import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddProducts = () => {
  const { categories } = useAppContext();

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const ProductData = {
      name,
      description,
      category,
      price,
      offerPrice,
    };
    const formData = new FormData();
    formData.append("productData", JSON.stringify(ProductData));
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/product/add",
        formData
      );
      if (data.status) {
        toast.success(data.message);
        setFile(null);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 h-[95vh] overflow-y-auto no-scrollbar bg-gray-50 p-6">
      <form onSubmit={submitHandler} className="space-y-8 max-w-3xl mx-auto">
        {/* Product Image Upload */}
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-semibold text-gray-800">Product Image</p>
          <label className="cursor-pointer">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="w-32 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg overflow-hidden bg-white">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                }
                alt="upload"
                className="w-full h-full object-cover"
              />
            </div>
          </label>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="product-name"
          >
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type product name"
            className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#E9AB54] focus:border-[#E9AB54]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows="4"
            placeholder="Type product description"
            className="border rounded-md px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-[#E9AB54] focus:border-[#E9AB54]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Product Category */}
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#E9AB54] focus:border-[#E9AB54]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.path}>
                {cat.path}
              </option>
            ))}
          </select>
        </div>

        {/* Price and Offer Price */}
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="product-price"
            >
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#E9AB54] focus:border-[#E9AB54]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="offer-price"
            >
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#E9AB54] focus:border-[#E9AB54]"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#E9AB54] hover:bg-[#d79745] text-white font-semibold rounded-md transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
