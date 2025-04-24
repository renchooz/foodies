import React, { useEffect, useState } from "react";

import { useAppContext } from "../../context/AppContext";

const SellerLogin = () => {
  const { nevigate, isSeller, setisSeller } = useAppContext();
  const [email, setemail] = useState([]);
  const [password, setpassword] = useState([]);
  useEffect(() => {
    if (isSeller) {
      nevigate("/seller");
    }
  }, [isSeller]);
  const submitHandler  =async (e) => {
    e.preventDefault();
    setemail("");
    setpassword("");
  setisSeller(true)
  };
  return !isSeller && (
    <form
    onSubmit={submitHandler}
    className="w-full h-[100vh] flex justify-center items-center bg-gray-100"
  >
    <div className="flex flex-col text-xl border border-gray-300 p-8 rounded-2xl gap-5 bg-white shadow-xl w-[350px]">
      <p className="text-3xl text-[#E9AB54] text-center font-bold">
        Seller Login
      </p>
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Email</label>
        <input
          onChange={(e) => setemail(e.target.value)}
          type="email"
          value={email}
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9AB54]"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Password</label>
        <input
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Enter your password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9AB54]"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-[#E9AB54] text-white font-semibold rounded-md hover:bg-[#c78d36] transition-colors"
      >
        Login
      </button>
    </div>
  </form>
  );
};

export default SellerLogin;
