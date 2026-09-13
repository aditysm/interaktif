import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, ExternalLink, RefreshCw, KeyRound, Award } from "lucide-react";

interface KejutanBungaProps {
  gdriveUrl: string;
}

export default function KejutanBunga({ gdriveUrl }: KejutanBungaProps) {
  const [hasMorphed, setHasMorphed] = useState(false);
  const [isBlooming, setIsBlooming] = useState(false);

  const handleFlowerClick = () => {
    if (hasMorphed || isBlooming) return;
    setIsBlooming(true);

    // Elegant 1.2s soft blooming pulse, then transition
    setTimeout(() => {
      setHasMorphed(true);
      setIsBlooming(false);
    }, 1200);
  };

  const handleReset = () => {
    setHasMorphed(false);
  };

  // Dynamic QR Code generation with matching deep blue color
  const qrCodeUrl = gdriveUrl && gdriveUrl.trim() !== ""
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=1e3a8a&bgcolor=ffffff&data=${encodeURIComponent(gdriveUrl.trim())}`
    : null;

  return (
    <section 
      id="kejutan-section"
      className="py-24 px-4 bg-gradient-to-t from-sky-50 via-white to-transparent text-center flex flex-col items-center justify-center relative overflow-hidden animate-fade-in"
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>

      <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
        {/* Floating elements around the flower area */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 left-10 text-blue-400 opacity-40"
          >
            <Sparkles size={20} />
          </motion.div>
          <motion.div
            animate={{ y: [15, -15, 15], x: [5, -5, 5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 right-10 text-pink-400 opacity-45"
          >
            <Heart size={20} />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!hasMorphed ? (
            <motion.div
              key="flower-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-xs uppercase tracking-widest font-black text-blue-600 mb-3 flex items-center gap-1.5 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                <Award size={13} className="text-blue-500" /> Ada Kado Spesial Buat Yudia!
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-slate-800 mb-4 tracking-tight flex items-center justify-center gap-2">
                <span>Mawar Biru Kejutan</span>
                <Sparkles size={22} className="text-blue-500 inline" />
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-12 font-bold leading-relaxed">
                Ada sekuntum mawar biru spesial di bawah ini. Coba sentuh kelopak bunganya perlahan, dan lihat kejutan manis apa yang akan mekar untuk Yudia!
              </p>

              {/* Highly Animated Interactive Flower Button */}
              <button
                onClick={handleFlowerClick}
                disabled={isBlooming}
                className="relative w-44 h-44 flex items-center justify-center cursor-pointer select-none group focus:outline-none rounded-full"
              >
                {/* Glowing Aura pulses */}
                <div className={`absolute inset-0 rounded-full bg-blue-100 transition-all duration-1000 ${
                  isBlooming ? "animate-ping scale-150 bg-blue-200" : "animate-pulse group-hover:scale-110"
                }`}></div>

                {/* Sparkling dots on bloom */}
                {isBlooming && (
                  <div className="absolute inset-0">
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = (i * 360) / 8;
                      const rad = (angle * Math.PI) / 180;
                      return (
                        <motion.div
                          key={i}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                          animate={{
                            x: Math.cos(rad) * 90,
                            y: Math.sin(rad) * 90,
                            opacity: 0,
                            scale: 1.2,
                          }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="absolute top-[45%] left-[45%] text-blue-500"
                        >
                          <Sparkles size={16} />
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Gorgeous Custom Vector Rose Flower */}
                <motion.div
                  animate={
                    isBlooming
                      ? {
                          scale: [1, 1.2, 0.9],
                          opacity: [1, 1, 0.8],
                        }
                      : {
                          y: [-4, 4, -4],
                        }
                  }
                  transition={
                    isBlooming
                      ? { duration: 1.2, ease: "easeInOut" }
                      : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="relative z-10 w-32 h-32 flex items-center justify-center"
                >
                  {/* Detailed SVG Flower Rose Art (Luxury Blue Aesthetic) */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-md text-blue-500 group-hover:text-sky-500 transition-colors duration-300"
                    fill="currentColor"
                  >
                    {/* Outer crystal leaves */}
                    <path
                      d="M 50,70 Q 25,65 20,40 Q 30,35 50,70 Z"
                      fill="#93C5FD"
                      className="origin-center rotate-45 transform opacity-70"
                    />
                    <path
                      d="M 50,70 Q 75,65 80,40 Q 70,35 50,70 Z"
                      fill="#93C5FD"
                      className="origin-center -rotate-45 transform opacity-70"
                    />
                    
                    {/* Flower stem */}
                    <rect x="47" y="65" width="6" height="25" rx="3" fill="#60A5FA" />
                    
                    {/* Outer Petals */}
                    <circle cx="50" cy="30" r="18" className="opacity-90 fill-[#1E40AF]" />
                    <circle cx="32" cy="48" r="18" className="opacity-90 fill-[#2563EB]" />
                    <circle cx="68" cy="48" r="18" className="opacity-90 fill-[#2563EB]" />
                    <circle cx="40" cy="62" r="18" className="origin-center fill-[#1D4ED8]" />
                    <circle cx="60" cy="62" r="18" className="origin-center fill-[#1D4ED8]" />

                    {/* Middle Petals (gradient highlights) */}
                    <circle cx="50" cy="40" r="14" fill="#60A5FA" />
                    <circle cx="40" cy="50" r="14" fill="#60A5FA" />
                    <circle cx="60" cy="50" r="14" fill="#60A5FA" />
                    
                    {/* Inner core rose layers */}
                    <path
                      d="M 50,38 C 42,38 38,44 44,52 C 50,60 50,60 56,52 C 62,44 58,38 50,38 Z"
                      fill="#93C5FD"
                    />
                    <path
                      d="M 50,44 C 46,44 44,47 47,51 C 50,55 50,55 53,51 C 56,47 54,44 50,44 Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </motion.div>
              </button>

              <span className="text-[11px] font-black text-blue-500 mt-6 tracking-wider uppercase animate-pulse">
                {isBlooming ? "Kejutan manis lagi mekar..." : "Sentuh Mawarnya di Sini"}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="qrcode-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="flex flex-col items-center bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(59,130,246,0.06)] border border-blue-100"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[11px] font-black text-blue-600 mb-4">
                <Sparkles size={11} className="text-blue-500" />
                <span>MAWAR MAKSIMAL BERSEMI!</span>
              </div>

              <h3 className="font-sans text-xl sm:text-2xl font-black text-slate-800 mb-2 flex items-center gap-1.5 justify-center">
                <KeyRound size={20} className="text-blue-500" />
                Ruang Rahasia Kita
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mb-6 font-bold leading-relaxed">
                Ini dia folder Google Drive berisi kumpulan foto dan video kenangan manis Yudia bersama Adit. Kamu bisa scan QR code di bawah ini atau klik tombol biru untuk langsung membuka foldernya.
              </p>

              {/* Dynamic QR Code Box */}
              <div className="relative w-48 h-48 bg-white p-3 rounded-2xl border-4 border-blue-100 flex items-center justify-center shadow-inner overflow-hidden mb-6 group">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Drive Memories QR Code"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <span className="text-xs text-[#64748B] font-bold">QR Code belum tersedia</span>
                )}
              </div>

              {/* Direct Link Option */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={gdriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-blue-500 text-white text-xs sm:text-sm font-black shadow-lg transition-all cursor-pointer"
              >
                <span>Buka Album Foto Kita</span>
                <ExternalLink size={14} />
              </motion.a>

              {/* Reset Option */}
              <button
                onClick={handleReset}
                className="mt-6 text-xs text-slate-400 hover:text-blue-500 font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={11} />
                <span>Mekarkan Ulang Mawarnya</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
