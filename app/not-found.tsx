"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a111a] flex flex-col justify-between items-center px-6 py-12 transition-colors duration-300 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            {/*  <header className="w-full max-w-7xl flex justify-between items-center relative z-10">
        <Link href="/">
          <Logo size={40} />
        </Link>
      </header> */}

            {/* Main Content */}
            <main className="text-center relative z-10 max-w-xl mx-auto flex flex-col items-center justify-center py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 rounded-[2rem] bg-amber-500/10 flex items-center justify-center text-amber-500 mb-8"
                >
                    <Sparkles size={48} className="animate-pulse" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-7xl sm:text-8xl font-display font-extrabold text-[#1e3a5f] dark:text-white mb-6 tracking-tight"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl sm:text-3xl font-bold text-[#1e3a5f] dark:text-white mb-4"
                >
                    Sidan kunde inte hittas
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-12 max-w-md"
                >
                    Sidan du letar efter kan ha flyttats, tagits bort eller är
                    tillfälligt otillgänglig. Låt oss hjälpa dig hitta tillbaka.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 bg-[#1e3a5f] dark:bg-[#f59e0b] hover:bg-[#2a4d7d] dark:hover:bg-white text-white dark:text-[#1e3a5f] px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:scale-[1.02]"
                    >
                        <ArrowLeft size={18} />
                        Tillbaka till start
                    </Link>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
                © 2026 Renovix Nordic. Alla rättigheter förbehållna.
            </footer>
        </div>
    );
}
