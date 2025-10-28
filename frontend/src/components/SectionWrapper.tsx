"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionWrapper({
  children,
  className = "",
  delay = 0,
}: SectionWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      viewport={{ once: true }}
      className={`w-full max-w-6xl mx-auto py-20 px-6 md:px-12 lg:px-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}
