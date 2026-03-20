"use client";
import { useState } from "react";
import type { TeamMember } from "@/lib/data";

interface TeamCardProps {
  member: TeamMember;
  noBorderRight?: boolean;
  noBorderBottom?: boolean;
  delay?: number;
}

export default function TeamCard({ member, noBorderRight, noBorderBottom, delay = 0 }: TeamCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`reveal delay-${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px 20px 24px",
        borderRight: noBorderRight ? "none" : "1px solid var(--ln)",
        borderBottom: noBorderBottom ? "none" : "1px solid var(--ln)",
        textAlign: "center",
        background: hovered ? "rgba(17,25,41,0.7)" : "transparent",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "background 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg,transparent,var(--a1),var(--a3),transparent)",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.45s ease",
      }} />

      {/* Radial glow overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 0%,rgba(200,255,0,0.04) 0%,transparent 70%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
      }} />

      {/* Avatar */}
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: "var(--s1)",
        border: `1px solid ${hovered ? "var(--a1)" : "var(--ln2)"}`,
        boxShadow: hovered ? "0 0 20px rgba(200,255,0,0.2)" : "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Oxanium,monospace", fontWeight: 700, fontSize: 18,
        color: member.accentColor ?? "var(--a1)",
        margin: "0 auto 14px",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}>
        {member.photo ? (
          /* REPLACE: swap with actual photo */
          /* <Image src={member.photo} alt={member.name} width={64} height={64} style={{ objectFit:"cover", borderRadius:"50%" }} /> */
          <span>{member.initials}</span>
        ) : (
          <span>{member.initials}</span>
        )}
      </div>

      <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:600, fontSize:15, color:"var(--ink)", marginBottom:4, letterSpacing:0.3 }}>
        {member.name}
      </div>
      <div style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a1)", letterSpacing:1.5, textTransform:"uppercase" }}>
        {member.role}
      </div>
    </div>
  );
}
