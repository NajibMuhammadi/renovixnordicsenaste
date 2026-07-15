'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SERVICES = [
  'Hemstädning',
  'Flyttstädning',
  'Kontorsstäd',
  'Fönsterputs',
  'Gräsklippning & Bortforsling',
  'Övrigt'
];

export default function ContactForm() {
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalCount = images.length + newFiles.length;

      if (totalCount > 5) {
        alert('Max 5 bilder är tillåtna per formulär.');
        return;
      }

      // Check sizes: max 5MB per file
      const oversized = newFiles.some(file => file.size > 5 * 1024 * 1024);
      if (oversized) {
        alert('Varje bild får max vara 5MB.');
        return;
      }

      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    images.forEach(img => formData.append('images', img));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Något gick fel.');

      setStatus('success');
      setImages([]);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-white rounded-3xl shadow-xl border border-slate-100" id="kontakt-form">
      <h2 className="text-3xl font-bold mb-2 text-slate-900">Boka städning</h2>
      <p className="text-slate-600 mb-8">Fyll i formuläret så återkommer vi med en kostnadsfri offert inom 24 timmar.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">Namn *</label>
            <input
              required
              id="name"
              name="name"
              type="text"
              placeholder="Ditt för- och efternamn"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="phone">Telefon</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="070-000 00 00"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="email">E-post *</label>
          <input
            required
            id="email"
            name="email"
            type="email"
            placeholder="namn@exempel.se"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="service">Vad behöver du hjälp med? *</label>
          <select
            required
            id="service"
            name="service"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
          >
            <option value="">Välj tjänst...</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="message">Meddelande *</label>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            placeholder="Berätta gärna lite om ytan som ska städas eller din adress."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* Image Upload Area */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Bifoga bilder (valfritt)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
          >
            <Upload className="mx-auto mb-2 text-slate-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-sm text-slate-500">Klicka för att ladda upp bilder</p>
            <p className="text-xs text-slate-400 mt-1">Max 5 bilder, max 5MB styck</p>
            <input 
              type="file" 
              multiple 
              onChange={handleImageChange} 
              className="hidden" 
              ref={fileInputRef}
              accept="image/*"
            />
          </div>

          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-lg w-20 h-20 bg-slate-100 border border-slate-200">
                  <Image src={URL.createObjectURL(img)} alt="preview" fill className="object-cover" unoptimized referrerPolicy="no-referrer" />
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GDPR Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <div className="relative flex items-center shrink-0">
            <input
              required
              id="gdpr"
              name="gdpr"
              type="checkbox"
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 transition-all checked:bg-blue-600 checked:border-blue-600"
            />
            <svg
              className="pointer-events-none absolute h-3 w-3 translate-x-[4px] text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <label htmlFor="gdpr" className="text-sm text-slate-600 leading-tight cursor-pointer select-none font-medium">
            Jag godkänner att mina personuppgifter behandlas i enlighet med GDPR för att kunna hantera min förfrågan. *
          </label>
        </div>

        <button
          disabled={status === 'loading'}
          className={cn(
            "w-full py-4 px-6 rounded-xl font-bold text-white transition-all transform flex items-center justify-center gap-2",
            status === 'loading' ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-500/20"
          )}
        >
          {status === 'loading' ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send size={18} />
              Skicka förfrågan
            </>
          )}
        </button>

        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-3 border border-emerald-100"
          >
            <CheckCircle2 size={20} />
            Tack! Vi har mottagit din förfrågan och återkommer snart.
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-rose-50 text-rose-700 rounded-xl flex items-center gap-3 border border-rose-100"
          >
            <AlertCircle size={20} />
            {errorMsg || 'Ett fel uppstod. Försök igen eller mejla oss direkt.'}
          </motion.div>
        )}
      </form>
    </div>
  );
}
