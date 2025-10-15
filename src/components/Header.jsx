import { ShoppingCart, Search } from "lucide-react";
import { useState, useEffect } from "react";

const Header = ({ cartCount, searchQuery, setSearchQuery }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`bg-[#f4e1b5] text-gray-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-md sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 shadow-lg" : "py-4"
      }`}
    >
      {/* Logo dengan animasi */}
      <div 
        className="flex items-center gap-3 mb-2 md:mb-0 cursor-pointer"
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-md">
            <svg 
              className={`w-6 h-6 text-white transition-transform duration-500 ${
                isLogoHovered ? "scale-110 rotate-12" : ""
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#f4e1b5] animate-pulse"></div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
          CinzMobile
        </h1>
        <span className="text-xs font-medium bg-amber-600 text-white px-2 py-1 rounded-full transform -rotate-6 shadow-sm">
          Store
        </span>
      </div>

      {/* Search dan Cart dengan animasi */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari handphone..."
            className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 pl-10"
          />
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
          />
        </div>
        
        <div className="relative group">
          <div className="p-2 bg-amber-100 rounded-full transition-all duration-300 group-hover:bg-amber-200 group-hover:scale-110 group-hover:shadow-md cursor-pointer">
            <ShoppingCart size={24} className="text-gray-800 transition-transform duration-300 group-hover:scale-105" />
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 rounded-full animate-bounce">
              {cartCount}
            </span>
          )}
          {/* Tooltip */}
          <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            Keranjang Belanja
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;