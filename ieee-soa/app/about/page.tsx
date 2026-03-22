"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeader, Footer } from "@/components/UI";
import { FOCUS_AREAS, SITE } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function AboutPage() {
  const ref = useReveal();
  const o1 = useRef<HTMLSpanElement>(null);
  const o2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      const light = document.body.classList.contains("light");
      const s = light ? "1px rgba(10,14,26,0.15)" : "1px rgba(242,240,255,0.09)";
      if (o1.current) o1.current.style.WebkitTextStroke = s;
      if (o2.current) o2.current.style.WebkitTextStroke = s;
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="page-enter">
      <section style={{ padding:"clamp(40px,6vw,72px) clamp(20px,5vw,48px) 0" }}>
        <SectionHeader index="02" meta={`Est. ${SITE.established}`} title="About the Branch" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(300px,100%),1fr))", gap:32, alignItems:"start" }}>

          {/* Identity panel */}
          <div className="reveal-left" style={{
            background:"var(--card-bg)", border:"1px solid var(--card-border)",
            borderRadius:16, padding:"clamp(28px,5vw,44px) clamp(24px,4vw,36px)",
            position:"relative", overflow:"hidden",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
            minHeight:380, backdropFilter:"blur(8px)",
            transition:"background .4s, border-color .4s",
          }}>
            <style>{`@keyframes rotateSlow{to{transform:rotate(360deg)}}`}</style>
            <div style={{ position:"absolute", bottom:-60, right:-60, width:200, height:200, borderRadius:"50%", border:"1px solid rgba(200,255,0,0.05)", animation:"rotateSlow 25s linear infinite", pointerEvents:"none" }}/>

            <div>
              <div style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a1)", letterSpacing:3, textTransform:"uppercase", marginBottom:20, transition:"color .3s" }}>
                // Identity
              </div>

              {/* Logo LEFT — outline text RIGHT */}
              <div style={{ display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" }}>

                {/* Logo */}
                <div style={{ flexShrink:0 }}>
                  <Image
                    src="/logos/sb_black.png"
                    alt="IEEE SOA Student Branch"
                    width={200} height={80}
                    style={{ objectFit:"contain", width:180, height:"auto", display:"block" }}
                    className="logo-dark"
                    priority
                  />
                  <Image
                    src="/logos/sb_white.png"
                    alt="IEEE SOA Student Branch"
                    width={200} height={80}
                    style={{ objectFit:"contain", width:180, height:"auto", display:"block" }}
                    className="logo-light"
                    priority
                  />
                </div>

                {/* Outline text */}
                <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:800, fontSize:"clamp(24px,4vw,52px)", lineHeight:.9, letterSpacing:-2 }}>
                  <span ref={o1} style={{ color:"transparent", WebkitTextStroke:"1px rgba(242,240,255,0.09)", display:"block" }}>SOA</span>
                  <span style={{ color:"transparent", WebkitTextStroke:"1px var(--a1)", transition:"-webkit-text-stroke .3s", display:"block" }}>STUDENT</span>
                  <span ref={o2} style={{ color:"transparent", WebkitTextStroke:"1px rgba(242,240,255,0.09)", display:"block" }}>BRANCH</span>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:24 }}>
              {[`Est. ${SITE.established}`, SITE.region, "Bhubaneswar", "CS Chapter", "Odisha"].map(tag => (
                <Pill key={tag} label={tag} />
              ))}
            </div>
          </div>

          {/* Copy + focus areas */}
          <div className="reveal delay-2">
            <div style={{ marginBottom:28 }}>
              {[
                `The IEEE SOA Student Branch at ${SITE.university} is a chapter of the world's largest technical professional organisation — spanning 160+ countries and 400,000+ members globally.`,
                "We bridge the gap between academic learning and real-world engineering through workshops, hackathons, seminars and competitions that prepare students for industry and research.",
                "Whether you're writing your first line of code or building your first intelligent system — IEEE SOA SB is where that journey becomes serious.",
              ].map((p,i) => (
                <p key={i} style={{ fontSize:14, color:"var(--ink2)", lineHeight:1.85, fontWeight:300, marginBottom:18, transition:"color .3s" }}>{p}</p>
              ))}
            </div>
            <div style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a1)", letterSpacing:3, textTransform:"uppercase", marginBottom:0, transition:"color .3s" }}>
              // Focus Areas
            </div>
            {FOCUS_AREAS.map((area,i) => (
              <FocusRow key={area} label={area} isLast={i === FOCUS_AREAS.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <div style={{ padding:"0 clamp(20px,5vw,48px)" }}>
        <div style={{ height:1, background:"var(--ln)", marginTop:48, transition:"background .3s" }}/>
      </div>
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
        fontFamily:"Space Mono,monospace", fontSize:9, letterSpacing:1,
        textTransform:"uppercase", padding:"5px 12px",
        border:`1px solid ${hov?"var(--a1)":"var(--ln2)"}`,
        color:hov?"var(--a1)":"var(--ink2)",
        background:hov?"rgba(200,255,0,0.04)":"transparent",
        transform:hov?"translateY(-2px)":"none",
        transition:"all .2s", cursor:"default", borderRadius:2,
      }}
    >
      {label}
    </span>
  );
}

function FocusRow({ label, isLast }: { label: string; isLast: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="focus-row"
      style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:`13px 0 13px ${hov?"10px":"0"}`,
        borderTop:"1px solid var(--ln)",
        borderBottom:isLast?"none":"1px solid var(--ln)",
        transition:"padding-left .25s cubic-bezier(.22,1,.36,1), border-color .3s",
        cursor:"default",
      }}
    >
      <span style={{ fontSize:13, color:hov?"var(--ink)":"var(--ink2)", transition:"color .2s" }}>{label}</span>
      <span style={{ fontFamily:"Space Mono,monospace", fontSize:13, color:hov?"var(--a1)":"var(--ink3)", transition:"color .2s" }}>→</span>
    </div>
  );
}