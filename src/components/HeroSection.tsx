import { motion } from "motion/react";
import { Heart, Sparkles, ChevronDown, Camera } from "lucide-react";

interface HeroSectionProps {
  partnerName: string;
}

export default function HeroSection({ partnerName }: HeroSectionProps) {
  return (
    <section 
      id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-16 overflow-hidden pt-28 pb-16"
    >
      {/* Dynamic Color-Shifting Gradient Mesh Background (High-performance CSS/Framer Motion) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/70 via-white to-sky-50/50" />
        
        {/* Shifting Soft Blurring Mesh Orbs */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -left-20 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-200/30 rounded-full blur-[100px]"
        />
        
        <motion.div
          animate={{
            x: [0, -60, 30, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.9, 1.12, 1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute top-1/4 -right-20 w-[380px] sm:w-[550px] h-[380px] sm:h-[550px] bg-pink-100/30 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, 70, -30, 0],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute -bottom-20 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-sky-200/40 rounded-full blur-[110px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        
        {/* FLOATING WELCOME HEADER WITH SCALE-UP ANIMATION */}
        <div className="flex flex-col items-center space-y-6">
          
          {/* Majestic Gently Floating & Scaling Name Block */}
          <div className="space-y-3">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: [1, 1.05, 1],
                y: [0, -8, 0]
              }}
              transition={{
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                duration: 1
              }}
              className="inline-block"
            >
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-slate-800 tracking-tight leading-none">
                Hi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 font-extrabold pb-2">{partnerName}</span>
              </h1>
            </motion.div>

            {/* Added cool primary header right above Barakallah Fii Umrik */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 tracking-tight">
                Selamat datang di 19!
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl font-black text-slate-700 tracking-wide"
            >
              Barakallah Fii Umrik, {partnerName}...
            </motion.p>
          </div>

          {/* Sweet Sentiment Snippet */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed max-w-2xl mx-auto"
          >
            Hari ini bumi rasanya ikut berbahagia merayakan hari lahirmu. Terima kasih banyak sudah hadir membawa tawa, ketenangan, dan cinta tulus yang selalu mencerahkan duniaku. Aku beruntung banget memilikimu di sisiku.
          </motion.p>

          {/* Beautiful Inline Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <div className="flex items-center gap-2 bg-white/90 border border-blue-100 px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all group cursor-pointer backdrop-blur-md">
              <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Heart size={12} fill="currentColor" />
              </div>
              <span className="text-[10px] sm:text-xs text-blue-600 font-black">Satu Hati, Selamanya Bersama</span>
            </div>
          </motion.div>

        </div>

        {/* COMPACT & CREATIVE FLOATING MEMORY CONTAINER */}
        <div className="flex flex-row items-center justify-center gap-6 mt-16 max-w-lg w-full relative">
          
          {/* Polaroid 1 (Left - Slightly rotated) */}
          <motion.div
            initial={{ opacity: 0, rotate: -8, y: 30 }}
            animate={{ opacity: 1, rotate: -4, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.6 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-40 sm:w-48 bg-white p-2.5 pb-4 rounded-xl shadow-[0_8px_24px_rgba(30,58,138,0.05)] border border-blue-100/80 cursor-pointer hover:scale-[1.03] transition-transform"
          >
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-50 border border-blue-50 relative mb-2.5">
              <img 
                src="https://raw.githubusercontent.com/aditysm/ngetes/main/1.jpg" 
                alt="Yudia Cantik"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="text-center font-serif text-[11px] text-slate-700 font-bold italic tracking-wide">
              "Senyuman favoritku..."
            </div>
          </motion.div>

          {/* Polaroid 2 (Right - Rotated opposite) */}
          <motion.div
            initial={{ opacity: 0, rotate: 8, y: 30 }}
            animate={{ opacity: 1, rotate: 4, y: [0, 6, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.7 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="w-40 sm:w-48 bg-white p-2.5 pb-4 rounded-xl shadow-[0_8px_24px_rgba(30,58,138,0.05)] border border-blue-100/80 cursor-pointer hover:scale-[1.03] transition-transform"
          >
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-50 border border-blue-50 relative mb-2.5">
              <img 
                src="https://raw.githubusercontent.com/aditysm/ngetes/main/2.jpg" 
                alt="Yudia Manis"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="text-center font-serif text-[11px] text-slate-700 font-bold italic tracking-wide">
              "Kamu & Aku, Selamanya"
            </div>
          </motion.div>

          {/* Simple Decorative Floating Sparkle */}
          <div className="absolute -top-6 right-6 text-blue-400 animate-bounce [animation-duration:3.5s] pointer-events-none">
            <Sparkles size={24} fill="currentColor" />
          </div>
        </div>

      </div>

      {/* Down Scroll Button */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => {
          document.getElementById("countdown-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mt-16 flex flex-col items-center gap-1 opacity-80 cursor-pointer text-center relative z-20"
      >
        <span className="text-[9px] uppercase tracking-widest font-black text-blue-500">Gulir ke Bawah</span>
        <ChevronDown size={14} className="text-blue-500 mt-0.5" />
      </motion.div>

    </section>
  );
}
