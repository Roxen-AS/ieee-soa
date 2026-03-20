"use client";
import { useEffect, useRef, useState } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Particle canvas on loader bg
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ps = Array.from({ length: 70 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.2 + 0.3,
      c: i % 3 === 0 ? "200,255,0" : i % 3 === 1 ? "0,212,255" : "155,95,255",
      a: Math.random() * 0.18 + 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ps.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(200,255,0,${0.09 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Percentage counter
  useEffect(() => {
    let val = 0;
    const id = setInterval(() => {
      val = Math.min(100, val + Math.floor(Math.random() * 7 + 2));
      setPct(val);
      if (val >= 100) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, []);

  // Dismiss after 3.5s
  useEffect(() => {
    const id = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 600);
    }, 3500);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(6px)" : "none",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.65 }}
      />
      {/* Scan lines */}
      <div className="scanlines" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Triple orbit rings */}
        <div style={{ position: "relative", width: 140, height: 140, marginBottom: 32 }}>
          {/* Ring 1 */}
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"1px solid transparent", borderTopColor:"var(--a1)", borderRightColor:"rgba(200,255,0,0.2)", animation:"spin 1.2s linear infinite" }} />
          {/* Ring 2 */}
          <div style={{ position:"absolute", inset:16, borderRadius:"50%", border:"1px solid transparent", borderBottomColor:"var(--a3)", borderLeftColor:"rgba(0,212,255,0.15)", animation:"spinRev 1.8s linear infinite" }} />
          {/* Ring 3 */}
          <div style={{ position:"absolute", inset:32, borderRadius:"50%", border:"1px solid transparent", borderTopColor:"var(--a4)", borderRightColor:"rgba(155,95,255,0.12)", animation:"spin 2.5s linear infinite" }} />
          {/* Orbiting dot */}
          <div style={{ position:"absolute", width:6, height:6, borderRadius:"50%", background:"var(--a1)", boxShadow:"0 0 10px var(--a1)", top:0, left:"50%", transform:"translateX(-50%)", transformOrigin:"50% 70px", animation:"spin 1.2s linear infinite" }} />
          <div style={{ position:"absolute", width:4, height:4, borderRadius:"50%", background:"var(--a3)", boxShadow:"0 0 8px var(--a3)", top:16, left:"50%", transform:"translateX(-50%)", transformOrigin:"50% 54px", animation:"spinRev 1.8s linear infinite" }} />
          {/* Core with logos */}
          <div style={{ position:"absolute", inset:46, borderRadius:"50%", background:"rgba(200,255,0,0.04)", border:"1px solid rgba(200,255,0,0.1)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            {/* REPLACE with actual logo images */}
            {/* <Image src="/logos/sb.png" className="logo-blend" width={22} height={22} alt="SB" /> */}
            {/* <Image src="/logos/cs.png" className="logo-blend" width={22} height={22} alt="CS" /> */}
            <span style={{ fontFamily:"Oxanium,monospace", fontSize:8, fontWeight:800, color:"var(--a1)" }}>SB</span>
            <span style={{ fontFamily:"Oxanium,monospace", fontSize:8, fontWeight:800, color:"var(--a3)" }}>CS</span>
          </div>
        </div>

        <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:800, fontSize:28, letterSpacing:3, marginBottom:4, background:"linear-gradient(90deg,var(--a1),var(--a3))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
          IEEE SOA
        </div>
        <div style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--ink3)", letterSpacing:3, textTransform:"uppercase", marginBottom:32 }}>
          Student Branch — Bhubaneswar
        </div>

        {/* Progress bar */}
        <div style={{ width:260, height:1, background:"var(--ln)", position:"relative", marginBottom:12 }}>
          <div style={{ position:"absolute", left:0, top:0, height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,var(--a1),var(--a3),var(--a4))", transition:"width 0.12s linear" }} />
        </div>
        <div style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--a1)", letterSpacing:2 }}>
          {pct}%
        </div>
      </div>
    </div>
  );
}
