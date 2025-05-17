import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const AddAddress = ({adress}) => {
  const {nevigate} = useAppContext()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("https://foodies-backend-mu0d.onrender.com/api/address/add",
      formData,{
  withCredentials: true,
}
      )
      if(data.status){
        toast.success(data.message)
        adress(false)
        
      }else{
         toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  };

  return (
    <div className=" mx-auto md:w-[50vw] w-[80vw]  p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'phone', 'street', 'city', 'state', 'country', 'pinCode'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize text-gray-700">{field}:</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        ))}
        <button 
          type="submit"
          className="w-full bg-[#E9AB54] text-white py-2 px-4 rounded-md hover:bg-[#745832]"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
