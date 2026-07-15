'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteModalContext';
import QuoteForm from './QuoteForm';
import Logo from './Logo';

export default function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal();

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-[#1e3a5f]/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-2xl bg-[#1e3a5f] dark:bg-[#0a111a] rounded-[3rem] shadow-2xl overflow-hidden transition-colors duration-300"
          >
            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#f59e0b]/10 rounded-full blur-3xl" />
            
            <button 
              onClick={closeModal}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-20"
              aria-label="Stäng modal"
            >
              <X size={24} />
            </button>

            <div className="p-8 sm:p-12 relative z-10">
              <div className="flex justify-between items-start mb-10 pr-12">
                <div>
                  <h3 id="modal-title" className="text-3xl font-display font-bold text-white mb-2">Begär en offert</h3>
                  <p className="text-blue-200/60 text-sm">Fyll i formuläret så återkommer vi inom 24 timmar.</p>
                </div>
                <div className="hidden sm:block shrink-0">
                  <Logo size={56} showText={false} />
                </div>
              </div>

              <QuoteForm onSuccess={closeModal} isDark={true} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
