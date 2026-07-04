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
      className={`bg-[#161d29]/95 backdrop-blur border-b border-[#2a3341] text-[#eae6da] px-6 flex flex-col md:flex-row items-center justify-between sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.35)]" : "py-4"
      }`}
    >
      {/* Logo - styled like an IC chip label */}
      <div
        className="flex items-center gap-3 mb-3 md:mb-0 cursor-pointer"
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        <div className="relative">
          <div
            className={`w-10 h-10 bg-[#10161f] border-2 border-[#ff6a39] rounded-md flex items-center justify-center transition-transform duration-500 ${
              isLogoHovered ? "rotate-6 scale-105" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-[#ff6a39]"
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
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#3ecf8e] rounded-full border-2 border-[#161d29] animate-pulse"></div>
        </div>
        <div className="flex flex-col leading-none">
          <h1 className="font-display text-xl font-bold text-[#eae6da] tracking-tight">
            CinzMobile
          </h1>
          <span className="font-mono text-[10px] text-[#8b95a3] tracking-widest uppercase">
            spec &amp; store — rev.02
          </span>
        </div>
      </div>

      {/* Search dan Cart */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-72">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff6a39] font-mono text-xs">
            &gt;
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="cari nama atau brand..."
            className="font-mono text-sm bg-[#10161f] border border-[#2a3341] text-[#eae6da] placeholder-[#5c6b7a] rounded-md pl-7 pr-9 py-2 w-full focus:outline-none focus:border-[#ff6a39] focus:ring-1 focus:ring-[#ff6a39] transition-all duration-300"
          />
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5c6b7a]"
          />
        </div>

        <div className="relative group shrink-0">
          <div className="p-2.5 bg-[#10161f] border border-[#2a3341] rounded-md transition-all duration-300 group-hover:border-[#ff6a39] cursor-pointer">
            <ShoppingCart size={20} className="text-[#eae6da]" />
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#ff6a39] text-[#10161f] text-[10px] font-mono font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
          {/* Tooltip */}
          <div className="absolute right-0 top-full mt-2 bg-[#10161f] border border-[#2a3341] text-[#eae6da] text-xs font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            keranjang_belanja
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;