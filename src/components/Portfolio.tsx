import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioItems as defaultPortfolio } from '../data';
import { ExternalLink, X, MapPin } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';
import { db } from '../admin/Dashboard';
import { collection, onSnapshot } from 'firebase/firestore';

import { BlurImage } from './BlurImage';

function PortfolioCard({ item, index, onClick }: { item: any, index: number, onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col h-full cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container with Hover Effect */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800">
        <BlurImage 
          src={item.image} 
          alt={item.title} 
          referrerPolicy="no-referrer"
          className="group-hover:scale-105"
          containerClassName="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105">
            View Case Study <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {item.industry}
          </span>
        </div>
        <div className="mt-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 flex items-start gap-2">
          <span className="text-xl">🚀</span>
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
            {item.result}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [dbItems, setDbItems] = useState<any[] | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'projects'), (snap) => {
      if (!snap.empty) {
        setDbItems(snap.docs.map(d => ({ id: d.id, ...d.data() }) as any));
      } else {
        setDbItems(defaultPortfolio);
      }
    });

    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.location) {
        setLocationFilter(customEvent.detail.location);
      }
    };
    
    window.addEventListener('filterPortfolio', handleFilterEvent);
    return () => {
      window.removeEventListener('filterPortfolio', handleFilterEvent);
      unsub();
    };
  }, []);

  const items = dbItems || defaultPortfolio;

  const filteredItems = locationFilter 
    ? items.filter(item => item.location === locationFilter)
    : items;

  return (
    <section id="portfolio" className="py-20 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-4">
            Recent Work
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I don't just build websites. I build customer acquisition machines. 
            Here is a look at what that actually means.
          </p>
          
          <AnimatePresence>
            {locationFilter && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 flex items-center justify-center gap-3"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full font-medium border border-blue-100 dark:border-blue-800">
                  <MapPin className="w-4 h-4" />
                  Showing projects in: {locationFilter}
                  <button 
                    onClick={() => setLocationFilter(null)}
                    className="ml-2 p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition-colors focus:outline-none"
                    aria-label="Clear filter"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">We don't have detailed case studies for this location yet.</p>
            <button 
              onClick={() => setLocationFilter(null)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
            >
              View All Projects
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <PortfolioCard
                    item={item}
                    index={index}
                    onClick={() => setSelectedProject(item)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <CaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
