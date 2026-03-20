"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";

interface ToastCtx {
  show: (msg: string) => void;
}
const Ctx = createContext<ToastCtx>({ show: () => {} });
export const useToast = () => useContext(Ctx);

export default function Toast({ children }: { children?: React.ReactNode }) {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback((m: string) => {
    setMsg(m);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 3200);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 6000,
          background: "var(--s1)",
          border: "1px solid var(--a1)",
          padding: "14px 20px",
          fontFamily: "Space Mono, monospace",
          fontSize: 10,
          color: "var(--a1)",
          letterSpacing: 1,
          display: "flex",
          alignItems: "center",
          gap: 10,
          transform: visible ? "translateY(0)" : "translateY(90px)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--a1)", flexShrink: 0, boxShadow: "0 0 8px var(--a1)" }} />
        {msg}
      </div>
    </Ctx.Provider>
  );
}
