import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Milestone } from "lucide-react";

export default function CountdownTimer() {
  // Target birthday: 14 September 2026, 00:00:00
  const targetDate = new Date("2026-09-14T00:00:00").getTime();
  // Birth date: 14 September 2007, 00:00:00
  const birthDate = new Date("2007-09-14T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  const [lifeJourney, setLifeJourney] = useState({
    years: 18,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();

      // 1. Calculate Countdown to 14 September 2026
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
      }

      // 2. Calculate Life Journey since 14 September 2007
      const timeSinceBirth = now - birthDate;
      const totalSeconds = Math.floor(timeSinceBirth / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      // Estimate years (taking leap years into account approx 365.25 days)
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
  }, [targetDate, birthDate]);

  return (
    <div id="countdown-section" className="w-full max-w-4xl mx-auto px-4 my-10 relative z-10">
      {/* Outer elegant glass container */}
      <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 shadow-[0_15px_45px_rgba(59,130,246,0.06)] border border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-blue-100 text-left">
        
        {/* LEFT COLUMN: THE COUNTDOWN TO SEPTEMBER 14, 2026 */}
        <div className="pb-6 md:pb-0 md:pr-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-blue-500 mb-2.5">
              <Clock size={16} className="animate-pulse text-blue-500" />
              <span className="text-[10px] uppercase tracking-widest font-black text-blue-500">Menanti Hari Spesial</span>
            </div>
            
            <h3 className="font-sans text-lg sm:text-xl font-black text-slate-800 leading-tight">
              {timeLeft.isCompleted 
                ? "Selamat Hari Ulang Tahun, Yudia!" 
                : "Hitung Mundur Ulang Tahun ke-19"
              }
            </h3>
            <p className="text-[11px] text-slate-500 font-bold mt-1 leading-relaxed">
              {timeLeft.isCompleted 
                ? "Hari yang dinanti telah tiba! Semoga semua harapan indahmu dikabulkan ya manis."
                : "Detik-detik manis menuju pergantian hari lahirmu yang ke-19 pada tanggal 14 September 2026."
              }
            </p>
          </div>

          {/* Countdown Grid */}
          <div className="grid grid-cols-4 gap-2.5 mt-6">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div 
                key={idx} 
                className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100 flex flex-col items-center justify-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="font-mono text-xl sm:text-2xl font-black text-blue-600 leading-none tracking-tight">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-1.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: THE LIFE JOURNEY SINCE BIRTHDATE (14 SEPT 2007) */}
        <div className="pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-pink-500 mb-2.5">
              <Milestone size={16} className="text-pink-500" />
              <span className="text-[10px] uppercase tracking-widest font-black text-pink-500">Perjalanan Indah Yudia</span>
            </div>
            
            <h3 className="font-sans text-lg sm:text-xl font-black text-slate-800 leading-tight">
              Waktu yang Telah Dilalui di Bumi
            </h3>
            <p className="text-[11px] text-slate-500 font-bold mt-1 leading-relaxed">
              Sejak Yudia lahir pada <span className="text-pink-500 font-black">14 September 2007</span>, bumi dipenuhi tawa, kecantikan, dan kehangatan yang kamu bawa selama:
            </p>
          </div>

          {/* Life Journey Counter */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-6">
            {[
              { label: "Tahun", value: lifeJourney.years },
              { label: "Hari", value: lifeJourney.days },
              { label: "Jam", value: lifeJourney.hours },
              { label: "Menit", value: lifeJourney.minutes },
              { label: "Detik", value: lifeJourney.seconds },
            ].map((unit, idx) => (
              <div 
                key={idx} 
                className="bg-pink-50/50 p-2.5 rounded-2xl border border-pink-100 flex flex-col items-center justify-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-pink-100/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="font-mono text-base sm:text-lg font-black text-pink-500 leading-none tracking-tight">
                  {unit.value}
                </span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider mt-1.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
