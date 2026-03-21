"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const LINKS = [
  { href:"/",        label:"Home"       },
  { href:"/about",   label:"About"      },
  { href:"/events",  label:"Events"     },
  { href:"/cs",      label:"CS Chapter" },
  { href:"/team",    label:"Team"       },
  { href:"/contact", label:"Contact"    },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const isActive = (href:string) => href==="/" ? path==="/" : path.startsWith(href);

  useEffect(()=>{
    document.body.classList.toggle("light", !dark);
  },[dark]);

  const pillLink = (active:boolean): React.CSSProperties => ({
    padding:"8px 18px", borderRadius:100,
    fontFamily:"Oxanium,sans-serif", fontSize:13, fontWeight:700,
    color: active ? "#0A0E1A" : "rgba(255,255,255,0.52)",
    background: active ? "var(--a1)" : "transparent",
    cursor:"pointer", border:"none", whiteSpace:"nowrap",
    letterSpacing:.3, textDecoration:"none",
    transition:"color .2s, background .2s",
  });

  return (
    <>
      {/* ── TOP BAR — logo + toggle + join only ── */}
      <nav style={{position:"sticky",top:0,zIndex:500,height:64,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(16px,4vw,40px)",background:"var(--nav-bg)",backdropFilter:"blur(24px)",borderBottom:"1px solid var(--nav-border)",transition:"background .4s,border-color .4s"}}>

        {/* SB Logo — larger size */}
        <Link href="/" style={{display:"flex",alignItems:"center",height:56,textDecoration:"none"}}>
          <Image src="/logos/sb_black.png" alt="IEEE SOA Student Branch"
            width={180} height={56}
            style={{objectFit:"contain",height:54,width:"auto"}}
            className="logo-dark" priority />
          <Image src="/logos/sb_white.png" alt="IEEE SOA Student Branch"
            width={180} height={56}
            style={{objectFit:"contain",height:54,width:"auto"}}
            className="logo-light" priority />
        </Link>

        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {/* Theme toggle */}
          <div onClick={()=>setDark(d=>!d)}
            style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"6px 12px",borderRadius:100,border:"1px solid var(--ln2)",background:"var(--card-bg)",transition:"all .3s"}}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor="var(--a1)"}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor="var(--ln2)"}
          >
            <div style={{width:36,height:20,borderRadius:100,background:dark?"var(--s1)":"var(--a1)",border:"1px solid var(--ln2)",position:"relative",transition:"background .3s",flexShrink:0}}>
              <div style={{position:"absolute",top:2,left:2,width:14,height:14,borderRadius:"50%",background:"#fff",transition:"transform .3s cubic-bezier(.22,1,.36,1)",transform:dark?"none":"translateX(16px)",boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}/>
            </div>
            <span style={{fontSize:13}}>{dark?"☀️":"🌙"}</span>
            <span style={{fontFamily:"Space Mono,monospace",fontSize:9,color:"var(--ink2)",letterSpacing:1,textTransform:"uppercase",transition:"color .3s"}}>{dark?"Light":"Dark"}</span>
          </div>

          {/* Hamburger — mobile */}
          <button className="nav-hamburger" onClick={()=>setOpen(o=>!o)}
            style={{flexDirection:"column",gap:5,cursor:"pointer",padding:8,background:"none",border:"none"}}>
            <span style={{width:20,height:1,background:"var(--a1)",display:"block",transition:"all .2s",transform:open?"rotate(45deg) translateY(6px)":"none"}}/>
            <span style={{width:20,height:1,background:"var(--a1)",display:"block",opacity:open?0:1,transition:"opacity .2s"}}/>
            <span style={{width:20,height:1,background:"var(--a1)",display:"block",transition:"all .2s",transform:open?"rotate(-45deg) translateY(-6px)":"none"}}/>
          </button>

          {/* Join CTA */}
          <a href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noopener noreferrer"
            style={{fontFamily:"Space Mono,monospace",fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",padding:"8px 18px",border:"1px solid var(--a1)",color:"var(--a1)",background:"transparent",cursor:"pointer",textDecoration:"none",borderRadius:4,transition:"all .2s",whiteSpace:"nowrap"}}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="var(--a1)";el.style.color="var(--bg)";}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="transparent";el.style.color="var(--a1)";}}
          >Join IEEE ↗</a>
        </div>
      </nav>

      {/* ── FLOATING PILL — ALWAYS DARK, sole navigation ── */}
      <div className="nav-pill-desktop" style={{position:"sticky",top:64,zIndex:490,display:"flex",justifyContent:"center",padding:"10px 20px",pointerEvents:"none"}}>
        <div style={{
          display:"flex",alignItems:"center",gap:4,
          background:"rgba(10,12,20,0.88)",
          border:"1px solid rgba(255,255,255,0.14)",
          borderRadius:100,padding:"7px 10px",
          backdropFilter:"blur(20px)",
          boxShadow:"0 8px 32px rgba(0,0,0,0.55),0 2px 8px rgba(0,0,0,0.35),0 0 0 1px rgba(200,255,0,0.07)",
          pointerEvents:"all",
        }}>
          {LINKS.map(l=>(
            <Link key={l.href} href={l.href} style={pillLink(isActive(l.href))}
              onMouseEnter={e=>{if(!isActive(l.href)){const el=e.currentTarget as HTMLElement;el.style.color="rgba(255,255,255,0.92)";el.style.background="rgba(255,255,255,0.08)";}}}
              onMouseLeave={e=>{if(!isActive(l.href)){const el=e.currentTarget as HTMLElement;el.style.color="rgba(255,255,255,0.52)";el.style.background="transparent";}}}
            >{l.label}</Link>
          ))}
        </div>
      </div>

      {/* Mobile dropdown */}
      {open&&(
        <div style={{position:"fixed",top:64,left:0,right:0,zIndex:499,background:"rgba(4,6,11,0.97)",borderBottom:"1px solid var(--ln)",padding:12,display:"flex",flexDirection:"column",gap:2}}>
          {LINKS.map(l=>(
            <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} style={{fontFamily:"Space Mono,monospace",fontSize:10,color:isActive(l.href)?"var(--a1)":"var(--ink3)",padding:"12px 16px",textTransform:"uppercase",letterSpacing:1,textDecoration:"none",borderRadius:6,background:isActive(l.href)?"rgba(200,255,0,0.05)":"transparent",transition:"all .2s"}}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
