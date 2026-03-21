"use client";
import { useState } from "react";
import { SectionHeader, Footer } from "@/components/UI";
import { EVENTS, type EventType } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

const BADGE: Record<EventType, { border: string; color: string }> = {
  Workshop:    { border:"rgba(200,255,0,0.3)",  color:"var(--a1)" },
  Hackathon:   { border:"rgba(255,45,85,0.3)",  color:"var(--a2)" },
  Seminar:     { border:"rgba(0,212,255,0.3)",  color:"var(--a3)" },
  Competition: { border:"rgba(155,95,255,0.3)", color:"var(--a4)" },
};

export default function EventsPage() {
  const ref = useReveal();
  return (
    <div ref={ref} className="page-enter">
      <section style={{ padding:"clamp(40px,6vw,72px) clamp(20px,5vw,48px)" }}>
        <SectionHeader index="03" meta="2024 — 2025" title="Events & Activities" />
        <div style={{ border:"1px solid var(--card-border)", borderRadius:12, overflow:"hidden", transition:"border-color .3s" }}>
          {EVENTS.map((ev, i) => (
            <EventRow key={ev.id} ev={ev} delay={i + 1} isLast={i === EVENTS.length - 1} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function EventRow({ ev, delay, isLast }: { ev: typeof EVENTS[0]; delay: number; isLast: boolean }) {
  const [hov, setHov] = useState(false);
  const b = BADGE[ev.type];
  return (
    <div
      className={`reveal delay-${delay} ev-grid-row`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"grid", gridTemplateColumns:"64px 100px 1fr 36px", gap:20, alignItems:"center", padding:"22px 28px", borderBottom:isLast?"none":"1px solid var(--ln)", background:hov?"var(--card-bg)":"transparent", transition:"background .25s,border-color .3s", cursor:"default", position:"relative", overflow:"hidden" }}
    >
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2, background:"linear-gradient(to bottom,var(--a1),var(--a3))", transform:hov?"scaleY(1)":"scaleY(0)", transformOrigin:"top", transition:"transform .4s cubic-bezier(.22,1,.36,1)" }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(200,255,0,0.02),transparent)", opacity:hov?1:0, transition:"opacity .3s", pointerEvents:"none" }}/>

      <div style={{ fontFamily:"Oxanium,monospace", fontWeight:800, fontSize:36, color:hov?"var(--a1)":"var(--ln2)", lineHeight:1, transition:"color .25s", letterSpacing:-1 }}>
        {String(ev.id).padStart(2,"0")}
      </div>

      <div className="ev-date-col" style={{ textAlign:"center" }}>
        <div style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a3)", letterSpacing:2, textTransform:"uppercase", transition:"color .3s" }}>{ev.month}</div>
        <div style={{ fontFamily:"Oxanium,monospace", fontWeight:800, fontSize:32, color:"var(--ink)", lineHeight:1, letterSpacing:-1, transition:"color .3s" }}>{ev.day}</div>
        <div style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--ink3)", letterSpacing:1, textTransform:"uppercase", transition:"color .3s" }}>{ev.year}</div>
      </div>

      <div>
        <div style={{ display:"inline-block", fontFamily:"Space Mono,monospace", fontSize:8, letterSpacing:1.5, textTransform:"uppercase", padding:"3px 9px", border:`1px solid ${b.border}`, color:b.color, marginBottom:7 }}>{ev.type}</div>
        <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:700, fontSize:16, color:"var(--ink)", marginBottom:4, letterSpacing:.3, transition:"color .3s" }}>{ev.name}</div>
        <div style={{ fontSize:12, color:"var(--ink2)", lineHeight:1.65, fontWeight:300, transition:"color .3s" }}>{ev.crux}</div>
      </div>

      <div style={{ fontFamily:"Space Mono,monospace", fontSize:16, color:hov?"var(--a1)":"var(--ink3)", transition:"all .25s cubic-bezier(.22,1,.36,1)", transform:hov?"rotate(-45deg) scale(1.2)":"none" }}>↗</div>
    </div>
  );
}
