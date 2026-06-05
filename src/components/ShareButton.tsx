import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Twitter, MessageCircle, X } from 'lucide-react';

export function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://example.com';
  const text = "Check out this high-converting digital portfolio! 🔥";
  
  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-start gap-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        title="Share this portfolio"
        className="w-14 h-14 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center transition-transform hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 pl-1"
          >
            <button
              onClick={handleWhatsAppShare}
              className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
              title="Share on WhatsApp"
            >
              <MessageCircle fill="currentColor" className="w-6 h-6" />
            </button>
            <button
              onClick={handleTwitterShare}
              className="w-12 h-12 bg-black hover:bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
              title="Share on X (Twitter)"
            >
              <Twitter fill="currentColor" className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
