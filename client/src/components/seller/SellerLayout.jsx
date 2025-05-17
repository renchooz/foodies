import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const SellerLayout = () => {

 
const {setisSeller,nevigate} = useAppContext()
    const sidebarLinks = [
        { name: "Add Product", path: "/seller" },
        { name: "Product List", path: "/seller/product-list" },
        { name: "Orders", path: "/seller/product-orders" },
       
    ];
    const logout = async()=>{
        try {
          const {data} = await axios.post("https://foodies-backend-mu0d.onrender.com/api/seller/logout",{
              withCredentials: true,
          })
          if(data.status){
            setisSeller(false)
            nevigate("/")
            toast.success(data.message)
          }else{
            toast.error(data.message)
          }
        } catch (error) {
         toast.error(error.message)
        }
    }

    return (
      <>
      <div className="h-screen overflow-hidden flex flex-col">
        {/* Navbar */}
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
          <Link to="/">
            <img className="h-9" src="" />
          </Link>
          <div className="flex items-center gap-5 text-gray-500">
            <p>Hi! Admin</p>
            <button onClick={logout} className="border rounded-full text-sm px-4 py-1">
              Logout
            </button>
          </div>
        </div>
    
        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 overflow-y-auto">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === '/seller'}
                className={({ isActive }) => `
                  flex items-center py-3 px-4 gap-3 
                  ${isActive 
                    ? "border-r-4 md:border-r-[6px] bg-[#E9AB54]/70 border-[#E9AB54] text-white"
                    : "hover:bg-gray-100/90 border-white text-gray-700"
                  }
                `}
              >
                <p className="md:block hidden text-center">{item.name}</p>
              </NavLink>
            ))}
          </div>
    
          {/* Outlet Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
    
      
    );
};
export default SellerLayout