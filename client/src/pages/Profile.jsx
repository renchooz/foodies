import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
 
  ShoppingBag, 
  
  Lock, 
 
  CreditCard, 
  
  ChevronRight 
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import Login from "../components/Login";

const Profile = () => {
  const { setUser, User, setCardItems } = useAppContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post(
        "https://foodies-backend-mu0d.onrender.com/api/user/logout",
        {},
        { withCredentials: true }
      );
      if (data.status) {
        setUser(null);
        toast.success(data.message);
        setCardItems({});
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollTo(0,0)
  };

  // If user is not logged in, show login component
  if (!User) return (
    <div className="w-full h-full">
      <Login />
    </div>
  );

  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="px-4 py-3 flex items-center border-b">
        <button 
          onClick={() => navigate("/")} 
          className="text-orange-500"
        >
          &lt; Home
        </button>
        <h1 className="text-xl font-semibold text-center flex-1">Profile</h1>
      </div>

      {/* User info section */}
      <div className="flex flex-col items-center py-6 bg-white">
        <div className="w-24 h-24 rounded-full bg-orange-400 overflow-hidden mb-4">
          {/* Profile image placeholder */}
          <img 
            src="https://cdn2.iconfinder.com/data/icons/business-hr-and-recruitment/100/account_blank_face_dummy_human_mannequin_profile_user_-512.png" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="w-[100%]text-center">
        <h2 className="text-2xl font-semibold">{User.name}</h2>
        <h2 className="text-2xl font-semibold">{User.phone}</h2>
</div>
      </div>

      {/* Menu items */}
      <div className="flex-1 p-4 space-y-6">
        {/* General settings */}
        <div className="space-y-2">

          <div onClick={() => handleNavigation("/password-update")} className="flex items-center justify-between bg-gray-100 rounded-lg p-4 cursor-pointer">
            <div className="flex items-center space-x-3">
              <Lock className="text-gray-800" size={22} />
              <span className="font-medium">Password Update</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
        </div>

        {/* Geography section */}
       

        {/* Membership section */}
        <div className="space-y-2">
          
          
          <div onClick={() => handleNavigation("/loyalty-cards")} className="flex items-center justify-between bg-gray-100 rounded-lg p-4 cursor-pointer">
            <div className="flex items-center space-x-3">
              <CreditCard className="text-gray-800" size={22} />
              <span className="font-medium">My Orders</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>

          

          
          
          <div onClick={() => handleNavigation("/orders")} className="flex items-center justify-between bg-gray-100 rounded-lg p-4 cursor-pointer">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="text-gray-800" size={22} />
              <span className="font-medium">Delete Account</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="w-full bg-orange-500 text-white py-4 rounded-lg text-lg font-semibold flex items-center justify-center"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;