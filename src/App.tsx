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
import AdminPanel from "./components/AdminPanel";
import SuratCinta from "./components/SuratCinta";
import KirimPesanAdit from "./components/KirimPesanAdit";
import CountdownTimer from "./components/CountdownTimer";
import FadeInUp from "./components/FadeInUp";

export default function App() {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load custom configurations on mount if they exist in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("birthday_app_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate to the new 19 memories list if the previous saved config has fewer than 19 items
        const memories = parsed.memories && parsed.memories.length >= 19
          ? parsed.memories
          : DEFAULT_CONFIG.memories;

        let loadedMusicUrl = parsed.musicUrl?.trim() ? parsed.musicUrl.trim() : DEFAULT_CONFIG.musicUrl;
        // If it's the old soundhelix URL, override it with the Dropbox link!
        if (loadedMusicUrl.includes("soundhelix.com")) {
          loadedMusicUrl = DEFAULT_CONFIG.musicUrl;
        }

        setConfig({
          ...DEFAULT_CONFIG,
          ...parsed,
          memories,
          musicUrl: loadedMusicUrl,
          gdriveUrl: parsed.gdriveUrl?.trim() ? parsed.gdriveUrl.trim() : DEFAULT_CONFIG.gdriveUrl,
        });
      }
    } catch (e) {
      console.warn("Failed to read birthday_app_config from localStorage:", e);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem("birthday_app_config", JSON.stringify(newConfig));
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
    }
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem("birthday_app_config");
    } catch (e) {
      console.error("Failed to clear localStorage:", e);
    }
  };

  if (!hasLoaded) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-sky-50 text-slate-800 selection:bg-blue-100 selection:text-blue-600">
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
            className="flex flex-col min-h-screen relative bg-gradient-to-b from-blue-50 via-white to-sky-50"
          >
            {/* 3. Hero Section Header */}
            <HeroSection partnerName={config.partnerName} />

            {/* Elegant Countdown Timer and Life Journey Tracker */}
            <FadeInUp>
              <CountdownTimer />
            </FadeInUp>

            {/* Animated Interactive Love Letter Envelope Section */}
            <FadeInUp>
              <SuratCinta partnerName={config.partnerName} letterContent={config.loveLetter} />
            </FadeInUp>

            {/* 4. Memories Scroll Section Grid */}
            <FadeInUp>
              <GaleriKenangan memories={config.memories} />
            </FadeInUp>

            {/* 5. Secret Blooming Flower & QR Code GDrive Section */}
            <FadeInUp>
              <KejutanBunga gdriveUrl={config.gdriveUrl} />
            </FadeInUp>

            {/* Send Message to Adit via WhatsApp */}
            <FadeInUp>
              <KirimPesanAdit />
            </FadeInUp>

            {/* Delicate Sweet Footer */}
            <footer className="py-12 bg-white text-center text-xs text-slate-500 border-t border-blue-100 flex flex-col items-center gap-1.5 font-bold shrink-0">
              <p className="flex items-center gap-1">
                Dibuat dengan segenap ketulusan oleh Adit untuk Yudia
                <Heart size={12} fill="currentColor" className="text-blue-500 inline" />
              </p>
              <p>© {new Date().getFullYear()} • Selamanya Bersamamu</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Configuration Settings Panel for simple customization */}
      <AdminPanel 
        config={config} 
        onSave={handleSaveConfig} 
        onReset={handleResetConfig} 
      />
    </div>
  );
}

