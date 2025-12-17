"use client";

import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";

export default function ProjectsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
        <TypewriterText text="My " speed={80} />
        <span className="text-[#06b6d4]">
          <TypewriterText text="Projects" speed={80} delay={300} />
        </span>
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] mx-auto mb-6 rounded-full" />
      <p className="text-[#94a3b8] max-w-2xl mx-auto">
        <TypewriterText
          text="Open source projects focusing on AI agent systems, infrastructure tooling, and developer productivity."
          speed={20}
          delay={800}
        />
      </p>
    </motion.div>
  );
}
