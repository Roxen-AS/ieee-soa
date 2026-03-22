"use client";
import Image from "next/image";
import { SectionHeader, DomainCard, Footer } from "@/components/UI";
import { CS_MANDATE } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function CSPage() {
  const ref = useReveal();
  return (
    <div ref={ref} className="page-enter">
      {/* Masthead */}
      <section style={{
        padding:"clamp(48px,6vw,72px) clamp(20px,5vw,48px) 52px",
        borderBottom:"1px solid var(--ln)",
        position:"relative", overflow:"hidden",
        transition:"border-color .3s",
      }}>
        <div style={{
          position:"absolute", right:-10, bottom:-24,
          fontFamily:"Oxanium,sans-serif", fontWeight:800,
          fontSize:"clamp(48px,8vw,80px)", letterSpacing:-2,
          color:"var(--ln)", whiteSpace:"nowrap",
          pointerEvents:"none", userSelect:"none", transition:"color .3s",
        }}>
          COMPUTER SOCIETY
        </div>

        <div style={{ display:"flex", gap:48, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>

          {/* CS Logo — sized to match the heading's visual weight */}
          <div className="reveal-left" style={{ flexShrink:0, display:"flex", alignItems:"center" }}>
            <Image
              src="/logos/cs_black.png"
              alt="IEEE Computer Society"
              width={280} height={140}
              style={{ objectFit:"contain", height:130, width:"auto" }}
              className="logo-dark"
              priority
            />
            <Image
              src="/logos/cs_white.png"
              alt="IEEE Computer Society"
              width={280} height={140}
              style={{ objectFit:"contain", height:130, width:"auto" }}
              className="logo-light"
              priority
            />
          </div>

          <div className="reveal delay-2">
            <div style={{
              fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a3)",
              letterSpacing:3, textTransform:"uppercase", marginBottom:14, transition:"color .3s",
            }}>
              IEEE Society Chapter — SOA Student Branch
            </div>
            <div style={{
              fontFamily:"Oxanium,sans-serif", fontWeight:800,
              fontSize:"clamp(42px,7vw,96px)", lineHeight:.88,
              letterSpacing:-2, color:"var(--ink)", marginBottom:16, transition:"color .3s",
            }}>
              Computer<br />
              <span style={{ color:"var(--a3)", transition:"color .3s" }}>Society</span>
            </div>
            <p style={{
              fontSize:14, color:"var(--ink2)", maxWidth:500,
              lineHeight:1.75, fontWeight:300, transition:"color .3s",
            }}>
              Advancing computing professionals and the science and craft of computing — at Siksha 'O' Anusandhan University.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding:"clamp(40px,6vw,72px) clamp(20px,5vw,48px)" }}>
        <SectionHeader index="CS" meta="Chapter Mandate" title="What We Do" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(220px,100%),1fr))", gap:16 }}>
          {CS_MANDATE.map((item,i) => (
            <DomainCard key={item.num} code={item.num} title={item.title} body={item.body} delay={i+1} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}