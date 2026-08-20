"use client"

import { useEffect, useRef, useState } from "react"

const AGENTS = [
  {
    label: "ONLINE SAMPLING",
    title: "Audience reach, quality screened",
    desc: "Recruit the exact respondents your study needs — quota-managed, fraud-checked, and screened for relevance before a single response counts.",
    stats: [{ v: "5.4M+", l: "panel reach" }, { v: "96%", l: "quality pass rate" }],
    img: "https://res.cloudinary.com/drvug594q/image/upload/v1787167589/flow-9a45c043-c701-4d09-b8cc--erasio_a7d1y0.jpg",
  },
  {
    label: "DATA COLLECTION",
    title: "Live fieldwork, quota-controlled",
    desc: "Real-time quota tracking and field checks across every market, so fieldwork stays clean and on schedule from launch to close.",
    stats: [{ v: "40+", l: "markets fielded" }, { v: "99.1%", l: "field completion" }],
    img: "https://res.cloudinary.com/drvug594q/image/upload/v1787167490/flow-45f3a8c9-a082-41c9-be8b--erasio_o9jx1h.jpg",
  },
  {
    label: "DATA PROCESSING",
    title: "Cleaning, structuring, delivery",
    desc: "Raw responses become decision-ready datasets — cleaned, weighted, and structured for the analysis your team actually needs.",
    stats: [{ v: "84%", l: "avg. cleaning yield" }, { v: "72hr", l: "turnaround" }],
    img: "https://res.cloudinary.com/drvug594q/image/upload/v1787167495/flow-7282ca56-90d3-4db8-aeda--erasio_s68sjo.jpg",
  },
  {
    label: "ADVANCED ANALYTICS",
    title: "Predictive & prescriptive insight",
    desc: "Go beyond the topline — predictive models, data mining, and prescriptive recommendations that point to a clear next move.",
    stats: [{ v: "12x", l: "faster to insight" }, { v: "230+", l: "studies analyzed" }],
    img: "https://res.cloudinary.com/drvug594q/image/upload/v1787167490/flow-3f928701-3d83-42b9-bc9e--erasio_cf6egw.jpg",
  },
]

const STICKY_TOP  = 80   // top offset for the first sticky card
const STICKY_STEP = 16   // each subsequent card stacks 16 px lower
const SCALE_STEP  = 0.04 // scale reduction per card stacked on top
const OFFSET_STEP = 8    // px pushed down per card stacked on top

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-widest font-mono text-white/40 bg-white/[0.06] border border-white/[0.08]">
      {children}
    </span>
  )
}

export function StackingAgentCards() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  // depth[i] = how many cards are currently stacked on top of card i
  const [depth, setDepth] = useState<number[]>(AGENTS.map(() => 0))

  useEffect(() => {
    function onScroll() {
      const nextDepth = AGENTS.map((_, i) => {
        let count = 0
        for (let j = i + 1; j < AGENTS.length; j++) {
          const el = cardRefs.current[j]
          if (!el) continue
          const rect = el.getBoundingClientRect()
          const stickyTopJ = STICKY_TOP + j * STICKY_STEP
          if (rect.top <= stickyTopJ + 2) count++
        }
        return count
      })
      setDepth(nextDepth)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="flex flex-col" style={{ perspective: "1400px", perspectiveOrigin: "50% 0%" }}>
      {AGENTS.map((agent, i) => {
        const d          = depth[i]
        const scale      = 1 - d * SCALE_STEP
        const translateY = d * OFFSET_STEP

        return (
          <div
            key={agent.label}
            ref={el => { cardRefs.current[i] = el }}
            className="sticky mb-4"
            style={{ top: `${STICKY_TOP + i * STICKY_STEP}px`, zIndex: 10 + i }}
          >
            <div
              style={{
                transform:       `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "top center",
                transition:      "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                willChange:      "transform",
              }}
            >
              <div className="group relative rounded-2xl border border-white/[0.08] overflow-hidden cursor-pointer hover:border-white/20 transition-colors duration-300"
                   style={{ background: "oklch(0.12 0.008 260)" }}>

                {/* ── MOBILE: image top, fades out at bottom ── */}
                {agent.img && (
                  <div className="relative w-full h-52 pointer-events-none md:hidden">
                    <img
                      src={agent.img}
                      alt={agent.label}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
                      style={{
                        maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
                      }}
                    />
                  </div>
                )}

                {/* ── DESKTOP: image right, fades out at left (absolute) ── */}
                {agent.img && (
                  <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 pointer-events-none">
                    <img
                      src={agent.img}
                      alt={agent.label}
                      className="w-full h-full object-cover object-center opacity-50"
                    />
                    {/* Fade from card bg colour toward the image */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to right, oklch(0.12 0.008 260) 0%, transparent 55%)",
                      }}
                    />
                  </div>
                )}

                {/* Text content */}
                <div className="relative z-10 p-8">
                  <div className="md:max-w-[60%]">
                    <div className="flex items-start justify-between mb-6">
                      <Tag>{agent.label}</Tag>
                    </div>
                    <h3 className="text-xl font-light mb-3 text-white">{agent.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed mb-6">{agent.desc}</p>
                  </div>
                  {/* Divider border removed below */}
                  <div className="flex gap-8">
                    {agent.stats.map(s => (
                      <div key={s.l}>
                        <div className="text-2xl font-light text-white">{s.v}</div>
                        <div className="text-[11px] text-white/35 tracking-widest mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
