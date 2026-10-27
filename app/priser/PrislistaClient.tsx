"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
    Check,
    ShieldCheck,
    Sparkles,
    Calculator,
    ArrowRight,
    Phone,
    Info,
    Clock,
    Building2,
    Home,
    Truck,
    Layers,
} from "lucide-react";

interface FlyttTier {
    area: string;
    regular: string;
    rut: string;
    baseRut: number | null;
    baseRegular: number | null;
    isOffert?: boolean;
    popular?: boolean;
}

const flyttstadningPrices: FlyttTier[] = [
    {
        area: "0–30 m²",
        regular: "4 196 kr",
        rut: "2 098 kr",
        baseRut: 2098,
        baseRegular: 4196,
    },
    {
        area: "31–40 m²",
        regular: "4 796 kr",
        rut: "2 398 kr",
        baseRut: 2398,
        baseRegular: 4796,
        popular: true,
    },
    {
        area: "41–50 m²",
        regular: "5 396 kr",
        rut: "2 698 kr",
        baseRut: 2698,
        baseRegular: 5396,
    },
    {
        area: "51–60 m²",
        regular: "5 896 kr",
        rut: "2 948 kr",
        baseRut: 2948,
        baseRegular: 5896,
    },
    {
        area: "61–70 m²",
        regular: "6 296 kr",
        rut: "3 148 kr",
        baseRut: 3148,
        baseRegular: 6296,
        popular: true,
    },
    {
        area: "71–80 m²",
        regular: "6 696 kr",
        rut: "3 348 kr",
        baseRut: 3348,
        baseRegular: 6696,
    },
    {
        area: "81–90 m²",
        regular: "7 096 kr",
        rut: "3 548 kr",
        baseRut: 3548,
        baseRegular: 7096,
        popular: true,
    },
    {
        area: "91–99 m²",
        regular: "7 596 kr",
        rut: "3 798 kr",
        baseRut: 3798,
        baseRegular: 7596,
    },
    {
        area: "100–120 m²",
        regular: "8 596 kr",
        rut: "4 298 kr",
        baseRut: 4298,
        baseRegular: 8596,
    },
    {
        area: "Över 120 m²",
        regular: "Offert",
        rut: "Offert",
        baseRut: null,
        baseRegular: null,
        isOffert: true,
    },
];

const flyttAddons = [
    { id: "balkong", name: "Balkong", rutPrice: 249, regularPrice: 498 },
    {
        id: "inglasadBalkong",
        name: "Inglasad balkong",
        rutPrice: 399,
        regularPrice: 798,
    },
    {
        id: "inglasadAltan",
        name: "Inglasad altan",
        rutPrice: 499,
        regularPrice: 998,
    },
    {
        id: "forrad",
        name: "Uteförråd / källarförråd",
        rutPrice: 149,
        regularPrice: 298,
    },
    { id: "garage", name: "Garage", rutPrice: 249, regularPrice: 498 },
    {
        id: "materialTransport",
        name: "Material och transport inom Gävle",
        rutPrice: 149,
        regularPrice: 149,
        fixed: true,
    },
];

const hemstadningFrequencies = [
    {
        frequency: "Varje vecka",
        pricePerHour: "229 kr/timme",
        rateNum: 229,
        badge: "Populärast",
        desc: "För dig som vill ha ett ständigt välstädat och skinande hem.",
    },
    {
        frequency: "Varannan vecka",
        pricePerHour: "249 kr/timme",
        rateNum: 249,
        badge: "Mest vald",
        desc: "Vårt mest populära upplägg. Perfekt balans för de flesta hem.",
    },
    {
        frequency: "Varje månad",
        pricePerHour: "269 kr/timme",
        rateNum: 269,
        badge: "Månadsvård",
        desc: "En genomgående grundstädning en gång i månaden.",
    },
    {
        frequency: "Engångsstädning",
        pricePerHour: "299 kr/timme",
        rateNum: 299,
        badge: "Vid behov",
        desc: "När du behöver professionell städhjälp inför fest eller helg.",
    },
];

const storstadningPrices = [
    {
        area: "0–50 m²",
        rutPrice: "2 498 kr",
        regularPrice: "4 996 kr",
        minM2: 0,
        maxM2: 50,
    },
    {
        area: "51–75 m²",
        rutPrice: "2 998 kr",
        regularPrice: "5 996 kr",
        minM2: 51,
        maxM2: 75,
    },
    {
        area: "76–100 m²",
        rutPrice: "3 498 kr",
        regularPrice: "6 996 kr",
        minM2: 76,
        maxM2: 100,
    },
    {
        area: "101–125 m²",
        rutPrice: "4 098 kr",
        regularPrice: "8 196 kr",
        minM2: 101,
        maxM2: 125,
    },
    {
        area: "Över 125 m²",
        rutPrice: "Offert",
        regularPrice: "Offert",
        minM2: 126,
        maxM2: 999,
        isOffert: true,
    },
];

const fonsterputsPrices = [
    {
        service: "Utvändig puts",
        rutPrice: "399 kr",
        regularPrice: "798 kr",
        desc: "Utvändig putsning av upp till 12 standardfönster.",
        priceNum: 399,
    },
    {
        service: "Invändig och utvändig puts",
        rutPrice: "699 kr",
        regularPrice: "1 398 kr",
        desc: "2-sidig putsning av insida och utsida för upp till 12 fönster.",
        priceNum: 699,
        popular: true,
    },
    {
        service: "Invändig, utvändig och mellan glasen",
        rutPrice: "1 299 kr",
        regularPrice: "2 598 kr",
        desc: "Komplett 4-sidig fönsterputsning inkl. rengöring mellan bågarna.",
        priceNum: 1299,
    },
];

const kontorsstadningPrices = [
    {
        service: "Regelbunden kontorsstädning",
        price: "349 kr/timme",
        note: "Löpande avtal",
        desc: "Skrivbordsytor, kök/pentry, toaletter, golvvård och tömning av papperskorgar. Städas utanför era öppettider.",
    },
    {
        service: "Engångsstädning kontor",
        price: "399 kr/timme",
        note: "Vid behov",
        desc: "Noggrann engångsinsats vid flytt, renovering eller efter större evenemang.",
    },
    {
        service: "Större lokaler & fastigheter",
        price: "Offert",
        note: "Fast pris",
        desc: "Trappstädning, lagerlokaler eller flervåningskontor med full servicegaranti.",
    },
];

export default function PrislistaClient() {
    const [activeCategory, setActiveCategory] = useState<
        "all" | "flytt" | "hem" | "stor" | "fonster" | "kontor"
    >("all");

    const handleSelectCategory = (
        cat: "all" | "flytt" | "hem" | "stor" | "fonster" | "kontor",
    ) => {
        setActiveCategory(cat);
        setTimeout(() => {
            if (cat === "all") {
                const el = document.getElementById("pris-sektioner");
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } else {
                const idMap: Record<string, string> = {
                    flytt: "flyttstadning",
                    hem: "hemstadning",
                    stor: "storstadning",
                    fonster: "fonsterputs",
                    kontor: "kontorsstadning",
                };
                const targetId = idMap[cat];
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                    const fallback = document.getElementById("pris-sektioner");
                    if (fallback) {
                        fallback.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }
                }
            }
        }, 40);
    };

    // Calculator State
    const [calcService, setCalcService] = useState<
        "flytt" | "hem" | "stor" | "fonster"
    >("flytt");
    const [calcM2, setCalcM2] = useState<number>(65);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([
        "materialTransport",
    ]);
    const [hemHours, setHemHours] = useState<number>(3);
    const [hemFreq, setHemFreq] = useState<number>(249);
    const [fonsterChoice, setFonsterChoice] = useState<number>(699);

    const flyttInputId = useId();
    const hemHoursId = useId();
    const storInputId = useId();

    const flyttPresets = [
        { label: "1 rum (28 m²)", m2: 28 },
        { label: "2 rum (48 m²)", m2: 48 },
        { label: "3 rum (68 m²)", m2: 68 },
        { label: "4 rum (88 m²)", m2: 88 },
        { label: "5 rum (110 m²)", m2: 110 },
        { label: "Villa (>120 m²)", m2: 135 },
    ];

    const getFlyttBasePrice = (
        m2: number,
    ): { rut: number | null; regular: number | null; tierName: string } => {
        if (m2 <= 30) return { rut: 2098, regular: 4196, tierName: "0–30 m²" };
        if (m2 <= 40) return { rut: 2398, regular: 4796, tierName: "31–40 m²" };
        if (m2 <= 50) return { rut: 2698, regular: 5396, tierName: "41–50 m²" };
        if (m2 <= 60) return { rut: 2948, regular: 5896, tierName: "51–60 m²" };
        if (m2 <= 70) return { rut: 3148, regular: 6296, tierName: "61–70 m²" };
        if (m2 <= 80) return { rut: 3348, regular: 6696, tierName: "71–80 m²" };
        if (m2 <= 90) return { rut: 3548, regular: 7096, tierName: "81–90 m²" };
        if (m2 <= 99) return { rut: 3798, regular: 7596, tierName: "91–99 m²" };
        if (m2 <= 120)
            return { rut: 4298, regular: 8596, tierName: "100–120 m²" };
        return { rut: null, regular: null, tierName: "Över 120 m²" };
    };

    const flyttCurrentTier = getFlyttBasePrice(calcM2);

    const calculateFlyttEstimate = () => {
        if (flyttCurrentTier.rut === null) return null;
        const addonCost = selectedAddons.reduce((sum, id) => {
            const addon = flyttAddons.find((a) => a.id === id);
            return sum + (addon ? addon.rutPrice : 0);
        }, 0);
        return flyttCurrentTier.rut + addonCost;
    };

    const calculateFlyttRegularEstimate = () => {
        if (flyttCurrentTier.regular === null) return null;
        const addonCost = selectedAddons.reduce((sum, id) => {
            const addon = flyttAddons.find((a) => a.id === id);
            return sum + (addon ? addon.regularPrice : 0);
        }, 0);
        return flyttCurrentTier.regular + addonCost;
    };

    const calculateHemEstimate = () => {
        const hours = Math.max(2, hemHours);
        return hours * hemFreq + 79;
    };

    const calculateStorEstimate = () => {
        if (calcM2 <= 50) return 2498;
        if (calcM2 <= 75) return 2998;
        if (calcM2 <= 100) return 3498;
        if (calcM2 <= 125) return 4098;
        return null;
    };

    const toggleAddon = (id: string) => {
        setSelectedAddons((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const flyttTotal = calculateFlyttEstimate();
    const flyttRegularTotal = calculateFlyttRegularEstimate();
    const hemTotal = calculateHemEstimate();
    const storTotal = calculateStorEstimate();
    const fonsterTotal = fonsterChoice + 99;

    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0a111a] selection:bg-[#f59e0b] selection:text-white transition-colors duration-300">
            {/* Header / Hero */}
            <section className="pt-36 pb-14 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/60 dark:to-[#0a111a] border-b border-slate-200/60 dark:border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <span className="text-[#f59e0b] font-bold uppercase tracking-[0.25em] text-xs mb-3 block">
                            Prislista &amp; RUT-avdrag i Gävle
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-serif italic font-light text-[#1e3a5f] dark:text-white mb-5 leading-[1.1] tracking-tight">
                            Tydliga &amp; fasta priser på{" "}
                            <span className="text-[#f59e0b]">städning</span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-8">
                            Här hittar du våra fasta priser för flyttstädning,
                            hemstädning, storstädning och fönsterputs. Alla
                            priser för privatpersoner är inklusive moms och
                            visas efter 50% RUT-avdrag som dras direkt på
                            fakturan.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            <div className="flex items-center gap-2">
                                <Check className="text-[#f59e0b] w-4 h-4 shrink-0" />
                                <span>50% RUT-avdrag dras direkt</span>
                            </div>
                            <span
                                className="text-slate-300 dark:text-slate-700"
                                aria-hidden="true"
                            >
                                ·
                            </span>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-[#f59e0b] w-4 h-4 shrink-0" />
                                <span>100% Städgaranti</span>
                            </div>
                            <span
                                className="text-slate-300 dark:text-slate-700"
                                aria-hidden="true"
                            >
                                ·
                            </span>
                            <div className="flex items-center gap-2">
                                <Check className="text-[#f59e0b] w-4 h-4 shrink-0" />
                                <span>Fasta priser utan dolda avgifter</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Navigation Filter */}
            <section className="sticky top-20 z-30 bg-white/95 dark:bg-[#0a111a]/95 backdrop-blur-md border-b border-slate-100 dark:border-white/5 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth [-webkit-overflow-scrolling:touch]">
                        <button
                            onClick={() => handleSelectCategory("all")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                                activeCategory === "all"
                                    ? "bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5"
                            }`}
                        >
                            Alla priser
                        </button>
                        <button
                            onClick={() => handleSelectCategory("flytt")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                                activeCategory === "flytt"
                                    ? "bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5"
                            }`}
                        >
                            Flyttstädning
                        </button>
                        <button
                            onClick={() => handleSelectCategory("hem")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                                activeCategory === "hem"
                                    ? "bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5"
                            }`}
                        >
                            Hemstädning
                        </button>
                        <button
                            onClick={() => handleSelectCategory("stor")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                                activeCategory === "stor"
                                    ? "bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5"
                            }`}
                        >
                            Storstädning
                        </button>
                        <button
                            onClick={() => handleSelectCategory("fonster")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                                activeCategory === "fonster"
                                    ? "bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5"
                            }`}
                        >
                            Fönsterputs
                        </button>
                        <button
                            onClick={() => handleSelectCategory("kontor")}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                                activeCategory === "kontor"
                                    ? "bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5"
                            }`}
                        >
                            Kontorsstädning
                        </button>
                        <a
                            href="#kalkylator"
                            className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#f59e0b] bg-amber-500/10 hover:bg-amber-500/20 rounded-xl transition-colors whitespace-nowrap shrink-0"
                        >
                            <Calculator size={14} />
                            <span>Räkna pris i kalkylatorn ↓</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Pricing Tables & Content (PRICES DISPLAYED FIRST) */}
            <div
                id="pris-sektioner"
                className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16 space-y-16 sm:space-y-20 scroll-mt-36"
            >
                {/* 1. FLYTTSTÄDNING PRISLISTA */}
                {(activeCategory === "all" || activeCategory === "flytt") && (
                    <section id="flyttstadning" className="scroll-mt-36">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1e3a5f] dark:text-white">
                                    Flyttstädning med städgaranti
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Priser inklusive moms och efter 50%
                                    RUT-avdrag. 100% städgaranti ingår alltid.
                                </p>
                            </div>
                            <Link
                                href="/contact?service=flyttstadning"
                                className="inline-flex items-center gap-2 bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] px-5 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity whitespace-nowrap self-start sm:self-auto"
                            >
                                Boka flyttstädning
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Flyttstädning Table & Responsive Mobile Cards */}
                        <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-sm">
                            {/* Desktop / Tablet Table (sm:block) */}
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                            <th className="py-4 px-6">
                                                Bostadsyta
                                            </th>
                                            <th className="py-4 px-6">
                                                Ordinarie pris (inkl. moms)
                                            </th>
                                            <th className="py-4 px-6 text-[#1e3a5f] dark:text-[#f59e0b]">
                                                Efter RUT* (50% avdrag)
                                            </th>
                                            <th className="py-4 px-6 text-right">
                                                Boka
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                                        {flyttstadningPrices.map(
                                            (tier, idx) => (
                                                <tr
                                                    key={tier.area}
                                                    className={`hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors ${idx % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-slate-50/30 dark:bg-white/[0.01]"}`}
                                                >
                                                    <td className="py-3.5 px-6 font-semibold text-[#1e3a5f] dark:text-white flex items-center gap-2">
                                                        <span>{tier.area}</span>
                                                        {/* {tier.popular && (
                                                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-[#f59e0b]">
                                                                Vanlig
                                                            </span>
                                                        )} */}
                                                    </td>
                                                    <td className="py-3.5 px-6 text-slate-500 dark:text-slate-400 tabular-nums">
                                                        {tier.regular}
                                                    </td>
                                                    <td className="py-3.5 px-6 font-bold text-base text-[#1e3a5f] dark:text-[#f59e0b] tabular-nums">
                                                        {tier.rut}
                                                    </td>
                                                    <td className="py-3.5 px-6 text-right">
                                                        <Link
                                                            href={`/contact?service=flyttstadning&tier=${encodeURIComponent(tier.area)}`}
                                                            className="inline-flex items-center text-xs font-bold text-[#1e3a5f] dark:text-[#f59e0b] hover:underline"
                                                        >
                                                            Välj →
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile View (sm:hidden): Clean responsive cards */}
                            <div className="sm:hidden divide-y divide-slate-100 dark:divide-white/5">
                                {flyttstadningPrices.map((tier) => (
                                    <div
                                        key={tier.area}
                                        className="p-4 flex items-center justify-between gap-3"
                                    >
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="font-bold text-sm text-[#1e3a5f] dark:text-white">
                                                    {tier.area}
                                                </span>
                                                {tier.popular && (
                                                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-[#f59e0b]">
                                                        Vanlig
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[11px] text-slate-400 mt-0.5">
                                                Ord. {tier.regular}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2.5 shrink-0">
                                            <div className="text-right">
                                                <div className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">
                                                    Efter RUT
                                                </div>
                                                <div className="text-sm font-black text-[#1e3a5f] dark:text-[#f59e0b] tabular-nums">
                                                    {tier.rut}
                                                </div>
                                            </div>
                                            <Link
                                                href={`/contact?service=flyttstadning&tier=${encodeURIComponent(tier.area)}`}
                                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] hover:opacity-90 transition-opacity"
                                            >
                                                Välj
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200/60 dark:border-white/10 flex items-start gap-2.5">
                                <Info
                                    size={15}
                                    className="text-[#f59e0b] shrink-0 mt-0.5"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    *RUT-priset förutsätter att hela
                                    arbetskostnaden är berättigad till avdrag.
                                    För bostäder över 120 m² lämnar vi en snabb
                                    fastprisoffert med samma förmånliga
                                    kvadratmeterpris och 100% städgaranti.
                                </p>
                            </div>
                        </div>

                        {/* Tillägg för flyttstädning */}
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-[#1e3a5f] dark:text-white mb-4">
                                Tillägg för biytor vid flyttstädning
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
                                {flyttAddons.map((addon) => (
                                    <div
                                        key={addon.id}
                                        className="p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 text-center flex flex-col justify-between"
                                    >
                                        <span className="font-semibold text-xs text-[#1e3a5f] dark:text-white block mb-1">
                                            {addon.name}
                                        </span>
                                        <div>
                                            <span className="text-base font-bold text-[#1e3a5f] dark:text-[#f59e0b] tabular-nums block">
                                                {addon.rutPrice} kr
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {addon.fixed
                                                    ? "fast avgift"
                                                    : "efter RUT"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#1e3a5f] dark:text-slate-200 flex items-center gap-3 text-xs">
                                <ShieldCheck className="text-[#f59e0b] w-5 h-5 shrink-0" />
                                <span>
                                    <strong>Tydlig reseavgift:</strong> Vi tar
                                    149 kr i fast avgift för material och
                                    transport inom Gävle.
                                </span>
                            </div>
                        </div>
                    </section>
                )}

                {/* 2. HEMSTÄDNING PRISLISTA */}
                {(activeCategory === "all" || activeCategory === "hem") && (
                    <section id="hemstadning" className="scroll-mt-36">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1e3a5f] dark:text-white">
                                    Hemstädning
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Regelbunden städning med samma städare varje
                                    gång eller engångsinsats vid behov. Ingen
                                    bindningstid.
                                </p>
                            </div>
                            <Link
                                href="/contact?service=hemstadning"
                                className="inline-flex items-center gap-2 bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] px-5 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity whitespace-nowrap self-start sm:self-auto"
                            >
                                Boka hemstädning
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {hemstadningFrequencies.map((plan) => (
                                <div
                                    key={plan.frequency}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 flex flex-col justify-between hover:border-[#f59e0b]/40 transition-colors"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[11px] font-bold text-[#f59e0b] uppercase tracking-wider">
                                                {plan.badge}
                                            </span>
                                            <Sparkles
                                                size={14}
                                                className="text-[#f59e0b]"
                                            />
                                        </div>
                                        <h3 className="text-lg font-display font-bold text-[#1e3a5f] dark:text-white mb-2">
                                            {plan.frequency}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                            {plan.desc}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="pt-3 border-t border-slate-100 dark:border-white/5 mb-4">
                                            <div className="text-[11px] text-slate-400">
                                                Pris efter RUT
                                            </div>
                                            <div className="text-2xl font-black text-[#1e3a5f] dark:text-white tabular-nums">
                                                {plan.pricePerHour}
                                            </div>
                                        </div>
                                        <Link
                                            href={`/contact?service=hemstadning&frequency=${encodeURIComponent(plan.frequency)}`}
                                            className="w-full block text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/5 hover:bg-[#1e3a5f] hover:text-white dark:hover:bg-[#f59e0b] dark:hover:text-[#1e3a5f] transition-colors"
                                        >
                                            Välj {plan.frequency}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <Clock size={15} className="text-[#f59e0b]" />
                                <span>
                                    <strong>Framkörning inom Gävle:</strong> 79
                                    kr per besök.
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={15} className="text-[#f59e0b]" />
                                <span>
                                    <strong>Minsta bokning:</strong> 2 timmar
                                    per tillfälle.
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={15} className="text-[#f59e0b]" />
                                <span>
                                    <strong>Ingen bindningstid:</strong> Pausa
                                    eller avsluta när du vill.
                                </span>
                            </div>
                        </div>
                    </section>
                )}

                {/* 3. STORSTÄDNING PRISLISTA */}
                {(activeCategory === "all" || activeCategory === "stor") && (
                    <section id="storstadning" className="scroll-mt-36">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1e3a5f] dark:text-white">
                                    Storstädning
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    En grundlig djuprengöring av hela hemmet.
                                    Bakom vitvaror, avkalkning av badrum och
                                    svåråtkomliga ytor.
                                </p>
                            </div>
                            <Link
                                href="/contact?service=storstadning"
                                className="inline-flex items-center gap-2 bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] px-5 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity whitespace-nowrap self-start sm:self-auto"
                            >
                                Boka storstädning
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-sm">
                            {/* Desktop / Tablet Table (sm:block) */}
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                            <th className="py-4 px-6">
                                                Bostadsyta
                                            </th>
                                            <th className="py-4 px-6">
                                                Ordinarie pris (inkl. moms)
                                            </th>
                                            <th className="py-4 px-6 text-[#1e3a5f] dark:text-[#f59e0b]">
                                                Efter RUT* (50% avdrag)
                                            </th>
                                            <th className="py-4 px-6 text-right">
                                                Boka
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                                        {storstadningPrices.map((item, idx) => (
                                            <tr
                                                key={item.area}
                                                className={`hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors ${idx % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-slate-50/30 dark:bg-white/[0.01]"}`}
                                            >
                                                <td className="py-3.5 px-6 font-semibold text-[#1e3a5f] dark:text-white">
                                                    {item.area}
                                                </td>
                                                <td className="py-3.5 px-6 text-slate-500 dark:text-slate-400 tabular-nums">
                                                    {item.regularPrice}
                                                </td>
                                                <td className="py-3.5 px-6 font-bold text-base text-[#1e3a5f] dark:text-[#f59e0b] tabular-nums">
                                                    {item.rutPrice}
                                                </td>
                                                <td className="py-3.5 px-6 text-right">
                                                    <Link
                                                        href={`/contact?service=storstadning&tier=${encodeURIComponent(item.area)}`}
                                                        className="inline-flex items-center text-xs font-bold text-[#1e3a5f] dark:text-[#f59e0b] hover:underline"
                                                    >
                                                        Välj →
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile View (sm:hidden): Clean responsive cards */}
                            <div className="sm:hidden divide-y divide-slate-100 dark:divide-white/5">
                                {storstadningPrices.map((item) => (
                                    <div
                                        key={item.area}
                                        className="p-4 flex items-center justify-between gap-3"
                                    >
                                        <div className="min-w-0">
                                            <span className="font-bold text-sm text-[#1e3a5f] dark:text-white block">
                                                {item.area}
                                            </span>
                                            <div className="text-[11px] text-slate-400 mt-0.5">
                                                Ord. {item.regularPrice}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2.5 shrink-0">
                                            <div className="text-right">
                                                <div className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">
                                                    Efter RUT
                                                </div>
                                                <div className="text-sm font-black text-[#1e3a5f] dark:text-[#f59e0b] tabular-nums">
                                                    {item.rutPrice}
                                                </div>
                                            </div>
                                            <Link
                                                href={`/contact?service=storstadning&tier=${encodeURIComponent(item.area)}`}
                                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] hover:opacity-90 transition-opacity"
                                            >
                                                Välj
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200/60 dark:border-white/10 flex items-start gap-2.5">
                                <Info
                                    size={15}
                                    className="text-[#f59e0b] shrink-0 mt-0.5"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    *RUT-priset förutsätter att hela
                                    arbetskostnaden är berättigad till avdrag.
                                    För bostäder över 125 m² lämnar vi en
                                    anpassad offert.
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* 4. FÖNSTERPUTS PRISLISTA */}
                {(activeCategory === "all" || activeCategory === "fonster") && (
                    <section id="fonsterputs" className="scroll-mt-36">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1e3a5f] dark:text-white">
                                    Fönsterputs
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Professionell fönsterputsning upp till 12
                                    standardfönster. Kristallklara rutor utan
                                    ränder.
                                </p>
                            </div>
                            <Link
                                href="/contact?service=fonsterputs"
                                className="inline-flex items-center gap-2 bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] px-5 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity whitespace-nowrap self-start sm:self-auto"
                            >
                                Boka fönsterputs
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {fonsterputsPrices.map((pkg) => (
                                <div
                                    key={pkg.service}
                                    className={`p-6 rounded-2xl border bg-white dark:bg-slate-900/50 flex flex-col justify-between transition-all ${
                                        pkg.popular
                                            ? "border-[#f59e0b] shadow-sm ring-1 ring-[#f59e0b]"
                                            : "border-slate-200 dark:border-white/10"
                                    }`}
                                >
                                    <div>
                                        {pkg.popular && (
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f59e0b] mb-2 block">
                                                Mest efterfrågad
                                            </span>
                                        )}
                                        <h3 className="text-base font-display font-bold text-[#1e3a5f] dark:text-white mb-1.5">
                                            {pkg.service}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                            {pkg.desc}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="pt-3 border-t border-slate-100 dark:border-white/5 mb-4">
                                            <div className="text-[11px] text-slate-400">
                                                Pris efter RUT
                                            </div>
                                            <div className="text-2xl font-black text-[#1e3a5f] dark:text-white tabular-nums">
                                                {pkg.rutPrice}
                                            </div>
                                        </div>
                                        <Link
                                            href={`/contact?service=fonsterputs&package=${encodeURIComponent(pkg.service)}`}
                                            className={`w-full block text-center py-2.5 px-4 rounded-xl text-xs font-bold transition-colors ${
                                                pkg.popular
                                                    ? "bg-[#1e3a5f] text-white hover:bg-[#2a4d7d] dark:bg-[#f59e0b] dark:text-[#1e3a5f]"
                                                    : "bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-800 dark:text-white"
                                            }`}
                                        >
                                            Välj {pkg.service}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                            <span>
                                <strong>Framkörningsavgift:</strong> 99 kr per
                                besök inom Gävle.
                            </span>
                            <span className="text-slate-400">
                                Fler än 12 fönster? Kontakta oss för snabb
                                offert.
                            </span>
                        </div>
                    </section>
                )}

                {/* 5. KONTORSSTÄDNING PRISLISTA */}
                {(activeCategory === "all" || activeCategory === "kontor") && (
                    <section id="kontorsstadning" className="scroll-mt-36">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1e3a5f] dark:text-white">
                                    Kontorsstädning för företag
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Priser exklusive moms för företag och
                                    fastighetsägare i Gävle med omnejd.
                                </p>
                            </div>
                            <Link
                                href="/contact?service=kontorsstadning"
                                className="inline-flex items-center gap-2 bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] px-5 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity whitespace-nowrap self-start sm:self-auto"
                            >
                                Begär företagsoffert
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {kontorsstadningPrices.map((item) => (
                                <div
                                    key={item.service}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                                            {item.note}
                                        </span>
                                        <h3 className="text-lg font-display font-bold text-[#1e3a5f] dark:text-white mb-2">
                                            {item.service}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="pt-3 border-t border-slate-100 dark:border-white/5 mb-4">
                                            <div className="text-[11px] text-slate-400">
                                                Pris exkl. moms
                                            </div>
                                            <div className="text-2xl font-black text-[#1e3a5f] dark:text-white tabular-nums">
                                                {item.price}
                                            </div>
                                        </div>
                                        <Link
                                            href={`/contact?service=kontorsstadning&type=${encodeURIComponent(item.service)}`}
                                            className="w-full block text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1e3a5f] text-white hover:bg-[#2a4d7d] dark:bg-[#f59e0b] dark:text-[#1e3a5f] transition-colors"
                                        >
                                            Begär offert
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ========================================================================= */}
                {/* INTERACTIVE PRICE CALCULATOR (PLACED BELOW THE ACTUAL PRICING TABLES)      */}
                {/* ========================================================================= */}
                {/* ========================================================================= */}
                {/* PRISKALKYLATOR - REN NORDISK DESIGN INTEGRERAD MED SIDANS STRUKTUR        */}
                {/* ========================================================================= */}
                <section id="kalkylator" className="scroll-mt-36 pt-4">
                    {/* Section Header - Exactly matches other sections */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-slate-200/80 dark:border-white/10">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#f59e0b] block mb-1">
                                Prisberäkning
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1e3a5f] dark:text-white">
                                Räkna ut ditt pris
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Få en direkt prisuppgift baserad på dina mått
                                och önskade tillval. Alla priser visas inklusive
                                moms och efter 50% RUT-avdrag.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                            <Check className="text-[#f59e0b] w-4 h-4 shrink-0" />
                            <span>Fasta priser med 100% städgaranti</span>
                        </div>
                    </div>

                    {/* 2-Column Responsive Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* LEFT COLUMN: Controls (7 cols on desktop) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Step 1: Välj tjänst */}
                            <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-white/10 p-5 sm:p-6 shadow-sm">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                                    1. Välj typ av städtjänst
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {[
                                        { id: "flytt", label: "Flyttstädning" },
                                        { id: "hem", label: "Hemstädning" },
                                        { id: "stor", label: "Storstädning" },
                                        { id: "fonster", label: "Fönsterputs" },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() =>
                                                setCalcService(
                                                    tab.id as
                                                        | "flytt"
                                                        | "hem"
                                                        | "stor"
                                                        | "fonster",
                                                )
                                            }
                                            className={`py-3 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all border text-center ${
                                                calcService === tab.id
                                                    ? "border-[#1e3a5f] dark:border-[#f59e0b] bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] shadow-sm"
                                                    : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300"
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Parametrar för vald tjänst */}
                            <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-white/10 p-5 sm:p-6 shadow-sm space-y-6">
                                {/* FLYTTSTÄDNING CONTROLS */}
                                {calcService === "flytt" && (
                                    <>
                                        <div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                                <div>
                                                    <label
                                                        htmlFor={flyttInputId}
                                                        className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block"
                                                    >
                                                        2. Ange bostadsyta
                                                    </label>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        Fast pris upp till 120
                                                        m² (därefter offert).
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        id={flyttInputId}
                                                        type="number"
                                                        min="15"
                                                        max="200"
                                                        value={calcM2}
                                                        onChange={(e) =>
                                                            setCalcM2(
                                                                Math.max(
                                                                    1,
                                                                    Number(
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                                ),
                                                            )
                                                        }
                                                        className="w-20 px-3 py-1.5 text-right font-bold text-base bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/15 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30"
                                                    />
                                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                        m²
                                                    </span>
                                                </div>
                                            </div>

                                            <input
                                                type="range"
                                                min="20"
                                                max="140"
                                                step="1"
                                                value={calcM2}
                                                onChange={(e) =>
                                                    setCalcM2(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-full accent-[#1e3a5f] dark:accent-[#f59e0b] h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                                            />

                                            <div className="flex flex-wrap items-center gap-1.5 mt-3">
                                                <span className="text-xs text-slate-400 mr-1">
                                                    Vanliga storlekar:
                                                </span>
                                                {flyttPresets.map((preset) => (
                                                    <button
                                                        key={preset.label}
                                                        type="button"
                                                        onClick={() =>
                                                            setCalcM2(preset.m2)
                                                        }
                                                        className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                                                            calcM2 === preset.m2
                                                                ? "border-[#1e3a5f] dark:border-[#f59e0b] bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] font-semibold"
                                                                : "border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                                                        }`}
                                                    >
                                                        {preset.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-5 border-t border-slate-100 dark:border-white/5">
                                            <div className="flex items-center justify-between mb-3">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                    3. Välj eventuella biytor /
                                                    tillägg
                                                </label>
                                                <span className="text-[11px] text-slate-400">
                                                    Pris efter RUT
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                {flyttAddons.map((addon) => {
                                                    const isChecked =
                                                        selectedAddons.includes(
                                                            addon.id,
                                                        );
                                                    return (
                                                        <label
                                                            key={addon.id}
                                                            className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                                                                isChecked
                                                                    ? "border-[#1e3a5f] dark:border-[#f59e0b] bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium"
                                                                    : "border-slate-200 dark:border-white/10 bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 hover:border-slate-300"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2.5">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        isChecked
                                                                    }
                                                                    onChange={() =>
                                                                        toggleAddon(
                                                                            addon.id,
                                                                        )
                                                                    }
                                                                    className="w-4 h-4 rounded text-[#1e3a5f] dark:text-[#f59e0b] border-slate-300 dark:border-slate-600 focus:ring-0"
                                                                />
                                                                <span>
                                                                    {addon.name}
                                                                </span>
                                                            </div>
                                                            <span className="font-semibold text-slate-900 dark:text-white tabular-nums ml-2">
                                                                +
                                                                {addon.rutPrice}{" "}
                                                                kr
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* HEMSTÄDNING CONTROLS */}
                                {calcService === "hem" && (
                                    <>
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                                                2. Hur ofta vill du ha städat?
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                                {hemstadningFrequencies.map(
                                                    (f) => (
                                                        <button
                                                            key={f.frequency}
                                                            type="button"
                                                            onClick={() =>
                                                                setHemFreq(
                                                                    f.rateNum,
                                                                )
                                                            }
                                                            className={`p-3 rounded-xl border text-center text-xs transition-colors ${
                                                                hemFreq ===
                                                                f.rateNum
                                                                    ? "border-[#1e3a5f] dark:border-[#f59e0b] bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] font-bold shadow-sm"
                                                                    : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                                                            }`}
                                                        >
                                                            <div className="font-semibold">
                                                                {f.frequency}
                                                            </div>
                                                            <div
                                                                className={`text-[11px] mt-1 tabular-nums ${hemFreq === f.rateNum ? "text-amber-200 dark:text-[#1e3a5f] font-bold" : "text-slate-500 dark:text-slate-400"}`}
                                                            >
                                                                {f.pricePerHour}
                                                            </div>
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                                            <div className="flex justify-between items-center mb-2">
                                                <label
                                                    htmlFor={hemHoursId}
                                                    className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                                >
                                                    3. Antal timmar per
                                                    städtillfälle
                                                </label>
                                                <span className="text-base font-bold text-[#1e3a5f] dark:text-white tabular-nums">
                                                    {hemHours} timmar
                                                </span>
                                            </div>
                                            <input
                                                id={hemHoursId}
                                                type="range"
                                                min="2"
                                                max="8"
                                                step="0.5"
                                                value={hemHours}
                                                onChange={(e) =>
                                                    setHemHours(
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-full accent-[#1e3a5f] dark:accent-[#f59e0b] h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                                            />
                                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                                                Minsta bokning är 2 timmar per
                                                tillfälle. Fast framkörning inom
                                                Gävle (79 kr).
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* STORSTÄDNING CONTROLS */}
                                {calcService === "stor" && (
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label
                                                htmlFor={storInputId}
                                                className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                            >
                                                2. Bostadsyta för storstädning
                                            </label>
                                            <span className="text-base font-bold text-[#1e3a5f] dark:text-white tabular-nums">
                                                {calcM2} m²
                                            </span>
                                        </div>
                                        <input
                                            id={storInputId}
                                            type="range"
                                            min="25"
                                            max="140"
                                            step="5"
                                            value={calcM2}
                                            onChange={(e) =>
                                                setCalcM2(
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="w-full accent-[#1e3a5f] dark:accent-[#f59e0b] h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                                        />
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
                                            {storstadningPrices.map((tier) => (
                                                <button
                                                    key={tier.area}
                                                    type="button"
                                                    onClick={() =>
                                                        setCalcM2(
                                                            tier.minM2 === 0
                                                                ? 40
                                                                : tier.minM2 +
                                                                      10,
                                                        )
                                                    }
                                                    className={`p-2.5 rounded-xl border text-center text-xs transition-colors ${
                                                        calcM2 >= tier.minM2 &&
                                                        calcM2 <= tier.maxM2
                                                            ? "border-[#1e3a5f] dark:border-[#f59e0b] bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] font-bold"
                                                            : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                                                    }`}
                                                >
                                                    <div className="font-semibold">
                                                        {tier.area}
                                                    </div>
                                                    <div className="text-[11px] opacity-80 mt-0.5">
                                                        {tier.rutPrice}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* FÖNSTERPUTS CONTROLS */}
                                {calcService === "fonster" && (
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                                            2. Välj fönsterputspaket (upp till
                                            12 fönster)
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {fonsterputsPrices.map((pkg) => (
                                                <button
                                                    key={pkg.service}
                                                    type="button"
                                                    onClick={() =>
                                                        setFonsterChoice(
                                                            pkg.priceNum,
                                                        )
                                                    }
                                                    className={`p-4 rounded-xl border text-left text-xs transition-colors ${
                                                        fonsterChoice ===
                                                        pkg.priceNum
                                                            ? "border-[#1e3a5f] dark:border-[#f59e0b] bg-[#1e3a5f] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] font-bold shadow-sm"
                                                            : "border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                                                    }`}
                                                >
                                                    <div className="font-semibold mb-1">
                                                        {pkg.service}
                                                    </div>
                                                    <div
                                                        className={`text-sm font-bold tabular-nums ${fonsterChoice === pkg.priceNum ? "text-amber-300 dark:text-[#1e3a5f]" : "text-slate-900 dark:text-white"}`}
                                                    >
                                                        {pkg.rutPrice} efter RUT
                                                    </div>
                                                    <div
                                                        className={`text-[11px] mt-1 ${fonsterChoice === pkg.priceNum ? "text-slate-200 dark:text-slate-800" : "text-slate-500 dark:text-slate-400"}`}
                                                    >
                                                        Ord. {pkg.regularPrice}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
                                            Framkörningsavgift inom Gävle (99
                                            kr) är medräknad i totalsumman.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Live Order Breakdown (5 cols on desktop, sticky) */}
                        <div className="lg:col-span-5 lg:sticky lg:top-36">
                            <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-white/10 p-6 sm:p-7 shadow-sm">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                                    <h3 className="text-base font-bold text-[#1e3a5f] dark:text-white">
                                        Prisöversikt
                                    </h3>
                                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                                        50% RUT medräknat
                                    </span>
                                </div>

                                {/* Line items */}
                                <div className="py-4 space-y-3 text-xs border-b border-slate-100 dark:border-white/5">
                                    {calcService === "flytt" && (
                                        <>
                                            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                                                <span>
                                                    Flyttstädning ({calcM2} m²,{" "}
                                                    {flyttCurrentTier.tierName})
                                                </span>
                                                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                                                    {flyttCurrentTier.rut !==
                                                    null
                                                        ? `${flyttCurrentTier.rut.toLocaleString("sv-SE")} kr`
                                                        : "Offert"}
                                                </span>
                                            </div>
                                            {selectedAddons.length > 0 && (
                                                <div className="space-y-1.5 pt-1">
                                                    {selectedAddons.map(
                                                        (id) => {
                                                            const addon =
                                                                flyttAddons.find(
                                                                    (a) =>
                                                                        a.id ===
                                                                        id,
                                                                );
                                                            if (!addon)
                                                                return null;
                                                            return (
                                                                <div
                                                                    key={id}
                                                                    className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[11px]"
                                                                >
                                                                    <span className="truncate pr-2">
                                                                        +{" "}
                                                                        {
                                                                            addon.name
                                                                        }
                                                                    </span>
                                                                    <span className="tabular-nums shrink-0">
                                                                        {
                                                                            addon.rutPrice
                                                                        }{" "}
                                                                        kr
                                                                    </span>
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {calcService === "hem" && (
                                        <>
                                            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                                                <span>
                                                    {hemHours} timmar à{" "}
                                                    {hemFreq} kr/tim
                                                </span>
                                                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                                                    {(
                                                        hemHours * hemFreq
                                                    ).toLocaleString(
                                                        "sv-SE",
                                                    )}{" "}
                                                    kr
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[11px]">
                                                <span>Framkörning Gävle</span>
                                                <span className="tabular-nums">
                                                    79 kr
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {calcService === "stor" && (
                                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                                            <span>
                                                Storstädning {calcM2} m²
                                            </span>
                                            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                                                {storTotal !== null
                                                    ? `${storTotal.toLocaleString("sv-SE")} kr`
                                                    : "Offert"}
                                            </span>
                                        </div>
                                    )}

                                    {calcService === "fonster" && (
                                        <>
                                            <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                                                <span>
                                                    Fönsterputspaket (upp till
                                                    12 fönster)
                                                </span>
                                                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                                                    {fonsterChoice} kr
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[11px]">
                                                <span>Framkörning</span>
                                                <span className="tabular-nums">
                                                    99 kr
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Total amount */}
                                <div className="py-4">
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                        Ditt pris att betala (inkl. moms efter
                                        RUT)
                                    </div>

                                    {calcService === "flytt" &&
                                        (flyttTotal !== null ? (
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-3xl sm:text-4xl font-display font-black text-[#1e3a5f] dark:text-[#f59e0b] tabular-nums">
                                                        {flyttTotal.toLocaleString(
                                                            "sv-SE",
                                                        )}{" "}
                                                        kr
                                                    </span>
                                                    {flyttRegularTotal !==
                                                        null && (
                                                        <span className="text-xs text-slate-400 line-through tabular-nums">
                                                            Ord.{" "}
                                                            {flyttRegularTotal.toLocaleString(
                                                                "sv-SE",
                                                            )}{" "}
                                                            kr
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                                    50% RUT-avdrag dras direkt
                                                    på fakturan. Städgaranti
                                                    ingår alltid.
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="text-2xl font-display font-bold text-[#1e3a5f] dark:text-[#f59e0b]">
                                                    Offert på begäran
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                                    För ytor över 120 m² ger vi
                                                    dig en anpassad offert med
                                                    fast pris.
                                                </p>
                                            </div>
                                        ))}

                                    {calcService === "hem" && (
                                        <div>
                                            <div className="text-3xl sm:text-4xl font-display font-black text-[#1e3a5f] dark:text-[#f59e0b] tabular-nums">
                                                {Math.round(
                                                    hemTotal,
                                                ).toLocaleString("sv-SE")}{" "}
                                                kr
                                            </div>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                                Per städtillfälle efter
                                                RUT-avdrag inklusive
                                                framkörning.
                                            </p>
                                        </div>
                                    )}

                                    {calcService === "stor" &&
                                        (storTotal !== null ? (
                                            <div>
                                                <div className="text-3xl sm:text-4xl font-display font-black text-[#1e3a5f] dark:text-[#f59e0b] tabular-nums">
                                                    {storTotal.toLocaleString(
                                                        "sv-SE",
                                                    )}{" "}
                                                    kr
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                                    Komplett djupgående
                                                    storstädning efter 50% RUT.
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="text-2xl font-display font-bold text-[#1e3a5f] dark:text-[#f59e0b]">
                                                    Offert på begäran
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                                    Bostadsytor över 125 m²
                                                    offereras individuellt.
                                                </p>
                                            </div>
                                        ))}

                                    {calcService === "fonster" && (
                                        <div>
                                            <div className="text-3xl sm:text-4xl font-display font-black text-[#1e3a5f] dark:text-[#f59e0b] tabular-nums">
                                                {fonsterTotal.toLocaleString(
                                                    "sv-SE",
                                                )}{" "}
                                                kr
                                            </div>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                                Inklusive putsning av upp till
                                                12 fönster och framkörning.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Trust Points */}
                                <div className="py-3 border-t border-slate-100 dark:border-white/5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <Check
                                            size={14}
                                            className="text-[#f59e0b] shrink-0"
                                        />
                                        <span>100% Städgaranti ingår</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check
                                            size={14}
                                            className="text-[#f59e0b] shrink-0"
                                        />
                                        <span>
                                            Ansvarsförsäkring via Trygg-Hansa
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check
                                            size={14}
                                            className="text-[#f59e0b] shrink-0"
                                        />
                                        <span>
                                            Färdigt RUT-avdrag direkt på
                                            fakturan
                                        </span>
                                    </div>
                                </div>

                                {/* Booking Links */}
                                <div className="pt-4 space-y-2">
                                    <Link
                                        href={`/contact?service=${
                                            calcService === "flytt"
                                                ? `flyttstadning&sqm=${calcM2}`
                                                : calcService === "hem"
                                                  ? `hemstadning&hours=${hemHours}`
                                                  : calcService === "stor"
                                                    ? `storstadning&sqm=${calcM2}`
                                                    : "fonsterputs"
                                        }`}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#2a4d7d] text-white dark:bg-[#f59e0b] dark:text-[#1e3a5f] dark:hover:bg-amber-400 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-sm text-center"
                                    >
                                        <span>Gå vidare till bokning</span>
                                        <ArrowRight size={14} />
                                    </Link>
                                    <a
                                        href="tel:0760368628"
                                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <Phone
                                            size={14}
                                            className="text-[#f59e0b]"
                                        />
                                        <span>Frågor? Ring 076-036 86 28</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
