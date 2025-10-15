import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    // Animasi muncul saat komponen dimount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className={`bg-[#f4e1b5] text-gray-800 p-6 mt-auto shadow-inner transform transition-all duration-700 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Logo Footer */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow">
              <svg 
                className="w-5 h-5 text-white" 
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
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              CinzMobile
            </h3>
          </div>
          <p className="text-amber-800 text-sm font-medium">Elegant & Modern</p>
        </div>

        {/* Kontak Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={16} className="text-amber-700" />
              <span className="font-medium">Hubungi Kami</span>
            </div>
            <p className="text-sm text-gray-700">+62 857-2295-6277</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-amber-700" />
              <span className="font-medium">Email</span>
            </div>
            <p className="text-sm text-gray-700">info@cinzmobilestore.com</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-amber-700" />
              <span className="font-medium">Lokasi</span>
            </div>
            <p className="text-sm text-gray-700">Purwakarta, Indonesia</p>
          </div>
        </div>

        {/* Garis Pemisah */}
        <div className="border-t border-amber-300 my-4"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0">
            © {currentYear} CinzMobile — Elegant & Modern
          </p>
          <div className="flex items-center text-sm">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-500 animate-pulse" />
            <span>for our customers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;