"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CONTACT = { email: "harikrishnan.k.p055@gmail.com", phone: "+91 9544498047", linkedin: "HARIKRISHNAN K.P" };

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <div className={`copy-row group relative flex items-center justify-between gap-4 border-b border-line py-5 first:pt-0 ${copied ? "copy-complete" : ""}`}>
      <div><p className="text-[12px] text-muted">{label}</p>{href ? <a href={href} className="focus-ring mt-1 block text-[16px] text-ink underline decoration-transparent underline-offset-4 transition-colors hover:decoration-line">{value}</a> : <p className="mt-1 text-[16px] text-ink">{value}</p>}</div>
      <span className="copy-packet" aria-hidden="true" />
      <button onClick={handleCopy} aria-label={`Copy ${label}`} className="focus-ring relative rounded-full p-2 text-muted transition-all duration-150 hover:text-ink active:scale-90">
        {copied ? <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: "var(--accent)" }}><Check size={15} strokeWidth={1.5}/>copied</span> : <Copy size={15} strokeWidth={1.5}/>} 
      </button>
    </div>
  );
}

export default function Contact() {
  return <section id="contact" className="border-t border-line"><div className="mx-auto max-w-content px-6 py-20 md:px-8">
    <p className="font-display text-[15px] italic text-muted">Contact</p>
    <h2 className="mt-3 max-w-lg font-display text-2xl font-medium leading-snug tracking-tight text-ink">Open to data engineering roles &amp; collaborations</h2>
    <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted">Reach out directly — happy to talk about pipelines, streaming systems, or your next migration headache.</p>
    <div className="mt-10 max-w-md"><Row label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`}/><Row label="Phone" value={CONTACT.phone} href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}/><Row label="LinkedIn" value={CONTACT.linkedin}/></div>
    <p className="mt-16 text-[12px] text-muted">Built with Next.js · Deployed on Vercel</p>
  </div></section>;
}
