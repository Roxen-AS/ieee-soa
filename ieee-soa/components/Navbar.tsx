"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const isActive = (href: string) => href === "/" ? path === "/" : path.startsWith(href);

  useEffect(() => {
    document.body.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <>
      {/* TOP BAR + PILL combined — no gap between them */}
      <div style={{
        position:"sticky", top:0, zIndex:500,
        background:"var(--nav-bg)", backdropFilter:"blur(24px)",
        borderBottom:"1px solid var(--nav-border)",
        transition:"background .4s, border-color .4s",
      }}>

        {/* Top row — logo + toggle + join */}
        <div style={{
          height:64,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 clamp(16px,4vw,40px)",
        }}>

          {/* Logo — larger */}
          <Link href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
            <img
              src="/logos/Logo.png"
              alt="IEEE SOA Student Branch"
              style={{ height:56, width:"auto", objectFit:"contain", display:"block" }}
            />
          </Link>

          {/* Right side controls */}
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>

            {/* Theme toggle — no text, icon only */}
            <div
              onClick={() => setDark(d => !d)}
              style={{
                display:"flex", alignItems:"center", gap:10, cursor:"pointer",
                padding:"8px 14px", borderRadius:100,
                border:"1px solid var(--ln2)", background:"var(--card-bg)",
                transition:"all .3s",
              }}
            >
              <div style={{
                width:42, height:24, borderRadius:100,
                background: dark ? "var(--s1)" : "var(--a1)",
                border:"1px solid var(--ln2)",
                position:"relative", transition:"background .3s", flexShrink:0,
              }}>
                <div style={{
                  position:"absolute", top:3, left:3,
                  width:18, height:18, borderRadius:"50%", background:"#fff",
                  transition:"transform .3s cubic-bezier(.22,1,.36,1)",
                  transform: dark ? "none" : "translateX(18px)",
                  boxShadow:"0 1px 4px rgba(0,0,0,.3)",
                }} />
              </div>
              {/* Icon only — no label text */}
              <span style={{ fontSize:18 }}>{dark ? "☀️" : "🌙"}</span>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="nav-hamburger"
              onClick={() => setOpen(o => !o)}
              style={{
                flexDirection:"column", gap:6, cursor:"pointer",
                padding:10, background:"none", border:"none",
              }}
            >
              <span style={{ width:22, height:2, background:"var(--a1)", display:"block", transition:"all .2s", transform: open ? "rotate(45deg) translateY(8px)" : "none" }} />
              <span style={{ width:22, height:2, background:"var(--a1)", display:"block", opacity: open ? 0 : 1, transition:"opacity .2s" }} />
              <span style={{ width:22, height:2, background:"var(--a1)", display:"block", transition:"all .2s", transform: open ? "rotate(-45deg) translateY(-8px)" : "none" }} />
            </button>

            {/* Join CTA */}
            
              href="https://www.ieee.org/membership/join/index.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:"Space Mono,monospace", fontSize:10, fontWeight:700,
                letterSpacing:2, textTransform:"uppercase", padding:"10px 22px",
                border:"1px solid var(--a1)", color:"var(--a1)", background:"transparent",
                cursor:"pointer", textDecoration:"none", borderRadius:4,
                transition:"all .2s", whiteSpace:"nowrap",
              }}
            >
              Join IEEE ↗
            </a>

          </div>
        </div>

        {/* Floating pill — sits inside same sticky container, zero gap */}
        <div style={{
          display:"flex", justifyContent:"center",
          paddingBottom:10,
        }}>
          <div style={{
            display:"flex", alignItems:"center", gap:4,
            background:"rgba(10,12,20,0.88)",
            border:"1px solid rgba(255,255,255,0.14)",
            borderRadius:100, padding:"7px 10px",
            backdropFilter:"blur(20px)",
            boxShadow:"0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)",
          }}>
            {LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding:"8px 18px", borderRadius:100,
                  fontFamily:"Oxanium,sans-serif", fontSize:13, fontWeight:700,
                  color: isActive(l.href) ? "#0A0E1A" : "rgba(255,255,255,0.55)",
                  background: isActive(l.href) ? "var(--a1)" : "transparent",
                  cursor:"pointer", border:"none", whiteSpace:"nowrap",
                  letterSpacing:.3, textDecoration:"none",
                  transition:"color .2s, background .2s",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position:"fixed", top:64, left:0, right:0, zIndex:499,
          background:"rgba(4,6,11,0.97)", borderBottom:"1px solid var(--ln)",
          padding:12, display:"flex", flexDirection:"column", gap:2,
        }}>
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily:"Space Mono,monospace", fontSize:10,
                color: isActive(l.href) ? "var(--a1)" : "var(--ink3)",
                padding:"12px 16px", textTransform:"uppercase", letterSpacing:1,
                textDecoration:"none", borderRadius:6,
                background: isActive(l.href) ? "rgba(200,255,0,0.05)" : "transparent",
                transition:"all .2s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}