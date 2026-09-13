import React, { useState, useEffect } from "react";
import { Sliders, Save, RotateCcw, X, Edit2, Plus, Trash2, Heart, Music, Check, Settings, FileText, Upload } from "lucide-react";
import { AppConfig, Question, MemoryCard } from "../types";
import { DEFAULT_CONFIG } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { saveAudioFile, getAudioFile, clearAudioFile } from "../lib/audioDb";

interface AdminPanelProps {
  config: AppConfig;
  onSave: (newConfig: AppConfig) => void;
  onReset: () => void;
}

export default function AdminPanel({ config, onSave, onReset }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [partnerName, setPartnerName] = useState(config.partnerName);
  const [questions, setQuestions] = useState<Question[]>(config.questions);
  const [memories, setMemories] = useState<MemoryCard[]>(config.memories);
  const [gdriveUrl, setGdriveUrl] = useState(config.gdriveUrl);
  const [musicUrl, setMusicUrl] = useState(config.musicUrl);
  const [loveLetter, setLoveLetter] = useState(config.loveLetter || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Custom audio upload states
  const [customAudioName, setCustomAudioName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Synchronize internal state with config prop when config is updated externally (e.g. on reset)
  useEffect(() => {
    setPartnerName(config.partnerName);
    setQuestions(config.questions);
    setMemories(config.memories);
    setGdriveUrl(config.gdriveUrl);
    setMusicUrl(config.musicUrl);
    setLoveLetter(config.loveLetter || "");
  }, [config]);

  // Check if a custom audio is already saved in IndexedDB on open or mount
  useEffect(() => {
    async function checkCustomBgm() {
      try {
        const fileBlob = await getAudioFile();
        if (fileBlob instanceof File) {
          setCustomAudioName(fileBlob.name);
        } else if (fileBlob) {
          setCustomAudioName("lagu_pilihan_kita.mp3");
        } else {
          setCustomAudioName(null);
        }
      } catch (err) {
        console.error("Error reading custom BGM status:", err);
      }
    }
    if (isOpen) {
      checkCustomBgm();
    }
  }, [isOpen]);

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploading(true);
    try {
      await saveAudioFile(file);
      setCustomAudioName(file.name);
      alert("Yey! Lagu kustom berhasil diunggah dan disimpan ke database browser.");
    } catch (err) {
      console.error("Failed to save audio file:", err);
      alert("Yah gagal menyimpan lagu. Pastikan ukuran lagu tidak terlalu raksasa.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAudio = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus lagu kustom dan kembali ke musik streaming default?")) {
      try {
        await clearAudioFile();
        setCustomAudioName(null);
        alert("Lagu kustom berhasil dihapus. Kembali menggunakan streaming default.");
      } catch (err) {
        console.error("Failed to clear BGM:", err);
      }
    }
  };

  // Form field state trackers
  const handleQuestionChange = (id: number, field: keyof Question, value: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handleMemoryChange = (id: number, field: keyof MemoryCard, value: string) => {
    setMemories(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const addMemory = () => {
    const nextId = memories.length > 0 ? Math.max(...memories.map(m => m.id)) + 1 : 1;
    const newMemory: MemoryCard = {
      id: nextId,
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
      title: "Momen Indah Baru",
      date: "01/01/2026",
      caption: "Tuliskan cerita manis barumu di sini bersama pasangan...",
    };
    setMemories([...memories, newMemory]);
  };

  const removeMemory = (id: number) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      partnerName,
      questions,
      memories,
      gdriveUrl,
      musicUrl,
      loveLetter,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetClick = async () => {
    if (confirm("Apakah Anda yakin ingin mengembalikan seluruh konfigurasi ke pengaturan default (termasuk menghapus lagu terunggah)?")) {
      try {
        await clearAudioFile();
        setCustomAudioName(null);
      } catch (err) {
        console.error("Gagal menghapus lagu kustom saat reset:", err);
      }
      onReset();
      // Reload states from default
      setPartnerName(DEFAULT_CONFIG.partnerName);
      setQuestions(DEFAULT_CONFIG.questions);
      setMemories(DEFAULT_CONFIG.memories);
      setGdriveUrl(DEFAULT_CONFIG.gdriveUrl);
      setMusicUrl(DEFAULT_CONFIG.musicUrl);
      setLoveLetter(DEFAULT_CONFIG.loveLetter || "");
      setIsOpen(false);
      alert("Seluruh konfigurasi dan lagu terunggah berhasil di-reset ke bawaan asli!");
      window.location.reload();
    }
  };

  const handleHapusCache = async () => {
    if (confirm("Hapus seluruh cache peramban (LocalStorage & file lagu kustom IndexedDB)? Aplikasi akan dimuat ulang ke kondisi default awal.")) {
      try {
        localStorage.clear();
        await clearAudioFile();
        setCustomAudioName(null);
        onReset();
        // Force reload states from default
        setPartnerName(DEFAULT_CONFIG.partnerName);
        setQuestions(DEFAULT_CONFIG.questions);
        setMemories(DEFAULT_CONFIG.memories);
        setGdriveUrl(DEFAULT_CONFIG.gdriveUrl);
        setMusicUrl(DEFAULT_CONFIG.musicUrl);
        setLoveLetter(DEFAULT_CONFIG.loveLetter || "");
        alert("Cache berhasil dihapus! Aplikasi akan memuat ulang...");
        window.location.reload();
      } catch (err) {
        console.error("Gagal menghapus cache:", err);
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  return (
    <>
      {/* Floating Control Trigger */}
      <div id="admin-trigger-container" className="fixed bottom-4 left-4 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-white/95 text-blue-600 flex items-center justify-center shadow-md border border-blue-200 cursor-pointer hover:bg-blue-50 transition-colors"
          title="Sesuaikan Konfigurasi"
        >
          {isOpen ? <X size={20} /> : <Sliders size={20} />}
        </motion.button>
      </div>

      {/* Slide-In Modal Control Center */}
      <AnimatePresence>
        {isOpen && (
          <div 
            id="admin-backdrop"
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-45 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl border border-blue-100 w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col z-50 text-left text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-5 text-slate-800 flex justify-between items-center shrink-0 border-b border-blue-100">
                <div className="flex items-center gap-2.5">
                  <Settings size={20} className="animate-spin [animation-duration:12s] text-blue-600" />
                  <div>
                    <h3 className="font-sans font-black text-lg text-slate-800 leading-tight">Konfigurasi Panel Kado</h3>
                    <p className="text-[11px] text-slate-500 font-bold">Ubah kuis verifikasi, album foto, musik, dan identitas pasangan langsung di sini.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer p-1 rounded-lg hover:bg-slate-200/50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Scroll Area */}
              <form onSubmit={handleSaveSubmit} className="p-6 overflow-y-auto space-y-6 flex-grow bg-slate-50/50">
                {/* Save confirmation banner */}
                <AnimatePresence>
                  {savedSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2"
                    >
                      <Check size={16} className="text-emerald-500" />
                      <span>Perubahan tersimpan sukses ke penyimpanan peramban lokal.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Section 1: Partner Name */}
                <div className="space-y-2 pb-4 border-b border-blue-100">
                  <h4 className="text-xs sm:text-sm font-black text-blue-600 flex items-center gap-1.5 uppercase tracking-wide">
                    <Heart size={14} className="text-blue-500" />
                    <span>Identitas Pasangan</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="text-xs text-slate-600 font-bold block mb-1">Nama Panggilan Pasangan:</label>
                      <input
                        type="text"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-blue-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-slate-800 placeholder-slate-400 transition-all font-semibold"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Security Quiz Questions */}
                <div className="space-y-4 pb-4 border-b border-blue-100">
                  <h4 className="text-xs sm:text-sm font-black text-blue-600 flex items-center gap-1.5 uppercase tracking-wide">
                    <span>1. Pertanyaan Verifikasi Masuk</span>
                  </h4>
                  <p className="text-[10px] text-slate-500 italic leading-relaxed font-bold">
                    Jawaban yang dimasukkan harus cocok dengan kata kunci di bawah ini (tidak sensitif huruf besar/kecil & spasi dipangkas).
                  </p>

                  <div className="space-y-4">
                    {questions.map((q, idx) => (
                      <div key={q.id} className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm space-y-3">
                        <span className="text-xs font-black text-blue-600">Pertanyaan #{idx + 1}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1 text-left">
                            <label className="text-[10px] text-slate-600 font-bold">Teks Pertanyaan:</label>
                            <input
                              type="text"
                              value={q.text}
                              onChange={(e) => handleQuestionChange(q.id, "text", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-blue-200 text-xs focus:outline-none focus:border-blue-500 bg-white text-slate-800 font-semibold"
                              required
                            />
                          </div>
                          <div className="space-y-1 text-left">
                            <label className="text-[10px] text-slate-600 font-bold">Jawaban Kunci:</label>
                            <input
                              type="text"
                              value={q.answer}
                              onChange={(e) => handleQuestionChange(q.id, "answer", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-blue-200 text-xs focus:outline-none focus:border-blue-500 bg-white text-slate-800 font-semibold"
                              required
                            />
                          </div>
                          <div className="space-y-1 sm:col-span-2 text-left">
                            <label className="text-[10px] text-slate-600 font-bold">Petunjuk Bantuan (Hint):</label>
                            <input
                              type="text"
                              value={q.hint}
                              onChange={(e) => handleQuestionChange(q.id, "hint", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-blue-200 text-xs focus:outline-none focus:border-blue-500 bg-white text-slate-800 font-semibold"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Music and GDrive links */}
                <div className="space-y-3 pb-4 border-b border-blue-100">
                  <h4 className="text-xs sm:text-sm font-black text-blue-600 flex items-center gap-1.5 uppercase tracking-wide">
                    <Music size={14} className="text-blue-500" />
                    <span>2. Musik Latar & Tautan Cloud</span>
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-slate-600 font-bold block mb-1">Link URL Audio MP3:</label>
                      <input
                        type="url"
                        value={musicUrl}
                        onChange={(e) => setMusicUrl(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-blue-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-800 font-semibold"
                        required
                      />
                      <span className="text-[9px] text-slate-400 mt-1 block font-semibold">
                        Ganti dengan tautan file mp3 daring (bisa dari hosting publik, Cloudinary, atau Dropbox dengan akhiran dl=1).
                      </span>
                    </div>

                    {/* Local Audio File Uploader */}
                    <div className="bg-blue-50/50 p-3.5 rounded-2xl border border-dashed border-blue-200 space-y-2">
                      <label className="text-[11px] text-blue-600 font-bold block flex items-center gap-1.5">
                        <Upload size={13} className="text-blue-500" />
                        <span>Unggah File Lagu Kustom Anda (.mp3):</span>
                      </label>
                      
                      {customAudioName ? (
                        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-emerald-200 shadow-sm">
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                            <span className="text-xs font-bold text-emerald-700 truncate">{customAudioName}</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveAudio}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                            title="Hapus Lagu Kustom"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            type="file"
                            accept="audio/mp3,audio/*"
                            onChange={handleAudioUpload}
                            disabled={isUploading}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                          />
                          <div className="bg-white hover:bg-blue-50/40 border border-blue-200 rounded-xl py-4 px-3 text-center transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm">
                            <Upload size={18} className="text-blue-500" />
                            <span className="text-xs font-bold text-slate-800">
                              {isUploading ? "Sedang Menyimpan..." : "Ketuk untuk memilih file lagu (.mp3)"}
                            </span>
                            <span className="text-[9px] text-slate-400 font-bold">Lagu disimpan langsung di browser dan di-loop otomatis!</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-600 font-bold block mb-1">Link Google Drive Kejutan (QR Code):</label>
                      <input
                        type="url"
                        value={gdriveUrl}
                        onChange={(e) => setGdriveUrl(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-blue-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-800 font-semibold"
                        required
                      />
                      <span className="text-[9px] text-slate-400 mt-1 block font-semibold">
                        Tautkan ke folder foto dokumentasi Anda di Google Drive (pastikan hak akses diatur sebagai publik / siapa saja dapat melihat).
                      </span>
                    </div>

                    <div className="pt-2">
                      <label className="text-[11px] text-slate-600 font-bold block mb-1 flex items-center gap-1">
                        <FileText size={12} className="text-blue-500" />
                        <span>Isi Surat Cinta Spesial:</span>
                      </label>
                      <textarea
                        value={loveLetter}
                        onChange={(e) => setLoveLetter(e.target.value)}
                        rows={6}
                        className="w-full px-3.5 py-2 rounded-xl border border-blue-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-800 font-semibold leading-relaxed"
                        placeholder="Tulis pesan cinta panjang nan tulus untuk pasangan di sini..."
                        required
                      />
                      <span className="text-[9px] text-slate-400 mt-1 block font-semibold">
                        Pesan ini akan muncul sebagai animasi amplop interaktif yang bisa dibuka di bagian bawah halaman utama.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 4: Memories Album Cards */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs sm:text-sm font-black text-blue-600 uppercase tracking-wide">
                      <span>3. Katalog Kenangan Indah ({memories.length})</span>
                    </h4>
                    <button
                      type="button"
                      onClick={addMemory}
                      className="px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 text-[11px] font-black flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Plus size={12} />
                      <span>Tambah Memori</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {memories.map((m, idx) => (
                      <div key={m.id} className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm space-y-3 relative">
                        <button
                          type="button"
                          onClick={() => removeMemory(m.id)}
                          className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                          title="Hapus Momen Ini"
                        >
                          <Trash2 size={15} />
                        </button>

                        <span className="text-xs font-black text-blue-600">Lembaran Momen #{idx + 1}</span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1 text-left">
                            <label className="text-[10px] text-slate-600 font-bold">Judul Momen:</label>
                            <input
                              type="text"
                              value={m.title}
                              onChange={(e) => handleMemoryChange(m.id, "title", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-blue-200 text-xs bg-white text-slate-800 font-semibold focus:outline-none focus:border-blue-500"
                              required
                            />
                          </div>

                          <div className="space-y-1 text-left">
                            <label className="text-[10px] text-slate-600 font-bold">Tanggal (Contoh: 12 Mei 2025):</label>
                            <input
                              type="text"
                              value={m.date}
                              onChange={(e) => handleMemoryChange(m.id, "date", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-blue-200 text-xs bg-white text-slate-800 font-semibold focus:outline-none focus:border-blue-500"
                              required
                            />
                          </div>

                          <div className="space-y-1 sm:col-span-2 text-left">
                            <label className="text-[10px] text-slate-600 font-bold">Link Gambar Unsplash/URL:</label>
                            <input
                              type="url"
                              value={m.imageUrl}
                              onChange={(e) => handleMemoryChange(m.id, "imageUrl", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-blue-200 text-xs bg-white text-slate-800 font-semibold focus:outline-none focus:border-blue-500"
                              required
                            />
                          </div>

                          <div className="space-y-1 sm:col-span-2 text-left">
                            <label className="text-[10px] text-slate-600 font-bold">Cerita Manis (Caption):</label>
                            <textarea
                              value={m.caption}
                              onChange={(e) => handleMemoryChange(m.id, "caption", e.target.value)}
                              rows={3}
                              className="w-full px-3 py-1.5 rounded-lg border border-blue-200 text-xs bg-white text-slate-800 font-semibold focus:outline-none focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>

              {/* Action Buttons Footer */}
              <div className="bg-white p-4 border-t border-blue-100 flex flex-col sm:flex-row justify-between gap-3 shrink-0">
                <div className="flex gap-2 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={handleResetClick}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-red-600 flex items-center justify-center gap-1.5 border border-slate-200 hover:border-red-200 transition-colors cursor-pointer bg-slate-50"
                    title="Kembalikan semua form di atas ke bawaan awal"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Default</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleHapusCache}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    title="Hapus total LocalStorage dan IndexedDB BGM agar memuat ulang murni"
                  >
                    <Trash2 size={13} />
                    <span>Hapus Cache</span>
                  </button>
                </div>

                <div className="flex gap-2 justify-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer bg-slate-50"
                  >
                    Batal
                  </button>

                  <button
                    onClick={handleSaveSubmit}
                    className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-blue-600 to-sky-500 shadow-md hover:from-blue-700 hover:to-sky-600 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save size={13} />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
