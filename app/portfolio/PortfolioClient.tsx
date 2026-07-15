"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSortedPortfolioItems } from "@/lib/data";

// SET THIS TO TRUE TO SHOW THE PORTFOLIO PAGE
const SHOW_PORTFOLIO = true;

export default function PortfolioPage() {
    if (!SHOW_PORTFOLIO) {
        redirect("/");
    }

    const [activeFilter, setActiveFilter] = useState("Alla");

    // Hämta projekten i rätt (order-baserad) ordning
    const sortedPortfolioItems = getSortedPortfolioItems();

    const portfolioCategories = [
        "Alla",
        ...Array.from(
            new Set(sortedPortfolioItems.map((item) => item.category)),
        ),
    ];

    const filteredPortfolio =
        activeFilter === "Alla"
            ? sortedPortfolioItems
            : sortedPortfolioItems.filter(
                  (item) => item.category === activeFilter,
              );

    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0a111a] selection:bg-[#f59e0b] selection:text-white transition-colors duration-300">
            {/* Hero Section - Editorial Style */}
            <section className="pt-40 pb-20 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f59e0b] rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-[#f59e0b] font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
                                    RESULTAT DU KAN SE
                                </span>
                                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic font-light text-[#1e3a5f] dark:text-white mb-8 leading-[1.1] tracking-tighter">
                                    Vårt{" "}
                                    <span className="text-[#f59e0b]">
                                        Arbete
                                    </span>
                                </h1>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:max-w-sm pb-4"
                        >
                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                En visuell resa genom våra senaste uppdrag i
                                Gävle och Gävleborg – från hemstädning och
                                flyttstädning till kontor och fastigheter.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section className="py-20 sm:py-32 bg-white dark:bg-[#0a111a] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Portfolio Filter - Minimal Style */}
                    <div className="flex flex-wrap items-center gap-8 mb-20 border-b border-slate-100 dark:border-white/5 pb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#1e3a5f]/40 dark:text-white/40">
                            Filtrera efter
                        </span>
                        <div className="flex flex-wrap gap-6">
                            {portfolioCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`text-sm font-bold transition-all relative py-2 cursor-pointer ${
                                        activeFilter === cat
                                            ? "text-[#f59e0b]"
                                            : "text-slate-400 dark:text-white/30 hover:text-[#1e3a5f] dark:hover:text-white"
                                    }`}
                                >
                                    {cat}
                                    {activeFilter === cat && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f59e0b]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredPortfolio.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.1,
                                    }}
                                    className={`group flex flex-col ${i % 3 === 1 ? "lg:mt-12" : i % 3 === 2 ? "lg:mt-24" : ""}`}
                                >
                                    <Link
                                        href={`/portfolio/${item.id}`}
                                        className="flex flex-col h-full"
                                    >
                                        <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-xl mb-6 block group-hover:shadow-2xl transition-shadow">
                                            <Image
                                                src={item.image}
                                                alt={`${item.title} - Referensprojekt i Gävleborg`}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                referrerPolicy="no-referrer"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                                <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1e3a5f] scale-0 group-hover:scale-100 transition-transform duration-500">
                                                    <ArrowRight size={32} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-[#f59e0b] text-[10px] font-bold uppercase tracking-[0.3em]">
                                                    {item.category}
                                                </span>
                                                <div className="h-px flex-1 bg-slate-100 dark:bg-white/5"></div>
                                            </div>
                                            <h2 className="text-3xl font-display font-bold mb-4 text-[#1e3a5f] dark:text-white group-hover:text-[#f59e0b] transition-colors tracking-tight">
                                                {item.title}
                                            </h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredPortfolio.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500 dark:text-slate-400 font-bold">
                                Inga projekt hittades i denna kategori.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
