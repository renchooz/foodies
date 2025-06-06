import React, { useContext } from "react";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  let { categories, nevigate } = useAppContext();
  
  return (
    <div className="mt-16 w-full px-4 md:px-0">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 via-[#E9AB54] to-gray-800 bg-clip-text text-transparent">
            Explore Categories
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E9AB54] to-transparent mx-auto rounded-full"></div>
        </div>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Discover delicious food from your favorite categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 md:gap-12 max-w-7xl mx-auto">
        {categories.map((category, idx) => (
          <div
            key={idx}
            onClick={() => {
              nevigate(`/category/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="group cursor-pointer flex flex-col items-center transform transition-all duration-300 hover:scale-110 hover:-translate-y-2"
          >
            {/* Image Container with Enhanced Effects */}
            <div className="relative mb-4">
              {/* Outer Ring */}
              <div className="absolute inset-0 w-24 h-24 md:w-36 md:h-36 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-[#E9AB54]/20 via-[#DEF2F1]/30 to-[#E9AB54]/20 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-110"></div>
              
              {/* Middle Ring */}
              <div className="absolute inset-0 w-24 h-24 md:w-36 md:h-36 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-[#DEF2F1]/30 to-[#E9AB54]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-105"></div>
              
              {/* Image */}
              <div className="relative overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  className="w-24 h-24 md:w-36 md:h-36 sm:w-32 sm:h-32 object-cover mix-blend-screen transform group-hover:scale-110 transition-transform duration-500"
                  src={category.image}
                  alt={category.name}
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#E9AB54]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating Particles */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#E9AB54] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-100"></div>
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[#DEF2F1] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 delay-200"></div>
            </div>

            {/* Category Name */}
            <div className="text-center">
              <p className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-[#E9AB54] transition-colors duration-300 transform group-hover:scale-105">
                {category.name}
              </p>
              {/* Underline Effect */}
              <div className="w-0 h-0.5 bg-[#E9AB54] mx-auto mt-1 group-hover:w-full transition-all duration-300 rounded-full"></div>
            </div>

            {/* Hover Icon */}
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 mt-2">
              <div className="bg-[#E9AB54] text-white p-1.5 rounded-full shadow-lg">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#DEF2F1]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#E9AB54]/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Categories;

// Add this CSS to your global styles for the slow spin animation
/*
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
*/