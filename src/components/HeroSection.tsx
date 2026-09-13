import { motion } from "motion/react";
import { Heart, Sparkles, ChevronDown, Gift, Stars, PartyPopper } from "lucide-react";

interface HeroSectionProps {
  partnerName: string;
}

export default function HeroSection({ partnerName }: HeroSectionProps) {
  return (
    <section 
      id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20 pb-16"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-sky-50/30" />
        
        {/* Soft Blurring Orbs (Reduced) */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/4 -right-10 w-[350px] h-[350px] bg-pink-50/20 rounded-full blur-[100px]"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-2"
          >
            <Heart size={16} className="text-pink-400" fill="currentColor" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Special Birthday Gift</span>
            <Heart size={16} className="text-pink-400" fill="currentColor" />
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-black text-slate-800 tracking-tight leading-tight">
              Hi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">{partnerName}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-1"
          >
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-blue-600">
              Barakallah Fii Umrik, Cantik...
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-[11px] sm:text-xs text-slate-500 font-bold leading-relaxed max-w-md mx-auto px-4"
          >
            Hari ini semesta ikut tersenyum merayakan kehadiran dedekk. Terima kasih sudah menjadi pelangi yang mencerahkan setiap sudut duniaku. Abangg beruntung banget bisa memiliki dedekk.
          </motion.p>
        </div>

        {/* --- STACKED COLLAGE PHOTO SECTION --- */}
        <div className="relative mt-16 w-full h-[280px] sm:h-[350px] flex items-center justify-center">
          {/* Photo 1 (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -20 }}
            animate={{ opacity: 1, x: -60, rotate: -12 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute z-0 w-36 sm:w-44 bg-white p-2 pb-8 rounded-sm shadow-lg border border-slate-100"
          >
            <div className="aspect-square w-full bg-slate-100 overflow-hidden">
              <img 
                src="https://raw.githubusercontent.com/aditysm/ngetes/main/2.jpg" 
                alt="Yudia 2"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Photo 2 (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 20 }}
            animate={{ opacity: 1, x: 60, rotate: 12 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute z-10 w-36 sm:w-44 bg-white p-2 pb-8 rounded-sm shadow-lg border border-slate-100"
          >
            <div className="aspect-square w-full bg-slate-100 overflow-hidden">
              <img 
                src="https://raw.githubusercontent.com/aditysm/ngetes/main/3.jpg" 
                alt="Yudia 3"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Photo 3 (Top Center - Focus) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="relative z-20 w-44 sm:w-52 bg-white p-3 pb-10 rounded-sm shadow-2xl border border-blue-50 cursor-pointer"
          >
            {/* Washi Tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-blue-100/40 backdrop-blur-sm border border-blue-200/20 rotate-[-5deg] z-30 rounded-sm" />
            
            <div className="aspect-square w-full rounded-sm overflow-hidden bg-slate-50 mb-4">
              <img 
                src="https://raw.githubusercontent.com/aditysm/ngetes/main/1.jpg" 
                alt="Yudia Main"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center font-display text-[10px] sm:text-xs text-slate-600 italic font-bold tracking-tight">
              "Senyum favorit abangg..."
            </div>
          </motion.div>

          {/* Decorative Sparkles */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 right-1/4 text-blue-300 pointer-events-none"
          >
            <Sparkles size={24} />
          </motion.div>
        </div>

      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => {
          document.getElementById("countdown-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mt-12 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <ChevronDown size={20} className="text-blue-500" />
      </motion.div>

    </section>
  );
}

