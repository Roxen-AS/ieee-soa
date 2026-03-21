"use client";
import { useState, useRef } from "react";
import { SectionHeader, Footer, useToast } from "@/components/UI";
import { SITE } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function ContactPage() {
  const ref   = useReveal();
  const toast = useToast();
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const name  = (form.querySelector("#f-name")  as HTMLInputElement).value.trim();
    const email = (form.querySelector("#f-email") as HTMLInputElement).value.trim();
    if (!name || !email) { toast.show("Please fill in required fields","error"); return; }

    setSending(true);
    try {
      // Dynamic import so build doesn't fail if keys aren't set yet
      const emailjs = await import("@emailjs/browser");
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      toast.show("Message transmitted successfully ✓");
      form.reset();
    } catch {
      toast.show("Failed to send — please try again","error");
    } finally {
      setSending(false);
    }
  };

  const INFO = [
    { label:"Location", value: SITE.location },
    { label:"Email",    value: SITE.email    },
    { label:"Branch",   value: SITE.branchNumber },
  ];

  return (
    <div ref={ref} className="page-enter">
      <section style={{ padding:"clamp(40px,6vw,72px) clamp(20px,5vw,48px)" }}>
        <SectionHeader index="05" meta="Get in Touch" title="Contact" />

        <div style={{ maxWidth:700, margin:"0 auto" }}>
          {/* Form box */}
          <div className="reveal delay-1" style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)", borderRadius:16, padding:"clamp(28px,5vw,48px)", backdropFilter:"blur(8px)", transition:"background .4s,border-color .4s" }}>
            <div style={{ fontFamily:"Oxanium,sans-serif", fontWeight:800, fontSize:"clamp(22px,4vw,34px)", color:"var(--ink)", marginBottom:32, letterSpacing:-1, transition:"color .3s" }}>
              Student Enquiry
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>
              <style>{`@media(max-width:520px){.form-row-2{grid-template-columns:1fr!important;}}`}</style>

              {/* Name field maps to EmailJS template variable {{from_name}} */}
              <div className="form-row-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                <Field id="f-name"   name="from_name"    label="Full Name"      placeholder="Your name"     type="text"  required />
                <Field id="f-enroll" name="enrollment"   label="Enrollment No." placeholder="21BECE001"     type="text"  />
              </div>
              <div className="form-row-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                <SelectField name="branch" label="Branch" options={["B.Tech CSE","B.Tech ECE","B.Tech EEE","B.Tech Mech","B.Tech Civil"]} />
                <SelectField name="year"   label="Year"   options={["1st Year","2nd Year","3rd Year","4th Year"]} />
              </div>
              <div className="form-row-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                {/* reply_to maps to EmailJS auto-reply */}
                <Field id="f-email" name="reply_to" label="Email" placeholder="you@email.com"    type="email" required />
                <Field id="f-phone" name="phone"    label="Phone" placeholder="+91 XXXXX XXXXX"  type="tel"   />
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a1)", letterSpacing:2, textTransform:"uppercase", marginBottom:8, transition:"color .3s" }}>Message</label>
                {/* message maps to {{message}} in EmailJS template */}
                <textarea name="message" placeholder="How can we help?" rows={4} className="form-input" style={{ resize:"vertical", minHeight:100 }} />
              </div>
              <SubmitButton sending={sending} />
            </form>
          </div>

          {/* Info chips */}
          <div className="reveal delay-2" style={{ display:"flex", gap:14, marginTop:20, flexWrap:"wrap" }}>
            {INFO.map(chip => (
              <div key={chip.label} style={{ flex:1, minWidth:160, background:"var(--card-bg)", border:"1px solid var(--card-border)", borderRadius:10, padding:"16px 20px", backdropFilter:"blur(8px)", transition:"background .4s,border-color .4s" }}>
                <div style={{ fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a1)", letterSpacing:2, textTransform:"uppercase", marginBottom:6, transition:"color .3s" }}>{chip.label}</div>
                <div style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.5, transition:"color .3s" }}>{chip.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Field({ id, name, label, placeholder, type, required }: { id?:string; name:string; label:string; placeholder:string; type:string; required?:boolean }) {
  return (
    <div style={{ marginBottom:20 }}>
      <label style={{ display:"block", fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a1)", letterSpacing:2, textTransform:"uppercase", marginBottom:8, transition:"color .3s" }}>
        {label}{required && <span style={{ color:"var(--a2)", marginLeft:4 }}>*</span>}
      </label>
      <input id={id} name={name} type={type} placeholder={placeholder} required={required} className="form-input" />
    </div>
  );
}

function SelectField({ name, label, options }: { name:string; label:string; options:string[] }) {
  return (
    <div style={{ marginBottom:20 }}>
      <label style={{ display:"block", fontFamily:"Space Mono,monospace", fontSize:8, color:"var(--a1)", letterSpacing:2, textTransform:"uppercase", marginBottom:8, transition:"color .3s" }}>
        {label}
      </label>
      <select name={name} defaultValue="" className="form-input" style={{
        cursor:"pointer",
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center", paddingRight:36,
      }}>
        <option value="" disabled>Select {label}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SubmitButton({ sending }: { sending: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="submit" disabled={sending}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width:"100%", marginTop:8,
        fontFamily:"Space Mono,monospace", fontSize:9, fontWeight:700,
        letterSpacing:2, textTransform:"uppercase", padding:14,
        background: sending ? "var(--ink3)" : "var(--a1)",
        color:"#0A0E1A", border:"none", borderRadius:8, cursor: sending ? "not-allowed" : "pointer",
        transform: (!sending && hov) ? "translateY(-2px)" : "none",
        boxShadow: (!sending && hov) ? "0 10px 30px rgba(200,255,0,0.28)" : "none",
        transition:"all .3s cubic-bezier(.22,1,.36,1)",
        opacity: sending ? .7 : 1,
      }}
    >
      {sending ? "Transmitting..." : "Send Message ↗"}
    </button>
  );
}
