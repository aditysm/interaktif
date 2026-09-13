import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart, Stars } from "lucide-react";

export default function CountdownTimer() {
  // Birth date: 14 September 2007, 00:00:00
  const birthDate = new Date("2007-09-14T00:00:00").getTime();

  const [lifeJourney, setLifeJourney] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      
      const timeSinceBirth = now - birthDate;
      const totalSeconds = Math.floor(timeSinceBirth / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const years = Math.floor(totalDays / 365.2425);
      const remainingDays = Math.floor(totalDays % 365.2425);
      const remainingHours = totalHours % 24;
      const remainingMinutes = totalMinutes % 60;
      const remainingSeconds = totalSeconds % 60;

      setLifeJourney({
        years,
        days: remainingDays,
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [birthDate]);

  return (
    <div id="countdown-section" className="w-full max-w-2xl mx-auto px-4 my-12 relative z-10 text-center">
      <div className="bg-white/40 backdrop-blur-sm rounded-[40px] p-10 sm:p-14 border border-blue-50/50 shadow-sm relative overflow-hidden">
        {/* Soft glowing background element */}
        <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-blue-50/50 to-transparent opacity-40 pointer-events-none" />
        
        <div className="flex flex-col items-center relative z-10">
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <Heart size={28} className="text-pink-300" fill="currentColor" />
          </motion.div>
          
          <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-6">
            Momen Bersejarah Dunia
          </h3>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto mb-12 leading-relaxed italic">
            "Ketika dedekk lahir, dunia seketika dipenuhi banyak senyuman, rasa manis, dan kehangatan luar biasa yang dedekk bawa hingga hari ini..."
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
            {[
              { label: "Tahun", value: lifeJourney.years },
              { label: "Hari", value: lifeJourney.days },
              { label: "Jam", value: lifeJourney.hours },
              { label: "Menit", value: lifeJourney.minutes },
              { label: "Detik", value: lifeJourney.seconds },
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[60px]">
                <span className="font-display text-3xl sm:text-4xl font-black text-blue-500/80 tracking-tighter mb-1">
                  {unit.value}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-[10px] font-black text-blue-400 uppercase tracking-widest opacity-50">
            Waktu yang Telah Dedekk Warnai di Bumi
          </div>
        </div>
      </div>
    </div>
  );
}
