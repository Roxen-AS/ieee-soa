"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { Ticker, DomainCard, SectionHeader, Footer } from "@/components/UI";
import { DOMAINS } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function HomePage() {
  const [loaded,setLoaded]=useState(false);
  const ref=useReveal();
  const router=useRouter();

  return (
    <>
      {!loaded && <Loader onDone={()=>setLoaded(true)} />}
      <div ref={ref} style={{opacity:loaded?1:0,transition:"opacity 0.8s ease"}}>
        <style>{`
          @keyframes scanMove{0%{top:-1%;opacity:0}3%{opacity:.8}92%{opacity:.2}100%{top:101%;opacity:0}}
          @keyframes blink{0%,100%{box-shadow:0 0 0 0 rgba(200,255,0,.5)}50%{box-shadow:0 0 0 6px rgba(200,255,0,0);opacity:.7}}
          @keyframes gradFlow{to{background-position:-300% 0}}
        `}</style>

        {/* HERO */}
        <section className="corner-brackets" style={{minHeight:600,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 clamp(20px,5vw,48px) 52px",position:"relative",overflow:"hidden",borderBottom:"1px solid var(--ln)"}}>
          <div style={{position:"absolute",left:0,right:0,height:1,pointerEvents:"none",background:"linear-gradient(90deg,transparent,rgba(200,255,0,0.6),rgba(0,212,255,0.4),transparent)",opacity:0,animation:"scanMove 10s ease-in-out infinite 4s"}}/>
          <div className="reveal" style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"Space Mono,monospace",fontSize:9,color:"var(--a1)",letterSpacing:3,textTransform:"uppercase",marginBottom:20,position:"relative",zIndex:2,transition:"color .3s"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"var(--a1)",animation:"blink 2s infinite",display:"inline-block",transition:"background .3s"}}/>
            Siksha 'O' Anusandhan University — IEEE Region 10
          </div>
          <div style={{fontFamily:"Oxanium,sans-serif",fontWeight:800,fontSize:"clamp(46px,10vw,142px)",lineHeight:.86,letterSpacing:-3,position:"relative",zIndex:2}}>
            <span className="text-outline reveal delay-1" style={{display:"block"}}>ADVANCING</span>
            <span className="reveal delay-2" style={{display:"block",color:"var(--ink)",transition:"color .3s"}}>TECHNOLOGY</span>
            <span className="reveal delay-3" style={{display:"block",background:"linear-gradient(90deg,var(--a1),var(--a3),var(--a4),var(--a1))",backgroundSize:"300% 100%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"gradFlow 5s linear infinite"}}>FOR HUMANITY</span>
          </div>
          <div className="reveal delay-4" style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginTop:32,gap:24,position:"relative",zIndex:2,flexWrap:"wrap"}}>
            <p style={{maxWidth:400,fontSize:14,color:"var(--ink2)",lineHeight:1.75,fontWeight:300,borderLeft:"2px solid var(--a1)",paddingLeft:16,transition:"color .3s,border-color .3s"}}>
              IEEE SOA Student Branch — a community of engineers and innovators advancing technology at every technical frontier.
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:10,alignItems:"flex-end"}}>
              <HBtn primary onClick={()=>router.push("/events")}>Explore Events</HBtn>
              <HBtn onClick={()=>router.push("/about")}>About the Branch</HBtn>
            </div>
          </div>
        </section>

        <Ticker />

        <section style={{padding:"clamp(40px,6vw,72px) clamp(20px,5vw,48px)"}}>
          <SectionHeader index="01" meta="06 Disciplines" title="Technical Scope" />
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(280px,100%),1fr))",gap:16}}>
            {DOMAINS.map((d,i)=>(
              <DomainCard key={d.code} code={d.code} title={d.title} body={d.body} tip={d.tip} delay={Math.min((i%3)+1,6)} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

function HBtn({primary,onClick,children}:{primary?:boolean;onClick?:()=>void;children:React.ReactNode}) {
  const [hov,setHov]=useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      fontFamily:"Space Mono,monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",
      padding:"12px 28px",cursor:"pointer",fontWeight:700,border:"none",
      background:primary?(hov?"var(--ink)":"var(--a1)"):"transparent",
      color:primary?"#0A0E1A":(hov?"var(--a3)":"var(--ink2)"),
      ...((!primary)&&{border:`1px solid ${hov?"var(--a3)":"var(--ln2)"}`}),
      transform:hov?"translateY(-2px)":"none",
      boxShadow:primary&&hov?"0 10px 30px rgba(200,255,0,0.22)":"none",
      transition:"all .3s cubic-bezier(.22,1,.36,1)",
    }}>{children}</button>
  );
}
