/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Heart, Info, MessageCircle, ShoppingCart, X, Filter, Check, Star, Battery, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Handphone = ({ data, setCartCount, categories, selectedCategory, setSelectedCategory }) => {
  const [liked, setLiked] = useState([]);
  const [showInfo, setShowInfo] = useState(null);
  const [showComment, setShowComment] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // State untuk alert
  const [alerts, setAlerts] = useState([]);

  // Data detail tambahan untuk setiap handphone
  const phoneDetails = {
    1: {
      display: "6.1\" Super Retina XDR",
      processor: "A17 Pro Chip",
      camera: "48MP Main + 12MP Ultra Wide",
      battery: "All-day battery",
      storage: "128GB/256GB/512GB"
    },
    2: {
      display: "6.8\" Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 3",
      camera: "200MP Main + 50MP Telephoto",
      battery: "5000mAh",
      storage: "256GB/512GB/1TB"
    },
    3: {
      display: "6.73\" LTPO AMOLED",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP Leica Triple Camera",
      battery: "4880mAh",
      storage: "256GB/512GB"
    },
    4: {
      display: "6.82\" LTPO AMOLED",
      processor: "Snapdragon 8 Gen 2",
      camera: "50MP Hasselblad Triple",
      battery: "5000mAh",
      storage: "256GB/512GB"
    },
    5: {
      display: "6.78\" AMOLED",
      processor: "Dimensity 9300",
      camera: "50MP ZEISS Triple",
      battery: "5400mAh",
      storage: "256GB/512GB"
    },
    6: {
      display: "6.7\" Actua Display",
      processor: "Google Tensor G3",
      camera: "50MP Main + 48MP Ultra Wide",
      battery: "5050mAh",
      storage: "128GB/256GB/512GB"
    },
    7: {
      display: "6.78\" AMOLED",
      processor: "Snapdragon 8s Gen 3",
      camera: "50MP Sony LYT-808",
      battery: "5500mAh",
      storage: "256GB/512GB"
    },
    8: {
      display: "6.78\" AMOLED 165Hz",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP Main + 13MP Ultra Wide",
      battery: "5500mAh",
      storage: "256GB/512GB"
    },
    9: {
      display: "6.5\" 4K OLED",
      processor: "Snapdragon 8 Gen 2",
      camera: "48MP Main + 12MP Ultra Wide",
      battery: "5000mAh",
      storage: "256GB/512GB"
    },
    10: {
      display: "6.8\" AMOLED",
      processor: "MediaTek Dimensity 920",
      camera: "200MP Main + 13MP Ultra Wide",
      battery: "4500mAh",
      storage: "256GB"
    },
    11: {
      display: "6.67\" AMOLED",
      processor: "Snapdragon 8 Gen 2",
      camera: "50MP Main + 8MP Ultra Wide",
      battery: "5000mAh",
      storage: "256GB/512GB"
    },
    12: {
      display: "6.8\" AMOLED",
      processor: "MediaTek Dimensity 9000",
      camera: "50MP Main + 50MP Portrait",
      battery: "5160mAh",
      storage: "256GB"
    }
  };

  // Fungsi untuk menampilkan alert
  const showAlert = (message, type = "success") => {
    const id = Date.now() + Math.random();
    const newAlert = { id, message, type };
    setAlerts(prev => [...prev, newAlert]);

    // Hapus alert setelah 3 detik
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 3000);
  };

  const toggleLike = (id, name) => {
    const wasLiked = liked.includes(id);
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

    if (!wasLiked) {
      showAlert(`Kamu menyukai ${name}`, "like");
    }
  };

  const handleComment = (id, name) => {
    if (newComment.trim()) {
      setComments((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), newComment],
      }));
      setNewComment("");
      setShowComment(null);
      showAlert(`Komentar untuk ${name} tersimpan`, "comment");
    }
  };

  const addToCart = (name) => {
    setCartCount((c) => c + 1);
    showAlert(`${name} ditambahkan ke keranjang`, "cart");
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Variants untuk alert
  const alertVariants = {
    hidden: {
      opacity: 0,
      x: 300,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      x: 300,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  // Gaya berdasarkan jenis alert - semua dalam palet gelap + aksen oranye/hijau
  const getAlertStyle = (type) => {
    switch (type) {
      case "cart":
        return {
          border: "border-[#3ecf8e]",
          text: "text-[#3ecf8e]",
          icon: "🛒"
        };
      case "like":
        return {
          border: "border-[#ff6a39]",
          text: "text-[#ff6a39]",
          icon: "❤️"
        };
      case "comment":
        return {
          border: "border-[#5b8def]",
          text: "text-[#5b8def]",
          icon: "💬"
        };
      default:
        return {
          border: "border-[#8b95a3]",
          text: "text-[#8b95a3]",
          icon: "✨"
        };
    }
  };

  return (
    <div className="p-6 relative max-w-7xl mx-auto w-full">
      {/* Alert Container */}
      <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
        <AnimatePresence>
          {alerts.map((alert) => {
            const style = getAlertStyle(alert.type);
            return (
              <motion.div
                key={alert.id}
                variants={alertVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`bg-[#161d29] ${style.border} ${style.text} p-4 rounded-lg shadow-xl border backdrop-blur-sm font-mono text-sm`}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-xl"
                  >
                    {style.icon}
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center w-6 h-6 bg-[#10161f] rounded-full"
                  >
                    <Check size={14} className={style.text} />
                  </motion.div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  className="h-0.5 bg-current opacity-40 rounded-full mt-2"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Filter Section */}
      <div className="mb-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-center mb-4">
          <motion.button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 bg-[#161d29] border border-[#2a3341] text-[#eae6da] font-mono text-sm px-4 py-2 rounded-md hover:border-[#ff6a39] transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={16} />
            <span>filter_kategori</span>
          </motion.button>
        </div>

        {/* Filter Categories */}
        <motion.div
          className={`flex flex-wrap justify-center gap-2 ${showFilter ? 'block' : 'hidden md:flex'}`}
          initial={false}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-md text-sm font-mono border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#ff6a39] text-[#10161f] border-[#ff6a39] font-semibold"
                  : "bg-[#161d29] text-[#8b95a3] border-[#2a3341] hover:border-[#ff6a39] hover:text-[#eae6da]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Selected Category Info */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-mono text-xs text-[#5c6b7a]">
            menampilkan: <span className="text-[#ff6a39]">{selectedCategory}</span>
            {selectedCategory !== "All" && ` — ${data.length} unit`}
          </p>
        </motion.div>
      </div>

      {/* Products Grid */}
      {data.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">📱</div>
          <h3 className="font-display text-xl font-semibold text-[#eae6da] mb-2">Tidak ada produk ditemukan</h3>
          <p className="font-mono text-sm text-[#5c6b7a]">Coba ubah filter atau kata kunci pencarian</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence>
            {data.map((hp) => {
              const details = phoneDetails[hp.id] || {};
              const sku = `SKU-${String(hp.id).padStart(3, "0")}`;

              return (
                <motion.div
                  key={hp.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="bg-[#161d29] border border-[#2a3341] rounded-xl p-4 hover:border-[#ff6a39]/60 hover:shadow-[0_0_0_1px_rgba(255,106,57,0.15)] transition-all duration-300"
                >
                  {/* Category Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-mono text-[10px] tracking-wider uppercase bg-[#10161f] text-[#8b95a3] border border-[#2a3341] px-2 py-1 rounded">
                      {hp.category}
                    </span>
                    {liked.includes(hp.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[#ff6a39]"
                      >
                        <Heart size={16} fill="currentColor" />
                      </motion.div>
                    )}
                  </div>

                  {/* FLIP CARD CONTAINER - WITH PRODUCT DETAILS */}
                  <div className="flex justify-center mb-4">
                    <motion.div
                      className="relative w-40 h-40 cursor-pointer"
                      style={{ perspective: "1000px" }}
                      whileHover={{ rotateY: 180 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {/* FRONT SIDE - Gambar Handphone saja */}
                      <div
                        className="absolute inset-0 w-full h-full bg-[#f4efe2] rounded-lg border border-[#2a3341] overflow-hidden"
                        style={{
                          backfaceVisibility: "hidden",
                          transformStyle: "preserve-3d"
                        }}
                      >
                        <img
                          src={hp.image}
                          alt={hp.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1.5 font-mono text-[8px] text-[#8b95a3] bg-[#f4efe2]/90 px-1 rounded">
                          {sku}
                        </span>
                      </div>

                      {/* BACK SIDE - Detail Product seperti kartu datasheet */}
                      <div
                        className="absolute inset-0 w-full h-full bg-[#f4efe2] rounded-lg border border-dashed border-[#c8531f] p-3 overflow-y-auto"
                        style={{
                          backfaceVisibility: "hidden",
                          transformStyle: "preserve-3d",
                          transform: "rotateY(180deg)"
                        }}
                      >
                        <div className="space-y-2">
                          {/* Header datasheet */}
                          <div className="flex items-center justify-between border-b border-[#c8531f]/40 pb-1">
                            <h3 className="text-[10px] font-bold text-[#10161f] leading-tight font-mono">
                              {hp.name}
                            </h3>
                            <span className="text-[8px] font-mono text-[#c8531f]">{sku}</span>
                          </div>

                          {/* Spesifikasi Teknis */}
                          <div className="space-y-1.5">
                            {/* Display */}
                            {details.display && (
                              <div className="flex items-start gap-1">
                                <div className="bg-[#5b8def]/15 p-0.5 rounded mt-0.5">
                                  <Star size={10} className="text-[#5b8def]" />
                                </div>
                                <div>
                                  <p className="text-[9px] font-mono font-semibold text-[#10161f]">Layar</p>
                                  <p className="text-[9px] font-mono text-[#5c6b7a]">{details.display}</p>
                                </div>
                              </div>
                            )}

                            {/* Processor */}
                            {details.processor && (
                              <div className="flex items-start gap-1">
                                <div className="bg-[#3ecf8e]/15 p-0.5 rounded mt-0.5">
                                  <Cpu size={10} className="text-[#3ecf8e]" />
                                </div>
                                <div>
                                  <p className="text-[9px] font-mono font-semibold text-[#10161f]">Processor</p>
                                  <p className="text-[9px] font-mono text-[#5c6b7a]">{details.processor}</p>
                                </div>
                              </div>
                            )}

                            {/* Camera */}
                            {details.camera && (
                              <div className="flex items-start gap-1">
                                <div className="bg-[#a875e0]/15 p-0.5 rounded mt-0.5">
                                  <svg className="w-2.5 h-2.5 text-[#a875e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-[9px] font-mono font-semibold text-[#10161f]">Kamera</p>
                                  <p className="text-[9px] font-mono text-[#5c6b7a]">{details.camera}</p>
                                </div>
                              </div>
                            )}

                            {/* Battery */}
                            {details.battery && (
                              <div className="flex items-start gap-1">
                                <div className="bg-[#ff6a39]/15 p-0.5 rounded mt-0.5">
                                  <Battery size={10} className="text-[#ff6a39]" />
                                </div>
                                <div>
                                  <p className="text-[9px] font-mono font-semibold text-[#10161f]">Baterai</p>
                                  <p className="text-[9px] font-mono text-[#5c6b7a]">{details.battery}</p>
                                </div>
                              </div>
                            )}

                            {/* Storage */}
                            {details.storage && (
                              <div className="flex items-start gap-1">
                                <div className="bg-[#8b95a3]/15 p-0.5 rounded mt-0.5">
                                  <svg className="w-2.5 h-2.5 text-[#5c6b7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-[9px] font-mono font-semibold text-[#10161f]">Penyimpanan</p>
                                  <p className="text-[9px] font-mono text-[#5c6b7a]">{details.storage}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Harga */}
                          <div className="pt-1 border-t border-dashed border-[#c8531f]/40">
                            <p className="text-xs font-mono font-bold text-[#c8531f] text-center">
                              Rp {hp.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Data Handphone di bawah flip card */}
                  <div className="mt-2 space-y-1 text-center">
                    <h2 className="font-display text-base font-semibold text-[#eae6da] leading-tight">
                      {hp.name}
                    </h2>
                    <p className="font-mono text-xs text-[#5c6b7a]">{hp.brand}</p>
                    <p className="font-mono text-[#ff6a39] font-bold">
                      Rp {hp.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-[#2a3341]">
                    <motion.button
                      title="Info Detail"
                      onClick={() => setShowInfo(hp)}
                      className="text-[#5b8def] hover:text-[#7ba3ff] transition-colors"
                      variants={buttonVariants}
                      whileTap="tap"
                    >
                      <Info size={20} />
                    </motion.button>

                    <motion.button
                      title="Suka"
                      onClick={() => toggleLike(hp.id, hp.name)}
                      className={`${
                        liked.includes(hp.id) ? "text-[#ff6a39]" : "text-[#5c6b7a]"
                      } hover:text-[#ff6a39] transition-colors`}
                      variants={buttonVariants}
                      whileTap="tap"
                    >
                      <Heart
                        size={20}
                        fill={liked.includes(hp.id) ? "currentColor" : "none"}
                      />
                    </motion.button>

                    <motion.button
                      title="Komentar"
                      onClick={() => setShowComment(hp)}
                      className="text-[#3ecf8e] hover:text-[#5fe0a5] transition-colors"
                      variants={buttonVariants}
                      whileTap="tap"
                    >
                      <MessageCircle size={20} />
                    </motion.button>

                    <motion.button
                      title="Tambah ke Keranjang"
                      onClick={() => addToCart(hp.name)}
                      className="text-[#eae6da] hover:text-[#ff6a39] transition-colors"
                      variants={buttonVariants}
                      whileTap="tap"
                    >
                      <ShoppingCart size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Popup Info */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfo(null)}
          >
            <motion.div
              className="bg-[#161d29] p-6 rounded-2xl max-w-md w-full relative shadow-2xl border border-[#ff6a39]/50 max-h-[90vh] overflow-y-auto"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-[#5c6b7a] hover:text-[#eae6da] transition-colors z-10"
                onClick={() => setShowInfo(null)}
              >
                <X size={22} />
              </button>

              <div className="flex justify-center mb-4">
                <motion.img
                  src={showInfo.image}
                  alt={showInfo.name}
                  className="w-48 h-48 rounded-xl border border-[#2a3341] bg-[#f4efe2] shadow-md object-cover"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              </div>

              <div className="text-center">
                <h3 className="font-display text-2xl font-bold text-[#eae6da] mb-2">
                  {showInfo.name}
                </h3>
                <div className="flex justify-center gap-2 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wide bg-[#10161f] text-[#8b95a3] border border-[#2a3341] px-3 py-1 rounded-full">
                    {showInfo.brand}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wide bg-[#10161f] text-[#5b8def] border border-[#2a3341] px-3 py-1 rounded-full">
                    {showInfo.category}
                  </span>
                </div>
                <p className="text-[#c3c9d1] text-sm mb-4 leading-relaxed">
                  {showInfo.description}
                </p>
                <p className="font-mono text-[#ff6a39] font-extrabold text-xl">
                  Rp {showInfo.price.toLocaleString()}
                </p>
              </div>

              {/* Tampilkan semua komentar */}
              {(comments[showInfo.id] || []).length > 0 && (
                <div className="mt-6 p-4 bg-[#10161f] border border-[#2a3341] rounded-xl">
                  <h4 className="font-mono text-xs uppercase tracking-wide text-[#8b95a3] mb-3 text-center">
                    komentar pengguna
                  </h4>
                  <ul className="space-y-2">
                    <AnimatePresence>
                      {comments[showInfo.id].map((comment, index) => (
                        <motion.li
                          key={index}
                          className="text-sm text-[#eae6da] bg-[#161d29] p-3 rounded-lg border border-[#2a3341]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start gap-2">
                            <div className="bg-[#3ecf8e]/15 rounded-full p-1 mt-1">
                              <MessageCircle size={12} className="text-[#3ecf8e]" />
                            </div>
                            <span>{comment}</span>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Komentar */}
      <AnimatePresence>
        {showComment && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowComment(null)}
          >
            <motion.div
              className="bg-[#161d29] p-6 rounded-2xl max-w-md w-full relative shadow-2xl border border-[#ff6a39]/50"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-[#5c6b7a] hover:text-[#eae6da] transition-colors"
                onClick={() => setShowComment(null)}
              >
                <X size={22} />
              </button>

              <h3 className="font-display text-xl font-bold mb-4 text-center text-[#eae6da]">
                Tambah Komentar untuk {showComment.name}
              </h3>
              <textarea
                className="w-full border border-[#2a3341] rounded-xl p-4 h-32 bg-[#10161f] text-[#eae6da] placeholder-[#5c6b7a] focus:outline-none focus:border-[#ff6a39] focus:ring-1 focus:ring-[#ff6a39] resize-none"
                placeholder="Tulis komentar kamu tentang produk ini..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <motion.button
                className="bg-[#ff6a39] text-[#10161f] px-6 py-3 mt-4 rounded-xl hover:bg-[#ff825c] w-full transition-colors font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => handleComment(showComment.id, showComment.name)}
                disabled={!newComment.trim()}
                variants={buttonVariants}
                whileTap="tap"
              >
                Simpan Komentar
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Handphone;