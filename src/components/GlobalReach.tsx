import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Globe, Users, Zap, Expand, X } from 'lucide-react';

const locations = [
  { id: 'ny', name: 'New York', top: '35%', left: '28%', clients: 24 },
  { id: 'ldn', name: 'London', top: '25%', left: '47%', clients: 18 },
  { id: 'db', name: 'Dubai', top: '42%', left: '60%', clients: 12 },
  { id: 'sg', name: 'Singapore', top: '55%', left: '75%', clients: 8 },
  { id: 'syd', name: 'Sydney', top: '75%', left: '85%', clients: 5 },
  { id: 'sf', name: 'San Francisco', top: '38%', left: '15%', clients: 14 },
  { id: 'sp', name: 'São Paulo', top: '65%', left: '33%', clients: 9 },
];

export function GlobalReach() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const handleLocationClick = (id: string) => {
    setActiveLocation(activeLocation === id ? null : id);
  };

  const handleViewProjects = (locationName: string) => {
    setIsMapModalOpen(false);
    // Dispatch a custom event that Portfolio can listen to (or just scroll to portfolio)
    window.dispatchEvent(new CustomEvent('filterPortfolio', { detail: { location: locationName } }));
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="global-reach-map" className="py-24 bg-white dark:bg-gray-950 overflow-hidden relative border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase mb-6"
          >
            <Globe className="w-4 h-4" />
            Global Reach
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading tracking-tight"
          >
            Trusted by Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Worldwide</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Delivering high-performance, bespoke web solutions to visionary brands and businesses across 15+ countries.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto mt-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          
          {/* Subtle gradient overlay to make map connections pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 dark:to-gray-950/50 z-10"></div>
          
          {/* The stylized map snapshot */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            {/* We use a stylized map background image for the snapshot */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2744&auto=format&fit=crop" 
              alt="Global map" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-40 grayscale mix-blend-multiply dark:mix-blend-lighten"
            />
            
            {/* Add an SVG dot-pattern grid to make it look tech/interactive */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] mix-blend-overlay"></div>

            {/* Glowing Connection Lines (Abstract, SVG) */}
            <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-40 dark:opacity-60" preserveAspectRatio="none">
              <path d="M 15% 38% Q 35% 15% 47% 25%" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="1" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M 47% 25% Q 55% 45% 60% 42%" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="1" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M 60% 42% Q 70% 30% 75% 55%" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 28% 35% Q 30% 50% 33% 65%" fill="none" stroke="currentColor" className="text-cyan-500" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Nodes for locations */}
            {locations.map((loc, i) => (
              <div 
                key={loc.id}
                className="absolute z-30 flex flex-col items-center"
                style={{ top: loc.top, left: loc.left, transform: 'translate(-50%, -50%)' }}
              >
                {/* Ping effect (clickable) */}
                <button
                  onClick={() => handleLocationClick(loc.id)}
                  className="relative flex h-4 w-4 md:h-5 md:w-5 group focus:outline-none"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className={`relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 border-2 border-white shadow-md transition-colors ${activeLocation === loc.id ? 'bg-cyan-500' : 'bg-blue-500 group-hover:bg-cyan-400'}`}></span>
                </button>
                
                {/* Persistent Popover */}
                <AnimatePresence>
                  {activeLocation === loc.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute top-full mt-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-4 rounded-2xl shadow-2xl z-50 flex flex-col items-center min-w-[200px]"
                    >
                      <h4 className="font-bold text-lg mb-1">{loc.name}</h4>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold text-gray-900 dark:text-white">{loc.clients}</span> Client Successes
                      </div>
                      <button 
                        onClick={() => handleViewProjects(loc.name)}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        View Projects
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Stats Bar Overlay at the bottom of the map */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-20 py-4 px-6 flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">Clients Worldwide</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">100+</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-gray-800"></div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/40 rounded-lg">
                <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">Countries Reached</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">15+</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-gray-800"></div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg">
                <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">Avg Load Time</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white"><span className="text-indigo-600 dark:text-indigo-400 pb-px">&lt;</span> 1.2s</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-gray-800"></div>

            <button 
              onClick={() => setIsMapModalOpen(true)}
              className="group flex flex-col md:flex-row items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Expand interactive map"
            >
              <Expand className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm font-semibold tracking-wide">Expand Map</span>
            </button>
          </div>

        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {isMapModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-[999]"
              onClick={() => setIsMapModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-4 bottom-4 left-4 right-4 md:top-10 md:bottom-10 md:left-10 md:right-10 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl z-[1000] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 md:px-8 md:py-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Global Client Distribution</h3>
                </div>
                <button 
                  onClick={() => setIsMapModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="relative flex-1 bg-gray-50 dark:bg-gray-900 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2744&auto=format&fit=crop" 
                  alt="Global map full view" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-40 grayscale mix-blend-multiply dark:mix-blend-lighten"
                />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:30px_30px] mix-blend-overlay"></div>
                
                <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-50 dark:opacity-60" preserveAspectRatio="none">
                  <path d="M 15% 38% Q 35% 15% 47% 25%" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2" strokeDasharray="6 6">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                  </path>
                  <path d="M 47% 25% Q 55% 45% 60% 42%" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2" strokeDasharray="6 6">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 60% 42% Q 70% 30% 75% 55%" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2" strokeDasharray="6 6" />
                  <path d="M 28% 35% Q 30% 50% 33% 65%" fill="none" stroke="currentColor" className="text-cyan-500" strokeWidth="2" strokeDasharray="6 6" />
                </svg>

                {locations.map((loc, i) => (
                  <div 
                    key={loc.id}
                    className="absolute z-30 flex flex-col items-center"
                    style={{ top: loc.top, left: loc.left, transform: 'translate(-50%, -50%)' }}
                  >
                    <button
                      onClick={() => handleLocationClick(loc.id)}
                      className="relative flex h-6 w-6 md:h-8 md:w-8 group focus:outline-none"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className={`relative inline-flex rounded-full h-6 w-6 md:h-8 md:w-8 border-[3px] border-white dark:border-gray-900 shadow-lg transition-colors ${activeLocation === loc.id ? 'bg-cyan-500' : 'bg-blue-500 group-hover:bg-cyan-400'}`}></span>
                    </button>
                    
                    <AnimatePresence>
                      {activeLocation === loc.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute top-full mt-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white p-4 rounded-2xl shadow-2xl z-50 flex flex-col items-center min-w-[200px]"
                        >
                          <h4 className="font-bold text-lg mb-1">{loc.name}</h4>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            <Users className="w-4 h-4" />
                            <span className="font-semibold text-gray-900 dark:text-white">{loc.clients}</span> Client Successes
                          </div>
                          <button 
                            onClick={() => handleViewProjects(loc.name)}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
                          >
                            View Projects
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
