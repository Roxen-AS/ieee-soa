"use client";
import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const trigger = () => {
      el.querySelectorAll<HTMLElement>(".reveal, .reveal-left").forEach(node => {
        if (node.getBoundingClientRect().top < window.innerHeight * 0.94)
          node.classList.add("visible");
      });
    };
    trigger();
    window.addEventListener("scroll", trigger, { passive: true });
    return () => window.removeEventListener("scroll", trigger);
  }, []);
  return ref;
}
