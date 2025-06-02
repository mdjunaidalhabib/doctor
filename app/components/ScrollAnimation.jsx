"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const ScrollAnimation = ({ children, direction = "left" }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // প্রতিবার স্ক্রল করলে অ্যানিমেশন হবে
    threshold: 0.3, // ২০% এলিমেন্ট ভিজিবল হলেই ট্রিগার করবে
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) setIsVisible(true);
    else setIsVisible(false);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : direction === "left" ? -100 : 100,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
