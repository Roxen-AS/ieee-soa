"use client";
import { useState } from "react";

interface DomainCardProps {
  code: string;
  title: string;
  body: string;
  tip?: string;
  noBorderRight?: boolean;
  noBorderBottom?: boolean;
  delay?: number;
}

export default function DomainCard({ code, title, body, tip, noBorderRight, noBorderBottom, delay = 0 }: DomainCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`reveal delay-${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 28px",
        borderRight: noBorderRight ? "none" : "1px solid var(--ln)",
        borderBottom: noBorderBottom ? "none" : "1px solid var(--ln)",
        background: hovered ? "rgba(17,25,41,0.8)" : "transparent",
        transition: "background 0.35s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gradient bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: 2,
        background: "linear-gradient(90deg,var(--a1),var(--a3),var(--a4))",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }} />

      {/* Corner triangle */}
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: 0, height: 0,
        borderLeft: `${hovered ? 36 : 20}px solid transparent`,
        borderBottom: `${hovered ? 36 : 20}px solid rgba(200,255,0,0.06)`,
        transition: "border-width 0.3s",
      }} />

      {/* Glow dot */}
      <div style={{
        position: "absolute", top: 18, right: 18,
        width: 6, height: 6, borderRadius: "50%",
        background: "var(--a1)",
        opacity: hovered ? 0.9 : 0,
        boxShadow: hovered ? "0 0 14px var(--a1)" : "none",
        transition: "opacity 0.3s, box-shadow 0.3s",
        animation: hovered ? "glowPulse 1.5s ease-in-out infinite" : "none",
      }} />

      <div style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--ink3)", letterSpacing:2, marginBottom:18 }}>
        {code}
      </div>
      <div style={{
        fontFamily:"Oxanium,sans-serif", fontWeight:700, fontSize:20,
        color: hovered ? "var(--a1)" : "var(--ink)",
        marginBottom:10, letterSpacing:0.5,
        transition: "color 0.2s",
      }}>
        {title}
      </div>
      <div style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.7, fontWeight:300 }}>
        {body}
      </div>

      {/* Tooltip */}
      {tip && hovered && (
        <div style={{
          position: "absolute", bottom: "calc(100% - 12px)", left: "50%",
          transform: "translateX(-50%)",
          background: "var(--s1)", border: "1px solid var(--ln2)",
          padding: "7px 14px", borderRadius: 4,
          fontFamily: "Space Mono,monospace", fontSize: 9, color: "var(--ink2)",
          whiteSpace: "nowrap", letterSpacing: 0.5,
          zIndex: 10,
          animation: "ldUp 0.2s ease forwards",
        }}>
          {tip}
        </div>
      )}
    </div>
  );
}
