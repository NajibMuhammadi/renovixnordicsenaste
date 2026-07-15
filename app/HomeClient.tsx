"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    CheckCircle2,
    ArrowUpRight,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
    Star,
    Clock,
    ShieldCheck,
    Calendar,
    Gift,
    Heart,
    Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services, portfolioItems } from "@/lib/data";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import Logo from "@/components/Logo";
import { useQuoteModal } from "@/lib/QuoteModalContext";
import before from "@/public/images/before.jpg";
import after from "@/public/images/after.jpg";

const stats = [
    { label: "Kundnöjdhet", value: "98%" },
    { label: "Slutförda Uppdrag", value: "15k+" },
    { label: "Experter", value: "120+" },
    { label: "Års Erfarenhet", value: "12+" },
];

const reviews = [
    {
        name: "Noggrant & pålitligt arbete",
        role: "Vårt löfte",
        text: "Vi ser till att varje uppdrag utförs med högsta kvalitet – inga genvägar, bara resultat du kan lita på.",
    },
    {
        name: "Flexibel & smidig service",
        role: "Vår service",
        text: "Vi anpassar oss efter din vardag och gör det enkelt att boka, ändra och få hjälp snabbt.",
    },
    {
        name: "Trygghet från start till slut",
        role: "Din trygghet",
        text: "Med garanti, försäkring och tydlig kommunikation kan du känna dig helt trygg med oss.",
    },
];

const faqs = [
    {
        question: "Erbjuder ni garanti på flyttstädning?",
        answer: "Ja, vi erbjuder alltid 100% nöjdhetsgaranti. Om något inte skulle bli godkänt vid besiktning åtgärdar vi det snabbt – utan extra kostnad.",
    },
    {
        question: "Hur fungerar RUT-avdraget?",
        answer: "RUT-avdraget dras direkt på fakturan, så du betalar bara 50% av arbetskostnaden. Vi sköter allt med Skatteverket – enkelt och smidigt för dig.",
    },
    {
        question: "Vilka områden täcker ni?",
        answer: "Vi utför städtjänster i Gävle och hela Gävleborg. Kontakta oss så bekräftar vi snabbt om vi täcker ditt område.",
    },
    {
        question: "Är ni fullt försäkrade?",
        answer: "Ja, vi är fullt försäkrade. Du kan känna dig trygg med att ditt hem och dina tillhörigheter är skyddade under hela uppdraget.",
    },
    {
        question: "Behöver jag tillhandahålla städmaterial?",
        answer: "Nej, vi tar med all nödvändig utrustning för att utföra städningen professionellt. För att säkerställa bästa hygien använder vi separata städdukar för varje hem, så att bakterier inte sprids mellan kunder. Du kan välja att köpa egna dukar av oss som endast används i ditt hem. Om du istället vill att vi hanterar tvätt av dukarna åt dig tillkommer en mindre avgift. Vi går alltid igenom detta med dig innan start – inga överraskningar.",
    },
];

const subscriptionPlans = [
    {
        title: "Varje Vecka",
        description:
            "För dig som vill ha ett ständigt skinande rent hem utan att lyfta ett finger.",
        features: [
            "Samma städare varje gång",
            "Prioriterad support",
            "Ingen bindningstid",
            "RUT-avdrag direkt",
        ],
        cta: "Begär Offert",
        icon: Heart,
    },
    {
        title: "Varannan Vecka",
        description:
            "Vår populäraste plan. Håller ordningen uppe och ger dig en fräsch start var fjortonde dag.",
        features: [
            "Flexibla tider",
            "Kvalitetsgaranti",
            "Anpassat städschema",
            "RUT-avdrag direkt",
        ],
        cta: "Begär Offert",
        popular: true,
        icon: Calendar,
    },
    {
        title: "Var Fjärde Vecka",
        description:
            "Perfekt för dig som vill ha en rejäl genomgång av hemmet en gång i månaden.",
        features: [
            "Grundlig rengöring",
            "Trygg försäkring",
            "Enkel bokning",
            "RUT-avdrag direkt",
        ],
        cta: "Begär Offert",
        icon: Gift,
    },
];

export default function HomeClient() {
    const { openModal } = useQuoteModal();
    const [activeFilter, setActiveFilter] = useState("Alla");
    const [currentReview, setCurrentReview] = useState(0);
    const [visibleCards, setVisibleCards] = useState(1);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        const updateVisibleCards = () => {
            let cards = 1;
            if (window.innerWidth >= 1024) cards = 3;
            else if (window.innerWidth >= 768) cards = 2;

            setVisibleCards(cards);

            // Update current review index if it's out of bounds for the new card count
            setCurrentReview((prev) => {
                const maxIndex = reviews.length - cards;
                return Math.min(prev, Math.max(0, maxIndex));
            });
        };
        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);
        return () => window.removeEventListener("resize", updateVisibleCards);
    }, []);

    const nextReview = () => {
        setCurrentReview(
            (prev) => (prev + 1) % (reviews.length - visibleCards + 1),
        );
    };

    const prevReview = () => {
        setCurrentReview(
            (prev) =>
                (prev - 1 + (reviews.length - visibleCards + 1)) %
                (reviews.length - visibleCards + 1),
        );
    };

    const portfolioCategories = [
        "Alla",
        ...Array.from(new Set(portfolioItems.map((item) => item.category))),
    ];

    const filteredPortfolio =
        activeFilter === "Alla"
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === activeFilter);

    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0a111a] selection:bg-[#f59e0b] selection:text-white transition-colors duration-300">
            {/* Hero Section with Before/After */}
            <section className="pt-40 pb-24 sm:pb-32 lg:pb-36 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#f59e0b] rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7 xl:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-[#f59e0b] font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
                                    Kvalitet & Trygghet i Gävleborg
                                </span>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-light text-[#1e3a5f] dark:text-white mb-8 leading-[1.1] tracking-tighter">
                                    Ett hem som andas
                                    <br />
                                    <span className="text-[#f59e0b] font-normal">
                                        rent
                                    </span>
                                </h1>
                                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-xl">
                                    Renovix Nordic levererar professionell
                                    städning för hem, kontor och företag i
                                    Gävle. Med noggrannhet, pålitlig service och
                                    ett öga för detaljer ser vi till att varje
                                    städning håller högsta kvalitet.
                                </p>

                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={openModal}
                                            className="bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] hover:bg-[#152a45] dark:hover:bg-[#d97706] transition-all duration-300 shadow-md shadow-blue-900/5 cursor-pointer outline-none shrink-0"
                                        >
                                            Begär offert – snabbt svar{" "}
                                            <ArrowUpRight size={16} />
                                        </button>
                                        <a
                                            href="tel:0760368628"
                                            className="bg-white hover:bg-slate-50 border border-slate-200 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 text-[#1e3a5f] dark:text-white px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer outline-none"
                                        >
                                            Ring oss direkt
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-5 xl:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(30,58,95,0.08)] border border-slate-200/50 dark:border-white/5 bg-slate-100 dark:bg-slate-800"
                            >
                                <BeforeAfterSlider
                                    beforeImage={before.src}
                                    afterImage={after.src}
                                    aspectRatio="aspect-[4/5]"
                                    priority={true}
                                />
                            </motion.div>
                            <div className="mt-8 flex justify-between items-center px-4 gap-4 sm:gap-8">
                                <div className="text-center flex-1">
                                    <div className="text-2xl sm:text-3xl font-display font-black text-[#1e3a5f] dark:text-white">
                                        98%
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                                        KUNDNÖJDHET
                                    </div>
                                </div>
                                <div className="text-center flex-1">
                                    <div className="text-base sm:text-lg font-display font-black text-[#1e3a5f] dark:text-white leading-tight">
                                        Inga dolda avgifter
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                                        FAST PRIS
                                    </div>
                                </div>
                                <div className="text-center flex-1">
                                    <div className="text-2xl sm:text-3xl font-display font-black text-[#1e3a5f] dark:text-white">
                                        100%
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                                        GARANTI
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Service Section */}
            <section
                id="services"
                className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-[#0a111a] transition-colors duration-300"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                Våra Tjänster
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1e3a5f] dark:text-white leading-tight">
                                Professionell städning för{" "}
                                <br className="hidden sm:block" /> hem och
                                företag i Gävle
                            </h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-sm">
                            Vi hjälper privatpersoner och företag med noggrann
                            städning av hög kvalitet – från flyttstädning till
                            hemstädning, storstädning och fönsterputs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.slice(0, 4).map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`group relative p-8 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(30,58,95,0.06)] hover:-translate-y-2 ${service.color} dark:bg-slate-900/50 dark:border dark:border-white/5`}
                            >
                                <Link
                                    href={`/services/${service.id}`}
                                    className="relative z-10 h-full flex flex-col"
                                >
                                    <div className="bg-white dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center text-[#1e3a5f] dark:text-[#f59e0b] shadow-sm mb-8 group-hover:bg-[#1e3a5f] group-hover:text-white transition-colors duration-500">
                                        <service.icon size={28} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a5f]/40 dark:text-white/40 mb-2">
                                        {service.category}
                                    </span>
                                    <h3 className="text-2xl font-display font-bold text-[#1e3a5f] dark:text-white mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 transition-opacity duration-500">
                                        {service.description}
                                    </p>
                                    <div className="mt-auto flex items-center gap-2 text-[#1e3a5f] dark:text-[#f59e0b] font-bold text-sm">
                                        Läs Mer <ChevronRight size={16} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Button to read more about our services */}
                    <div className="mt-16 flex flex-col items-center justify-center gap-4">
                        <Link
                            href="/tjanster"
                            className="bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] px-10 py-5 rounded-2xl font-bold text-base flex items-center gap-3 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/10 dark:hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer outline-none"
                        >
                            <span>Läs mer om våra tjänster</span>
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Vårt Erbjudande Section */}
            <section
                id="offer"
                className="py-20 sm:py-28 lg:py-32 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 pt-8 sm:pt-12">
                                    <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-[3/4] relative">
                                        <Image
                                            src="https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=600"
                                            alt="Professionell städservice i Gävle"
                                            fill
                                            className="object-cover"
                                            referrerPolicy="no-referrer"
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-[3/4] relative">
                                        <Image
                                            src="https://images.pexels.com/photos/4108712/pexels-photo-4108712.jpeg?auto=compress&cs=tinysrgb&w=600"
                                            alt="Renovix Nordic städteam på plats i Gävleborg"
                                            fill
                                            className="object-cover"
                                            referrerPolicy="no-referrer"
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="bg-[#f59e0b] p-6 sm:p-8 rounded-[2rem] text-[#1e3a5f]">
                                        <div className="text-3xl sm:text-4xl font-display font-bold mb-2">
                                            100%
                                        </div>
                                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60">
                                            Nöjdhetsgaranti
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-sm mb-6 block">
                                Vårt Erbjudande
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1e3a5f] dark:text-white leading-[1.1] mb-8 sm:mb-10">
                                Kvalitet som <br />
                                <span className="italic font-serif text-[#f59e0b]">
                                    gör skillnad
                                </span>{" "}
                                <br />– varje dag.
                            </h2>
                            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Som städfirma i Gävle fokuserar vi på
                                noggrannhet, pålitlighet och kundnöjdhet. Vi
                                levererar resultat du ser direkt – oavsett
                                uppdrag.
                            </p>
                            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-10 sm:mb-12">
                                Vi arbetar i hela Gävleborg och anpassar våra
                                tjänster efter dina behov.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                {[
                                    {
                                        icon: ShieldCheck,
                                        text: "100% nöjdhetsgaranti på alla uppdrag",
                                    },
                                    {
                                        icon: Clock,
                                        text: "Fullt försäkrade – tryggt och säkert",
                                    },
                                    {
                                        icon: CheckCircle2,
                                        text: "Offert inom 24 timmar",
                                    },
                                    {
                                        icon: Sparkles,
                                        text: "Lokalt team i Gävleborg, ingen underleverantör",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#1e3a5f] dark:text-[#f59e0b] shadow-sm shrink-0">
                                            <item.icon size={18} />
                                        </div>
                                        <span className="font-bold text-[#1e3a5f] dark:text-white text-sm leading-snug">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vår Process Section */}
            <section
                id="process"
                className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-[#0a111a] transition-colors duration-300"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 sm:mb-24">
                        <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            Vår Process
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1e3a5f] dark:text-white">
                            Hur vår städservice i Gävleborg fungerar
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Kontakta oss",
                                desc: "Berätta vad du behöver hjälp med och få en kostnadsfri offert snabbt.",
                            },
                            {
                                step: "02",
                                title: "Boka tid",
                                desc: "Vi hittar en tid som passar dig – enkelt och smidigt.",
                            },
                            {
                                step: "03",
                                title: "Vi utför jobbet",
                                desc: "Vårt team utför städningen noggrant och effektivt.",
                            },
                            {
                                step: "04",
                                title: "Klart & godkänt",
                                desc: "Vi säkerställer att du är helt nöjd innan vi avslutar.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 shadow-sm hover:shadow-xl transition-all group border border-slate-100 dark:border-white/5"
                            >
                                <div className="text-6xl font-display font-bold text-[#f59e0b]/10 absolute top-4 right-8 group-hover:text-[#f59e0b]/20 transition-colors">
                                    {item.step}
                                </div>
                                <div className="relative z-10">
                                    <div className="mb-6">
                                        <Logo size={48} showText={false} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subscription Plans Section */}
            <section
                id="subscriptions"
                className="py-20 sm:py-28 lg:py-32 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 sm:mb-24">
                        <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            Abonnemang
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1e3a5f] dark:text-white mb-6">
                            Hemstädning – Abonnemang som förenklar din vardag
                        </h2>
                        <p className="text-slate-700 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base italic">
                            Med våra städabonnemang får du ett hem som alltid
                            känns rent och fräscht – utan att du behöver tänka
                            på det.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-md mx-auto lg:max-w-none">
                        {[
                            {
                                title: "Veckovis städning",
                                description:
                                    "För dig som vill ha ett hem som alltid känns nystädat",
                                features: [
                                    "Samma städare varje gång",
                                    "Fast dag & tid som passar dig",
                                    "Prioriterad bokning vid ändringar",
                                    "RUT-avdrag direkt på fakturan",
                                ],
                                cta: "Begär offert",
                                icon: Heart,
                            },
                            {
                                title: "Varannan vecka",
                                description:
                                    "Bästa balansen mellan pris och ett rent hem.",
                                features: [
                                    "Samma städare, lär känna ditt hem",
                                    "Fast schema – ingen bokningsstress",
                                    "Justera eller pausa vid behov",
                                    "RUT-avdrag direkt på fakturan",
                                ],
                                cta: "Begär offert",
                                popular: true,
                                icon: Calendar,
                            },
                            {
                                title: "Var fjärde vecka",
                                description:
                                    "En regelbunden uppfräschning utan bindningstid.",
                                features: [
                                    "Djupare rengöring vid varje besök",
                                    "Ingen bindningstid – avsluta när du vill",
                                    "Boka & hantera enkelt online",
                                    "RUT-avdrag direkt",
                                ],
                                cta: "Begär offert",
                                icon: Gift,
                            },
                        ].map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative p-8 sm:p-10 rounded-[3rem] bg-white dark:bg-slate-800 shadow-[0_10px_30px_rgba(30,58,95,0.03)] hover:shadow-[0_20px_40px_rgba(30,58,95,0.08)] transition-all border ${plan.popular ? "border-[#f59e0b] lg:scale-105 z-10" : "border-slate-100 dark:border-white/5"}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f59e0b] text-[#1e3a5f] px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                        Mest vald
                                    </div>
                                )}
                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${plan.popular ? "bg-[#f59e0b] text-[#1e3a5f]" : "bg-[#1e3a5f] text-white"}`}
                                >
                                    <plan.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-[#1e3a5f] dark:text-white mb-4">
                                    {plan.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                                    {plan.description}
                                </p>

                                <ul className="space-y-4 mb-10">
                                    {plan.features.map((feature, j) => (
                                        <li
                                            key={j}
                                            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                                        >
                                            <CheckCircle2
                                                size={16}
                                                className="text-[#f59e0b] shrink-0"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/contact"
                                    className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center transition-all ${plan.popular ? "bg-[#f59e0b] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white" : "bg-slate-100 dark:bg-white/5 text-[#1e3a5f] dark:text-white hover:bg-[#1e3a5f] hover:text-white"}`}
                                >
                                    {plan.cta}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vad säger våra kunder Section */}
            <section
                id="reviews"
                className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-[#0a111a] transition-colors duration-300 overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 sm:mb-24 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                                Referenser
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1e3a5f] dark:text-white">
                                Därför väljer kunder oss
                            </h2>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={prevReview}
                                aria-label="Föregående omdöme"
                                className="w-14 h-14 rounded-full border-2 border-slate-100 dark:border-white/5 flex items-center justify-center text-[#1e3a5f] dark:text-white hover:bg-[#1e3a5f] dark:hover:bg-[#f59e0b] hover:text-white dark:hover:text-[#1e3a5f] hover:border-[#1e3a5f] dark:hover:border-[#f59e0b] transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextReview}
                                aria-label="Nästa omdöme"
                                className="w-14 h-14 rounded-full border-2 border-slate-100 dark:border-white/5 flex items-center justify-center text-[#1e3a5f] dark:text-white hover:bg-[#1e3a5f] dark:hover:bg-[#f59e0b] hover:text-white dark:hover:text-[#1e3a5f] hover:border-[#1e3a5f] dark:hover:border-[#f59e0b] transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        <motion.div
                            className="flex gap-6 sm:gap-8"
                            animate={{
                                x: `-${currentReview * (100 / visibleCards)}%`,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        >
                            {reviews.map((review, i) => (
                                <div
                                    key={i}
                                    className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-21.333px)] bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(30,58,95,0.02)] hover:shadow-[0_20px_40px_rgba(30,58,95,0.05)] transition-all border border-slate-100 dark:border-white/5 flex flex-col"
                                >
                                    <div className="flex gap-1 text-[#f59e0b] mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill="currentColor"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-400 italic mb-8 leading-relaxed text-sm sm:text-base flex-grow">
                                        &quot;{review.text}&quot;
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        {/* <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                                            <Image
                                                src={`https://i.pravatar.cc/150?u=renovix-review-${i}`}
                                                alt={`Kundomdöme: ${review.name}`}
                                                fill
                                                className="object-cover"
                                                referrerPolicy="no-referrer"
                                                sizes="48px"
                                            />
                                        </div> */}
                                        <div>
                                            <div className="font-bold text-[#1e3a5f] dark:text-white text-sm sm:text-base">
                                                {review.name}
                                            </div>
                                            <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest">
                                                {review.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Pagination dots */}
                    <div className="flex justify-center gap-2 mt-12">
                        {[...Array(reviews.length - visibleCards + 1)].map(
                            (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentReview(i)}
                                    aria-label={`Gå till omdöme ${i + 1}`}
                                    className={`h-2 rounded-full transition-all ${currentReview === i ? "w-8 bg-[#f59e0b]" : "w-2 bg-slate-200 dark:bg-slate-800"}`}
                                />
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section
                id="faq"
                className="py-20 sm:py-28 lg:py-32 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300"
            >
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16 sm:mb-24">
                        <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            Frågor & Svar
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1e3a5f] dark:text-white">
                            Vanliga frågor
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm overflow-hidden border border-slate-100 dark:border-white/5"
                            >
                                <button
                                    onClick={() =>
                                        setOpenFaq(openFaq === i ? null : i)
                                    }
                                    aria-expanded={openFaq === i}
                                    aria-controls={`faq-answer-${i}`}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <h3 className="font-bold text-[#1e3a5f] dark:text-white text-lg">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        size={20}
                                        className={`text-[#f59e0b] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            id={`faq-answer-${i}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-8 pb-8 text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
