"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { SITE_CONFIG, SKILLS, STATS, COMPANIES } from "@/lib/constants";
import TypewriterText from "@/components/ui/TypewriterText";

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            <TypewriterText text="About Me" speed={80} />
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] mx-auto mb-12 rounded-full" />

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Bio */}
            <div className="glass rounded-2xl p-8">
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-6">
                <TypewriterText
                  text={`Visionary technical leader with ${SITE_CONFIG.yearsExperience} years architecting and scaling systems from genomics research to Apple-scale deployments. Expert in AI-accelerated computing, achieving 112K inferences/second while reducing costs by 60%.`}
                  speed={20}
                  delay={800}
                />
              </p>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                <TypewriterText
                  text={`Currently leading AI/ML & SDLC Intelligence at Apple, building intelligent agent frameworks and knowledge-driven engineering platforms used across thousands of teams. Based in ${SITE_CONFIG.location}.`}
                  speed={20}
                  delay={6000}
                />
              </p>

              {/* Inline Stats */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {STATS.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-3 bg-[#1e293b] rounded-lg border border-[rgba(148,163,184,0.1)]"
                  >
                    <div className="text-[#06b6d4] text-lg font-bold">{stat.value}</div>
                    <div className="text-[#64748b] text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Companies */}
              <div className="mb-8">
                <p className="text-[#64748b] text-sm mb-3">Previously at</p>
                <div className="flex flex-wrap gap-2">
                  {COMPANIES.map((company) => (
                    <span
                      key={company.name}
                      className="px-3 py-1.5 bg-[#1e293b] text-[#94a3b8] rounded-md text-sm border border-[rgba(148,163,184,0.1)]"
                    >
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#06b6d4] hover:bg-[#22d3ee] text-[#0a0a0f] font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              {Object.entries(SKILLS).map(([category, skills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-xl p-6"
                >
                  <h3 className="text-sm font-medium text-[#06b6d4] mb-3 uppercase tracking-wider">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-[#1e293b] text-[#94a3b8] rounded-md text-sm border border-[rgba(148,163,184,0.1)] hover:border-[#06b6d4]/50 hover:text-[#06b6d4] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
