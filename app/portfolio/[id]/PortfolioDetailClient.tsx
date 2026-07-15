"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    MapPin,
    Calendar,
    CheckCircle2,
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Sparkles,
    Phone,
    Shield,
    Percent,
    Award,
    Clock,
    Briefcase,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { portfolioItems, projectGalleries, projectDetails } from "@/lib/data";

export default function PortfolioDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const item = portfolioItems.find((p) => p.id === id);

    // Lightbox State Management
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Inget hårdkodat fallback-innehåll längre.
    // Finns projektet i projectDetails visas det, annars ett tomt objekt (inget extra visas).
    const details = item ? projectDetails[item.id] || {} : null;

    // Fast bildlista för projektet (ingen dynamisk fallback-logik)
    const galleryList = item ? projectGalleries[item.id] || [] : [];

    // Consolidated image list for the fullscreen lightbox modal (Main image + detail images)
    const allImages = item
        ? [
              { src: item.image, title: "Huvudbild", desc: item.title },
              ...galleryList.map((g, idx) => ({
                  src: g.src,
                  title: `Detaljvy ${idx + 1}`,
                  desc: g.caption,
              })),
          ]
        : [];

    // Disable body scroll when Lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isLightboxOpen]);

    // Handle lightbox navigation safely
    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex(
            (prev) => (prev - 1 + allImages.length) % allImages.length,
        );
    };

    const handleCloseLightbox = () => {
        setIsLightboxOpen(false);
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (!isLightboxOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
            }
            if (e.key === "ArrowLeft") {
                setCurrentImageIndex(
                    (prev) => (prev - 1 + allImages.length) % allImages.length,
                );
            }
            if (e.key === "Escape") {
                setIsLightboxOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLightboxOpen, allImages.length]);

    if (!item || !details) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] dark:bg-[#0a111a] transition-colors duration-300">
                <div className="text-center">
                    <h1 className="text-3xl font-display font-bold text-[#1e3a5f] dark:text-white mb-4">
                        Projektet hittades inte
                    </h1>
                    <button
                        onClick={() => router.push("/portfolio")}
                        className="text-[#f59e0b] font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={20} /> Tillbaka till portföljen
                    </button>
                </div>
            </div>
        );
    }

    const openLightboxAtIndex = (index: number) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    return (
        <main className="min-h-screen bg-[#FDFDFD] dark:bg-[#0a111a] selection:bg-[#f59e0b] selection:text-white transition-colors duration-300">
            {/* SECTION 1: Elegant Editorial Hero */}
            <section className="relative pt-40 pb-16 sm:pt-44 sm:pb-20 bg-gradient-to-b from-slate-50/70 to-white dark:from-[#080d14] dark:to-[#0a111a] transition-colors duration-300 overflow-hidden border-b border-slate-100/50 dark:border-white/5">
                {/* Soft, organic background light glow */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
                    <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-[#f59e0b] rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Breadcrumb Navigation */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-8 select-none">
                        <Link
                            href="/"
                            className="hover:text-[#f59e0b] transition-colors font-medium"
                        >
                            Hem
                        </Link>
                        <span>/</span>
                        <Link
                            href="/portfolio"
                            className="hover:text-[#f59e0b] transition-colors"
                        >
                            Portfolio
                        </Link>
                        <span>/</span>
                        <span className="text-slate-600 dark:text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-none">
                            {item.title}
                        </span>
                    </div>

                    <div className="max-w-4xl space-y-6">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#1e3a5f] dark:text-white tracking-tight leading-[1.08]">
                            {item.title}
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-light">
                            {item.fullDescription}
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: Project Showcase & Editorial Story */}
            <section className="py-16 sm:py-20 bg-white dark:bg-[#0a111a] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        {/* Left Column: Big Featured Completed Image & Editorial Narration */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Primary High-Resolution Featured Image */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1e3a5f]/60 dark:text-slate-400/60">
                                        Slutfört Arbete
                                    </h2>
                                    <button
                                        onClick={() => openLightboxAtIndex(0)}
                                        className="flex items-center gap-1.5 text-xs text-[#f59e0b] hover:text-[#d97706] font-bold transition-colors uppercase tracking-wider cursor-pointer outline-none"
                                    >
                                        <Maximize2 size={13} /> Förstora bild
                                    </button>
                                </div>

                                <div
                                    onClick={() => openLightboxAtIndex(0)}
                                    className="relative rounded-[2.5rem] overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-[0_24px_50px_rgba(30,58,95,0.04)] hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                        referrerPolicy="no-referrer"
                                        priority
                                    />

                                    {/* Hover Glassmorphism Prompt */}
                                    <div className="absolute inset-0 bg-[#1e3a5f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="px-5 py-2.5 rounded-full bg-white/90 dark:bg-slate-950/90 text-[#1e3a5f] dark:text-white text-xs font-bold shadow-lg flex items-center gap-2 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                                            <Maximize2 size={13} /> Klicka för
                                            att se i fullskärm
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Editorial Description Cards */}
                            {(details.challenge || details.solution) && (
                                <div className="grid sm:grid-cols-2 gap-8 pt-4">
                                    {/* Challenge Card */}
                                    {details.challenge && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs font-bold text-[#1e3a5f] dark:text-[#f59e0b] uppercase tracking-wider">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                                                {details.challengeBadge}
                                            </div>
                                            <h3 className="text-xl font-display font-semibold text-[#1e3a5f] dark:text-white">
                                                {details.challengeTitle}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                                                {details.challenge}
                                            </p>
                                        </div>
                                    )}

                                    {/* Solution Card */}
                                    {details.solution && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs font-bold text-[#1e3a5f] dark:text-[#f59e0b] uppercase tracking-wider">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                {details.solutionBadge}
                                            </div>
                                            <h3 className="text-xl font-display font-semibold text-[#1e3a5f] dark:text-white">
                                                {details.solutionTitle}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                                                {details.solution}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Column: Structured Overview Card & Quick Facts */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Project Facts Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] shadow-[0_24px_50px_rgba(30,58,95,0.02)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-white/5 p-8 sm:p-10 relative overflow-hidden"
                            >
                                {/* Micro decorative element */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/5 rounded-full blur-3xl pointer-events-none" />

                                <span className="text-[#f59e0b] font-bold uppercase tracking-[0.25em] text-[10px] mb-6 block">
                                    Projektfakta
                                </span>
                                <h3 className="text-2xl font-serif italic font-light text-[#1e3a5f] dark:text-white mb-6 leading-snug">
                                    Information &amp; Utfall
                                </h3>

                                {/* Structured Key Values */}
                                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-slate-200/60 dark:border-white/5 mb-6">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                                            <MapPin
                                                size={11}
                                                className="text-[#f59e0b]"
                                            />{" "}
                                            Område
                                        </div>
                                        <div className="font-bold text-sm text-[#1e3a5f] dark:text-white">
                                            Gävleborg
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                                            <Calendar
                                                size={11}
                                                className="text-[#f59e0b]"
                                            />{" "}
                                            Slutfört
                                        </div>
                                        <div className="font-bold text-sm text-[#1e3a5f] dark:text-white">
                                            Mars 2026
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                                            <Shield
                                                size={11}
                                                className="text-[#f59e0b]"
                                            />{" "}
                                            Garanti
                                        </div>
                                        <div className="font-bold text-sm text-[#1e3a5f] dark:text-white">
                                            100% Nöjd
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                                            <Percent
                                                size={11}
                                                className="text-[#f59e0b]"
                                            />{" "}
                                            RUT-avdrag
                                        </div>
                                        <div className="font-bold text-sm text-[#1e3a5f] dark:text-white">
                                            50% Direkt
                                        </div>
                                    </div>
                                </div>

                                {/* Checklist Results */}
                                <div className="space-y-4">
                                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
                                        Resultat &amp; Fördelar
                                    </div>
                                    <div className="space-y-3">
                                        {(details.highlights || []).map(
                                            (highlight, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                                                >
                                                    <CheckCircle2
                                                        size={15}
                                                        className="text-[#f59e0b] shrink-0 mt-0.5"
                                                    />
                                                    <span className="font-light">
                                                        {highlight}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {details.standards &&
                                details.standards.length > 0 && (
                                    <div className="bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl border border-slate-100 dark:border-white/5 p-6 space-y-4">
                                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                            {details.standardsTitle ||
                                                "Vår Standard"}
                                        </span>

                                        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                                            {details.standards.map(
                                                (standard, idx) => {
                                                    const IconComponent =
                                                        {
                                                            award: Award,
                                                            clock: Clock,
                                                            briefcase:
                                                                Briefcase,
                                                            shield: Shield,
                                                            check: CheckCircle2,
                                                        }[standard.icon] ||
                                                        Award;

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center gap-2.5"
                                                        >
                                                            <IconComponent
                                                                size={14}
                                                                className="text-[#f59e0b]"
                                                            />
                                                            <span>
                                                                {standard.text}
                                                            </span>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: Beautiful Gallery Grid */}
            <section className="py-20 sm:py-32 border-t border-slate-100 dark:border-white/5 bg-[#FDFDFD] dark:bg-[#091018] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl mb-12 space-y-4">
                        <h2 className="text-3xl font-serif italic font-light text-[#1e3a5f] dark:text-white tracking-tight">
                            Detaljerat bildgalleri från uppdraget
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                            Klicka på valfri bild nedan för att se den i
                            storformat. Du kan sedan använda pilarna för att
                            bläddra fram och tillbaka genom samtliga bilder från
                            det färdiga arbetet.
                        </p>
                    </div>

                    {/* Staggered Responsive Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        {allImages.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                onClick={() => openLightboxAtIndex(index)}
                                className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                                    referrerPolicy="no-referrer"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                                />

                                {/* Glassmorphism Hover Overlay */}
                                <div className="absolute inset-0 bg-[#1e3a5f]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                                    <div className="self-end w-10 h-10 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                        <Maximize2 size={16} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-widest">
                                            {img.title}
                                        </span>
                                        <p className="text-white text-xs font-medium truncate mt-1">
                                            {img.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: Full-Screen Interactive Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none"
                    >
                        {/* Top Toolbar */}
                        <div className="p-6 flex items-center justify-between text-white border-b border-white/5 bg-gradient-to-b from-black/50 to-transparent relative z-10">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">
                                    {item.title}
                                </span>
                                <p className="text-[11px] text-slate-400 font-medium">
                                    {currentImageIndex + 1} av{" "}
                                    {allImages.length}
                                </p>
                            </div>

                            <button
                                onClick={handleCloseLightbox}
                                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all duration-300 cursor-pointer outline-none active:scale-95"
                                title="Stäng (Esc)"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Middle Main Content Slider */}
                        <div className="relative flex-1 flex items-center justify-center px-4 sm:px-12">
                            {/* Left Navigation Arrow */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrevImage();
                                }}
                                className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-black/40 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 border border-white/5 cursor-pointer outline-none active:scale-90"
                                title="Föregående (Vänsterpil)"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {/* Large Image Viewport */}
                            <div
                                className="relative max-w-5xl w-full h-[60vh] sm:h-[70vh] flex items-center justify-center"
                                onClick={handleCloseLightbox} // Click backdrop/image area to close
                            >
                                <div
                                    className="relative w-full h-full max-h-full"
                                    onClick={(e) => e.stopPropagation()} // Prevent close on clicking the image itself
                                >
                                    <Image
                                        src={allImages[currentImageIndex].src}
                                        alt={allImages[currentImageIndex].title}
                                        fill
                                        className="object-contain"
                                        referrerPolicy="no-referrer"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 1200px"
                                    />
                                </div>
                            </div>

                            {/* Right Navigation Arrow */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNextImage();
                                }}
                                className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-black/40 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 border border-white/5 cursor-pointer outline-none active:scale-90"
                                title="Nästa (Högerpil)"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Bottom Captions Block */}
                        <div className="p-8 text-center text-white bg-gradient-to-t from-black/80 to-transparent relative z-10 border-t border-white/5">
                            <div className="max-w-2xl mx-auto space-y-1.5">
                                <span className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-[0.2em]">
                                    {allImages[currentImageIndex].title}
                                </span>
                                <p className="text-sm text-slate-300 font-light leading-relaxed">
                                    {allImages[currentImageIndex].desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SECTION 5: Beautiful CTA Section */}
            <section className="py-20 sm:py-32 border-t border-slate-100 dark:border-white/5 bg-[#FDFDFD] dark:bg-[#0a111a] transition-colors duration-300">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative px-8 py-12 sm:py-16 md:px-16 rounded-[2.5rem] bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 overflow-hidden text-center space-y-8"
                    >
                        {/* Ambient gold glow in background */}
                        <div className="absolute -top-24 right-0 w-80 h-80 bg-[#f59e0b]/3 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-24 left-0 w-80 h-80 bg-[#1e3a5f]/3 dark:bg-[#f59e0b]/2 rounded-full blur-[100px] pointer-events-none" />

                        <div className="space-y-4 relative z-10">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f59e0b]">
                                <Sparkles size={13} /> Samma Höga Kvalitet Hos
                                Dig
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-light text-[#1e3a5f] dark:text-white leading-tight">
                                Vill du se liknande resultat hos er?
                            </h2>
                            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                                Vi anpassar alltid våra uppdrag efter dina unika
                                behov och förutsättningar. Kontakta oss idag för
                                ett prisförslag helt utan förpliktelser.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto relative z-10">
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto bg-[#1e3a5f] hover:bg-[#12243d] dark:bg-[#f59e0b] dark:text-[#1e3a5f] dark:hover:bg-[#d97706] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-md shadow-blue-900/5 dark:shadow-none cursor-pointer outline-none group"
                            >
                                <span>
                                    Få gratis offert &bull; Svar inom 1h
                                </span>
                                <ArrowRight
                                    size={14}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                            <a
                                href="tel:0760368628"
                                className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 text-[#1e3a5f] dark:text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer outline-none"
                            >
                                <Phone size={14} className="text-[#f59e0b]" />
                                <span>Ring oss direkt</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
