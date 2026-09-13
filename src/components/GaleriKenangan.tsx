import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Heart, Sparkles, X, Quote, Camera, MapPin, Navigation } from "lucide-react";
import { MemoryCard } from "../types";

interface GaleriKenanganProps {
  memories: MemoryCard[];
}

export default function GaleriKenangan({ memories }: GaleriKenanganProps) {
  const [selectedMemoryIdx, setSelectedMemoryIdx] = useState<number | null>(null);

  return (
    <section 
      id="galeri-section"
      className="py-24 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-sky-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Decorative Floating Accents */}
      <div className="absolute top-20 left-10 text-blue-400/10 pointer-events-none -z-10">
        <Sparkles size={140} className="opacity-40 animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 text-pink-400/10 pointer-events-none -z-10">
        <Heart size={160} className="opacity-40" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-xl mx-auto">
          <span className="text-xs sm:text-sm uppercase tracking-widest font-black text-blue-600 mb-2.5 inline-flex items-center gap-1.5 bg-blue-50 w-fit mx-auto px-4 py-1.5 rounded-full border border-blue-200/50">
            <Camera size={13} className="text-blue-500" />
            <span>Galeri Momen Spesial Yudia</span>
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
            <span>Peta Kenangan Indah</span>
            <MapPin size={26} className="text-blue-500 inline" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed mt-3">
            19 foto dan momen berharga yang tersimpan rapi untuk merayakan perjalanan manis Yudia. Telusuri setiap langkah kenangan indah di bawah ini.
          </p>
        </div>

        {/* Vertical Journey Route / Road Line */}
        <div className="relative">
          {/* Connecting Road Line (Main Route) */}
          <div 
            id="journey-line"
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 bg-gradient-to-b from-blue-300 via-sky-400 to-blue-200 rounded-full"
            style={{ 
              backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 10px, #fff 10px, #fff 20px), linear-gradient(to bottom, #93C5FD, #38BDF8, #93C5FD)",
              backgroundBlendMode: "difference"
            }}
          />

          {/* Timeline Nodes & Paths */}
          <div className="space-y-16 relative">
            {memories.map((m, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <div key={m.id} className="relative flex flex-col md:flex-row items-stretch md:justify-between">
                  {/* Left Spacer for Odd items / Left Card for Even items */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: Math.min(idx * 0.05, 0.2), ease: "easeOut" }}
                    className={`w-full md:w-[45%] flex ${isEven ? "justify-end" : "justify-start md:order-last"}`}
                  >
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      onClick={() => setSelectedMemoryIdx(idx)}
                      className="w-full bg-white/90 backdrop-blur-md p-4 pb-5 rounded-2xl shadow-[0_10px_35px_rgba(59,130,246,0.06)] hover:shadow-[0_20px_45px_rgba(59,130,246,0.12)] border border-blue-100 cursor-pointer transition-all duration-500 ease-out group flex flex-col justify-between"
                    >
                      {/* Polaroid-style Image Container */}
                      <div className="w-full overflow-hidden rounded-xl bg-blue-50/50 relative aspect-[4/3] flex items-center justify-center border border-blue-100">
                        {m.imageUrl && m.imageUrl.trim() !== "" ? (
                          <img
                            src={m.imageUrl}
                            alt={m.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-blue-400/75 gap-1">
                            <Camera size={28} />
                            <span className="text-[10px] font-bold text-blue-500">Momen Indah</span>
                          </div>
                        )}
                        {/* Interactive Accent Map Pin Overlay */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-blue-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <MapPin size={14} className="animate-bounce" />
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="mt-4 text-left">
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-500 mb-1.5 uppercase tracking-wider">
                          <Calendar size={11} />
                          <span>{m.date}</span>
                        </div>
                        <h3 className="font-sans text-sm sm:text-base font-black text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-1">
                          {m.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-semibold italic">
                          &ldquo;{m.caption}&rdquo;
                        </p>

                        {/* Custom Journey Button */}
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-400">
                            Pemberhentian {idx + 1}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-wider uppercase text-blue-500 group-hover:text-blue-600 transition-colors">
                            Buka Kenangan
                            <Navigation size={10} className="rotate-45" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Central Node Anchor */}
                  <div className="absolute left-4 md:left-1/2 top-10 -translate-x-1/2 flex items-center justify-center z-10 pointer-events-none">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 180, delay: 0.15 }}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-sky-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)] border-4 border-white"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                        className="flex items-center justify-center"
                      >
                        <Heart size={12} fill="white" className="text-white" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Empty space filler for desktop alignment */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- EXQUISITE LIGHT THEMED LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedMemoryIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Soft backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemoryIdx(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white/95 backdrop-blur-3xl rounded-3xl overflow-hidden w-full max-w-2xl max-h-[90vh] shadow-[0_25px_55px_rgba(30,58,138,0.15)] border border-blue-100 flex flex-col z-10 text-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemoryIdx(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
                {/* Double Polaroid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Image 1 */}
                  <div className="bg-slate-50 p-3 pb-6 rounded-xl shadow-sm border border-slate-100 rotate-[-1deg]">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
                      {memories[selectedMemoryIdx]?.imageUrl && memories[selectedMemoryIdx].imageUrl.trim() !== "" ? (
                        <img
                          src={memories[selectedMemoryIdx].imageUrl}
                          alt="Kenangan pertama"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera size={24} className="text-blue-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-center text-blue-600 font-bold mt-2">Momen Terindah</p>
                  </div>

                  {/* Image 2 (Dynamic loop fallback to next) */}
                  <div className="bg-slate-50 p-3 pb-6 rounded-xl shadow-sm border border-slate-100 rotate-[1.5deg]">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
                      {memories[(selectedMemoryIdx + 1) % memories.length]?.imageUrl ? (
                        <img
                          src={memories[(selectedMemoryIdx + 1) % memories.length].imageUrl}
                          alt="Sudut pandang kedua"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera size={24} className="text-blue-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-center text-blue-600 font-bold mt-2">Momen Pelengkap</p>
                  </div>
                </div>

                {/* Poem and Message Area */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Heart size={18} fill="currentColor" className="text-blue-500" />
                      <span className="text-xs uppercase tracking-widest font-black text-slate-700">Untaian Puisi & Catatan</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1 border border-blue-100">
                      <Calendar size={12} />
                      <span>{memories[selectedMemoryIdx].date}</span>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-black text-slate-800">
                    {memories[selectedMemoryIdx].title}
                  </h3>

                  <div className="relative bg-slate-50 rounded-2xl p-5 border border-slate-100 italic font-bold text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <Quote size={28} className="absolute -top-3 -left-1 text-blue-200 opacity-50" />
                    <p className="pl-4 relative z-10 whitespace-pre-wrap">
                      {memories[selectedMemoryIdx].caption || "Tulis puisi manis atau cerita kenangan indahmu di sini..."}
                    </p>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setSelectedMemoryIdx(null)}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-blue-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-md cursor-pointer transition-colors"
                >
                  Tutup Rute & Kembali Perjalanan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
