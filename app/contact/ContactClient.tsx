"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    ChevronDown,
    Upload,
    Trash2,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    ShieldCheck,
    ArrowLeft,
    ArrowRight,
    Check,
    Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import Logo from "@/components/Logo";

export default function ContactPage() {
    const [step, setStep] = useState<number>(1);
    const [customerType, setCustomerType] = useState<"privat" | "foretag">(
        "privat",
    );
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formState, setFormState] = useState({
        companyName: "",
        name: "",
        phone: "",
        email: "",
        location: "",
        service: "",
        size: "",
        frequency: "once",
        message: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const svc = params.get("service");
            if (svc) {
                setFormState((prev) => ({ ...prev, service: svc }));
            }
        }
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const total = selectedImages.length + filesArray.length;

            if (total > 5) {
                alert("Max 5 bilder är tillåtna.");
                return;
            }

            const oversized = filesArray.some(
                (file) => file.size > 5 * 1024 * 1024,
            );
            if (oversized) {
                alert("Varje bild får max vara 5MB.");
                return;
            }

            setSelectedImages((prev) => [...prev, ...filesArray].slice(0, 5));
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleNextStep = () => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!formState.service)
                newErrors.service = "Vänligen välj en tjänst";
            if (!formState.size) newErrors.size = "Vänligen ange bostadsyta";
            else if (Number(formState.size) <= 0)
                newErrors.size = "Bostadsytan måste vara större än 0 kvm";
            if (!formState.location.trim())
                newErrors.location = "Vänligen ange ort eller stad";
        } else if (step === 2) {
            if (!formState.message.trim())
                newErrors.message =
                    "Vänligen fyll i kompletterande information eller önskemål";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const handlePrevStep = () => {
        setErrors({});
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (customerType === "foretag" && !formState.companyName.trim()) {
            newErrors.companyName = "Fyll i företagsnamn";
        }
        if (!formState.name.trim()) newErrors.name = "Fyll i kontaktperson";
        if (!formState.phone.trim()) newErrors.phone = "Fyll i telefonnummer";
        if (!formState.email.trim()) newErrors.email = "Fyll i e-postadress";
        else if (!/\S+@\S+\.\S+/.test(formState.email))
            newErrors.email = "Ange en giltig e-postadress";

        const consentEl = document.getElementById(
            "gdpr-consent",
        ) as HTMLInputElement;
        if (consentEl && !consentEl.checked) {
            newErrors.gdpr =
                "Du måste godkänna GDPR-villkoren för att skicka förfrågan";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setStatus("loading");
        setErrorMsg("");

        const customerTypeSwedish =
            customerType === "privat" ? "Privatperson" : "Företag";
        const companyNameVal = formState.companyName
            ? `\nFöretagsnamn: ${formState.companyName}`
            : "";
        const locationVal = formState.location || "Ej angivet";
        const sizeVal = formState.size ? `${formState.size} kvm` : "Ej angivet";

        let frequencyText = "Engångsstädning";
        if (formState.frequency === "weekly") frequencyText = "Varje vecka";
        else if (formState.frequency === "biweekly")
            frequencyText = "Varannan vecka";
        else if (formState.frequency === "monthly")
            frequencyText = "Var fjärde vecka";

        const richMessage = `
Kundtyp: ${customerTypeSwedish}${companyNameVal}
Stad/Område: ${locationVal}
Storlek: ${sizeVal}
Frekvens: ${frequencyText}

Meddelande:
${formState.message}
`.trim();

        const formData = new FormData();
        formData.append("name", formState.name);
        formData.append("email", formState.email);
        formData.append("phone", formState.phone);

        const matchedService = services.find((s) => s.id === formState.service);
        const serviceTitle = matchedService
            ? matchedService.title
            : formState.service;
        formData.append("service", serviceTitle);
        formData.append("message", richMessage);

        selectedImages.forEach((img) => formData.append("images", img));

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (!response.ok)
                throw new Error(
                    result.error || "Ett fel uppstod vid skickandet.",
                );

            setStatus("success");
            setSelectedImages([]);
            setFormState({
                companyName: "",
                name: "",
                phone: "",
                email: "",
                location: "",
                service: "",
                size: "",
                frequency: "once",
                message: "",
            });
            // OBS: setStep(1) borttagen härifrån.
            // Den gamla raden hoppade tillbaka till steg 1 direkt efter en
            // lyckad sändning, vilket gjorde att success-meddelandet (som bara
            // renderas när step === 3) aldrig hann visas för användaren.
        } catch (err: any) {
            console.error(err);
            setStatus("error");
            setErrorMsg(err.message);
        }
    };

    const handleReset = () => {
        setStatus("idle");
        setErrorMsg("");
        setErrors({});
        setCustomerType("privat");
        setStep(1);
    };

    const selectedServiceTitle =
        services.find((s) => s.id === formState.service)?.title || "Ej vald";

    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0a111a] selection:bg-[#f59e0b] selection:text-white transition-colors duration-300">
            {/* Hero Section - Minimalist Editorial */}
            <section className="pt-40 pb-20 bg-slate-50/50 dark:bg-slate-900/10 transition-colors duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f59e0b] rounded-full blur-[140px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-4">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-[#f59e0b] font-bold uppercase tracking-[0.4em] text-xs mb-5 block">
                                    Offertförfrågan
                                </span>
                                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic font-light text-[#1e3a5f] dark:text-white mb-6 leading-[1.1] tracking-tighter">
                                    Få en{" "}
                                    <span className="text-[#f59e0b]">
                                        offert
                                    </span>{" "}
                                    för städning i Gävleborg
                                </h1>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:max-w-sm pb-2"
                        >
                            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-4">
                                Vi erbjuder skräddarsydda prisförslag för
                                flyttstädning, hemstädning och företagsstädning
                                med fokus på kvalitet och trygghet i hela
                                regionen.
                            </p>
                            <div className="flex items-center gap-2 text-[#f59e0b] font-bold text-sm">
                                <Logo size={24} showText={false} />
                                <span>Kostnadsfritt & icke-bindande</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Restructured Form Section */}
            <section className="py-14 sm:py-20 bg-white dark:bg-[#0a111a] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Left Side - Pure Typographic Editorial Info & Receipt Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-5 space-y-10"
                        >
                            <div>
                                <h2 className="text-3xl font-serif italic text-[#1e3a5f] dark:text-white mb-6">
                                    Det enkla valet för ett{" "}
                                    <span className="text-[#f59e0b]">
                                        skinande
                                    </span>{" "}
                                    resultat
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base">
                                    Fyll i vår interaktiva offertguide i tre
                                    enkla steg så återkommer vi med ett
                                    personligt prisförslag – oftast inom en
                                    timme.
                                </p>
                            </div>

                            {/* Dynamic Summary Card (Digital Receipt Style) */}
                            <div className="relative p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/5 rounded-full blur-2xl pointer-events-none"></div>

                                <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-200 dark:border-white/10 mb-5">
                                    <div className="flex items-center gap-2">
                                        <Sparkles
                                            size={14}
                                            className="text-[#f59e0b]"
                                        />
                                        <span className="text-[10px] font-bold text-[#1e3a5f] dark:text-white uppercase tracking-widest">
                                            Din konfiguration
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-400">
                                        STEG {step} AV 3
                                    </span>
                                </div>

                                <div className="space-y-4 font-medium text-xs">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">
                                            Kundtyp
                                        </span>
                                        <span className="font-bold text-slate-800 dark:text-white">
                                            {customerType === "privat"
                                                ? "Privatperson (RUT)"
                                                : "Företag"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">
                                            Tjänst
                                        </span>
                                        <span
                                            className={`font-bold transition-colors ${formState.service ? "text-slate-800 dark:text-white" : "text-slate-400 italic"}`}
                                        >
                                            {selectedServiceTitle}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">
                                            Bostadsyta
                                        </span>
                                        <span
                                            className={`font-bold transition-colors ${formState.size ? "text-slate-800 dark:text-white" : "text-slate-400 italic"}`}
                                        >
                                            {formState.size
                                                ? `${formState.size} kvm`
                                                : "Ej angivet"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">
                                            Frekvens
                                        </span>
                                        <span className="font-bold text-slate-800 dark:text-white">
                                            {formState.frequency === "once"
                                                ? "Engångsuppdrag"
                                                : formState.frequency ===
                                                    "weekly"
                                                  ? "Varje vecka"
                                                  : formState.frequency ===
                                                      "biweekly"
                                                    ? "Varannan vecka"
                                                    : formState.frequency ===
                                                        "monthly"
                                                      ? "Var fjärde vecka"
                                                      : "Engångsuppdrag"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">
                                            Ort / Stad
                                        </span>
                                        <span
                                            className={`font-bold transition-colors ${formState.location ? "text-[#f59e0b]" : "text-slate-400 italic"}`}
                                        >
                                            {formState.location || "Ej angiven"}
                                        </span>
                                    </div>
                                </div>

                                {/* Micro-indicator based on step */}
                                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <ShieldCheck
                                            size={14}
                                            className="text-[#f59e0b]"
                                        />
                                        Skyddat med SSL & GDPR
                                    </span>
                                    <span>Kostnadsfritt</span>
                                </div>
                            </div>

                            {/* Minimal Editorial Contacts */}
                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5 text-sm">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Kontakta oss direkt
                                </p>
                                <div className="space-y-3 font-medium">
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                        <Phone
                                            size={14}
                                            className="text-[#f59e0b]"
                                        />
                                        <a
                                            href="tel:0760368628"
                                            className="hover:text-[#f59e0b] hover:underline transition-all"
                                        >
                                            076-036 86 28
                                        </a>
                                        <span className="text-xs text-slate-400 font-normal">
                                            (Snabba svar dygnet runt)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                        <Mail
                                            size={14}
                                            className="text-[#f59e0b]"
                                        />
                                        <a
                                            href="mailto:info@renovixnordic.se"
                                            className="hover:text-[#f59e0b] hover:underline transition-all"
                                        >
                                            info@renovixnordic.se
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                        <Clock
                                            size={14}
                                            className="text-[#f59e0b]"
                                        />
                                        <span className="text-slate-500 dark:text-slate-400">
                                            Telefontid: Vardagar 08:00–17:00
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Premium Multi-step Form Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7 bg-white dark:bg-slate-900/10 rounded-3xl p-8 sm:p-10 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none"
                        >
                            {status === "success" ? (
                                /* ---------- DEDICATED SUCCESS / TACK VY ---------- */
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="py-14 text-center flex flex-col items-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                                        <CheckCircle2
                                            size={30}
                                            className="text-emerald-500"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-serif italic text-[#1e3a5f] dark:text-white mb-3">
                                        Tack för din förfrågan!
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed mb-8">
                                        Vi har tagit emot din offertförfrågan
                                        och återkommer med ett personligt
                                        prisförslag inom kort.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="px-6 py-3.5 bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer shadow-md shadow-blue-900/5"
                                    >
                                        Skicka en ny förfrågan
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Progress Tracker bar */}
                                    <div className="mb-10">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-bold text-[#1e3a5f] dark:text-white uppercase tracking-widest">
                                                {step === 1 &&
                                                    "Konfigurera din städning"}
                                                {step === 2 &&
                                                    "Kompletterande önskemål"}
                                                {step === 3 &&
                                                    "Dina kontaktuppgifter"}
                                            </span>
                                            <span className="text-xs font-bold text-[#f59e0b]">
                                                Steg {step} av 3
                                            </span>
                                        </div>

                                        {/* 3-segment progress indicator bar */}
                                        <div className="grid grid-cols-3 gap-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${step >= 1 ? "bg-[#f59e0b]" : "bg-transparent"}`}
                                            />
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${step >= 2 ? "bg-[#f59e0b]" : "bg-transparent"}`}
                                            />
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${step >= 3 ? "bg-[#f59e0b]" : "bg-transparent"}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Form implementation */}
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <AnimatePresence mode="wait">
                                            {/* STEP 1: SERVICE & DETAILS */}
                                            {step === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{
                                                        opacity: 0,
                                                        x: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className="space-y-6"
                                                >
                                                    <div className="border-b border-slate-100 dark:border-white/5 pb-4 mb-6">
                                                        <h3 className="text-lg font-serif italic text-[#1e3a5f] dark:text-white font-medium">
                                                            Berätta om dina
                                                            behov
                                                        </h3>
                                                        <p className="text-xs text-slate-400 mt-1">
                                                            Välj den tjänst och
                                                            frekvens som passar
                                                            dig bäst.
                                                        </p>
                                                    </div>

                                                    {/* Service select */}
                                                    <div className="space-y-1.5">
                                                        <label
                                                            htmlFor="service"
                                                            className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block"
                                                        >
                                                            Tjänst *
                                                        </label>
                                                        <div className="relative">
                                                            <select
                                                                id="service"
                                                                name="service"
                                                                required
                                                                value={
                                                                    formState.service
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className={`w-full bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/80 rounded-xl px-4 py-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all duration-300 text-sm font-medium appearance-none cursor-pointer pr-10 border ${errors.service ? "border-red-500 focus:ring-4 focus:ring-red-500/5" : "border-slate-200/60 dark:border-white/10 focus:border-[#1e3a5f] dark:focus:border-[#f59e0b] focus:ring-4 focus:ring-[#1e3a5f]/5 dark:focus:ring-[#f59e0b]/5"}`}
                                                            >
                                                                <option
                                                                    value=""
                                                                    className="dark:bg-[#0a111a]"
                                                                >
                                                                    Välj
                                                                    tjänst...
                                                                </option>
                                                                {services.map(
                                                                    (s) => (
                                                                        <option
                                                                            key={
                                                                                s.id
                                                                            }
                                                                            value={
                                                                                s.id
                                                                            }
                                                                            className="dark:bg-[#0a111a]"
                                                                        >
                                                                            {
                                                                                s.title
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                            <ChevronDown
                                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                                                size={14}
                                                            />
                                                        </div>
                                                        {errors.service && (
                                                            <p className="text-xs text-red-500 font-semibold mt-1 ml-1">
                                                                {errors.service}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid sm:grid-cols-2 gap-6">
                                                        {/* Area input */}
                                                        <div className="space-y-1.5">
                                                            <label
                                                                htmlFor="size"
                                                                className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block"
                                                            >
                                                                Bostadsyta (kvm)
                                                                *
                                                            </label>
                                                            <input
                                                                id="size"
                                                                name="size"
                                                                required
                                                                type="number"
                                                                placeholder="T.ex. 85"
                                                                value={
                                                                    formState.size
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className={`w-full bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/80 rounded-xl px-4 py-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all duration-300 text-sm font-medium border ${errors.size ? "border-red-500 focus:ring-4 focus:ring-red-500/5" : "border-slate-200/60 dark:border-white/10 focus:border-[#1e3a5f] dark:focus:border-[#f59e0b] focus:ring-4 focus:ring-[#1e3a5f]/5 dark:focus:ring-[#f59e0b]/5"}`}
                                                            />
                                                            {errors.size && (
                                                                <p className="text-xs text-red-500 font-semibold mt-1 ml-1">
                                                                    {
                                                                        errors.size
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Frequency select */}
                                                        <div className="space-y-1.5">
                                                            <label
                                                                htmlFor="frequency"
                                                                className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block"
                                                            >
                                                                Frekvens *
                                                            </label>
                                                            <div className="relative">
                                                                <select
                                                                    id="frequency"
                                                                    name="frequency"
                                                                    required
                                                                    value={
                                                                        formState.frequency
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    className="w-full bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/80 border border-slate-200/60 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1e3a5f] dark:focus:border-[#f59e0b] focus:ring-4 focus:ring-[#1e3a5f]/5 dark:focus:ring-[#f59e0b]/5 transition-all duration-300 text-sm font-medium appearance-none cursor-pointer pr-10"
                                                                >
                                                                    <option
                                                                        value="once"
                                                                        className="dark:bg-[#0a111a]"
                                                                    >
                                                                        Engångsuppdrag
                                                                    </option>
                                                                    <option
                                                                        value="weekly"
                                                                        className="dark:bg-[#0a111a]"
                                                                    >
                                                                        Varje
                                                                        vecka
                                                                        (Abonnemang)
                                                                    </option>
                                                                    <option
                                                                        value="biweekly"
                                                                        className="dark:bg-[#0a111a]"
                                                                    >
                                                                        Varannan
                                                                        vecka
                                                                        (Abonnemang)
                                                                    </option>
                                                                    <option
                                                                        value="monthly"
                                                                        className="dark:bg-[#0a111a]"
                                                                    >
                                                                        Var
                                                                        fjärde
                                                                        vecka
                                                                        (Abonnemang)
                                                                    </option>
                                                                </select>
                                                                <ChevronDown
                                                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                                                    size={14}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Location input */}
                                                    <div className="space-y-1.5">
                                                        <label
                                                            htmlFor="location"
                                                            className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block"
                                                        >
                                                            Stad / Ort *
                                                        </label>
                                                        <input
                                                            id="location"
                                                            name="location"
                                                            required
                                                            type="text"
                                                            placeholder="Ex: Gävle, Sandviken, Valbo"
                                                            value={
                                                                formState.location
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className={`w-full bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/80 rounded-xl px-4 py-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all duration-300 text-sm font-medium border ${errors.location ? "border-red-500 focus:ring-4 focus:ring-red-500/5" : "border-slate-200/60 dark:border-white/10 focus:border-[#1e3a5f] dark:focus:border-[#f59e0b] focus:ring-4 focus:ring-[#1e3a5f]/5 dark:focus:ring-[#f59e0b]/5"}`}
                                                        />
                                                        {errors.location && (
                                                            <p className="text-xs text-red-500 font-semibold mt-1 ml-1">
                                                                {
                                                                    errors.location
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Next button */}
                                                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleNextStep
                                                            }
                                                            className="px-6 py-3.5 bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer shadow-md shadow-blue-900/5"
                                                        >
                                                            Nästa steg{" "}
                                                            <ArrowRight
                                                                size={14}
                                                            />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 2: MESSAGE & IMAGES */}
                                            {step === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{
                                                        opacity: 0,
                                                        x: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className="space-y-6"
                                                >
                                                    <div className="border-b border-slate-100 dark:border-white/5 pb-4 mb-6">
                                                        <h3 className="text-lg font-serif italic text-[#1e3a5f] dark:text-white font-medium">
                                                            Önskemål & Detaljer
                                                        </h3>
                                                        <p className="text-xs text-slate-400 mt-1">
                                                            Fyll i
                                                            kompletterande
                                                            önskemål och bifoga
                                                            eventuella bilder på
                                                            ytan.
                                                        </p>
                                                    </div>

                                                    {/* Complementary info textarea */}
                                                    <div className="space-y-1.5">
                                                        <label
                                                            htmlFor="message"
                                                            className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block"
                                                        >
                                                            Kompletterande
                                                            information *
                                                        </label>
                                                        <textarea
                                                            id="message"
                                                            name="message"
                                                            required
                                                            rows={4}
                                                            placeholder="T.ex. önskat startdatum, fönsterputs, tillgång till nycklar, husdjur, eller andra specifika instruktioner..."
                                                            value={
                                                                formState.message
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className={`w-full bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/80 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all duration-300 text-sm font-medium resize-none border ${errors.message ? "border-red-500 focus:ring-4 focus:ring-red-500/5" : "border-slate-200/60 dark:border-white/10 focus:border-[#1e3a5f] dark:focus:border-[#f59e0b] focus:ring-4 focus:ring-[#1e3a5f]/5 dark:focus:ring-[#f59e0b]/5"}`}
                                                        />
                                                        {errors.message && (
                                                            <p className="text-xs text-red-500 font-semibold mt-1 ml-1">
                                                                {errors.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Image uploader */}
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block">
                                                            Bifoga bilder på
                                                            ytor (valfritt, max
                                                            5 bilder)
                                                        </label>
                                                        <div className="flex flex-wrap gap-3">
                                                            {selectedImages.map(
                                                                (
                                                                    file,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="relative w-16 h-16 rounded-xl overflow-hidden group border border-slate-200/50 dark:border-white/5 bg-slate-100"
                                                                    >
                                                                        <Image
                                                                            src={URL.createObjectURL(
                                                                                file,
                                                                            )}
                                                                            alt={`Bifogad bild ${index + 1}`}
                                                                            fill
                                                                            className="object-cover"
                                                                            referrerPolicy="no-referrer"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeImage(
                                                                                    index,
                                                                                )
                                                                            }
                                                                            className="absolute inset-0 bg-red-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                                                                        >
                                                                            <Trash2
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                ),
                                                            )}
                                                            {selectedImages.length <
                                                                5 && (
                                                                <label className="w-16 h-16 rounded-xl border border-dashed border-slate-200 hover:border-[#f59e0b] dark:border-slate-800 dark:hover:border-[#f59e0b] flex flex-col items-center justify-center text-slate-400 hover:text-[#f59e0b] hover:bg-[#f59e0b]/5 transition-all duration-300 cursor-pointer group">
                                                                    <Upload
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="mb-1 group-hover:-translate-y-0.5 transition-transform duration-300"
                                                                    />
                                                                    <span className="text-[8px] font-bold uppercase tracking-wider">
                                                                        Ladda
                                                                        upp
                                                                    </span>
                                                                    <input
                                                                        type="file"
                                                                        multiple
                                                                        accept="image/*"
                                                                        className="hidden"
                                                                        onChange={
                                                                            handleImageChange
                                                                        }
                                                                    />
                                                                </label>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 ml-1">
                                                            Tips: Bilder
                                                            underlättar en exakt
                                                            och snabb
                                                            prissättning.
                                                        </p>
                                                    </div>

                                                    {/* Prev / Next buttons */}
                                                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handlePrevStep
                                                            }
                                                            className="px-5 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:scale-[1.01] active:scale-99 transition-all duration-300 cursor-pointer"
                                                        >
                                                            <ArrowLeft
                                                                size={14}
                                                            />{" "}
                                                            Tillbaka
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleNextStep
                                                            }
                                                            className="px-6 py-3.5 bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer shadow-md shadow-blue-900/5"
                                                        >
                                                            Nästa steg{" "}
                                                            <ArrowRight
                                                                size={14}
                                                            />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 3: CONTACT DETAILS & GDPR */}
                                            {step === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{
                                                        opacity: 0,
                                                        x: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className="space-y-6"
                                                >
                                                    <div className="border-b border-slate-100 dark:border-white/5 pb-4 mb-6">
                                                        <h3 className="text-lg font-serif italic text-[#1e3a5f] dark:text-white font-medium">
                                                            Dina
                                                            kontaktuppgifter
                                                        </h3>
                                                        <p className="text-xs text-slate-400 mt-1 font-medium">
                                                            Vem är förfrågan
                                                            för? Välj typ och
                                                            fyll i kontaktinfo.
                                                        </p>
                                                    </div>

                                                    {/* Customer Type Toggle */}
                                                    <div className="space-y-2">
                                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block">
                                                            Kundtyp *
                                                        </p>
                                                        <div className="flex p-1 bg-slate-100/60 dark:bg-slate-900/60 rounded-xl w-fit border border-slate-200/30 dark:border-white/5 relative">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setCustomerType(
                                                                        "privat",
                                                                    );
                                                                    if (
                                                                        errors.companyName
                                                                    ) {
                                                                        setErrors(
                                                                            (
                                                                                prev,
                                                                            ) => {
                                                                                const copy =
                                                                                    {
                                                                                        ...prev,
                                                                                    };
                                                                                delete copy.companyName;
                                                                                return copy;
                                                                            },
                                                                        );
                                                                    }
                                                                }}
                                                                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all duration-300 relative z-10 ${customerType === "privat" ? "bg-white dark:bg-slate-800 text-[#1e3a5f] dark:text-[#f59e0b] shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}
                                                            >
                                                                Privatperson
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setCustomerType(
                                                                        "foretag",
                                                                    )
                                                                }
                                                                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all duration-300 relative z-10 ${customerType === "foretag" ? "bg-white dark:bg-slate-800 text-[#1e3a5f] dark:text-[#f59e0b] shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}
                                                            >
                                                                Företag
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {customerType ===
                                                        "foretag" && (
                                                        <div className="space-y-1.5">
                                                            <label
                                                                htmlFor="companyName"
                                                                className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block"
                                                            >
                                                                Företagsnamn *
                                                            </label>
                                                            <input
                                                                id="companyName"
                                                                name="companyName"
                                                                required
                                                                type="text"
                                                                placeholder="T.ex. Företaget AB"
                                                                value={
                                                                    formState.companyName
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className={`w-full bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/80 rounded-xl px-4 py-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all duration-300 text-sm font-medium border ${errors.companyName ? "border-red-500 focus:ring-4 focus:ring-red-500/5" : "border-slate-200/60 dark:border-white/10 focus:border-[#1e3a5f] dark:focus:border-[#f59e0b] focus:ring-4 focus:ring-[#1e3a5f]/5 dark:focus:ring-[#f59e0b]/5"}`}
                                                            />
                                                            {errors.companyName && (
                                                                <p className="text-xs text-red-500 font-semibold mt-1 ml-1">
                                                                    {
                                                                        errors.companyName
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Contactperson name */}
                                                    <div className="space-y-1.5">
                                                        <label
                                                            htmlFor="name"
                                                            className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block"
                                                        >
                                                            Kontaktperson *
                                                        </label>
                                                        <input
                                                            id="name"
                                                            name="name"
                                                            required
                                                            type="text"
                                                            placeholder="För- och efternamn"
                                                            value={
                                                                formState.name
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className={`w-full bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/80 rounded-xl px-4 py-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all duration-300 text-sm font-medium border ${errors.name ? "border-red-500 focus:ring-4 focus:ring-red-500/5" : "border-slate-200/60 dark:border-white/10 focus:border-[#1e3a5f] dark:focus:border-[#f59e0b] focus:ring-4 focus:ring-[#1e3a5f]/5 dark:focus:ring-[#f59e0b]/5"}`}
                                                        />
                                                        {errors.name && (
                                                            <p className="text-xs text-red-500 font-semibold mt-1 ml-1">
                                                                {errors.name}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid sm:grid-cols-2 gap-6">
                                                        {/* Phone input */}
                                                        <div className="space-y-1.5">
                                                            <label
                                                                htmlFor="phone"
                                                                className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block"
                                                            >
                                                                Telefonnummer *
                                                            </label>
                                                            <input
                                                                id="phone"
                                                                name="phone"
                                                                required
                                                                type="tel"
                                                                placeholder="070-123 45 67"
                                                                value={
                                                                    formState.phone
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className={`w-full bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/80 rounded-xl px-4 py-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all duration-300 text-sm font-medium border ${errors.phone ? "border-red-500 focus:ring-4 focus:ring-red-500/5" : "border-slate-200/60 dark:border-white/10 focus:border-[#1e3a5f] dark:focus:border-[#f59e0b] focus:ring-4 focus:ring-[#1e3a5f]/5 dark:focus:ring-[#f59e0b]/5"}`}
                                                            />
                                                            {errors.phone && (
                                                                <p className="text-xs text-red-500 font-semibold mt-1 ml-1">
                                                                    {
                                                                        errors.phone
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Email input */}
                                                        <div className="space-y-1.5">
                                                            <label
                                                                htmlFor="email"
                                                                className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] ml-1 block"
                                                            >
                                                                E-postadress *
                                                            </label>
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                required
                                                                type="email"
                                                                placeholder="erik@exempel.se"
                                                                value={
                                                                    formState.email
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                className={`w-full bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-950/80 rounded-xl px-4 py-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all duration-300 text-sm font-medium border ${errors.email ? "border-red-500 focus:ring-4 focus:ring-red-500/5" : "border-slate-200/60 dark:border-white/10 focus:border-[#1e3a5f] dark:focus:border-[#f59e0b] focus:ring-4 focus:ring-[#1e3a5f]/5 dark:focus:ring-[#f59e0b]/5"}`}
                                                            />
                                                            {errors.email && (
                                                                <p className="text-xs text-red-500 font-semibold mt-1 ml-1">
                                                                    {
                                                                        errors.email
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* GDPR compliance checkbox */}
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-start gap-3 pt-2">
                                                            <div className="relative flex items-center shrink-0 mt-0.5">
                                                                <input
                                                                    required
                                                                    id="gdpr-consent"
                                                                    name="gdpr"
                                                                    type="checkbox"
                                                                    onChange={() => {
                                                                        if (
                                                                            errors.gdpr
                                                                        ) {
                                                                            setErrors(
                                                                                (
                                                                                    prev,
                                                                                ) => {
                                                                                    const copy =
                                                                                        {
                                                                                            ...prev,
                                                                                        };
                                                                                    delete copy.gdpr;
                                                                                    return copy;
                                                                                },
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 dark:border-white/20 transition-all checked:bg-[#f59e0b] checked:border-[#f59e0b]"
                                                                />
                                                                <svg
                                                                    className="pointer-events-none absolute h-2.5 w-2.5 translate-x-[3px] text-[#1e3a5f] opacity-0 peer-checked:opacity-100 transition-opacity"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="5"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <label
                                                                htmlFor="gdpr-consent"
                                                                className="text-xs text-slate-500 dark:text-slate-400 leading-tight cursor-pointer select-none font-medium"
                                                            >
                                                                Jag godkänner
                                                                att mina
                                                                personuppgifter
                                                                behandlas i
                                                                enlighet med
                                                                GDPR för att
                                                                hantera min
                                                                offertförfrågan.
                                                                *
                                                            </label>
                                                        </div>
                                                        {errors.gdpr && (
                                                            <p className="text-xs text-red-500 font-semibold mt-1 ml-1">
                                                                {errors.gdpr}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Bullet assurances list */}
                                                    <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-white/5">
                                                        {[
                                                            "Kostnadsfri offert utan dolda bindningstider",
                                                            "RUT-avdraget administreras direkt på fakturan (50% rabatt)",
                                                            "Säker städgaranti på alla våra utförda uppdrag",
                                                        ].map((text, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 text-xs font-medium"
                                                            >
                                                                <CheckCircle2
                                                                    size={13}
                                                                    className="text-[#f59e0b]"
                                                                />
                                                                <span>
                                                                    {text}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Error notification block (success has its own dedicated view above) */}
                                                    {status === "error" && (
                                                        <div className="p-4 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 border border-red-500/20 text-xs font-semibold">
                                                            <CheckCircle2
                                                                size={16}
                                                                className="text-red-500 rotate-45"
                                                            />
                                                            {errorMsg ||
                                                                "Ett fel uppstod. Kontrollera uppgifterna och försök igen."}
                                                        </div>
                                                    )}

                                                    {/* Prev / Submit buttons */}
                                                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center gap-4">
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handlePrevStep
                                                            }
                                                            disabled={
                                                                status ===
                                                                "loading"
                                                            }
                                                            className="px-5 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:scale-[1.01] active:scale-99 transition-all duration-300 cursor-pointer disabled:opacity-50"
                                                        >
                                                            <ArrowLeft
                                                                size={14}
                                                            />{" "}
                                                            Tillbaka
                                                        </button>

                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                status ===
                                                                "loading"
                                                            }
                                                            className="px-6 py-3.5 bg-[#1e3a5f] hover:bg-[#12243d] dark:bg-[#f59e0b] dark:text-[#1e3a5f] dark:hover:bg-[#d97706] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-99 transition-all duration-300 shadow-lg shadow-blue-950/10 dark:shadow-none cursor-pointer outline-none group disabled:opacity-50"
                                                        >
                                                            <span>
                                                                {status ===
                                                                "loading"
                                                                    ? "Skickar..."
                                                                    : "Skicka Offertförfrågan"}
                                                            </span>
                                                            {status !==
                                                                "loading" && (
                                                                <ArrowUpRight
                                                                    size={14}
                                                                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                                                />
                                                            )}
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
