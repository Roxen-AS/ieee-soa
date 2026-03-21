"use client";
import { useState } from "react";
import { SectionHeader, Footer } from "@/components/UI";
import { SB_FACULTY, SB_STUDENTS, CS_FACULTY, CS_STUDENTS, type TeamMember } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

type Tab = "sb" | "cs";

export default function TeamPage() {
  const [tab, setTab] = useState<Tab>("sb");
  const ref = useReveal();

  return (
    <div ref={ref} className="page-enter">
      <section style={{ padding:"clamp(40px,6vw,72px) clamp(20px,5vw,48px) 0" }}>
        <SectionHeader index="04" title="The Team" />
      </section>

      {/* Tab bar — always dark */}
      <div className="team-tab-bar">
        {(["sb","cs"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`team-tab${tab===t?" active":""}`}>
            {t==="sb" ? "SB Team" : "CS Team"}
          </button>
        ))}
      </div>

      {/* SB Team */}
      <div style={{ display:tab==="sb"?"block":"none", padding:"clamp(24px,4vw,48px) clamp(16px,4vw,40px)" }}>
        {/* Faculty row */}
        <FacultyLabel />
        <div className="team-grid" style={{ marginBottom:40 }}>
          {SB_FACULTY.map(m => <TeamCard key={m.name} member={m} />)}
        </div>
        {/* Student members */}
        <MemberLabel />
        <div className="team-grid">
          {SB_STUDENTS.map(m => <TeamCard key={m.name} member={m} />)}
        </div>
      </div>

      {/* CS Team */}
      <div style={{ display:tab==="cs"?"block":"none", padding:"clamp(24px,4vw,48px) clamp(16px,4vw,40px)" }}>
        {/* Faculty row */}
        <FacultyLabel />
        <div className="team-grid" style={{ marginBottom:40 }}>
          {CS_FACULTY.map(m => <TeamCard key={m.name} member={m} />)}
        </div>
        {/* Student members — 5 total, last 2 centered */}
        <MemberLabel />
        <div className="team-grid">
          {CS_STUDENTS.slice(0,3).map(m => <TeamCard key={m.name} member={m} />)}
        </div>
        {/* Last 2 centered */}
        <div style={{ display:"flex", justifyContent:"center", gap:20, marginTop:20, flexWrap:"wrap" }}>
          {CS_STUDENTS.slice(3).map(m => (
            <div key={m.name} style={{ width:"calc(33.333% - 14px)", minWidth:200 }}>
              <TeamCard member={m} />
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <style>{`
        .team-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media(max-width:700px){ .team-grid{ grid-template-columns:1fr 1fr; gap:14px; } }
        @media(max-width:440px){ .team-grid{ grid-template-columns:1fr; } }
        @media(max-width:700px){ .cs-last-row > div { width:100% !important; min-width:unset !important; } }
      `}</style>
    </div>
  );
}

function FacultyLabel() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
      <span style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a1)", letterSpacing:3, textTransform:"uppercase", transition:"color .3s" }}>Faculty</span>
      <span style={{ flex:1, height:1, background:"var(--ln)" }}/>
    </div>
  );
}

function MemberLabel() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
      <span style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a3)", letterSpacing:3, textTransform:"uppercase", transition:"color .3s" }}>Members</span>
      <span style={{ flex:1, height:1, background:"var(--ln)" }}/>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      className="team-card reveal"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:"var(--card-bg)",
        border:`1px solid ${hov?"var(--a1)":"var(--card-border)"}`,
        borderRadius:14,
        padding: member.isFaculty ? "20px 16px 18px" : "22px 18px 20px",
        textAlign:"center",
        transition:"border-color .3s,box-shadow .3s,transform .3s",
        cursor:"default", position:"relative", overflow:"hidden",
        backdropFilter:"blur(8px)",
        boxShadow:hov?"0 0 0 1px var(--a1),0 20px 48px rgba(0,0,0,.3)":"none",
        transform:hov?"translateY(-5px)":"none",
      }}
    >
      {/* Top shimmer on hover */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,var(--a1),var(--a3),transparent)", transform:hov?"scaleX(1)":"scaleX(0)", transformOrigin:"left", transition:"transform .45s ease" }}/>

      {/* Faculty badge */}
      {member.isFaculty && (
        <div style={{ position:"absolute", top:12, right:12, fontFamily:"Space Mono,monospace", fontSize:7, letterSpacing:1.5, textTransform:"uppercase", padding:"3px 8px", border:"1px solid rgba(200,255,0,0.3)", color:"var(--a1)", borderRadius:2, transition:"color .3s,border-color .3s" }}>
          Faculty
        </div>
      )}

      {/* Photo */}
      <div style={{
        width:"100%", aspectRatio:"1", borderRadius:10,
        background:"var(--s1)", border:`1px solid ${hov?"var(--a1)":"var(--ln2)"}`,
        overflow:"hidden", marginBottom:14,
        transition:"border-color .3s,background .3s",
        position:"relative",
      }}>
        {member.photo ? (
          <img
            src={member.photo} alt={member.name}
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }}
          />
        ) : (
          <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
            <span style={{ fontFamily:"Oxanium,monospace", fontWeight:700, fontSize:28, color:member.accentColor??"var(--a1)" }}>{member.initials}</span>
            <span style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--ink3)", letterSpacing:1, textTransform:"uppercase" }}>photo</span>
          </div>
        )}
      </div>

      <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:600, fontSize:member.isFaculty?13:15, color:"var(--ink)", marginBottom:5, letterSpacing:.3, lineHeight:1.3, transition:"color .3s" }}>
        {member.name}
      </div>
      <div style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:member.accentColor??"var(--a1)", letterSpacing:1.5, textTransform:"uppercase", transition:"color .3s" }}>
        {member.role}
      </div>
    </div>
  );
}
