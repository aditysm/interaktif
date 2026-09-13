import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Lock, Unlock, HelpCircle, ArrowRight, ShieldAlert, Sparkles, Gift } from "lucide-react";
import { Question } from "../types";

interface GatekeeperProps {
  questions: Question[];
  onPassed: () => void;
}

export default function Gatekeeper({ questions, onPassed }: GatekeeperProps) {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [errors, setErrors] = useState<string[]>(Array(questions.length).fill(""));
  const [hintsVisible, setHintsVisible] = useState<boolean[]>(Array(questions.length).fill(false));
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Natural and polite friendly error messages
  const errorMessages = [
    "Jawaban belum tepat, coba diingat-ingat lagi ya!",
    "Masih belum cocok nih, coba diingat kembali waktu kita bersama!",
    "Dikit lagi tepat! Coba periksa kembali tulisannya...",
    "Yuk dipikirkan lagi, pasti ingat kok!",
    "Bukan itu jawabannya, coba lagi ya!"
  ];

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);

    // Clear error for this index upon editing
    if (errors[index]) {
      const updatedErrors = [...errors];
      updatedErrors[index] = "";
      setErrors(updatedErrors);
    }
  };

  const toggleHint = (index: number) => {
    const updatedHints = [...hintsVisible];
    updatedHints[index] = !updatedHints[index];
    setHintsVisible(updatedHints);
  };

  const getRandomError = () => {
    return errorMessages[Math.floor(Math.random() * errorMessages.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const updatedErrors = [...errors];

    questions.forEach((q, idx) => {
      const userAnswer = answers[idx].trim().toLowerCase().replace(/\s+/g, " ");
      const correctAnswers = q.answer.split(",").map(ans => ans.trim().toLowerCase().replace(/\s+/g, " "));

      if (!correctAnswers.includes(userAnswer)) {
        updatedErrors[idx] = getRandomError();
        hasError = true;
      } else {
        updatedErrors[idx] = "";
      }
    });

    setErrors(updatedErrors);

    if (!hasError) {
      setIsUnlocked(true);
      // Wait for the animation to finish before launching onPassed
      setTimeout(() => {
        onPassed();
      }, 1200);
    }
  };

  return (
    <div 
      id="gatekeeper-container"
      className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-blue-50 via-white to-sky-50 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8"
    >
      {/* Soft Ambient Radial Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative my-auto w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(59,130,246,0.08)] border border-blue-100 z-10"
      >
        {/* Header Indicator */}
        <div className="flex flex-col items-center mb-6 text-center">
          <motion.div
            animate={isUnlocked ? { scale: [1, 1.15, 1], y: [0, -3, 0] } : { y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-md mb-4 bg-gradient-to-br from-blue-500 to-sky-400 text-white"
          >
            <Gift size={22} />
          </motion.div>

          <h2 className="font-sans text-2xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2 justify-center">
            Apakah ini Dedekk?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md font-bold leading-relaxed">
            Halloww! Sebelum lanjut, yuk jawab dulu 3 pertanyaan tentang kenangan kita di bawah ini.
          </p>
        </div>

        {/* Security Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {questions.map((q, idx) => (
            <div key={q.id} className="relative space-y-2 text-left">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-[#1E3A8A] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center text-xs font-extrabold">
                    {idx + 1}
                  </span>
                  {q.text}
                </label>
                <button
                  type="button"
                  onClick={() => toggleHint(idx)}
                  className="text-[11px] text-[#2563EB] hover:text-[#1E3A8A] font-bold transition-colors flex items-center gap-0.5 cursor-pointer"
                >
                  <HelpCircle size={13} />
                  {hintsVisible[idx] ? "Tutup Bocoran" : "Intip Bocoran"}
                </button>
              </div>

              {/* Hint Panel */}
              <AnimatePresence>
                {hintsVisible[idx] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#EFF6FF] text-[#1E40AF] text-[11px] p-2.5 rounded-xl border border-[#DBEAFE] font-bold leading-relaxed">
                      {q.hint}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Field */}
              <div className="relative">
                <input
                  type="text"
                  value={answers[idx]}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  disabled={isUnlocked}
                  placeholder="ketik jawaban kamu di sini..."
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-semibold transition-all focus:outline-none bg-white/70 ${
                    errors[idx]
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-[#BFDBFE] focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF]"
                  } ${isUnlocked ? "bg-gray-100 text-gray-500 border-gray-200" : ""}`}
                />
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {errors[idx] && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-red-600 font-bold flex items-center gap-1 mt-1 pl-1"
                  >
                    <ShieldAlert size={12} className="shrink-0 text-red-500" />
                    <span>{errors[idx]}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Submit Button */}
          <motion.button
            whileHover={!isUnlocked ? { scale: 1.01 } : {}}
            whileTap={!isUnlocked ? { scale: 0.99 } : {}}
            type="submit"
            disabled={isUnlocked}
            className={`w-full py-3 rounded-2xl font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-500 ${
              isUnlocked
                ? "bg-[#10B981] text-white shadow-[#10B981]/20"
                : "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white shadow-[#2563EB]/15"
            }`}
          >
            {isUnlocked ? (
              <span className="flex items-center gap-2">
                Yeay, Berhasil Terbuka! <Heart size={16} fill="white" className="animate-bounce" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Buka Kado Milikku <Heart size={16} fill="white" className="text-white shrink-0" /> <ArrowRight size={16} />
              </span>
            )}
          </motion.button>
        </form>

        {/* Secret Tip */}
        <p className="text-[10px] text-center text-[#64748B] mt-5 font-bold tracking-wide uppercase">
          Isi dengan serius yaa, bakal ada kejutan besar yang menanti
        </p>
      </motion.div>
    </div>
  );
}
