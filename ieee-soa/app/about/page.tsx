"use client";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";
import { FOCUS_AREAS, SITE } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";

export default function AboutPage() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="page-enter">
      <section style={{ padding:"72px 40px 0" }}>
        <SectionHeader index="02" meta={`Est. ${SITE.established}`} title="About the Branch" />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", border:"1px solid var(--ln)" }}>
          {/* LEFT — identity panel */}
          <div
            className="reveal-left"
            style={{
              padding:"52px 44px",
              borderRight:"1px solid var(--ln)",
              display:"flex", flexDirection:"column", justifyContent:"space-between",
              background:"rgba(6,8,16,0.4)", position:"relative", overflow:"hidden",
            }}
          >
            {/* Rotating rings decoration */}
            <div style={{ position:"absolute", bottom:-60, right:-60, width:200, height:200, borderRadius:"50%", border:"1px solid rgba(200,255,0,0.05)", animation:"rotateSlow 25s linear infinite", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-80, right:-80, width:260, height:260, borderRadius:"50%", border:"1px solid rgba(0,212,255,0.04)", animation:"rotateSlow 18s linear infinite reverse", pointerEvents:"none" }} />
            <style>{`@keyframes rotateSlow{to{transform:rotate(360deg)}}`}</style>

            <div>
              <div style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a1)", letterSpacing:3, textTransform:"uppercase", marginBottom:24 }}>
                // Identity
              </div>
              <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:800, fontSize:"clamp(72px,10vw,132px)", lineHeight:0.85, letterSpacing:-4 }}>
                <span style={{ color:"transparent", WebkitTextStroke:"1px rgba(242,240,255,0.09)" }}>SO</span>
                <span style={{ color:"transparent", WebkitTextStroke:"1px var(--a1)" }}>A</span>
                <br />
                <span style={{ color:"transparent", WebkitTextStroke:"1px rgba(242,240,255,0.09)" }}>SB</span>
              </div>
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:32 }}>
              {[`Est. ${SITE.established}`, SITE.region, "Bhubaneswar", "CS Chapter", "Odisha, India"].map((tag) => (
                <Pill key={tag} label={tag} />
              ))}
            </div>
          </div>

          {/* RIGHT — copy + focus areas */}
          <div className="reveal delay-2" style={{ padding:"52px 44px" }}>
            <div style={{ marginBottom:32 }}>
              {[
                `The IEEE SOA Student Branch at ${SITE.university} is a chapter of the world's largest technical professional organisation — spanning 160+ countries and 400,000+ members globally.`,
                "We bridge the gap between academic learning and real-world engineering through workshops, hackathons, seminars and competitions that prepare students for industry and research.",
                "Whether you're writing your first line of code or building your first intelligent system — IEEE SOA SB is where that journey becomes serious.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize:14, color:"var(--ink2)", lineHeight:1.85, fontWeight:300, marginBottom:20 }}>{p}</p>
              ))}
            </div>

            <div style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a1)", letterSpacing:3, textTransform:"uppercase", marginBottom:0 }}>
              // Focus Areas
            </div>

            {FOCUS_AREAS.map((area, i) => (
              <FocusRow key={area} label={area} last={i === FOCUS_AREAS.length - 1} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Pill({ label }: { label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:"Space Mono,monospace", fontSize:9, letterSpacing:1, textTransform:"uppercase",
        padding:"5px 14px", border:`1px solid ${hov ? "var(--a1)" : "var(--ln2)"}`,
        color: hov ? "var(--a1)" : "var(--ink2)",
        background: hov ? "rgba(200,255,0,0.04)" : "transparent",
        transform: hov ? "translateY(-2px)" : "none",
        transition:"all 0.25s", cursor:"default",
      }}
    >
      {label}
    </span>
  );
}

function FocusRow({ label, last }: { label: string; last: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:`14px 0 14px ${hov ? "12px" : "0"}`,
        borderTop:"1px solid var(--ln)",
        borderBottom: last ? "none" : "1px solid var(--ln)",
        transition:"padding-left 0.3s cubic-bezier(0.22,1,0.36,1)",
        position:"relative", cursor:"default",
      }}
    >
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2, background:"var(--a1)", transform: hov ? "scaleY(1)" : "scaleY(0)", transformOrigin:"bottom", transition:"transform 0.3s cubic-bezier(0.22,1,0.36,1)" }} />
      <span style={{ fontSize:13, color: hov ? "var(--ink)" : "var(--ink2)", transition:"color 0.2s" }}>{label}</span>
      <span style={{ fontFamily:"Space Mono,monospace", fontSize:14, color: hov ? "var(--a1)" : "var(--ink3)", transition:"color 0.2s" }}>→</span>
    </div>
  );
}
