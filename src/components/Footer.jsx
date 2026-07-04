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
    <footer
      className={`bg-[#161d29] border-t border-[#2a3341] text-[#eae6da] p-6 mt-auto transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Logo Footer */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#10161f] border-2 border-[#ff6a39] rounded-md flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#ff6a39]"
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
            <h3 className="font-display text-lg font-bold text-[#eae6da]">
              CinzMobile
            </h3>
          </div>
          <p className="font-mono text-xs text-[#8b95a3] tracking-widest uppercase">
            spec &amp; store
          </p>
        </div>

        {/* Kontak Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={15} className="text-[#ff6a39]" />
              <span className="font-medium text-sm">Hubungi Kami</span>
            </div>
            <p className="font-mono text-xs text-[#8b95a3]">+62 857-2295-6277</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={15} className="text-[#ff6a39]" />
              <span className="font-medium text-sm">Email</span>
            </div>
            <p className="font-mono text-xs text-[#8b95a3]">info@cinzmobilestore.com</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={15} className="text-[#ff6a39]" />
              <span className="font-medium text-sm">Lokasi</span>
            </div>
            <p className="font-mono text-xs text-[#8b95a3]">Purwakarta, Indonesia</p>
          </div>
        </div>

        {/* Garis Pemisah */}
        <div className="border-t border-dashed border-[#2a3341] my-4"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center font-mono text-xs text-[#8b95a3]">
          <p className="mb-2 md:mb-0">
            © {currentYear} CinzMobile — all specs subject to change
          </p>
          <div className="flex items-center">
            <span>made with</span>
            <Heart size={12} className="mx-1 text-[#ff6a39]" fill="currentColor" />
            <span>for our customers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;