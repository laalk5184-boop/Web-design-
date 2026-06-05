import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { pricingPlans as defaultPricingPlans } from '../data';
import { Check, ArrowRight, Star, X, Info } from 'lucide-react';
import { db } from '../admin/Dashboard';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export function Services() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [plans, setPlans] = useState<any[] | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'pricing_plans'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setPlans(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setPlans(defaultPricingPlans);
      }
    });
    return () => unsub();
  }, []);

  const displayPlans = plans || defaultPricingPlans;
  const selectedPlan = displayPlans.find((p: any) => p.id === selectedPlanId);

  return (
    <section id="services" className="py-24 px-4 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col items-center mb-20 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 font-semibold text-sm tracking-wide mb-6 shadow-sm">
          Simple Pricing
        </span>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 dark:text-white mb-6 leading-tight max-w-3xl"
        >
          Transparent Pricing. <br className="hidden sm:block"/>
          <span className="text-gray-500 dark:text-gray-400 font-light">No Monthly Subscriptions.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl font-light"
        >
          Pay once and completely own your digital asset. Engineered for local businesses ranging from salons and real estate agents to enterprise operations.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {displayPlans.map((plan: any, index: number) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className={`relative rounded-3xl overflow-hidden transition-all duration-300 flex flex-col bg-white dark:bg-gray-950 ${
              plan.highlight 
                ? 'border border-gray-900 dark:border-gray-100 shadow-xl lg:scale-[1.02] z-10' 
                : 'border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="p-8 sm:p-10 pb-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight uppercase">
                  {plan.title}
                </h3>
                {plan.badge && (
                  <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase border ${
                    plan.highlight 
                      ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900' 
                      : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {plan.badge === 'BEST VALUE' ? <Star className="w-3 h-3 inline mr-1 mb-0.5" /> : null}
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="mb-4 flex items-end gap-1">
                <span className="text-5xl font-bold font-heading text-gray-900 dark:text-white tracking-tighter">
                  {plan.price}
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 ml-1">/ One-time</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-10 min-h-[60px]">
                {plan.description}
              </p>
              
              <a 
                href="#contact" 
                className={`w-full inline-flex items-center justify-center px-6 py-4 font-semibold text-sm uppercase tracking-wider rounded-xl transition-all ${
                  plan.highlight
                    ? 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800'
                    : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800'
                }`}
              >
                Get Started
              </a>
            </div>

            <div className="p-8 sm:p-10 flex-1 mt-2">
              <div className="h-px w-full bg-gray-100 dark:bg-gray-800 mb-8"></div>
              <ul className="space-y-4">
                {plan.features?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-4">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                      plan.highlight ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'
                    }`} strokeWidth={3} />
                    <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {feature.includes('Everything in') ? (
                        <span className="font-semibold text-gray-900 dark:text-white">{feature}</span>
                      ) : (
                        feature
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => setSelectedPlanId(plan.id)}
                className="mt-8 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-center w-full gap-2 transition-colors"
                title="View Technical Details"
              >
                <Info className="w-4 h-4" /> Detailed Technical Breakdown
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlanId(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-950 rounded-3xl shadow-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-gray-200 dark:border-gray-800"
            >
              <div className="p-6 sm:p-8 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {selectedPlan.title} Architecture
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Technical Specifications & Scope
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPlanId(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {selectedPlan.technicalDetails?.map((detail: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 mt-1 shrink-0 text-blue-500" strokeWidth={3} />
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
                <button
                  onClick={() => setSelectedPlanId(null)}
                  className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
