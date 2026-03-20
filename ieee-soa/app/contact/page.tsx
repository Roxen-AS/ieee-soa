"use client";
import { useState, useRef } from "react";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function ContactPage() {
  const revealRef = useReveal();
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = () => {
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast();
  };

  return (
    <div ref={revealRef} className="page-enter">
      <section style={{ padding:"72px 40px" }}>
        <SectionHeader index="05" meta="Get in Touch" title="Contact" />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", border:"1px solid var(--ln)" }}>
          {/* Form */}
          <div className="reveal delay-2" style={{ padding:"48px 44px", borderRight:"1px solid var(--ln)" }}>
            <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:800, fontSize:38, color:"var(--ink)", marginBottom:36, letterSpacing:-1 }}>
              Student Enquiry
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
                <Field label="Full Name" placeholder="Your name" type="text" />
                <Field label="Enrollment No." placeholder="21BECE001" type="text" />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
                <SelectField label="Branch" options={["B.Tech CSE","B.Tech ECE","B.Tech EEE","B.Tech Mech","B.Tech Civil"]} />
                <SelectField label="Year" options={["1st Year","2nd Year","3rd Year","4th Year"]} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
                <Field label="Email" placeholder="you@email.com" type="email" />
                <Field label="Phone" placeholder="+91 XXXXX XXXXX" type="tel" />
              </div>
              <div style={{ marginBottom:22, position:"relative" }}>
                <label style={{ display:"block", fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a1)", letterSpacing:2, textTransform:"uppercase", marginBottom:9 }}>Message</label>
                <textarea
                  placeholder="How can we help?"
                  rows={4}
                  style={{ width:"100%", background:"transparent", border:"none", borderBottom:"1px solid var(--ln2)", padding:"10px 0", fontSize:14, color:"var(--ink)", fontFamily:"Rajdhani,sans-serif", outline:"none", resize:"none" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--a1)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--ln2)")}
                />
              </div>
              <SubmitButton />
            </form>
          </div>

          {/* Sidebar info */}
          <div className="reveal delay-3" style={{ padding:"48px 32px", background:"rgba(6,8,16,0.5)" }}>
            <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:700, fontSize:22, color:"var(--ink)", marginBottom:32, letterSpacing:-0.5 }}>
              Find Us
            </div>
            {[
              { label:"Location", value: SITE.location },
              { label:"Email",    value: SITE.email },
              { label:"Social",   value: SITE.social },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom:24 }}>
                <div style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a1)", letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>{item.label}</div>
                <div style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.6 }}>{item.value}</div>
              </div>
            ))}
            <div style={{ height:1, background:"var(--ln)", margin:"28px 0" }} />
            <div style={{ fontFamily:"Oxanium,monospace", fontWeight:800, fontSize:36, color:"var(--a1)", letterSpacing:-1, lineHeight:1.1 }}>
              {SITE.branchNumber}
            </div>
            <div style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--ink3)", letterSpacing:1.5, marginTop:4 }}>Branch Number</div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Toast */}
      <div style={{
        position:"fixed", bottom:28, right:28, zIndex:6000,
        background:"var(--s1)", border:"1px solid var(--a1)",
        padding:"14px 20px",
        fontFamily:"Space Mono,monospace", fontSize:10, color:"var(--a1)", letterSpacing:1,
        display:"flex", alignItems:"center", gap:10,
        transform: toastVisible ? "translateY(0)" : "translateY(90px)",
        opacity: toastVisible ? 1 : 0,
        transition:"transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
        pointerEvents:"none",
      }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--a1)", flexShrink:0, boxShadow:"0 0 8px var(--a1)" }} />
        Message transmitted successfully
      </div>
    </div>
  );
}

function Field({ label, placeholder, type }: { label: string; placeholder: string; type: string }) {
  return (
    <div style={{ marginBottom:22, position:"relative" }}>
      <label style={{ display:"block", fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a1)", letterSpacing:2, textTransform:"uppercase", marginBottom:9 }}>{label}</label>
      <div style={{ position:"relative" }}>
        <input
          type={type}
          placeholder={placeholder}
          style={{ width:"100%", background:"transparent", border:"none", borderBottom:"1px solid var(--ln2)", padding:"10px 0", fontSize:14, color:"var(--ink)", fontFamily:"Rajdhani,sans-serif", outline:"none" }}
          onFocus={(e) => {
            (e.currentTarget.style.borderBottomColor = "var(--a1)");
            const bar = e.currentTarget.nextElementSibling as HTMLElement;
            if (bar) bar.style.width = "100%";
          }}
          onBlur={(e) => {
            (e.currentTarget.style.borderBottomColor = "var(--ln2)");
            const bar = e.currentTarget.nextElementSibling as HTMLElement;
            if (bar) bar.style.width = "0%";
          }}
        />
        {/* Animated underline fill */}
        <div style={{ position:"absolute", bottom:0, left:0, height:1, width:"0%", background:"var(--a1)", transition:"width 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div style={{ marginBottom:22 }}>
      <label style={{ display:"block", fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a1)", letterSpacing:2, textTransform:"uppercase", marginBottom:9 }}>{label}</label>
      <select
        defaultValue=""
        style={{ width:"100%", background:"var(--bg2)", border:"none", borderBottom:"1px solid var(--ln2)", padding:"10px 0", fontSize:14, color:"var(--ink2)", fontFamily:"Rajdhani,sans-serif", outline:"none", WebkitAppearance:"none", borderRadius:0 }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--a1)")}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--ln2)")}
      >
        <option value="" disabled>Select {label}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SubmitButton() {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:"100%", marginTop:28,
        fontFamily:"Space Mono,monospace", fontSize:9, fontWeight:700,
        letterSpacing:2, textTransform:"uppercase",
        padding:14, background:"var(--a1)", color:"var(--bg)", border:"none", cursor:"pointer",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 8px 28px rgba(200,255,0,0.3)" : "none",
        transition:"all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      Send Message ↗
    </button>
  );
}
