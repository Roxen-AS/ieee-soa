"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: -100, y: -100 });
  const lag  = useRef({ x: -100, y: -100 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
    };
    const animate = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.11;
      lag.current.y += (pos.current.y - lag.current.y) * 0.11;
      if (ring.current) { ring.current.style.left = lag.current.x + "px"; ring.current.style.top = lag.current.y + "px"; }
      raf.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div id="cursor-dot"  ref={dot} />
      <div id="cursor-ring" ref={ring} />
    </>
  );
}
