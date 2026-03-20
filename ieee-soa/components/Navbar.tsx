"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/cs", label: "CS Chapter" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 500,
        height: "58px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        background: "rgba(4,6,11,0.78)",
        backdropFilter: "blur(28px)",
        borderBottom: "1px solid var(--ln)",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "120px",
            height: "36px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* REPLACE: swap placeholder with actual logo */}
          {/* <Image src="/logos/sb.png" alt="IEEE SOA SB" width={120} height={36} className="logo-blend" /> */}
          <div
            style={{
              fontFamily: "Oxanium, monospace",
              fontWeight: 800,
              fontSize: "13px",
              color: "var(--a1)",
              letterSpacing: "2px",
              border: "1px solid rgba(200,255,0,0.25)",
              padding: "4px 10px",
              borderRadius: "4px",
            }}
          >
            IEEE SOA SB
          </div>
        </div>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex" }}>
        {LINKS.map((l) => {
          const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              style={{
                height: "58px",
                padding: "0 17px",
                display: "flex",
                alignItems: "center",
                fontFamily: "Space Mono, monospace",
                fontSize: "10px",
                color: active ? "var(--a1)" : "var(--ink3)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                position: "relative",
                transition: "color 0.2s",
                borderBottom: active ? "1px solid var(--a1)" : "none",
              }}
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <a
        href="https://www.ieee.org/membership/join/index.html"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          padding: "9px 22px",
          border: "1px solid var(--a1)",
          color: "var(--a1)",
          background: "transparent",
          cursor: "pointer",
          textDecoration: "none",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--a1)";
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.color = "var(--a1)";
        }}
      >
        Join IEEE ↗
      </a>
    </nav>
  );
}
