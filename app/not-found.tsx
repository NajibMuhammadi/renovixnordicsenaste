"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
    return (
        // Layouten har redan <main>, Header och Footer, så här används en div.
        <div className="min-h-[70vh] bg-white dark:bg-[#0a111a] flex items-center justify-center px-6 pt-40 pb-24 transition-colors duration-300 relative overflow-hidden">
            {/* Bakgrundsglöd */}
            <div
                aria-hidden="true"
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
            />

            <div className="text-center relative z-10 max-w-xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 rounded-[2rem] bg-amber-500/10 flex items-center justify-center text-amber-500 mb-8"
                >
                    <Sparkles
                        size={48}
                        className="animate-pulse"
                        aria-hidden="true"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-7xl sm:text-8xl font-display font-extrabold text-[#1e3a5f] dark:text-white mb-6 tracking-tight"
                >
                    404
                </motion.p>

                {/* Sidans enda h1 */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl sm:text-3xl font-bold text-[#1e3a5f] dark:text-white mb-4"
                >
                    Sidan kunde inte hittas
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-12 max-w-md"
                >
                    Sidan du letar efter kan ha flyttats, tagits bort eller vara
                    tillfälligt otillgänglig. Vi hjälper dig gärna att hitta
                    rätt.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 bg-[#1e3a5f] dark:bg-[#f59e0b] hover:bg-[#2a4d7d] dark:hover:bg-white text-white dark:text-[#1e3a5f] px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:scale-[1.02]"
                    >
                        <ArrowLeft size={18} aria-hidden="true" />
                        Tillbaka till startsidan
                    </Link>
                    <Link
                        href="/tjanster"
                        className="inline-flex items-center gap-3 border border-slate-200 dark:border-white/10 text-[#1e3a5f] dark:text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                        Se våra tjänster
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
