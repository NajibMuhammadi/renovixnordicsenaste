"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle2,
    Star,
    Phone,
    Mail,
    ArrowUpRight,
    Shield,
    Sparkles,
    Check,
    Info,
    Percent,
    ChevronRight,
    Sparkle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services, portfolioItems } from "@/lib/data";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

// Structured checklists for each service to display in a high-end, premium magazine layout
const checklists: Record<string, { category: string; items: string[] }[]> = {
    flyttstadning: [
        {
            category: "Kök & Matplats",
            items: [
                "Avfettning av spisfläkt, ugn, spishäll och tillhörande galler/plåtar",
                "Rengöring bakom och under spis samt kyl/frys",
                "Kyl och frys rengörs in- och utvändigt (måste vara avfrostad)",
                "Diskmaskin rengörs in- och utvändigt",
                "Samtliga skåp och lådor töms och torkas ur, både in- och utvändigt",
                "Ovansidor och undersidor av skåp torkas av",
                "Diskho, blandare och arbetsbänkar rengörs noggrant",
                "Element torkas av, även bakom",
                "Golvlister och socklar torkas av innan golvet dammsugs och våttorkas",
            ],
        },
        {
            category: "Bostadsrum & Sovrum",
            items: [
                "Väggar, tak och hörn dammtorkas i samtliga rum",
                "Garderober och skåp töms och rengörs in- och utvändigt",
                "Ovansidor av garderober och högre skåp dammtorkas",
                "Element torkas av, även bakom",
                "Dörrar, dörrkarmar och handtag torkas av",
                "Golvlister torkas av innan golv dammsugs och våttorkas",
                "Speglar och glasytor putsas",
            ],
        },
        {
            category: "Badrum & Toalett",
            items: [
                "Kakel och fogar avkalkas och rengörs i hela badrummet",
                "Toalett, handfat och blandare rengörs noggrant",
                "Dusch/badkar och tillhörande glasväggar rengörs och avkalkas",
                "Badrumsskåp rengörs in- och utvändigt",
                "Golvbrunn och synliga rör rengörs",
                "Ventilationsdon torkas av utvändigt",
                "Golv rengörs sist, efter övriga ytor",
            ],
        },
        {
            category: "Tvättstuga & Groventré",
            items: [
                "Tvättmaskin och tvättmedelsfack rengörs",
                "Torktumlare och filter rengörs",
                "Tvättho och förvaringsutrymmen rengörs",
                "Golvbrunn och ventilationsdon rengörs",
                "Dörr, karm och handtag torkas av innan golvet rengörs",
            ],
        },
    ],
    hemstadning: [
        {
            category: "Sovrum, Vardagsrum & Arbetsrum",
            items: [
                "Dammtorkning av fria ytor, bord och hyllor",
                "Dammsugning av mattor, golv och golvlister",
                "Avtorkning av dörrar, handtag, strömbrytare och lister",
                "Putsning av speglar",
                "Tömning av papperskorgar",
                "Våttorkning av golv",
            ],
        },
        {
            category: "Kök & Matplats",
            items: [
                "Samma grundstädning som i övriga rum, plus:",
                "Rengöring av kakel/stänkskydd ovanför diskbänk",
                "Utvändig avtorkning av spis, mikro och övriga hushållsmaskiner",
                "Utvändig avtorkning av kyl och frys",
                "Rengöring av diskho, diskbänk och blandare",
                "Avtorkning av matbord och stolar",
            ],
        },
        {
            category: "Badrum & Toalett",
            items: [
                "Samma grundstädning som i övriga rum, plus:",
                "Rengöring av dusch och badkar",
                "Rengöring av handfat och toalett, in- och utvändigt",
                "Avtorkning av handdukstork och hängare",
                "Fläckborttagning på badrumsmöbler",
            ],
        },
        {
            category: "Tvättstuga & Groventré",
            items: ["Dammtorkning, dammsugning and våttorkning av fria ytor"],
        },
    ],
    storstadning: [
        {
            category: "Bostadsrum",
            items: [
                "Dammtorkning av samtliga vågräta ytor, inklusive ovanpå skåp",
                "Dammsugning av textilmöbler, mattor, golv och golvlister",
                "Avtorkning av element, ventiler, kontakter, foder, karmar och dörrar",
                "Putsning av speglar",
                "Tömning av papperskorgar",
                "Dammtorkning av avtavlor och lampor",
                "Fläckborttagning och våttorkning av golv",
            ],
        },
        {
            category: "Kök & Matplats",
            items: [
                "Samma djupstädning som i bostadsrum, plus:",
                "Rengöring av kakel ovanför diskbänk",
                "Avfettning av spisfläkt/fläktkåpa, filter och skyddsglas",
                "Rengöring av mikro, ugn och spis in- och utvändigt",
                "Avtorkning av kyl, frys och diskmaskin utvändigt",
                "Rengöring av diskho, diskbänk och blandare",
                "Avtorkning av matbord och stolar",
            ],
        },
        {
            category: "Badrum & Toalett",
            items: [
                "Samma djupstädning som i bostadsrum, plus:",
                "Rengöring och avkalkning av dusch, badkar och duschväggar",
                "Rengöring av golvbrunnar och synliga rör",
                "Utvändig rengöring av badrumsmöbler",
                "Rengöring av handfat och toalett, in- och utvändigt",
            ],
        },
        {
            category: "Tvättstuga & Groventré",
            items: [
                "Dammtorkning, dammsugning och våttorkning av fria ytor",
                "Avtorkning av tvättmaskin och torktumlare, inklusive ovansida",
                "Rengöring av tvättmedelsfack och torktumlarfilter",
                "Rengöring av diskbänk, diskho och blandare",
            ],
        },
    ],
    fonsterputsning: [
        {
            category: "Professionell Fönsterputs",
            items: [
                "Putsning av fönsterrutor på alla tillgängliga sidor (2- eller 4-sidiga fönster)",
                "Borttagning av hårt sittande smuts, stänk, pollen och lättare klisterrester",
                "Noggrann avtorkning av fönsterbågar, karmar, lister och fönsterbleck",
                "Rengöring av löstagbara spröjs (om de är nedmonterade innan start)",
                "Putsning av glas i altandörrar, glashängda dörrar och uterum (tillval)",
                "100% ränderfritt resultat med professionella redskap och teknik",
            ],
        },
    ],
};

const defaultChecklist = [
    {
        category: "Förberedelse & Planering",
        items: [
            "Genomgång av dina specifika önskemål innan städningen påbörjas",
            "Rätt utrustning och miljövänliga rengöringsmedel tas med",
            "Tidsplanering som stör din vardag så lite som möjligt",
        ],
    },
    {
        category: "Utförande",
        items: [
            "Utbildad och pålitlig städpersonal utför arbetet enligt checklista",
            "Extra fokus på detaljer och ytor som ofta glöms bort",
            "Löpande kvalitetskontroll under hela uppdraget",
        ],
    },
    {
        category: "Trygghet & Garanti",
        items: [
            "Möjlighet till slutgenomgång tillsammans med dig",
            "100% Nöjdhetsgaranti – eventuella anmärkningar åtgärdas kostnadsfritt",
            "RUT-avdrag hanteras direkt på din faktura – du betalar endast 50% av arbetskostnaden",
        ],
    },
];

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const service = services.find((s) => s.id === id);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] dark:bg-[#0a111a] transition-colors duration-300">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold text-[#1e3a5f] dark:text-white mb-6">
                        Tjänsten hittades inte
                    </h1>
                    <button
                        onClick={() => router.push("/")}
                        className="text-[#f59e0b] font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all outline-none cursor-pointer"
                    >
                        <ArrowLeft size={18} /> Tillbaka till start
                    </button>
                </div>
            </div>
        );
    }

    // Find a matching portfolio item for real before-after comparison
    const matchingPortfolio = portfolioItems.find(
        (item) =>
            item.id.includes(service.id) || item.category === service.category,
    );

    // Split title into main and subtitle for high-end editorial contrast
    const titleParts = service.title.split(" – ");
    const mainTitle = titleParts[0];
    const accentTitle = titleParts[1];

    const currentChecklist = checklists[service.id] || defaultChecklist;

    return (
        <main className="min-h-screen bg-[#FDFDFD] dark:bg-[#0a111a] selection:bg-[#f59e0b] selection:text-white transition-colors duration-300">
            {/* SECTION 1: Elegant Editorial Hero */}
            <section className="relative pt-40 pb-20 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300 overflow-hidden border-b border-slate-100 dark:border-white/5">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f59e0b] rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Breadcrumb Navigation - Extremely clean and classic */}
                    <div className="flex items-center gap-2.5 text-xs text-slate-400 dark:text-slate-500 mb-8 select-none">
                        <Link
                            href="/"
                            className="hover:text-[#f59e0b] transition-colors font-medium"
                        >
                            Hem
                        </Link>
                        <span>/</span>
                        <Link
                            href="/#tjanster"
                            className="hover:text-[#f59e0b] transition-colors"
                        >
                            Tjänster
                        </Link>
                        <span>/</span>
                        <span className="text-slate-600 dark:text-slate-300 font-semibold">
                            {mainTitle}
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-12">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-[#f59e0b] font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
                                    {service.category.toUpperCase()}
                                </span>
                                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic font-light text-[#1e3a5f] dark:text-white mb-8 leading-[1.1] tracking-tighter">
                                    {mainTitle}{" "}
                                    {accentTitle && (
                                        <span className="text-[#f59e0b]">
                                            {accentTitle}
                                        </span>
                                    )}
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
                                {service.fullDescription}
                            </p>
                        </motion.div>
                    </div>

                    {/* Redesigned Statistics Section / Highlights Row in Cleaner Minimal Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-16 pt-10 border-t border-slate-200/60 dark:border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
                    >
                        <div className="text-left">
                            <div className="text-3xl sm:text-4xl font-display font-black text-[#1e3a5f] dark:text-white tracking-tight">
                                100%
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
                                Försäkrad hos Trygg-Hansa
                            </div>
                        </div>

                        <div className="text-left">
                            <div className="text-3xl sm:text-4xl font-display font-black text-[#1e3a5f] dark:text-white tracking-tight">
                                50%
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
                                RUT-avdrag direkt på fakturan
                            </div>
                        </div>

                        <div className="text-left">
                            <div className="text-3xl sm:text-4xl font-display font-black text-[#1e3a5f] dark:text-white tracking-tight">
                                100%
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
                                Nöjd-kund-garanti (48h)
                            </div>
                        </div>

                        <div className="text-left">
                            <div className="text-3xl sm:text-4xl font-display font-black text-[#1e3a5f] dark:text-white tracking-tight">
                                0 kr
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">
                                Bindningstid eller dolda avgifter
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: Magazine Layout Content Grid */}
            <section className="py-14 sm:py-20 bg-[#FDFDFD] dark:bg-[#0a111a] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 xl:gap-24 items-start">
                        {/* LEFT COLUMN: Checklists, Benefits & Process (8 cols) */}
                        <div className="lg:col-span-8 space-y-28">
                            {/* BLOCK A: Interactive / Complete Service Menu (No heavy boxy borders) */}
                            <div className="space-y-12">
                                <div>
                                    <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-[11px] mb-3 block">
                                        Fullständig specifikation
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1e3a5f] dark:text-white tracking-tight">
                                        Detta ingår alltid i tjänsten
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 mt-4 font-light text-base leading-relaxed max-w-2xl">
                                        Vi arbetar med kompromisslös noggrannhet
                                        enligt en beprövad och certifierad
                                        checklista. Här ser du precis vad vi
                                        åtar oss att göra skinande rent.
                                    </p>
                                </div>

                                {/* Minimalist List Layout - Elegant lines, spacious padding */}
                                <div className="space-y-14">
                                    {currentChecklist.map(
                                        (group, groupIndex) => (
                                            <div
                                                key={groupIndex}
                                                className="space-y-6"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center">
                                                        <Sparkle
                                                            size={13}
                                                            className="fill-[#f59e0b]"
                                                        />
                                                    </div>
                                                    <h3 className="text-xl font-display font-bold text-[#1e3a5f] dark:text-white">
                                                        {group.category}
                                                    </h3>
                                                </div>

                                                {/* Thin grid of list items */}
                                                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 pt-4 border-t border-slate-100 dark:border-white/5">
                                                    {group.items.map(
                                                        (item, itemIndex) => (
                                                            <div
                                                                key={itemIndex}
                                                                className="flex items-start gap-3.5 py-2.5 border-b border-slate-50 dark:border-white/[0.02]"
                                                            >
                                                                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                                                    <Check
                                                                        size={
                                                                            11
                                                                        }
                                                                        className="stroke-[3]"
                                                                    />
                                                                </div>
                                                                <span className="text-sm font-light text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                    {item}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* BLOCK B: Why Choose Us (Minimal, luxurious feature grids) */}
                            <div className="space-y-12 pt-8 border-t border-slate-100 dark:border-white/5">
                                <div>
                                    <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-[11px] mb-3 block">
                                        Kvalitetsgaranti
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1e3a5f] dark:text-white tracking-tight">
                                        {service.whyChooseTitle ||
                                            `Varför välja oss för din städning?`}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 mt-4 font-light text-base leading-relaxed max-w-2xl">
                                        {service.whyChooseDescription ||
                                            "Vi kombinerar personlig service med kompromisslös noggrannhet. Med erfarna medarbetare, fasta priser och marknadens bästa garantier skapar vi en trygg och smidig upplevelse för dig i hela Gävleborg."}
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                                    {(
                                        service.benefits || [
                                            "Lokal städfirma med stark förankring i Gävle",
                                            "100% Nöjd-Kund-Garanti på samtliga uppdrag",
                                            "Miljösmarta rengöringsprodukter för ett sundare hem",
                                            "Fullt försäkrad personal med ansvarsförsäkring",
                                            "Utbildade experter med öga för minsta detalj",
                                            "Smarta RUT-avdrag direkt på din slutfaktura",
                                        ]
                                    ).map((benefitText: string, i: number) => {
                                        const benefitTitle =
                                            benefitText.includes(" - ")
                                                ? benefitText.split(" - ")[0]
                                                : benefitText.split(" (")[0];
                                        const benefitDesc =
                                            benefitText.includes(" - ")
                                                ? benefitText.split(" - ")[1]
                                                : benefitText.includes(" (")
                                                  ? benefitText
                                                        .split(" (")[1]
                                                        .replace(")", "")
                                                  : "";

                                        return (
                                            <div
                                                key={i}
                                                className="group space-y-3"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 flex items-center justify-center text-[#f59e0b] group-hover:bg-[#1e3a5f] group-hover:text-white dark:group-hover:bg-[#f59e0b] dark:group-hover:text-[#1e3a5f] transition-all duration-300">
                                                        <Check
                                                            size={12}
                                                            className="stroke-[3]"
                                                        />
                                                    </div>
                                                    <h4 className="font-bold text-base text-[#1e3a5f] dark:text-white">
                                                        {benefitTitle}
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed pl-9">
                                                    {benefitDesc ||
                                                        "Vi garanterar ett professionellt utfört arbete, personligt bemötande och högsta kvalitet i varje skede."}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* BLOCK C: Process (Minimal Swiss-style step-by-step) */}
                            <div className="space-y-12 pt-8 border-t border-slate-100 dark:border-white/5">
                                <div>
                                    <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-[11px] mb-3 block">
                                        Arbetsprocess
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1e3a5f] dark:text-white tracking-tight">
                                        {service.processTitle ||
                                            "Så enkelt fungerar det"}
                                    </h2>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {(
                                        service.steps || [
                                            {
                                                step: "01",
                                                title: "Snabb Offert",
                                                desc: "Få ett fast, transparent prisförslag direkt baserat på dina önskemål.",
                                            },
                                            {
                                                step: "02",
                                                title: "Noggrant Utförande",
                                                desc: "Vår legitimerade städpersonal utför städningen enligt den strikta checklistan.",
                                            },
                                            {
                                                step: "03",
                                                title: "Nöjdhetsgaranti",
                                                desc: "Vi genomför en gemensam slutbesiktning för att säkra att allt är perfekt.",
                                            },
                                        ]
                                    ).map((item: any, i: number) => (
                                        <div key={i} className="space-y-4">
                                            <div className="text-5xl font-serif italic font-light text-[#f59e0b]/30 leading-none">
                                                {item.step}
                                            </div>
                                            <h4 className="font-bold text-base text-[#1e3a5f] dark:text-white">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT Sticky Sidebar COLUMN (4 cols) */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-10">
                            {/* Premium Light/Minimal Concierge Card */}
                            <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-white/5 p-8 sm:p-10 rounded-[2.5rem] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#f59e0b]/5 rounded-full blur-2xl pointer-events-none" />

                                <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
                                    Direktbokning
                                </span>
                                <h3 className="text-2xl font-serif italic font-light mb-4 text-[#1e3a5f] dark:text-white leading-tight">
                                    {service.sidebarTitle ||
                                        "Få personlig rådgivning"}
                                </h3>

                                <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed mb-8">
                                    {service.sidebarText ||
                                        "Våra rådgivare finns här för att svara på frågor och skräddarsy en städning helt efter din vardag."}
                                </p>

                                {/* Direct buttons */}
                                <div className="space-y-3 mb-8">
                                    <a
                                        href="tel:0760368628"
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-100 dark:border-white/5 transition-all duration-300"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b] shrink-0">
                                            <Phone size={16} />
                                        </div>
                                        <div>
                                            <div className="text-[9px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
                                                Ring oss nu
                                            </div>
                                            <div className="font-bold text-xs sm:text-sm text-[#1e3a5f] dark:text-white">
                                                076-036 86 28
                                            </div>
                                        </div>
                                    </a>

                                    <a
                                        href="mailto:info@renovixnordic.se"
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-100 dark:border-white/5 transition-all duration-300"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b] shrink-0">
                                            <Mail size={16} />
                                        </div>
                                        <div>
                                            <div className="text-[9px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
                                                Maila oss
                                            </div>
                                            <div className="font-bold text-xs text-[#1e3a5f] dark:text-white truncate max-w-[160px]">
                                                info@renovixnordic.se
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <Link
                                    href="/contact"
                                    className="w-full bg-[#1e3a5f] hover:bg-[#12243d] dark:bg-[#f59e0b] dark:text-[#1e3a5f] dark:hover:bg-[#d97706] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-md cursor-pointer outline-none block text-center animate-none"
                                >
                                    Begär gratis offert
                                </Link>
                            </div>

                            {/* Exact matching beautiful Review card */}
                            {service.reviewText && (
                                <div className="bg-white dark:bg-slate-900/40 p-8 sm:p-10 rounded-[2.5rem] shadow-[0_12px_40px_rgba(30,58,95,0.02)] border border-slate-100 dark:border-white/5 flex flex-col">
                                    <div className="flex gap-1 text-[#f59e0b] mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={15}
                                                fill="currentColor"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-300 italic mb-8 leading-relaxed text-sm sm:text-base font-light">
                                        &quot;{service.reviewText}&quot;
                                    </p>

                                    <div className="flex items-center gap-3.5 mt-auto">
                                        <div className="w-10 h-10 bg-[#1e3a5f]/5 dark:bg-[#f59e0b]/10 text-[#1e3a5f] dark:text-[#f59e0b] rounded-full flex items-center justify-center font-bold text-sm select-none border border-[#1e3a5f]/10 dark:border-[#f59e0b]/20 shrink-0">
                                            {service.reviewAuthor
                                                ? service.reviewAuthor.charAt(0)
                                                : "K"}
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#1e3a5f] dark:text-white text-sm">
                                                {service.reviewAuthor}
                                            </div>
                                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                                                Verifierad kund i Gävleborg
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* RUT-avdrag Educational Panel (Clean amber border) */}
                            <div className="p-8 rounded-[2.5rem] bg-[#f59e0b]/5 border border-[#f59e0b]/10 space-y-4">
                                <div className="flex items-center gap-3 text-[#f59e0b]">
                                    <Info size={18} />
                                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1e3a5f] dark:text-[#f59e0b]">
                                        Om RUT-avdraget
                                    </h4>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                                    Som privatperson betalar du endast{" "}
                                    <strong>50% av arbetskostnaden</strong>. Vi
                                    ansöker om avdraget hos Skatteverket och
                                    sköter all administration. Prissänkningen
                                    sker direkt på din faktura!
                                </p>
                                {service.footerText && (
                                    <div className="pt-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-t border-[#f59e0b]/10">
                                        {service.footerText}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: Related services (Re-engage Carousel) */}
            <section className="py-14 sm:py-20 bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-100/50 dark:border-white/5 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl mb-16">
                        <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-[11px] mb-3 block">
                            Fler tjänster
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1e3a5f] dark:text-white tracking-tight">
                            Våra andra professionella städtjänster
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services
                            .filter((s) => s.id !== id)
                            .slice(0, 3)
                            .map((otherService) => (
                                <div
                                    key={otherService.id}
                                    className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_24px_50px_rgba(30,58,95,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[300px]"
                                >
                                    <div>
                                        <div className="bg-slate-50 dark:bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center text-[#1e3a5f] dark:text-[#f59e0b] mb-6 group-hover:bg-[#1e3a5f] group-hover:text-white transition-all duration-300">
                                            <otherService.icon size={20} />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 block">
                                            {otherService.category}
                                        </span>
                                        <h4 className="text-xl font-display font-bold text-[#1e3a5f] dark:text-white mb-3">
                                            {otherService.title.split(" – ")[0]}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
                                            {otherService.description}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/services/${otherService.id}`}
                                        className="inline-flex items-center gap-2 text-xs font-bold text-[#1e3a5f] dark:text-[#f59e0b] group-hover:gap-3 transition-all cursor-pointer"
                                    >
                                        Läs mer om tjänsten{" "}
                                        <ChevronRight size={13} />
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
