import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2 } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [loadCount, setLoadCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setLoadCount(0); // Reset on open
      setShowToast(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl relative overflow-y-auto pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Header / Close Button */}
              <div className="absolute top-4 right-4 z-10 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md rounded-full p-1 flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success Toast for Modal */}
              <AnimatePresence>
                {showToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-4 left-4 right-16 z-20 bg-green-500 text-white p-4 rounded-2xl shadow-xl flex items-center justify-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-semibold">Submitting successful! Thank you.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Standard embedded Google Form */}
              <div className="relative w-full flex-1 bg-white overflow-hidden rounded-[2rem] min-h-[600px] sm:min-h-[800px]">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSefBNDSNr5QDNkPPvhRY4R70dY5-rmVRK2CUjuZkBxXbF9TxQ/viewform?usp=dialog"
                  width="100%"
                  height="100%"
                  onLoad={handleIframeLoad}
                  className="w-full h-full absolute inset-0 border-none min-h-[600px] sm:min-h-[800px]"
                  title="Free Consultation Form"
                >
                  Loading...
                </iframe>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
