import React from "react";
import { motion } from "motion/react";

interface FadeInUpProps {
  children: React.ReactNode;
}

export default function FadeInUp({ children }: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 1.02, 0.43, 1.01] }}
    >
      {children}
    </motion.div>
  );
}
