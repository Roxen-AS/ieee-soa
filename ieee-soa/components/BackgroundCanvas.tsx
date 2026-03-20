"use client";
import { useEffect, useRef } from "react";

const GLYPHS = ["∑","λ","∇","Ω","π","∂","⊕","≡","∫","⊗","Δ","φ","μ","ε","∞","⊂"];
const COLS = 32;
const ROWS = 18;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; c: string; a: number;
}
interface Glyph {
  x: number; y: number;
  vx: number; vy: number;
  ch: string; sz: number; a: number; phase: number;
}
interface Nebula {
  x: number; y: number;
  r: number; c: string; a: number;
  vx: number; vy: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const particles = useRef<Particle[]>([]);
  const glyphs = useRef<Glyph[]>([]);
  const t = useRef(0);
  const raf = useRef<number>(0);

  const nebulae: Nebula[] = [
    { x: 0.20, y: 0.30, r: 340, c: "200,255,0",   a: 0.018, vx: 0.00025, vy: 0.00015 },
    { x: 0.75, y: 0.60, r: 400, c: "0,212,255",   a: 0.015, vx: -0.0002, vy: 0.00025 },
    { x: 0.50, y: 0.85, r: 280, c: "155,95,255",  a: 0.016, vx: 0.00018, vy: -0.0002 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight, 800);
      buildParticles(canvas.width, canvas.height);
      buildGlyphs(canvas.width, canvas.height);
    };

    const buildParticles = (W: number, H: number) => {
      particles.current = Array.from({ length: 55 }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.1 + 0.3,
        c: i % 4 === 0 ? "200,255,0" : i % 4 === 1 ? "0,212,255" : i % 4 === 2 ? "155,95,255" : "242,240,255",
        a: Math.random() * 0.1 + 0.02,
      }));
    };

    const buildGlyphs = (W: number, H: number) => {
      glyphs.current = Array.from({ length: 22 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        sz: Math.random() * 8 + 8,
        a: Math.random() * 0.055 + 0.018,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      t.current += 0.005;
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouse.current.x;
      const my = mouse.current.y + window.scrollY;

      ctx.clearRect(0, 0, W, H);

      // LAYER 1 — Nebula aurora blobs
      nebulae.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        const nx = n.x * W, ny = n.y * H;
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r);
        g.addColorStop(0,   `rgba(${n.c},${n.a})`);
        g.addColorStop(0.5, `rgba(${n.c},${n.a * 0.4})`);
        g.addColorStop(1,   "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(nx - n.r, ny - n.r, n.r * 2, n.r * 2);
      });

      // LAYER 2 — Cursor aurora
      if (mx > 0) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
        g.addColorStop(0,   "rgba(200,255,0,0.055)");
        g.addColorStop(0.4, "rgba(0,212,255,0.028)");
        g.addColorStop(1,   "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(mx - 280, my - 280, 560, 560);
      }

      // LAYER 3 — Warped grid with dual-axis wave distortion
      const cw = W / COLS;
      const ch2 = H / ROWS;
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const bx = c * cw, by = r * ch2;
          const wx = Math.sin(c * 0.28 + t.current) * Math.cos(r * 0.22 + t.current * 0.6) * 8;
          const wy = Math.cos(c * 0.22 + t.current * 0.8) * Math.sin(r * 0.28 + t.current * 0.5) * 8;
          const dx = bx - mx, dy = by - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const push = dist < 180 ? ((180 - dist) / 180) * 20 : 0;
          const ang = Math.atan2(dy, dx);
          const px = bx + Math.cos(ang) * push * 0.3 + wx;
          const py = by + Math.sin(ang) * push * 0.3 + wy;
          const prox = Math.max(0, 1 - dist / 220);

          if (c < COLS) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo((c + 1) * cw + wx, py);
            ctx.strokeStyle = `rgba(200,255,0,${0.02 + prox * 0.065})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
          if (r < ROWS) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px, py + ch2 + wy);
            ctx.strokeStyle = `rgba(0,212,255,${0.016 + prox * 0.045})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
          const da = 0.04 + prox * 0.42;
          ctx.beginPath();
          ctx.arc(px, py, prox > 0.35 ? 1.8 : 0.6, 0, Math.PI * 2);
          ctx.fillStyle = prox > 0.3
            ? `rgba(200,255,0,${da})`
            : `rgba(242,240,255,${da * 0.22})`;
          ctx.fill();
        }
      }

      // LAYER 4 — Drifting particles + connections
      const ps = particles.current;
      ps.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < ps.length; i += 2) {
        for (let j = i + 2; j < ps.length; j += 2) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(200,255,0,${0.04 * (1 - d / 140)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // LAYER 5 — Floating math glyphs with sine-wave drift
      const gs = glyphs.current;
      gs.forEach((g2) => {
        g2.x += g2.vx;
        g2.y += g2.vy + Math.sin(t.current * 1.2 + g2.phase) * 0.08;
        if (g2.x < 0) g2.x = W; if (g2.x > W) g2.x = 0;
        if (g2.y < 0) g2.y = H; if (g2.y > H) g2.y = 0;
        const pulse = 0.5 + 0.5 * Math.sin(t.current * 1.5 + g2.phase);
        ctx.font = `${g2.sz}px 'Space Mono', monospace`;
        ctx.fillStyle = `rgba(200,255,0,${g2.a * (0.6 + pulse * 0.4)})`;
        ctx.fillText(g2.ch, g2.x, g2.y);
      });

      raf.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onResize = () => {
      resize();
    };

    resize();
    draw();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    // Update canvas height when DOM changes (page switches)
    const observer = new MutationObserver(() => {
      const newH = Math.max(document.body.scrollHeight, window.innerHeight, 800);
      if (canvas.height !== newH) canvas.height = newH;
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
