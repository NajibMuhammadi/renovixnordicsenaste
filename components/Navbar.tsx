'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Sparkles as Bucket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Start', href: '#' },
    { name: 'Tjänster', href: '#tjanster' },
    { name: 'RUT-avdrag', href: '#rut' },
    { name: 'Om oss', href: '#om-oss' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg text-white transform group-hover:rotate-12 transition-transform">
              <Bucket size={24} />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              RENOVIX<span className="font-light">NORDIC</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${scrolled ? 'text-slate-600' : 'text-white/90 font-semibold'}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:0760368628"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Phone size={16} />
              076-036 86 28
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center text-white">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-slate-900' : 'text-white'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-3">
                <a
                  href="tel:0760368628"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-3 font-bold"
                >
                  <Phone size={18} />
                  Ring oss nu
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
