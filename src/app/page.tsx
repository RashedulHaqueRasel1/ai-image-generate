"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Loader2,
  Sparkles,
  Wand2,
  ArrowRight,
  Share2,
  Check,
  RefreshCw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { generateAvatar } from "@/lib/api-client";
import { toast } from "sonner";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first!");
      return;
    }

    setLoading(true);
    try {
      const url = await generateAvatar(prompt);
      setImageUrl(url);
      setIsModalOpen(true);
      toast.success("Avatar generated successfully!");
    } catch (error) {
      toast.error("Failed to generate avatar. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
      const timeStr =
        now.getHours().toString().padStart(2, "0") +
        "-" +
        now.getMinutes().toString().padStart(2, "0"); // HH-mm
      link.download = `ai-image-${dateStr}_${timeStr}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download started!");
    } catch (error) {
      toast.error("Failed to download image.");
      console.error(error);
    }
  };

  const handleCopyLink = () => {
    if (!imageUrl) return;
    navigator.clipboard.writeText(imageUrl);
    setIsCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-4 md:p-24 relative overflow-hidden font-sans selection:bg-emerald-200 dark:selection:bg-emerald-900">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-3xl text-center space-y-10 px-4"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide shadow-sm"
          >
            <Sparkles className="w-4 h-4 fill-emerald-500/20" />
            MAGIC AVATAR GENERATOR
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-neutral-900 dark:text-neutral-50 leading-[1.1]">
            Create Your{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Digital Soul
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Harness the power of AI to generate stunning, unique avatars for
            your social presence. Just type and see the magic.
          </p>
        </div>

        <form
          onSubmit={handleGenerate}
          className="relative group max-w-2xl mx-auto"
        >
          <div className="relative flex flex-col md:flex-row items-stretch md:items-center p-2 rounded-2xl md:rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl transition-all duration-300 focus-within:ring-4 focus-within:ring-emerald-500/20 gap-2">
            <div className="hidden md:flex pl-6 text-neutral-400">
              <Wand2 className="w-6 h-6" />
            </div>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A beautiful portrait of a futuristic explorer..."
              className="h-12 md:h-14 border-none bg-transparent focus-visible:ring-0 text-lg md:text-xl placeholder:text-neutral-300 dark:placeholder:text-neutral-700 w-full"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="h-12 md:h-14 px-8 rounded-xl md:rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2 text-lg active:scale-95"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Generate
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-4">
          {[
            "3D Cartoon Style",
            "Neon Cyberpunk",
            "Studio Portrait",
            "Watercolor Art",
          ].map((sug, i) => (
            <motion.button
              key={sug}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              onClick={() => setPrompt(sug)}
              className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium bg-white dark:bg-neutral-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-800/50 shadow-sm"
            >
              {sug}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Result Modal - Fully Responsive & Beautiful */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl w-full overflow-hidden bg-white/90 dark:bg-neutral-950/90 backdrop-blur-3xl border-white/20 dark:border-neutral-800/50 rounded-[2rem] md:rounded-[3rem] p-0 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] border-t border-l">
          <DialogPrimitive.Close className="absolute right-6 top-6 z-50 rounded-full cursor-pointer p-2 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </DialogPrimitive.Close>

          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />

          <div className="flex flex-col md:flex-row min-h-0 md:min-h-[500px]">
            {/* Left Side: Image Showcase */}
            <div className="relative w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-white dark:from-black/40 dark:to-neutral-900/40">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-emerald-500" />

              <AnimatePresence mode="wait">
                {imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 100 }}
                    className="relative w-full aspect-square max-w-[300px] md:max-w-full"
                  >
                    <div className="absolute inset-0 bg-emerald-500/30 blur-[60px] rounded-full scale-90" />
                    <motion.div
                      whileHover={{ scale: 1.02, rotate: 1 }}
                      className="relative z-10 w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/20"
                    >
                      <img
                        src={imageUrl}
                        alt="Generated Avatar"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Floating Badge */}
                    <div className="absolute -bottom-4 -right-4 z-20 bg-white dark:bg-neutral-800 p-3 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-700">
                      <div className="bg-emerald-500/10 p-1.5 rounded-lg">
                        <Sparkles className="w-5 h-5 text-emerald-500" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side: Content & Actions */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/50 dark:bg-transparent">
              <div className="space-y-6">
                <div className="space-y-4 pt-4">
                  <Button
                    onClick={handleDownload}
                    className="w-full h-14 md:h-16 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl flex items-center justify-center gap-3 font-bold transition-all shadow-xl shadow-emerald-500/20 hover:-translate-y-1 active:translate-y-0 text-lg"
                  >
                    <Download className="w-6 h-6" />
                    Download Masterpiece
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsModalOpen(false);
                      handleGenerate();
                    }}
                    className="w-full h-14 rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 transition-all group flex items-center justify-center gap-3 font-semibold"
                  >
                    <RefreshCw className="w-5 h-5 text-neutral-400 group-hover:text-emerald-500 group-hover:rotate-180 transition-all duration-500" />
                    Generate Another Version
                  </Button>
                </div>

                <div className="pt-8 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                      Generation DNA
                    </span>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 italic line-clamp-3">
                      {prompt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
