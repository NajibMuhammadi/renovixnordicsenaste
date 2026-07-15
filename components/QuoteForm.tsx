'use client';

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { services } from '@/lib/data';
import { useTheme } from '@/lib/ThemeContext';

interface QuoteFormProps {
  onSuccess?: () => void;
  className?: string;
  isDark?: boolean;
}

export default function QuoteForm({ onSuccess, className = "", isDark }: QuoteFormProps) {
  const { theme } = useTheme();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const effectiveIsDark = isDark !== undefined ? isDark : theme === 'dark';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Något gick fel.');

      setStatus('success');
      e.currentTarget.reset();
      
      // Close the modal after 2.5 seconds if onSuccess callback is provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2500);
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Ett oväntat fel uppstod. Försök igen.');
    }
  };

  const textColor = effectiveIsDark ? 'text-white' : 'text-[#1e3a5f]';
  const labelColor = effectiveIsDark ? 'text-blue-200/40' : 'text-slate-400';
  const inputBg = effectiveIsDark ? 'bg-white/5' : 'bg-slate-50';
  const inputBorder = effectiveIsDark ? 'border-white/10' : 'border-slate-200';
  const placeholderColor = effectiveIsDark ? 'placeholder:text-white/10' : 'placeholder:text-slate-300';

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-4 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white">Tack för din förfrågan!</h3>
        <p className="text-blue-200/70 max-w-md mx-auto text-sm leading-relaxed">
          Vi har tagit emot dina uppgifter och en städspecialist från Renovix Nordic kommer att återkomma med en kostnadsfri offert inom 24 timmar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-8 ${className}`}>
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label htmlFor="full-name" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Fullständigt Namn</label>
          <input 
            id="full-name"
            name="name"
            required
            aria-required="true"
            type="text" 
            placeholder="Erik Andersson" 
            className={`w-full ${inputBg} border-b ${inputBorder} px-1 py-3 ${textColor} ${placeholderColor} focus:border-[#f59e0b] transition-all outline-none text-base font-medium`} 
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="email" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>E-postadress</label>
          <input 
            id="email"
            name="email"
            required
            aria-required="true"
            type="email" 
            placeholder="erik@exempel.se" 
            className={`w-full ${inputBg} border-b ${inputBorder} px-1 py-3 ${textColor} ${placeholderColor} focus:border-[#f59e0b] transition-all outline-none text-base font-medium`} 
          />
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="service" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Vilken tjänst är du intresserad av?</label>
        <select 
          id="service" 
          name="service"
          required 
          aria-required="true" 
          className={`w-full ${inputBg} border-b ${inputBorder} px-1 py-3 ${textColor} focus:border-[#f59e0b] transition-all outline-none text-base font-medium appearance-none cursor-pointer`}
        >
          <option value="" className={effectiveIsDark ? "bg-[#1e3a5f]" : "bg-white"}>Välj en tjänst...</option>
          {services.map(s => (
            <option key={s.id} value={s.title} className={effectiveIsDark ? "bg-[#1e3a5f]" : "bg-white"}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <label htmlFor="message" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Berätta mer om projektet</label>
        <textarea 
          id="message"
          name="message"
          required
          aria-required="true"
          rows={3} 
          placeholder="Beskriv kortfattat vad du behöver hjälp med..." 
          className={`w-full ${inputBg} border-b ${inputBorder} px-1 py-3 ${textColor} ${placeholderColor} focus:border-[#f59e0b] transition-all outline-none text-base font-medium resize-none`}
        />
      </div>

      <div className="flex items-start gap-4 pt-2">
        <div className="relative flex items-center shrink-0">
          <input
            required
            id="gdpr-quote"
            name="gdpr"
            type="checkbox"
            className={`peer h-5 w-5 cursor-pointer appearance-none rounded border transition-all checked:bg-[#f59e0b] checked:border-[#f59e0b] ${effectiveIsDark ? 'border-white/20' : 'border-slate-300'}`}
          />
          <svg
            className="pointer-events-none absolute h-3 w-3 translate-x-[4px] text-[#1e3a5f] opacity-0 peer-checked:opacity-100 transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <label htmlFor="gdpr-quote" className={`text-sm ${effectiveIsDark ? 'text-blue-200/60' : 'text-slate-600'} leading-tight cursor-pointer select-none font-medium`}>
          Jag godkänner att mina personuppgifter behandlas i enlighet med GDPR för att kunna hantera min förfrågan. *
        </label>
      </div>

      {status === 'error' && (
        <div className="p-4 bg-rose-500/10 text-rose-300 rounded-xl flex items-center gap-3 border border-rose-500/20 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full bg-[#f59e0b] text-[#1e3a5f] py-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] transition-all duration-500 group disabled:opacity-50"
      >
        {status === 'loading' ? 'Skickar...' : 'Skicka Förfrågan'} 
        {status !== 'loading' && <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
      </button>
    </form>
  );
}
