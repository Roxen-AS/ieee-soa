"use client";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import Footer from "@/components/Footer";
import { SB_TEAM, CS_TEAM } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

type Tab = "sb" | "cs";

export default function TeamPage() {
  const [tab, setTab] = useState<Tab>("sb");
  const revealRef = useReveal();
  const members = tab === "sb" ? SB_TEAM : CS_TEAM;
  const cols = 4;

  return (
    <div ref={revealRef} className="page-enter">
      <section style={{ padding:"72px 40px 0" }}>
        <SectionHeader index="04" title="The Team" />
      </section>

      {/* Tab bar */}
      <div style={{ display:"flex", borderBottom:"1px solid var(--ln)" }}>
        {(["sb","cs"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily:"Space Mono,monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase",
              padding:"16px 28px", cursor:"pointer", border:"none", borderRight:"1px solid var(--ln)",
              background: tab === t ? "rgba(200,255,0,0.04)" : "transparent",
              color: tab === t ? "var(--a1)" : "var(--ink3)",
              position:"relative",
              transition:"color 0.2s, background 0.2s",
            }}
          >
            {t === "sb" ? "SB Team" : "CS Team"}
            {tab === t && (
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"var(--a1)", boxShadow:"0 0 8px var(--a1)" }} />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding:"48px 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, border:"1px solid var(--ln)" }}>
          {members.map((member, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const lastRow = Math.floor((members.length - 1) / cols);
            return (
              <TeamCard
                key={member.name}
                member={member}
                noBorderRight={col === cols - 1 || i === members.length - 1}
                noBorderBottom={row === lastRow}
                delay={(col % 4) + 1}
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
