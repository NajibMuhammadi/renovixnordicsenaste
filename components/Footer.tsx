'use client';

import React from 'react';
import { Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="py-20 sm:py-32 bg-white dark:bg-[#0a111a] border-t border-slate-100 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-20">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size={32} className="mb-6" />
            <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed max-w-xs">
              Vi sätter guldstandarden för hem- och företagstjänster i Gävle med omnejd. Din partner för en renare vardag.
            </p>
          </div>
          
          <div>
            <h2 className="font-bold text-[#1e3a5f] dark:text-white mb-6">Företaget</h2>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/om-oss" className="hover:text-[#f59e0b] transition-colors">Om Oss</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#f59e0b] transition-colors">Referenser</Link></li>
              <li><Link href="/#reviews" className="hover:text-[#f59e0b] transition-colors">Kundomdömen</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-[#1e3a5f] dark:text-white mb-6">Tjänster</h2>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/tjanster" className="hover:text-[#f59e0b] transition-colors">Städning</Link></li>
              <li><Link href="/tjanster" className="hover:text-[#f59e0b] transition-colors">Underhåll</Link></li>
              <li><Link href="/tjanster" className="hover:text-[#f59e0b] transition-colors">Företag</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-[#1e3a5f] dark:text-white mb-6">Offert</h2>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#f59e0b]" />
                <a href="tel:0760368628" className="hover:text-[#f59e0b] transition-colors">076-036 86 28</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#f59e0b]" />
                <a href="mailto:info@renovixnordic.se" className="hover:text-[#f59e0b] transition-colors">info@renovixnordic.se</a>
              </li>
              <li>
                <Link href="/contact" className="text-[#f59e0b] font-bold hover:underline">Få en offert</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-slate-100 dark:border-white/5 gap-6">
          <div className="text-center sm:text-left">
            <p className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">© 2026 Renovix Nordic. Alla rättigheter förbehållna.</p>
            <p className="text-slate-400 dark:text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-wider">Renovix Nordic (Enskild firma) | Godkänd för F-skatt</p>
          </div>
          <div className="flex gap-8">
            {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
              <a key={social} href="#" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-[#1e3a5f] dark:hover:text-white transition-colors" aria-label={`Följ oss på ${social}`}>
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
