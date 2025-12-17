"use client";

import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { PUBLICATIONS } from "@/lib/constants";
import TypewriterText from "@/components/ui/TypewriterText";

export default function Publications() {
  return (
    <section id="publications" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            <TypewriterText text="Research & " speed={80} />
            <span className="text-[#06b6d4]">
              <TypewriterText text="Publications" speed={80} delay={400} />
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] mx-auto mb-6 rounded-full" />
          <p className="text-[#94a3b8] text-center mb-12">
            <TypewriterText
              text="Peer-reviewed publications in computational biology and data platforms."
              speed={20}
              delay={1200}
            />
          </p>

          <div className="space-y-4">
            {PUBLICATIONS.map((pub, index) => (
              <motion.a
                key={pub.title}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-start gap-4 p-6 glass rounded-xl transition-all duration-300 hover:border-[#06b6d4]/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
              >
                <div className="p-3 bg-[#1e293b] rounded-lg text-[#06b6d4] group-hover:bg-[#06b6d4]/20 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1 group-hover:text-[#06b6d4] transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-[#64748b] text-sm">{pub.venue}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-[#64748b] group-hover:text-[#06b6d4] transition-colors flex-shrink-0" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
