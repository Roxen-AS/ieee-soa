"use client";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";
import { EVENTS, type EventType } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";

const BADGE_STYLES: Record<EventType, { border: string; color: string }> = {
  Workshop:    { border:"rgba(200,255,0,0.3)",  color:"var(--a1)" },
  Hackathon:   { border:"rgba(255,45,85,0.3)",  color:"var(--a2)" },
  Seminar:     { border:"rgba(0,212,255,0.3)",  color:"var(--a3)" },
  Competition: { border:"rgba(155,95,255,0.3)", color:"var(--a4)" },
};

export default function EventsPage() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="page-enter">
      <section style={{ padding:"72px 40px" }}>
        <SectionHeader index="03" meta="2024 — 2025" title="Events & Activities" />
        <div style={{ border:"1px solid var(--ln)" }}>
          {EVENTS.map((ev, i) => (
            <EventRow key={ev.id} ev={ev} delay={i + 1} last={i === EVENTS.length - 1} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function EventRow({ ev, delay, last }: { ev: typeof EVENTS[0]; delay: number; last: boolean }) {
  const [hov, setHov] = useState(false);
  const badge = BADGE_STYLES[ev.type];

  return (
    <div
      className={`reveal delay-${delay}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"grid",
        gridTemplateColumns:"72px 110px 1fr 44px",
        gap:28,
        alignItems:"center",
        padding:"24px 32px",
        borderBottom: last ? "none" : "1px solid var(--ln)",
        background: hov ? "rgba(17,25,41,0.7)" : "transparent",
        transition:"background 0.25s",
        position:"relative",
        overflow:"hidden",
        cursor:"default",
      }}
    >
      {/* Left accent bar */}
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2, background:"linear-gradient(to bottom,var(--a1),var(--a3))", transform: hov ? "scaleY(1)" : "scaleY(0)", transformOrigin:"top", transition:"transform 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
      {/* Gradient wash */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(200,255,0,0.02),transparent)", opacity: hov ? 1 : 0, transition:"opacity 0.3s", pointerEvents:"none" }} />

      {/* Index */}
      <div style={{ fontFamily:"Oxanium,monospace", fontWeight:800, fontSize:40, color: hov ? "var(--a1)" : "var(--ln2)", lineHeight:1, letterSpacing:-1, transition:"color 0.25s, text-shadow 0.25s", textShadow: hov ? "0 0 20px rgba(200,255,0,0.4)" : "none" }}>
        {String(ev.id).padStart(2,"0")}
      </div>

      {/* Date */}
      <div style={{ textAlign:"center" }}>
        <div style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a3)", letterSpacing:2, textTransform:"uppercase" }}>{ev.month}</div>
        <div style={{ fontFamily:"Oxanium,monospace", fontWeight:800, fontSize:36, color:"var(--ink)", lineHeight:1, letterSpacing:-1 }}>{ev.day}</div>
        <div style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--ink3)", letterSpacing:1, textTransform:"uppercase" }}>{ev.year}</div>
      </div>

      {/* Content */}
      <div>
        <div style={{ display:"inline-block", fontFamily:"Space Mono,monospace", fontSize:8, letterSpacing:1.5, textTransform:"uppercase", padding:"3px 10px", border:`1px solid ${badge.border}`, color:badge.color, marginBottom:8 }}>
          {ev.type}
        </div>
        <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:700, fontSize:18, color:"var(--ink)", marginBottom:6, letterSpacing:0.3 }}>{ev.name}</div>
        <div style={{ fontSize:12, color:"var(--ink2)", lineHeight:1.65, fontWeight:300 }}>{ev.crux}</div>
      </div>

      {/* Arrow */}
      <div style={{ fontFamily:"Space Mono,monospace", fontSize:18, color: hov ? "var(--a1)" : "var(--ink3)", transform: hov ? "rotate(-45deg) scale(1.2)" : "none", textShadow: hov ? "0 0 12px rgba(200,255,0,0.6)" : "none", transition:"all 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
        ↗
      </div>
    </div>
  );
}
