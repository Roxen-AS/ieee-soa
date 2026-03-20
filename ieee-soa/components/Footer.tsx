import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 40px",
      borderTop: "1px solid var(--ln)",
      background: "rgba(6,8,16,0.7)",
      position: "relative",
      zIndex: 10,
    }}>
      <span style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--ink3)", letterSpacing:0.5 }}>
        © {new Date().getFullYear()} {SITE.name} — {SITE.university}
      </span>
      <div style={{ display:"flex", gap:24 }}>
        {["Privacy", "IEEE.org", "GitHub"].map((l) => (
          <span
            key={l}
            style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--ink3)", cursor:"pointer", transition:"color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--a1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink3)")}
          >
            {l}
          </span>
        ))}
      </div>
    </footer>
  );
}
