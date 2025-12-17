"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import SocialLinks from "@/components/ui/SocialLinks";
import TypewriterText from "@/components/ui/TypewriterText";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <TypewriterText text="Get In " speed={80} />
            <span className="text-[#06b6d4]">
              <TypewriterText text="Touch" speed={80} delay={300} />
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] mx-auto mb-6 rounded-full" />
          <p className="text-[#94a3b8] text-lg mb-10">
            <TypewriterText
              text="Have a project in mind or want to collaborate on something amazing? I'd love to hear from you."
              speed={20}
              delay={700}
            />
          </p>

          <div className="glass rounded-2xl p-8 md:p-12 mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-[#94a3b8]">
                <MapPin className="w-5 h-5 text-[#06b6d4]" />
                {SITE_CONFIG.location}
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#334155]" />
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-[#94a3b8] hover:text-[#06b6d4] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#06b6d4]" />
                {SITE_CONFIG.email}
              </a>
            </div>

            <a
              href={`mailto:${SITE_CONFIG.email}?subject=Hello from your portfolio!`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#06b6d4] hover:bg-[#22d3ee] text-[#0a0a0f] text-lg font-medium rounded-lg transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <Send className="w-5 h-5" />
              Send Message
            </a>
          </div>

          <div>
            <p className="text-[#64748b] text-sm mb-4">
              Or connect with me on social media
            </p>
            <SocialLinks className="justify-center" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
