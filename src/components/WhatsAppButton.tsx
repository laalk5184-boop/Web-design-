import React from 'react';
import { motion } from 'motion/react';

export function WhatsAppButton() {
  const phoneNumber = "923478954180";
  const message = "Hi, I'm interested in a website for my business. Can you share your portfolio?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors cursor-pointer"
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contact on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12.031 2C6.496 2 2 6.496 2 12.032c0 1.764.464 3.473 1.344 4.99L2 22l5.12-1.344A9.972 9.972 0 0012.031 22c5.535 0 10.03-4.496 10.03-10.032S17.566 2 12.031 2zm0 18.39c-1.488 0-2.946-.395-4.225-1.15l-.304-.178-3.136.822.84-3.056-.195-.312A8.344 8.344 0 013.626 12.03C3.626 7.391 7.391 3.626 12.031 3.626S20.435 7.391 20.435 12.03 16.67 20.391 12.031 20.391zM16.66 14.16c-.253-.127-1.496-.738-1.728-.822-.232-.084-.4-.127-.57.127-.168.254-.652.822-.801.99-.15.17-.294.19-.547.064-.253-.127-1.07-.394-2.038-1.254-.753-.672-1.26-1.503-1.408-1.756-.15-.254-.016-.39.11-.518.114-.114.254-.294.38-.444.126-.15.168-.253.253-.422.084-.17.042-.317-.02-.444-.064-.127-.57-1.375-.78-1.884-.207-.492-.417-.425-.57-.433-.148-.008-.317-.008-.486-.008-.168 0-.442.063-.674.316-.232.253-.885.865-.885 2.109 0 1.244.906 2.447 1.033 2.616.127.17 1.782 2.76 4.316 3.823.602.252 1.071.403 1.436.516.604.19 1.155.164 1.591.1.486-.072 1.496-.61 1.706-1.203.21-.592.21-1.1.148-1.203-.064-.105-.233-.17-.486-.295z" />
      </svg>
    </motion.a>
  );
}
