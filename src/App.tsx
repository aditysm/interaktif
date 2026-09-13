import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import { DEFAULT_CONFIG } from "./data";
import { AppConfig } from "./types";

import Gatekeeper from "./components/Gatekeeper";
import MusicPlayer from "./components/MusicPlayer";
import HeroSection from "./components/HeroSection";
import GaleriKenangan from "./components/GaleriKenangan";
import KejutanBunga from "./components/KejutanBunga";
import SuratCinta from "./components/SuratCinta";
import KirimPesanAdit from "./components/KirimPesanAdit";
import CountdownTimer from "./components/CountdownTimer";
import FadeInUp from "./components/FadeInUp";

export default function App() {
  const config = DEFAULT_CONFIG;
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-slate-800 selection:bg-blue-100 selection:text-blue-600">
      {/* Dynamic Background Music Player */}
      <MusicPlayer musicUrl={config.musicUrl} autoplayTrigger={isUnlocked} />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="security-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Gatekeeper 
              questions={config.questions} 
              onPassed={() => setIsUnlocked(true)} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="main-website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col min-h-screen relative bg-gradient-to-b from-blue-50/30 via-white to-sky-50/20"
          >
            {/* 3. Hero Section Header */}
            <HeroSection partnerName={config.partnerName} />

            {/* Elegant Countdown Timer */}
            <FadeInUp>
              <CountdownTimer />
            </FadeInUp>

            <div className="w-full h-12" />

            {/* Animated Interactive Love Letter Envelope Section */}
            <FadeInUp>
              <SuratCinta partnerName={config.partnerName} letterContent={config.loveLetter} />
            </FadeInUp>

            <div className="w-full h-12" />

            {/* 4. Memories Scroll Section Grid */}
            <FadeInUp>
              <GaleriKenangan memories={config.memories} />
            </FadeInUp>

            <div className="w-full h-12" />

            {/* 5. Secret Blooming Flower & QR Code GDrive Section */}
            <FadeInUp>
              <KejutanBunga gdriveUrl={config.gdriveUrl} />
            </FadeInUp>

            {/* Send Message to Adit via WhatsApp */}
            <FadeInUp>
              <KirimPesanAdit />
            </FadeInUp>

            {/* Delicate Sweet Footer */}
            <footer className="py-12 bg-white text-center text-xs text-slate-400 border-t border-blue-50 flex flex-col items-center gap-1.5 font-bold shrink-0 relative z-10">
              <p className="flex items-center gap-1">
                Dibuat dengan segenap ketulusan oleh abangg untuk dedekk
                <Heart size={10} fill="currentColor" className="text-blue-400 inline" />
              </p>
              <p>© {new Date().getFullYear()} • Selamanya Bersamamu</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

