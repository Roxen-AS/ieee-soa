"use client";
import SectionHeader from "@/components/SectionHeader";
import DomainCard from "@/components/DomainCard";
import Footer from "@/components/Footer";
import { CS_MANDATE } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function CSPage() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="page-enter">
      {/* ── Masthead ── */}
      <section style={{ padding:"72px 40px 60px", borderBottom:"1px solid var(--ln)", display:"flex", gap:60, alignItems:"center", position:"relative", overflow:"hidden" }}>
        {/* Ghost watermark */}
        <div style={{ position:"absolute", right:-10, bottom:-28, fontFamily:"Oxanium,sans-serif", fontWeight:800, fontSize:84, letterSpacing:-2, color:"rgba(242,240,255,0.022)", whiteSpace:"nowrap", pointerEvents:"none", userSelect:"none" }}>
          COMPUTER SOCIETY
        </div>

        {/* Logo */}
        <div className="reveal-left" style={{ flexShrink:0 }}>
          {/*
            REPLACE with actual CS logo:
            <Image src="/logos/cs.png" alt="IEEE CS" width={80} height={80} className="logo-blend" />
          */}
          <div style={{
            width:90, height:90,
            background:"rgba(0,212,255,0.06)",
            border:"1px solid rgba(0,212,255,0.2)",
            borderRadius:18,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"Oxanium,sans-serif", fontWeight:800, fontSize:28, color:"var(--a3)",
          }}>
            CS
          </div>
        </div>

        {/* Text */}
        <div className="reveal delay-2">
          <div style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a3)", letterSpacing:3, textTransform:"uppercase", marginBottom:16 }}>
            IEEE Society Chapter — SOA Student Branch
          </div>
          <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:800, fontSize:"clamp(48px,8vw,100px)", lineHeight:0.88, letterSpacing:-2, color:"var(--ink)", marginBottom:20 }}>
            Computer<br />
            <span style={{ color:"var(--a3)" }}>Society</span>
          </div>
          <p style={{ fontSize:14, color:"var(--ink2)", maxWidth:500, lineHeight:1.75, fontWeight:300 }}>
            Advancing computing professionals and the science and craft of computing — at Siksha 'O' Anusandhan University.
          </p>
        </div>
      </section>

      {/* ── Mandate grid ── */}
      <section style={{ padding:"72px 40px" }}>
        <SectionHeader index="CS" meta="Chapter Mandate" title="What We Do" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", border:"1px solid var(--ln)" }}>
          {CS_MANDATE.map((item, i) => (
            <DomainCard
              key={item.num}
              code={item.num}
              title={item.title}
              body={item.body}
              noBorderRight={i === CS_MANDATE.length - 1}
              noBorderBottom
              delay={i + 1}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
