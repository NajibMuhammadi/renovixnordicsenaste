"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Heart, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";

export default function AboutClient() {
    const values = [
        {
            icon: ShieldCheck,
            title: "Trygghet & Garanti",
            desc: "Vi tar fullt ansvar för vårt arbete. Med vår nöjdhetsgaranti och ansvarsförsäkring kan du känna dig trygg när du anlitar oss.",
        },
        {
            icon: Heart,
            title: "Personligt bemötande",
            desc: "Varje hem och kund är unik. Vi lyssnar på dina önskemål och anpassar våra tjänster efter dina behov.",
        },
        {
            icon: Target,
            title: "Precision i varje detalj",
            desc: "Vi lämnar inget åt slumpen. Våra städare arbetar efter tydliga checklistor för att säkerställa högsta möjliga kvalitet.",
        },
        {
            icon: MapPin,
            title: "Lokal expertis i Gävle",
            desc: "Som lokal aktör i Gävleborg har vi korta beslutsvägar och god förståelse för våra kunders behov i regionen.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0a111a] selection:bg-[#f59e0b] selection:text-white transition-colors duration-300">
            {/* Hero Section */}
            <section className="pt-40 pb-24 sm:pb-32 lg:pb-36 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#f59e0b] rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[#f59e0b] font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
                                Vår Historia
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-light text-[#1e3a5f] dark:text-white mb-8 leading-[1.1] tracking-tighter">
                                Passion för{" "}
                                <span className="text-[#f59e0b]">Renhet</span> &
                                Service i Gävleborg.
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-xl">
                                Renovix Nordic är en lokal städfirma i Gävle som
                                kombinerar noggrannhet med personlig service.
                            </p>
                            <p className="text-base text-slate-500 dark:text-slate-500 leading-relaxed mb-8 max-w-xl">
                                Vi hjälper privatpersoner och företag i hela
                                Gävleborg – från flyttstädning till regelbunden
                                hemstädning. Samma noggrannhet och personliga
                                engagemang i varje uppdrag, oavsett storlek.
                                Vårt mål är enkelt: du ska alltid kunna lita på
                                att jobbet blir gjort ordentligt.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-square sm:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Renovix Nordic städteam i Gävle"
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/60 to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                                    <p className="text-white text-sm italic font-medium">
                                        &quot;Vi behandlar ditt hem med samma omtanke som vårt eget.&quot;
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mt-16 pt-12 border-t border-slate-200/60 dark:border-white/10"
                    >
                        {[
                            { value: '100%', label: 'Nöjdhetsgaranti på alla uppdrag' },
                            { value: 'Lokal', label: 'Professionell städfirma i Gävle' },
                            { value: 'Hela', label: 'Tjänster för hem & företag i Gävleborg' },
                            { value: '0 kr', label: 'Bindningstid eller dolda avgifter' }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#1e3a5f] dark:text-white leading-none mb-3">
                                    {item.value}
                                </span>
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-snug">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="pt-20 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 lg:pb-10 bg-white dark:bg-[#0a111a] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-[#f59e0b] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            Våra Värderingar
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1e3a5f] dark:text-white">
                            Vad vi står för
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 hover:shadow-xl transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/10">
                                    <value.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Commitment Section */}
            <section className="pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-28 lg:pb-32 bg-white dark:bg-[#0a111a] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-[#1e3a5f] rounded-[3rem] overflow-hidden shadow-[0_15px_40px_rgba(30,58,95,0.12)] flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-12 sm:p-20 flex flex-col justify-center">
                            <span className="text-[#f59e0b] font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
                                Lokalt / Gävle
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-8">
                                Din lokala städfirma i Gävle & Gävleborg
                            </h2>
                            <p className="text-blue-100/70 leading-relaxed mb-10">
                                Vi är en lokal aktör i Gävle och vill bidra till
                                renare hem och arbetsplatser i regionen. Genom
                                att jobba lokalt kan vi erbjuda snabbare
                                service, flexibla tider och en personlig kontakt
                                du inte alltid får hos ett stort rikstäckande
                                bolag.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Vi arbetar i hela Gävleborg",
                                    "Snabb återkoppling och bokning",
                                    "Flexibla lösningar efter dina behov",
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 text-white/80"
                                    >
                                        <CheckCircle2
                                            size={18}
                                            className="text-[#f59e0b]"
                                        />
                                        <span className="text-sm font-medium">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative min-h-[400px]">
                            <Image
                                src="https://images.pexels.com/photos/4108712/pexels-photo-4108712.jpeg?auto=compress&cs=tinysrgb&w=1000"
                                alt="Gävle stad - Vi är din lokala städfirma i Gävleborg"
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
