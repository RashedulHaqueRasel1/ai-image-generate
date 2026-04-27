"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 space-y-8 max-w-lg"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-9xl font-black text-emerald-500/20 dark:text-emerald-500/10 select-none"
          >
            404
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-emerald-500 animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Oops! This Page Got <span className="text-emerald-500">Lost</span>{" "}
            in the Cloud
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Even the most advanced AI couldn&apos;t find what you&lsquo;re
            looking for. Maybe it&apos;s still being generated?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            className="h-12 px-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/20"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Back Home
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-12 px-8 rounded-full border-neutral-200 dark:border-neutral-800"
          >
            <Link href="/" className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Try a New Prompt
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
