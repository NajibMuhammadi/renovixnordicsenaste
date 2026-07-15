'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=2070" 
          alt="Professional house cleaning in Gävle" 
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-600/30">
              Din städfirma i Gävle
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
              Skinande rent. <br />
              <span className="text-blue-400">Varje gång.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg">
              Vi levererar städning med hög kvalitet, noggrannhet och pålitlighet – för både hem och företag i Gävle med omnejd.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#kontakt" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all flex items-center gap-2 group shadow-lg shadow-blue-600/30"
              >
                Boka gratis offert
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#om-oss" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-md transition-all border border-white/20"
              >
                Våra tjänster
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <div className="text-blue-400">
                  <Star fill="currentColor" size={20} />
                </div>
                <div className="text-white text-sm">
                  <p className="font-bold">4.9/5</p>
                  <p className="opacity-60 text-xs uppercase tracking-wider">i betyg</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-blue-400" size={24} />
                <div className="text-white text-sm">
                  <p className="font-bold">Ansvarsförsäkrad</p>
                  <p className="opacity-60 text-xs uppercase tracking-wider">Trygg service</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
