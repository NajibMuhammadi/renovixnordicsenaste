'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Hem', href: '/' },
    { name: 'Tjänster', href: '/tjanster' },
    { name: 'Referenser', href: '/portfolio' },
    { name: 'Om Oss', href: '/om-oss' },
    { name: 'Process', href: '/#process' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Offert', href: '/contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 dark:bg-[#0a111a]/90 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="group cursor-pointer">
            <Logo size={40} />
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-sm font-semibold text-[#1e3a5f]/70 dark:text-white/70 hover:text-[#1e3a5f] dark:hover:text-[#f59e0b] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/contact" className="bg-[#1e3a5f] dark:bg-[#f59e0b] text-white dark:text-[#1e3a5f] px-8 py-3 rounded-full text-sm font-bold hover:bg-[#2a4d7d] dark:hover:bg-white transition-all shadow-lg shadow-blue-900/10">
              076-036 86 28
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="p-2 text-[#1e3a5f] dark:text-white"
              aria-label="Öppna meny"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#1e3a5f] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <Logo size={32} textColor="text-white" />
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="text-white p-2"
                aria-label="Stäng meny"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-4xl font-display font-bold text-white/50 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="w-full bg-[#f59e0b] text-[#1e3a5f] py-5 rounded-2xl font-bold text-xl flex items-center justify-center">
                Få Offert
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
