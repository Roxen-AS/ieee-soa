const ITEMS = [
  "Computer Society","Power & Energy","Communications",
  "Robotics & Automation","Biomedical Engineering","Nanotechnology",
  "IEEE Region 10","SOA University",
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      className="ticker-wrap"
      style={{ overflow:"hidden", borderBottom:"1px solid var(--ln)", background:"rgba(6,8,16,0.5)", padding:"11px 0" }}
    >
      <div
        className="ticker-inner"
        style={{ display:"flex", whiteSpace:"nowrap", animation:"tick 30s linear infinite" }}
      >
        <style>{`@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display:"inline-flex", alignItems:"center", gap:28,
              fontFamily:"Oxanium,monospace", fontSize:11, fontWeight:600,
              color:"var(--ink3)", letterSpacing:3, textTransform:"uppercase", padding:"0 28px",
              transition:"color 0.2s", cursor:"default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--a1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink3)")}
          >
            {item}
            <span style={{ width:4, height:4, background:"var(--a1)", transform:"rotate(45deg)", flexShrink:0, display:"inline-block" }} />
          </span>
        ))}
      </div>
    </div>
  );
}
