interface SectionHeaderProps {
  index: string;
  meta?: string;
  title: string;
}

export default function SectionHeader({ index, meta, title }: SectionHeaderProps) {
  return (
    <>
      <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:10 }} className="reveal">
        <span style={{ fontFamily:"Oxanium,monospace", fontSize:11, fontWeight:600, color:"var(--a1)", letterSpacing:2, flexShrink:0 }}>
          {index}
        </span>
        <span className="sec-rule" />
        {meta && (
          <span style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"var(--ink3)", letterSpacing:1, whiteSpace:"nowrap" }}>
            {meta}
          </span>
        )}
      </div>
      <h2
        className="glitch-title reveal delay-1"
        data-text={title}
        style={{
          fontFamily:"Oxanium,sans-serif",
          fontWeight:800,
          fontSize:"clamp(28px,4.5vw,56px)",
          letterSpacing:-1,
          color:"var(--ink)",
          marginBottom:40,
          marginTop:10,
        }}
      >
        {title}
      </h2>
    </>
  );
}
