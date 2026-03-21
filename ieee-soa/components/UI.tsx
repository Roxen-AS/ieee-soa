"use client";
import { useState, createContext, useContext, useCallback, useRef } from "react";

/* ── SECTION HEADER ── */
export function SectionHeader({ index, meta, title }: { index:string; meta?:string; title:string }) {
  return (
    <>
      <div className="reveal" style={{display:"flex",alignItems:"center",gap:16,marginBottom:8}}>
        <span style={{fontFamily:"Oxanium,monospace",fontSize:11,fontWeight:600,color:"var(--a1)",letterSpacing:2,flexShrink:0,transition:"color .3s"}}>{index}</span>
        <span style={{flex:1,height:1,background:"var(--ln)",transition:"background .3s"}}/>
        {meta&&<span style={{fontFamily:"Space Mono,monospace",fontSize:9,color:"var(--ink3)",letterSpacing:1,whiteSpace:"nowrap",transition:"color .3s"}}>{meta}</span>}
      </div>
      <h2 className="glitch-title reveal delay-1" data-text={title} style={{fontFamily:"Oxanium,sans-serif",fontWeight:800,fontSize:"clamp(24px,4.5vw,52px)",letterSpacing:-1,color:"var(--ink)",marginBottom:36,marginTop:8,display:"inline-block",transition:"color .3s"}}>{title}</h2>
    </>
  );
}

/* ── DOMAIN CARD ── */
export function DomainCard({ code,title,body,tip,delay=0 }:{code:string;title:string;body:string;tip?:string;delay?:number}) {
  const [hov,setHov]=useState(false);
  return (
    <div className={`dc reveal delay-${delay}`}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{padding:"28px 24px",border:`1px solid ${hov?"rgba(200,255,0,0.25)":"var(--card-border)"}`,borderRadius:12,background:"var(--card-bg)",transform:hov?"translateY(-5px)":"none",boxShadow:hov?"0 18px 48px rgba(0,0,0,0.2),0 0 0 1px rgba(200,255,0,0.07)":"none",transition:"all .35s cubic-bezier(.22,1,.36,1)",position:"relative",overflow:"hidden",backdropFilter:"blur(8px)",cursor:"pointer"}}
    >
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,var(--a1),var(--a3),var(--a4))",transform:hov?"scaleX(1)":"scaleX(0)",transformOrigin:"left",transition:"transform .4s cubic-bezier(.22,1,.36,1)"}}/>
      <div style={{position:"absolute",top:16,right:16,width:6,height:6,borderRadius:"50%",background:"var(--a1)",opacity:hov?.9:0,boxShadow:hov?"0 0 14px var(--a1)":"none",transition:"opacity .3s",animation:hov?"glowPulse 1.5s ease-in-out infinite":"none"}}/>
      <div style={{fontFamily:"Space Mono,monospace",fontSize:9,color:"var(--ink3)",letterSpacing:2,marginBottom:14,transition:"color .3s"}}>{code}</div>
      <div style={{fontFamily:"Oxanium,sans-serif",fontWeight:700,fontSize:18,color:hov?"var(--a1)":"var(--ink)",marginBottom:8,letterSpacing:.3,transition:"color .2s"}}>{title}</div>
      <div style={{maxHeight:hov?"80px":"0",overflow:"hidden",opacity:hov?1:0,transition:"max-height .35s cubic-bezier(.22,1,.36,1),opacity .3s"}}>
        <div style={{fontSize:12,color:"var(--ink2)",lineHeight:1.65,fontWeight:300,transition:"color .3s"}}>{body}</div>
      </div>
      {tip&&hov&&<div style={{position:"absolute",bottom:"calc(100% - 10px)",left:"50%",transform:"translateX(-50%)",background:"var(--s1)",border:"1px solid var(--ln2)",padding:"7px 14px",borderRadius:4,fontFamily:"Space Mono,monospace",fontSize:9,color:"var(--ink2)",whiteSpace:"nowrap",zIndex:10}}>{tip}</div>}
    </div>
  );
}

/* ── TICKER ── */
const ITEMS=["Computer Society","Power & Energy","Communications","Robotics & Automation","Biomedical Engineering","Nanotechnology","IEEE Region 10","SOA University"];
export function Ticker() {
  const doubled=[...ITEMS,...ITEMS];
  return (
    <div className="ticker-wrap" style={{overflow:"hidden",borderBottom:"1px solid var(--ln)",background:"var(--ticker-bg)",padding:"10px 0",transition:"background .4s"}}>
      <div className="ticker-inner" style={{display:"flex",whiteSpace:"nowrap",animation:"tick 30s linear infinite"}}>
        <style>{`@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        {doubled.map((item,i)=>(
          <span key={i} style={{display:"inline-flex",alignItems:"center",gap:24,fontFamily:"Oxanium,monospace",fontSize:10,fontWeight:600,color:"var(--ink3)",letterSpacing:3,textTransform:"uppercase",padding:"0 24px",transition:"color .2s",cursor:"default"}}
            onMouseEnter={e=>(e.currentTarget.style.color="var(--a1)")}
            onMouseLeave={e=>(e.currentTarget.style.color="var(--ink3)")}
          >{item}<span style={{width:4,height:4,background:"var(--a1)",transform:"rotate(45deg)",flexShrink:0,display:"inline-block",transition:"background .3s"}}/></span>
        ))}
      </div>
    </div>
  );
}

/* ── FOOTER ── */
export function Footer() {
  return (
    <footer style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px clamp(20px,5vw,48px)",borderTop:"1px solid var(--ln)",background:"var(--foot-bg)",flexWrap:"wrap",gap:12,position:"relative",zIndex:10,transition:"background .4s,border-color .4s"}}>
      <span style={{fontFamily:"Space Mono,monospace",fontSize:9,color:"var(--ink3)",letterSpacing:.5,transition:"color .3s"}}>
        © {new Date().getFullYear()} IEEE SOA Student Branch — Siksha 'O' Anusandhan University
      </span>
      <div style={{display:"flex",gap:20}}>
        {["Privacy","IEEE.org","GitHub"].map(l=>(
          <span key={l} style={{fontFamily:"Space Mono,monospace",fontSize:9,color:"var(--ink3)",cursor:"pointer",transition:"color .2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color="var(--a1)")}
            onMouseLeave={e=>(e.currentTarget.style.color="var(--ink3)")}>{l}</span>
        ))}
      </div>
    </footer>
  );
}

/* ── TOAST ── */
interface ToastCtx { show:(msg:string,type?:"success"|"error")=>void; }
const ToastCtx=createContext<ToastCtx>({show:()=>{}});
export const useToast=()=>useContext(ToastCtx);
export function Toast({children}:{children?:React.ReactNode}) {
  const [msg,setMsg]=useState("");
  const [visible,setVisible]=useState(false);
  const [type,setType]=useState<"success"|"error">("success");
  const timer=useRef<ReturnType<typeof setTimeout>>();
  const show=useCallback((m:string,t:"success"|"error"="success")=>{
    setMsg(m);setType(t);setVisible(true);
    clearTimeout(timer.current);
    timer.current=setTimeout(()=>setVisible(false),3400);
  },[]);
  return (
    <ToastCtx.Provider value={{show}}>
      {children}
      <div style={{position:"fixed",bottom:24,right:24,zIndex:6000,background:"var(--s1)",border:`1px solid ${type==="error"?"var(--a2)":"var(--a1)"}`,padding:"14px 20px",fontFamily:"Space Mono,monospace",fontSize:10,color:type==="error"?"var(--a2)":"var(--a1)",letterSpacing:1,display:"flex",alignItems:"center",gap:10,borderRadius:4,pointerEvents:"none",transform:visible?"translateY(0)":"translateY(90px)",opacity:visible?1:0,transition:"transform .4s cubic-bezier(.22,1,.36,1),opacity .4s ease"}}>
        <span style={{width:6,height:6,borderRadius:"50%",background:type==="error"?"var(--a2)":"var(--a1)",flexShrink:0,boxShadow:`0 0 8px ${type==="error"?"var(--a2)":"var(--a1)"}`}}/>
        {msg}
      </div>
    </ToastCtx.Provider>
  );
}
