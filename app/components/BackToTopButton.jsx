"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="backToTop"
          initial={{ opacity: 0, y: "-100vh", scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: "-100vh", scale: 0.5 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        >
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            title="Back to Top"
            className="w-8 h-8 md:w-14 md:h-14 flex items-center justify-center rounded-bl-lg rounded-tr-lg border border-white/20 shadow-md text-white bg-blue-600 transition-all duration-300"
          >
            <FaArrowUp className="text-lg md:text-xl" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
