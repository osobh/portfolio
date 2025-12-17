"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  className?: string;
  startImmediately?: boolean;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 60,
  delay = 0,
  cursor = true,
  className = "",
  startImmediately = false,
  onComplete,
}: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const shouldStart = startImmediately || isInView;

  useEffect(() => {
    if (!shouldStart || isDone) return;

    const timer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsDone(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [shouldStart, text, speed, delay, isDone, onComplete]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && !isDone && (
        <span className="typewriter-cursor">|</span>
      )}
      {/* Invisible text to maintain layout space */}
      <span className="invisible">{text.slice(displayText.length)}</span>
    </span>
  );
}
