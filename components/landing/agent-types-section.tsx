"use client";
import { useEffect, useRef, useState } from "react";
import { StackingAgentCards } from "@/components/landing/stacking-agent-cards";
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}
export function AgentTypesSection() {
  const { ref, inView } = useInView(0.1);
  return (
    // NO overflow-hidden here — sticky requires a clean scroll ancestor chain
    <section id="agents" className="relative bg-black pt-24 lg:pt-32 pb-48">
      {/* Ambient glow — pointer-events-none so it never interferes */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
            <span className="w-8 h-px bg-white/20" />
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[0.92] text-white max-w-2xl">
            Research built for real deadlines.
          </h2>
          <p
            className={`mt-6 text-base text-white/50 leading-relaxed max-w-lg transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            From sampling to advanced analytics, every stage is built to
            support strategy teams under real deadlines.
          </p>
        </div>
        {/* Stacking cards — needs a tall parent so cards have scroll room to stack */}
        <StackingAgentCards />
      </div>
    </section>
  );
}
