"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useDarkMode } from "../context/DarkModeProvider";

export default function ScrollBackground({ children }) {
  const { scrollYProgress } = useScroll();
  const { isDarkMode } = useDarkMode();

  const backgroundColor = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const lightBgColor = useTransform(
    backgroundColor,
    [0, 0.33, 0.66, 1],
    [
      "linear-gradient(to right, #C9C1C1, #C9C1C1)",
      "linear-gradient(to right, #C9C1C1, #C9C1C1)",
      "linear-gradient(to right, #C9C1C1, #C9C1C1)",
      "linear-gradient(to right, #C9C1C1, #C9C1C1)",
    ]
  );

  // ✅ Light mode animated text color
  const lightTextColor = useTransform(
    backgroundColor,
    [0, 0.5, 1],
    ["#111111", "#333333", "#ffffff"]
  );

  return (
    <div className="relative min-h-screen flex flex-col transition-all duration-1000">
      {/* Dark Mode Background */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: "linear-gradient(to right, #030712, #030712)",
          opacity: isDarkMode ? 1 : 0,
        }}
      />

      {/* Light Mode Background */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: lightBgColor,
          opacity: isDarkMode ? 0 : 1,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center"
        style={{
          color: isDarkMode ? "#ffffff" : lightTextColor,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
