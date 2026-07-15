'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/data';

export default function TjansterClient() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0a111a] selection:bg-[#f59e0b] selection:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-40 pb-24 sm:pb-32 lg:pb-36 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f59e0b] rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[#f59e0b] font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
                  VÅRA STÄDTJÄNSTER
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic font-light text-[#1e3a5f] dark:text-white mb-8 leading-[1.1] tracking-tighter">
                  Våra{" "}
                  <span className="text-[#f59e0b]">
                    Tjänster
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
                Professionell städning för hem och företag i Gävle, Sandviken och hela Gävleborg. Med fokus på pålitlighet, högsta kvalitet och alltid med full garanti.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mt-16 pt-12 border-t border-slate-200/60 dark:border-white/10"
          >
            {[
              { value: '100%', label: 'Besiktningsgaranti' },
              { value: '100%', label: 'Försäkrad hos Trygg-Hansa' },
              { value: '50%', label: 'RUT-avdrag direkt på fakturan' },
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

      {/* Services Grid Section */}
      <section className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-[#0a111a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`group relative p-8 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${service.color} dark:bg-slate-900/50 dark:border dark:border-white/5 flex flex-col min-h-[380px]`}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="bg-white dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center text-[#1e3a5f] dark:text-[#f59e0b] shadow-sm mb-8 group-hover:bg-[#1e3a5f] group-hover:text-white transition-colors duration-500">
                      <service.icon size={28} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a5f]/40 dark:text-white/40 mb-2 block">{service.category}</span>
                    <h3 className="text-2xl font-display font-bold text-[#1e3a5f] dark:text-white mb-4">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                      {service.description}
                    </p>
                  </div>

                  <Link href={`/services/${service.id}`} className="flex items-center gap-2 text-[#1e3a5f] dark:text-[#f59e0b] font-bold text-sm hover:underline mt-auto">
                    Läs mer om tjänsten <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
