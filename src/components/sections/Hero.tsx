"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import TypewriterText from "@/components/ui/TypewriterText";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-[#06b6d4] text-sm md:text-base font-medium tracking-wider uppercase mb-4"
        >
          <TypewriterText
            text={`${SITE_CONFIG.yearsExperience} years of experience`}
            speed={50}
            delay={300}
            startImmediately
          />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
        >
          <TypewriterText
            text={`Hi, I'm ${SITE_CONFIG.name}`}
            speed={60}
            delay={1500}
            startImmediately
            className="gradient-text"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xl md:text-2xl text-[#94a3b8] mb-4"
        >
          <TypewriterText
            text="Cloud Innovation & AI Automation Leader"
            speed={40}
            delay={3000}
            startImmediately
          />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-[#64748b] max-w-2xl mx-auto mb-10"
        >
          <TypewriterText
            text="Architecting AI-powered solutions and scalable infrastructure at hyperscale. Specializing in agent systems, LLMs, and cloud-native architecture."
            speed={25}
            delay={4800}
            startImmediately
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-[#06b6d4] hover:bg-[#22d3ee] text-[#0a0a0f] font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-[#334155] hover:border-[#06b6d4] text-white font-medium rounded-lg transition-all"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 9, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-[#64748b] hover:text-[#06b6d4] transition-colors">
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
