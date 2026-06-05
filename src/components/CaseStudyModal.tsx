import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { BlurImage } from './BlurImage';

interface CaseStudyModalProps {
  project: {
    title: string;
    industry: string;
    image: string;
    challenge: string;
    solution: string;
    metrics: string[];
    result: string;
  } | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
          />

          {/* Modal Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto flex-grow">
              {/* Header Image */}
              <div className="relative h-64 md:h-80 w-full">
                <BlurImage
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  containerClassName="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-100 bg-blue-600 rounded-full">
                      {project.industry}
                    </span>
                    <span className="text-white/80 text-sm font-medium">Case Study</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white font-heading tracking-tight">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content area */}
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  
                  {/* Left Column (Challenge & Solution) */}
                  <div className="lg:col-span-2 space-y-10">
                    <section>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-orange-500">01.</span> The Challenge
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.challenge}
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-blue-500">02.</span> The Solution
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.solution}
                      </p>
                    </section>
                  </div>

                  {/* Right Column (Metrics & Results) */}
                  <div className="space-y-8">
                    <div className="bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Results & Metrics
                      </h3>
                      <ul className="space-y-4">
                        {project.metrics.map((metric, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {metric}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-500/20">
                      <h4 className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-2">
                        Key Outcome
                      </h4>
                      <p className="text-2xl font-bold leading-tight">
                        {project.result}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Footer CTA */}
                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      Want similar results for your business?
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Let's build a highly optimized conversion machine.
                    </p>
                  </div>
                  <a 
                    href="#contact" 
                    onClick={onClose}
                    className="flex text-center items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-xl transition-all shadow-lg w-full sm:w-auto justify-center"
                  >
                    Start Your Project <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
