import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Zap, Smartphone, CheckCircle } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  onOpenConsultation: () => void;
}

export function Hero({ onOpenConsultation }: HeroProps) {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-50 dark:from-blue-900/30 dark:opacity-100"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-medium text-sm mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
          Accepting new projects
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
        >
          Custom Websites That Book Appointments & <span className="text-blue-600 dark:text-blue-400">Generate Leads</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Seen 100+ salon and real estate websites. Let me show you what a real conversion-optimized site looks like. Starting at $1,500.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a 
            href="#portfolio" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            See My Portfolio <ArrowRight className="w-5 h-5" />
          </a>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onOpenConsultation();
            }}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-all border border-gray-200 dark:border-gray-700"
          >
            Get Free Consultation
          </button>
        </motion.div>
        
        {/* Social Proof Badges in Hero */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex -space-x-4 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img 
                key={i}
                src={`https://i.pravatar.cc/100?img=${i * 5}`} 
                alt="Client" 
                className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-950 object-cover"
              />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-950 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
              <AnimatedCounter end={50} suffix="+" />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5 justify-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="whitespace-nowrap">5.0 from <AnimatedCounter end={30} suffix="+" /> clients</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Trusted in 8 countries
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges Bar */}
      <div className="mt-16 sm:mt-24 max-w-5xl mx-auto border-t border-b border-gray-200 dark:border-gray-800 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">100% Mobile Friendly</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Fast Delivery (5-7 days)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">24/7 Support</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Free Demo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
