"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Ticker from "@/components/Ticker";
import DomainCard from "@/components/DomainCard";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";
import { DOMAINS } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const revealRef = useReveal();
  const scanRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <div ref={revealRef} style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease" }}>
        {/* ── HERO ── */}
        <section
          style={{
            minHeight: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 40px 52px",
            position: "relative",
            overflow: "hidden",
            borderBottom: "1px solid var(--ln)",
          }}
          className="corner-brackets"
        >
          {/* Animated scan line */}
          <div
            ref={scanRef}
            style={{
              position: "absolute", left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg,transparent,rgba(200,255,0,0.6),rgba(0,212,255,0.4),transparent)",
              opacity: 0,
              animation: "scanMove 10s ease-in-out infinite 4s",
              pointerEvents: "none",
            }}
          />
          <style>{`
            @keyframes scanMove {
              0%{top:-1%;opacity:0} 3%{opacity:0.8} 92%{opacity:0.2} 100%{top:101%;opacity:0}
            }
            @keyframes ldUp {
              from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)}
            }
            @keyframes glowPulse {
              0%,100%{box-shadow:0 0 6px var(--a1)} 50%{box-shadow:0 0 18px var(--a1)}
            }
          `}</style>

          {/* Tag */}
          <div className="reveal" style={{ display:"inline-flex", alignItems:"center", gap:10, fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a1)", letterSpacing:3, textTransform:"uppercase", marginBottom:24, position:"relative", zIndex:2 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--a1)", animation:"glowPulse 2s infinite", boxShadow:"0 0 0 0 rgba(200,255,0,0.4)", display:"inline-block" }} />
            Siksha 'O' Anusandhan University — IEEE Region 10
          </div>

          {/* Main title */}
          <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:800, fontSize:"clamp(56px,11vw,144px)", lineHeight:0.85, letterSpacing:-3, position:"relative", zIndex:2 }}>
            <span className="text-outline reveal delay-1" style={{ display:"block" }}>ADVANCING</span>
            <span className="reveal delay-2" style={{ display:"block", color:"var(--ink)" }}>TECHNOLOGY</span>
            <span className="grad-text reveal delay-3" style={{ display:"block" }}>FOR HUMANITY</span>
          </div>

          {/* Footer row */}
          <div className="reveal delay-4" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginTop:36, gap:40, position:"relative", zIndex:2 }}>
            <p style={{ maxWidth:380, fontSize:14, color:"var(--ink2)", lineHeight:1.75, fontWeight:300, borderLeft:"2px solid var(--a1)", paddingLeft:16 }}>
              IEEE SOA Student Branch — a community of engineers and innovators advancing technology at every frontier.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"flex-end" }}>
              <HeroButton href="/events" primary>Explore Events</HeroButton>
              <HeroButton href="/about">About the Branch</HeroButton>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <Ticker />

        {/* ── DOMAIN GRID ── */}
        <section style={{ padding:"72px 40px" }}>
          <SectionHeader index="01" meta="06 Disciplines" title="Technical Scope" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", border:"1px solid var(--ln)" }}>
            {DOMAINS.map((d, i) => (
              <DomainCard
                key={d.code}
                code={d.code}
                title={d.title}
                body={d.body}
                tip={d.tip}
                noBorderRight={(i + 1) % 3 === 0}
                noBorderBottom={i >= 3}
                delay={Math.min((i % 3) + 1, 6)}
              />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

function HeroButton({ href, primary, children }: { href: string; primary?: boolean; children: React.ReactNode }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => router.push(href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "Space Mono,monospace",
        fontSize: 9,
        letterSpacing: 2,
        textTransform: "uppercase",
        padding: "13px 32px",
        cursor: "pointer",
        fontWeight: 700,
        border: primary ? "none" : "1px solid var(--ln2)",
        background: primary
          ? hovered ? "var(--ink)" : "var(--a1)"
          : "transparent",
        color: primary
          ? "var(--bg)"
          : hovered ? "var(--a3)" : "var(--ink2)",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: primary && hovered ? "0 12px 32px rgba(200,255,0,0.25)" : "none",
        borderColor: !primary && hovered ? "var(--a3)" : "var(--ln2)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </button>
  );
}
