import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailOpen, Heart, FileText, Sparkles } from "lucide-react";

interface SuratCintaProps {
  partnerName: string;
  letterContent?: string;
}

export default function SuratCinta({ partnerName, letterContent }: SuratCintaProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultLetter = "Hai sayangku, Yudia tercinta.\n\nSelamat ulang tahun ya manis! Hari ini adalah hari favoritku karena di hari inilah kamu dilahirkan ke dunia. Aku sangat bersyukur bisa memilikimu di sisiku.\n\nTerima kasih ya sudah selalu sabar, pengertian, dan selalu menghujani aku dengan senyum manis kamu yang ga pernah gagal bikin hari-hariku jadi jauh lebih cerah.\n\nSemoga di usia yang baru ini kamu selalu sehat, bahagia, dan semua impian indahmu satu per satu terwujud. Ingat ya, aku bakal selalu ada di sini untuk mendukungmu dan berjalan bersamamu melewati setiap musim kehidupan.\n\nAku sayang kamu, sekarang, besok, dan selamanya.";

  const content = letterContent || defaultLetter;

  return (
    <div id="surat-cinta-container" className="my-20 max-w-xl mx-auto px-4 relative z-10">
      {/* Translucent Glowing Light Glass Card */}
      <div className="bg-white rounded-[32px] p-8 shadow-[0_15px_45px_rgba(59,130,246,0.06)] border border-blue-100 text-center relative overflow-hidden">
        {/* Glowing Ambient Radial light */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-pink-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-black text-blue-600 mb-3.5 block flex items-center justify-center gap-1.5 bg-blue-50 w-fit mx-auto px-4 py-1.5 rounded-full border border-blue-100">
          <Sparkles size={12} className="text-blue-500" />
          <span>Surat Spesial Ulang Tahun</span>
        </span>
        <h3 className="font-sans text-xl sm:text-2xl font-black text-slate-800 tracking-tight leading-snug mb-3 flex items-center justify-center gap-2">
          <span>Untaian Kata Dari Lubuk Hati</span>
          <Mail size={20} className="text-blue-500 inline" />
        </h3>
        <p className="text-xs text-slate-500 font-semibold leading-relaxed max-w-sm mx-auto mb-8">
          Ketuk amplop di bawah ini untuk membuka lembar pesan yang kutulis khusus untuk hari ulang tahunmu.
        </p>

        {/* Envelope Animation Container */}
        <div className="relative flex justify-center py-4">
          <motion.div
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer relative z-10 flex flex-col items-center"
          >
            {/* The Outer Physical Envelope Shape - Elegant Sky Blue & White theme */}
            <motion.div
              animate={isOpen ? { rotateY: 180, scale: 0.95 } : { rotateY: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`w-52 h-36 rounded-3xl flex flex-col items-center justify-center relative shadow-[0_10px_30px_rgba(59,130,246,0.08)] border ${
                isOpen 
                  ? "bg-gradient-to-br from-blue-50 to-white border-blue-100" 
                  : "bg-gradient-to-br from-blue-500 via-sky-400 to-blue-400 border-blue-300"
              }`}
            >
              {/* Elegant glow inside envelope slit */}
              <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-blue-200/10 to-transparent rounded-t-3xl pointer-events-none"></div>
              
              {isOpen ? (
                <div className="flex flex-col items-center gap-2 text-blue-600">
                  <MailOpen size={40} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Surat Terbuka</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-white">
                  <Mail size={40} className="animate-bounce [animation-duration:3.5s]" />
                  <Heart size={16} fill="#F43F5E" className="text-rose-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/90">Buka Surat</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Letter Slide-Out Drawer / Parchment Overly with beautiful warm vibes */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 30 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="relative bg-[#FFFBEB] rounded-[32px] w-full max-w-lg max-h-[85vh] shadow-[0_20px_55px_rgba(0,0,0,0.15)] border border-amber-200/50 p-6 sm:p-8 flex flex-col z-10 text-left overflow-hidden"
              >
                {/* Decorative vintage notebook background lines */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Ribbon detail */}
                <div className="flex justify-between items-center border-b border-amber-200/70 pb-3 mb-5 shrink-0 relative z-10">
                  <div className="flex items-center gap-2 text-pink-600">
                    <FileText size={18} />
                    <span className="text-xs uppercase tracking-widest font-black font-mono">Untuk: {partnerName}</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 cursor-pointer bg-white/80 px-4 py-1.5 rounded-full border border-amber-200 transition-all hover:shadow-sm"
                  >
                    Tutup
                  </button>
                </div>

                {/* Heartfelt Scrollable Paper */}
                <div className="overflow-y-auto pr-1.5 flex-grow relative z-10 font-sans text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-wrap font-bold">
                  {content}
                </div>

                {/* Letter Footer signature block */}
                <div className="pt-4 mt-5 border-t border-amber-200/70 text-right shrink-0 relative z-10">
                  <p className="text-xs font-black text-slate-500 italic">Ditulis dengan sepenuh hati,</p>
                  <p className="text-sm font-black text-[#2563EB] mt-1.5 flex items-center justify-end gap-1">
                    <span>Dari Adit untuk Yudia</span>
                    <Heart size={14} fill="currentColor" className="text-blue-500" />
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
