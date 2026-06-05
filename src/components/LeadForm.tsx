import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { useAvailability } from "../hooks/useAvailability";

export function LeadForm() {
  const isOnline = useAvailability();
  const [loadCount, setLoadCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleIframeLoad = () => {
    setLoadCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount > 1) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
      return nextCount;
    });
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 bg-gray-900 border-t border-gray-800 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start relative z-10">
        <div className="md:w-1/2 text-left md:sticky md:top-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading text-white mb-6"
          >
            Ready to stop losing to the competition?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 mb-8"
          >
            80% of customers check online before visiting. Where are you? Book a
            free consultation and let's map out a plan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex flex-col gap-3 p-5 bg-gray-800/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm max-w-sm">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3.5 w-3.5">
                  {isOnline && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isOnline ? "bg-green-500" : "bg-red-500"}`}
                  ></span>
                </span>
                <span className="text-white font-semibold flex-1">
                  {isOnline
                    ? "Online - Available Now"
                    : "Offline - Will respond within 24 hours"}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {isOnline
                  ? "I'm online! Feel free to contact me."
                  : "I'm currently offline. My working hours: 8-11 AM & 3-5 PM, Mon-Sat. I'll respond within 24 hours."}
              </p>
              <div className="pt-3 mt-3 border-t border-gray-700/50 flex flex-col gap-2">
                <a
                  href="mailto:rizwanfinancewriter@gmail.com"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  rizwanfinancewriter@gmail.com
                </a>
                <a
                  href="https://wa.me/923478954180"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:w-1/2 w-full relative">
          {/* Success Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-4 left-4 right-4 z-20 bg-green-500 text-white p-4 rounded-2xl shadow-xl flex items-center justify-center gap-3"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">Submitting successful! Thank you.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full bg-white dark:bg-gray-100 rounded-3xl shadow-xl relative overflow-hidden flex flex-col form-wrapper min-h-[600px] sm:min-h-[700px]"
          >
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSefBNDSNr5QDNkPPvhRY4R70dY5-rmVRK2CUjuZkBxXbF9TxQ/viewform?usp=dialog" 
              width="100%" 
              height="100%"
              onLoad={handleIframeLoad}
              className="w-full h-full absolute inset-0 border-none min-h-[600px] sm:min-h-[800px]"
              title="Free Consultation Form"
            >
              Loading…
            </iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
