import { useState } from "react";
import Header from "./components/Header";
import Handphone from "./components/Handphone";
import Footer from "./components/Footer";

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handphones = [
    { id: 1, name: "iPhone 15 Pro", category: "Smartphone", brand: "Apple", price: 22000000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbuByLpM3r8EB3i0ekjal1w1iAKYcRjyAG7w&s", description: "Chip A17 Pro, kamera 48MP, layar Super Retina XDR 6.1 inci." },
    { id: 2, name: "Samsung Galaxy S24 Ultra", category: "Smartphone", brand: "Samsung", price: 19000000, image: "https://pngdownload.io/wp-content/uploads/2024/02/Samsung-Galaxy-S24-Ultra-Titanium-Violet-Smartphone-transparent-PNG-image-jpg.webp", description: "S Pen terintegrasi, kamera 200MP, Snapdragon 8 Gen 3." },
    { id: 3, name: "Xiaomi 14 Pro", category: "Smartphone", brand: "Xiaomi", price: 12000000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQyNDiInHAspUlbJRin-u83nyzn13xhH0XhQ&s", description: "Lensa Leica, Snapdragon 8 Gen 3, layar AMOLED 120Hz." },
    { id: 4, name: "Oppo Find X6 Pro", category: "Smartphone", brand: "Oppo", price: 15000000, image: "https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x6-pro-1.jpg", description: "Desain premium, kamera Hasselblad, layar QHD+ 120Hz." },
    { id: 5, name: "Vivo X100 Pro", category: "Smartphone", brand: "Vivo", price: 13000000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8g6MQ7TdgQ9z-1iafco6F0_H9Idmzo3rWfw&s", description: "Prosesor Dimensity 9300, kamera Zeiss, layar LTPO 120Hz." },
    { id: 6, name: "Google Pixel 8 Pro", category: "Smartphone", brand: "Google", price: 16000000, image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Pixel_8_Pro_in_Porcelain.max-936x936.format-webp.webp", description: "Google Tensor G3, AI kamera canggih, update OS 7 tahun." },
    { id: 7, name: "Realme GT 6", category: "Smartphone", brand: "Realme", price: 9500000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2nl4zD3xVNCYqNKVe8t3sX2mhOTQncQYp1Q&s", description: "Snapdragon 8s Gen 3, 120Hz OLED, fast charging 150W." },
    { id: 8, name: "Asus ROG Phone 8", category: "Gaming", brand: "Asus", price: 18000000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZp89V4WUEK196dCZxZ06s2ab7kZj_HMG4pA&s", description: "165Hz AMOLED, sistem pendingin AeroActive." },
    { id: 9, name: "Sony Xperia 1 V", category: "Smartphone", brand: "Sony", price: 17500000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3U6gJ-FCKu4ZzVF-BQuyvsT4bEeBxEq4qlA&s", description: "Kamera pro, layar 4K OLED 120Hz, Snapdragon 8 Gen 2." },
    { id: 10, name: "Infinix Zero Ultra", category: "Midrange", brand: "Infinix", price: 6000000, image: "https://global.pro.infinixmobility.com/media/wysiwyg/x6820_zeroultra_base4.png", description: "Kamera 200MP, pengisian daya 180W, desain elegan." },
    { id: 11, name: "POCO F6 Pro", category: "Gaming", brand: "POCO", price: 8500000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXcUSjiKt1KrwfwzzIU3q3005nRNCLA512Gg&s", description: "Snapdragon 8 Gen 2, layar AMOLED, 120W fast charging." },
    { id: 12, name: "Tecno Phantom X2", category: "Midrange", brand: "Tecno", price: 7500000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLqzTMe184AA8D-Ll7f9dFpXcAu8O1t_PKAA&s", description: "Desain unik, kamera retractable, performa tinggi." },
  ];

  // Filter data berdasarkan pencarian dan kategori
  const filteredData = handphones.filter((hp) => {
    const matchesSearch = 
      hp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hp.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || hp.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Dapatkan semua kategori unik
  const categories = ["All", ...new Set(handphones.map(hp => hp.category))];

  return (
    <div className="bg-[#fff8e7] min-h-screen flex flex-col">
      <Header
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Handphone 
        data={filteredData} 
        setCartCount={setCartCount}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Footer />
    </div>
  );
};

export default App;