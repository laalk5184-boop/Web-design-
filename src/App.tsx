/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { LogoTicker } from './components/LogoTicker';
import { Metrics } from './components/Metrics';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { GlobalReach } from './components/GlobalReach';
import { FAQ } from './components/FAQ';
import { LeadForm } from './components/LeadForm';
import { ShareButton } from './components/ShareButton';
import { ConsultationModal } from './components/ConsultationModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Moon, Sun } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      // Reload page if idle for 5 minutes
      timeoutId = setTimeout(() => {
        window.location.reload();
      }, 5 * 60 * 1000);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    // Initial setup
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-gray-50 outline-none selection:bg-blue-500/30">
      
      {/* Header & Theme Toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            Studio<span className="text-blue-600 dark:text-blue-400">XYZ</span>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>
      
      <main className="pt-16">
        <Hero onOpenConsultation={() => setIsConsultationModalOpen(true)} />
        <LogoTicker />
        <Metrics />
        <Portfolio />
        <Services />
        <GlobalReach />
        <Testimonials />
        <FAQ />
        <LeadForm />
      </main>
      
      <ShareButton />
      <WhatsAppButton />
      
      <ConsultationModal 
        isOpen={isConsultationModalOpen} 
        onClose={() => setIsConsultationModalOpen(false)} 
      />

      {/* Footer */}
      <footer className="footer bg-gray-950 py-12 border-t border-gray-800 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6 flex items-center justify-center gap-4">
            <a href="mailto:rizwanfinancewriter@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              rizwanfinancewriter@gmail.com
            </a>
            <span className="text-gray-700">|</span>
            <a href="https://wa.me/923478954180" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
              Chat on WhatsApp
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} StudioXYZ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

