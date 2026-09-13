import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getAudioFile } from "../lib/audioDb";

interface MusicPlayerProps {
  musicUrl: string;
  autoplayTrigger: boolean;
}

export default function MusicPlayer({ musicUrl, autoplayTrigger }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [audioSrc, setAudioSrc] = useState(musicUrl || "");
  const [hasCustomBgm, setHasCustomBgm] = useState(false);

  const effectiveAudioSrc = audioSrc && audioSrc.trim() !== "" ? audioSrc : null;

  // Load custom BGM from IndexedDB if available
  useEffect(() => {
    async function loadCustomBgm() {
      try {
        const fileBlob = await getAudioFile();
        if (fileBlob) {
          const localUrl = URL.createObjectURL(fileBlob);
          setAudioSrc(localUrl);
          setHasCustomBgm(true);
        } else {
          setAudioSrc(musicUrl || "");
          setHasCustomBgm(false);
        }
      } catch (err) {
        console.warn("Failed to load local BGM from IndexedDB:", err);
        setAudioSrc(musicUrl || "");
      }
    }
    loadCustomBgm();
  }, [musicUrl]);

  // Trigger play when unlocked
  useEffect(() => {
    if (autoplayTrigger && audioRef.current && effectiveAudioSrc) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          // Show romantic tooltip briefly
          setShowTooltip(true);
          const timer = setTimeout(() => setShowTooltip(false), 5000);
          return () => clearTimeout(timer);
        })
        .catch((error) => {
          console.log("Autoplay prevented or failed, waiting for direct click:", error);
        });
    }
  }, [autoplayTrigger, effectiveAudioSrc]);

  const togglePlay = () => {
    if (!audioRef.current || !effectiveAudioSrc) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log(err));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering play toggles
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    audioRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  return (
    <div id="music-player-container" className="fixed top-4 right-4 z-40 flex flex-col items-end">
      {/* Hidden audio element - only rendered when effectiveAudioSrc is present */}
      {effectiveAudioSrc ? (
        <audio
          ref={audioRef}
          src={effectiveAudioSrc}
          loop
          preload="auto"
          key={effectiveAudioSrc} // Force reload of audio element on source change
        />
      ) : null}

      <div className="flex items-center gap-2">
        {/* Playing message tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-blue-700 shadow-md border border-blue-100 flex items-center gap-1.5"
            >
              <Music size={12} className="animate-bounce text-blue-500" />
              <span>{hasCustomBgm ? "Memutar lagu kustom pilihan..." : "Memutar musik spesial ulang tahun..."}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Floating Toggle Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="relative w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-blue-200 flex items-center justify-center cursor-pointer text-blue-600 hover:border-blue-300 hover:shadow-lg transition-all"
        >
          {/* Dancing Waveform Visualizer */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-25">
              <span className="w-[3px] h-4 bg-blue-500 rounded-full animate-pulse [animation-duration:0.6s]"></span>
              <span className="w-[3px] h-6 bg-blue-500 rounded-full animate-pulse [animation-duration:0.4s] delay-75"></span>
              <span className="w-[3px] h-3 bg-blue-500 rounded-full animate-pulse [animation-duration:0.8s] delay-150"></span>
              <span className="w-[3px] h-5 bg-blue-500 rounded-full animate-pulse [animation-duration:0.5s] delay-100"></span>
            </div>
          )}

          <div className="relative z-10">
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </div>
        </motion.div>

        {/* Small Volume Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-blue-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors"
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </motion.button>
      </div>
    </div>
  );
}
