import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Heart, Sparkles, X, Quote, Camera, Image as ImageIcon } from "lucide-react";
import { MemoryCard } from "../types";

interface GaleriKenanganProps {
  memories: MemoryCard[];
}

export default function GaleriKenangan({ memories }: GaleriKenanganProps) {
  const [selectedMemoryIdx, setSelectedMemoryIdx] = useState<number | null>(null);

  // Helper to generate "random-ish" rotation and positions for the collage
  // We use fixed seeds based on index to ensure consistency across renders
  const getRandomStyle = (idx: number) => {
    const rotations = [-4, -3, -2, 2, 3, 4];
    const rotation = rotations[idx % rotations.length];
    
    // Horizontal and vertical offsets for organic feel
    const xOffsets = [-15, -10, 0, 10, 15];
    const yOffsets = [-20, -10, 0, 10, 20];
    const x = xOffsets[idx % xOffsets.length];
    const y = yOffsets[idx % yOffsets.length];

    return { rotation, x, y };
  };

  return (
    <section 
      id="galeri-section"
      className="py-24 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden"
    >
      {/* Background Soft Gradients */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto relative z-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-black text-blue-500 mb-4 block">
            Kumpulan Momen Berharga
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-800 tracking-tighter mb-4">
            Kolase Kenangan Indah
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
            "Setiap foto bercerita, setiap tawa bertahta, dan setiap momen bersama Yudia adalah harta yang paling berharga..."
          </p>
        </div>

        {/* Collage Grid - Organic Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-center px-2">
          {memories.map((m, idx) => {
            const { rotation, x, y } = getRandomStyle(idx);
            
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0, 
                  zIndex: 20,
                  transition: { duration: 0.3 } 
                }}
                className="relative group cursor-pointer"
                style={{ x, y }}
                onClick={() => setSelectedMemoryIdx(idx)}
              >
                {/* Washi Tape Accent */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-blue-100/40 backdrop-blur-sm border border-blue-200/20 rotate-[-2deg] z-20 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Polaroid Frame */}
                <div className="bg-white p-4 pb-12 shadow-[0_10px_40px_rgba(30,58,138,0.04)] border border-slate-100 rounded-sm transition-shadow group-hover:shadow-[0_20px_50px_rgba(30,58,138,0.1)]">
                  {/* Image Holder */}
                  <div className="aspect-square w-full bg-slate-50 overflow-hidden relative border border-slate-50">
                    {m.imageUrl ? (
                      <img
                        src={m.imageUrl}
                        alt={m.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300" />
                  </div>

                  {/* Caption under photo (Handwritten style feel) */}
                  <div className="mt-4 px-1">
                    <h3 className="text-sm font-black text-slate-800 line-clamp-1">{m.title}</h3>
                  </div>
                </div>

                {/* Floating Hearts for extra romance on hover */}
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -top-2 -right-2 pointer-events-none"
                  >
                    <Heart size={16} fill="#F43F5E" className="text-rose-500 animate-pulse" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state placeholder if needed */}
        {memories.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <ImageIcon size={40} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-bold">Belum ada foto kenangan yang ditambahkan.</p>
          </div>
        )}
      </div>

      {/* --- Lightbox Modal (Romantically Enhanced) --- */}
      <AnimatePresence>
        {selectedMemoryIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemoryIdx(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[40px] shadow-2xl border border-blue-50 overflow-hidden flex flex-col md:flex-row z-10"
            >
              <button
                onClick={() => setSelectedMemoryIdx(null)}
                className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Large Image Side */}
              <div className="w-full md:w-3/5 bg-slate-50 relative flex items-center justify-center">
                <img
                  src={memories[selectedMemoryIdx].imageUrl}
                  alt={memories[selectedMemoryIdx].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-2/5 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Sparkles size={100} className="text-blue-500" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-800 mb-6 leading-tight">
                    {memories[selectedMemoryIdx].title}
                  </h3>

                  <div className="relative mb-10">
                    <Quote size={40} className="absolute -top-6 -left-4 text-blue-50 opacity-20" />
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium italic relative z-10">
                      "{memories[selectedMemoryIdx].caption}"
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                        <Heart size={18} className="text-pink-400" fill="currentColor" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kenangan Ke</p>
                        <p className="text-xs font-black text-slate-700">{selectedMemoryIdx + 1} dari {memories.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
