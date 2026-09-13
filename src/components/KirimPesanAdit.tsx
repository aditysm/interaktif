import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, MessageCircle, CheckCircle2, Sparkles, Heart } from "lucide-react";

export default function KirimPesanAdit() {
  const [pesan, setPesan] = useState("");
  const [sudahTerkirim, setSudahTerkirim] = useState(false);

  const presetMessages = [
    "Makasih banyak ya abangg buat kejutan dan ucapannya!",
    "Suka banget sama website dan kado ulang tahunnya!",
    "Semoga doa-doa baiknya kembali ke kita berdua juga ya.",
    "Kangen, nanti kita luangkan waktu bareng ya!",
  ];

  const handleKirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pesan.trim()) return;

    // Direct to WhatsApp
    const waUrl = `https://wa.me/6285738565172?text=${encodeURIComponent(pesan.trim())}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setSudahTerkirim(true);
    setTimeout(() => setSudahTerkirim(false), 6000);
  };

  const handleSelectPreset = (text: string) => {
    setPesan((prev) => (prev ? `${prev}\n${text}` : text));
  };

  return (
    <section 
      id="kirim-pesan-section"
      className="py-24 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
    >
      {/* Soft Ambient Radial Accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest font-black text-blue-600 mb-2.5 inline-flex items-center gap-1.5 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            <MessageCircle size={13} className="text-blue-500" />
            <span>Kirim Kabar ke Abang</span>
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Cerita ke Abang, Yuk?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed mt-3 max-w-md mx-auto italic">
            "Apapun yang Dedekk rasakan, tuliskan saja di sini ya. Pesan manis ini akan langsung meluncur ke WhatsApp abang..."
          </p>
        </div>

        {/* Message Card Container */}
        <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] border border-blue-100 shadow-[0_15px_45px_rgba(59,130,246,0.06)] relative text-left">
          
          {/* Quick Preset Badges */}
          <div className="mb-5">
            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
              <Sparkles size={12} className="text-blue-500" />
              <span>Pilihan Pesan Cepat:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {presetMessages.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(item)}
                  className="text-xs text-blue-600 bg-blue-50/70 hover:bg-blue-100 border border-blue-100 rounded-full px-3.5 py-1.5 font-bold transition-all text-left cursor-pointer"
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleKirim} className="space-y-4">
            <div className="relative">
              <textarea
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Tulis pesan atau cerita yang ingin kamu sampaikan ke abangg di sini..."
                rows={7}
                className="w-full px-4 py-3.5 rounded-2xl border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50/40 text-slate-800 placeholder-slate-400 transition-all resize-y min-h-[160px] leading-relaxed shadow-inner"
                required
              />
              <div className="absolute right-3 bottom-3 text-[10px] text-slate-400 font-bold bg-white/80 px-2 py-0.5 rounded-md border border-slate-100">
                {pesan.length} karakter
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                <Heart size={12} className="text-blue-500" />
                <span>Pesan terhubung langsung ke kontak WhatsApp abangg</span>
              </span>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!pesan.trim()}
                className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl text-white text-xs sm:text-sm font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  pesan.trim()
                    ? "bg-gradient-to-r from-blue-600 via-sky-500 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-500/20"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                <span>Kirim ke abangg</span>
                <Send size={14} />
              </motion.button>
            </div>
          </form>

          {/* Success Banner Notice */}
          {sudahTerkirim && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2"
            >
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span>Jendela WhatsApp sedang dibuka. Pastikan pesan terkirim ke abangg ya!</span>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
