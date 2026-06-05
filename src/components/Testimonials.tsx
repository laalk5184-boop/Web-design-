import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { testimonials as defaultTestimonials } from '../data';
import { Quote, Star, BadgeCheck } from 'lucide-react';
import { db } from '../admin/Dashboard';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export function Testimonials() {
  const [items, setItems] = useState<any[] | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setItems(defaultTestimonials);
      }
    });
    return () => unsub();
  }, []);

  const displayItems = items || defaultTestimonials;

  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-950 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-4">
            Don't Just Take My Word For It
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-6 mb-8 text-gray-700 dark:text-gray-300 font-medium">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-6 py-3 rounded-full border border-gray-100 dark:border-gray-800">
              <BadgeCheck className="w-6 h-6 text-green-500" />
              <span>Trusted by 50+ clients</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-6 py-3 rounded-full border border-gray-100 dark:border-gray-800">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span>4.9 ★ (based on 30+ reviews)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayItems.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.15 }}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl relative border border-gray-100 dark:border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col h-full mt-4"
            >
              <div className="absolute top-0 right-6 -translate-y-1/2 flex items-center gap-2 bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full z-10">
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 tracking-wide uppercase">Google Verified</span>
              </div>

              <Quote className="absolute top-8 right-8 w-12 h-12 text-gray-200/50 dark:text-gray-800/50 pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6 z-10 relative">
                {testimonial.photo && (
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name}
                    className="w-16 h-16 object-cover rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                  />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5 mb-1 text-sm text-gray-600 dark:text-gray-400">
                    <span>{testimonial.business}</span>
                    <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold text-xs">
                      <BadgeCheck className="w-4 h-4" /> Verified Client
                    </span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-lg font-medium leading-relaxed italic z-10 flex-grow">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
