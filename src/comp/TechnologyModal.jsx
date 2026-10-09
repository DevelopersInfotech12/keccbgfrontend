"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { STACK_LAYERS, TECH_STACK, BUILD_IT_RIGHT } from "@/lib/technologyStackData";

/* Modal layout ported from siacc BISCRSProductModal, re-themed with KEC
   palette: teal #02303D · orange #FF7D44 · warm cream #F1EEE7. */
const C = {
  teal: "#02303D", tealMid: "#014052", tealSoft: "#E8F1F3",
  orange: "#FF7D44", orangeDeep: "#E5632B", orangeSoft: "#FFF0E8",
  cream: "#F6F4EF", cream2: "#F1EEE7",
  ink: "#12100D", para: "rgba(18,16,13,0.78)", muted: "#6B7A80",
  border: "#E4DFD5", white: "#FFFFFF",
  head: "var(--font-display), 'Bricolage Grotesque', system-ui, sans-serif",
  body: "var(--font-inter), 'Inter', system-ui, sans-serif",
};

const TABS = [
  { id: "overview", label: "Overview", icon: "📖" },
  { id: "addresses", label: "What It Addresses", icon: "🧩" },
  { id: "flow", label: "Engineering Flow", icon: "🔄" },
  { id: "why", label: "Why It Matters", icon: "🎯" },
  { id: "approach", label: "KEC Approach", icon: "🏛️" },
];

const css = `
@keyframes kt-fade{from{opacity:0}to{opacity:1}}
@keyframes kt-slide{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.kt-overlay{position:fixed;inset:0;z-index:9000;background:rgba(2,48,61,.72);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:16px;animation:kt-fade .2s ease forwards}
.kt-box{background:#fff;border-radius:16px;width:100%;max-width:860px;max-height:92vh;display:flex;flex-direction:column;box-shadow:0 28px 72px rgba(2,48,61,.35);animation:kt-slide .25s ease forwards;overflow:hidden;font-family:${C.body};color:${C.ink}}
.kt-header{padding:20px 24px 0;background:#fff;flex-shrink:0;border-bottom:1px solid ${C.border}}
.kt-top{display:flex;align-items:flex-start;gap:14px;margin-bottom:16px}
.kt-close{width:34px;height:34px;border-radius:50%;background:${C.cream2};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:${C.muted};transition:background .18s,color .18s;margin-left:auto;flex-shrink:0}
.kt-close:hover{background:${C.orange};color:#fff}
.kt-strip{display:flex;border:1px solid ${C.border};border-radius:8px;overflow:hidden;margin-bottom:16px;flex-wrap:wrap}
.kt-strip-item{flex:1;min-width:110px;padding:8px 14px;border-right:1px solid ${C.border};background:${C.cream}}
.kt-strip-item:last-child{border-right:none}
.kt-strip-label{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:${C.muted};margin-bottom:2px}
.kt-strip-val{font-family:${C.head};font-size:12.5px;font-weight:700;color:${C.teal}}
.kt-tabs{display:flex;overflow-x:auto;scrollbar-width:none}
.kt-tabs::-webkit-scrollbar{display:none}
.kt-tab{display:flex;align-items:center;gap:6px;padding:10px 16px;border:none;background:transparent;cursor:pointer;font-family:${C.head};font-size:12px;font-weight:600;color:${C.muted};white-space:nowrap;border-bottom:2px solid transparent;transition:color .18s,border-color .18s;flex-shrink:0}
.kt-tab:hover{color:${C.teal}}
.kt-tab.active{color:${C.orangeDeep};border-bottom-color:${C.orange};background:rgba(255,125,68,.05)}
.kt-body{flex:1;overflow-y:auto;padding:24px;background:${C.cream}}
.kt-body::-webkit-scrollbar{width:5px}
.kt-body::-webkit-scrollbar-thumb{background:#C9D6DA;border-radius:4px}
.kt-body::-webkit-scrollbar-thumb:hover{background:${C.orange}}
.kt-footer{padding:14px 24px;background:linear-gradient(135deg,${C.teal} 0%,${C.tealMid} 100%);display:flex;align-items:center;gap:16px;flex-wrap:wrap;flex-shrink:0;border-top:3px solid ${C.orange}}
.kt-cta{background:${C.orange};color:#fff;font-family:${C.head};font-size:12.5px;font-weight:700;padding:9px 20px;border-radius:999px;text-decoration:none;white-space:nowrap;transition:background .18s}
.kt-cta:hover{background:${C.orangeDeep}}
.kt-sec{font-family:${C.head};font-size:11px;font-weight:700;color:${C.orangeDeep};text-transform:uppercase;letter-spacing:.1em;display:flex;align-items:center;gap:7px;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid ${C.border}}
.kt-card{background:#fff;border:1px solid ${C.border};border-radius:10px;padding:18px;margin-bottom:14px}
.kt-grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:500px){.kt-grid2{grid-template-columns:1fr}}
.kt-pillar{background:${C.cream};border:1px solid ${C.border};border-radius:8px;padding:12px 14px;display:flex;gap:10px;align-items:flex-start}
.kt-pillar-icon{width:32px;height:32px;border-radius:8px;background:${C.tealSoft};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.kt-step{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px}
.kt-step-num{width:28px;height:28px;border-radius:50%;background:${C.teal};color:#fff;flex-shrink:0;font-family:${C.head};font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px}
.kt-step-text{font-size:13.5px;color:${C.para};line-height:1.65;padding-top:4px}
.kt-chip{font-family:${C.head};font-size:12px;font-weight:600;padding:7px 14px;border-radius:999px;border:1.5px solid ${C.border};background:#fff;color:${C.teal};transition:all .18s}
button.kt-chip{cursor:pointer}
button.kt-chip:hover{border-color:${C.orange};color:${C.orangeDeep};background:${C.orangeSoft}}
.kt-check{display:flex;gap:8px;background:${C.cream};border-radius:7px;padding:9px 12px;align-items:flex-start}
.kt-phase{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid ${C.cream2}}
.kt-phase:last-child{border-bottom:none}
.kt-phase-n{width:28px;height:28px;border-radius:6px;background:${C.orangeSoft};color:${C.orangeDeep};flex-shrink:0;font-family:${C.head};font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center}
@media(max-width:600px){.kt-header{padding:14px 16px 0}.kt-body{padding:16px}.kt-footer{padding:12px 16px}.kt-tab{padding:9px 12px;font-size:11px}.kt-strip-item{min-width:90px}}
`;

const p = { fontSize: 14, color: C.para, lineHeight: 1.85, margin: 0, textAlign: "justify" };
const hd = { fontFamily: C.head, fontSize: 13, fontWeight: 700, color: C.teal, marginBottom: 4 };
const sm = { fontSize: 12.5, color: C.para, lineHeight: 1.6 };
const Sec = ({ icon, children, first }) => (
  <div className="kt-sec" style={first ? undefined : { marginTop: 20 }}><span>{icon}</span> {children}</div>
);

const caps = { fontFamily: C.head, fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: ".02em", lineHeight: 1.5, margin: "0 0 10px" };

function Paras({ items = [], style }) {
  return items.map((t, i) => <p key={i} style={{ ...p, marginTop: i ? 12 : 0, ...style }}>{t}</p>);
}

function Checks({ items = [] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {items.map((x, i) => (
        <div key={i} className="kt-check">
          <span style={{ color: C.orange, fontWeight: 800 }}>✓</span>
          <span style={{ fontSize: 13.5, color: C.para, lineHeight: 1.6 }}>{x}</span>
        </div>
      ))}
    </div>
  );
}

function FlowChips({ flow }) {
  const parts = flow.split("→").map((x) => x.trim());
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, margin: "14px 0" }}>
      {parts.map((x, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span className="kt-chip" style={{ fontSize: 11.5, background: C.tealSoft, borderColor: "transparent" }}>{x}</span>
          {i < parts.length - 1 && <span style={{ color: C.orange, fontWeight: 800 }}>→</span>}
        </span>
      ))}
    </div>
  );
}

function TabOverview({ t, name, layer }) {
  const c = t.challenge;
  return (
    <div>
      <Sec icon="📖" first>Introduction</Sec>
      <div className="kt-card">
        <div style={{ ...caps, color: C.orangeDeep, fontSize: 12.5 }}>{t.tagline}</div>
        <p style={p}>{t.subtitle}</p>
        {t.lead?.length > 0 && <Paras items={t.lead} style={{ marginTop: 12 }} />}
        {t.leadTags && <div style={{ marginTop: 12, fontFamily: C.head, fontSize: 12, fontWeight: 600, color: C.muted }}>{t.leadTags}</div>}
      </div>
      <Sec icon="⚙️">The Engineering Challenge</Sec>
      <div className="kt-card">
        <div style={caps}>{c.heading}</div>
        <Paras items={c.paras} />
        {c.listIntro && <p style={{ ...p, margin: "14px 0 8px", fontWeight: 600, color: C.teal }}>{c.listIntro}</p>}
        {c.list && <Checks items={c.list} />}
        {c.closing && <Paras items={c.closing} style={{ marginTop: 14 }} />}
      </div>
      <Sec icon="📋">Module Details</Sec>
      <div className="kt-card">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {[["Module", name], ["Stack", "KEC Integrated CBG Technology Stack"], ["Focus Area", t.focus], ["Layer", layer.label]].map(([l, v]) => (
            <div key={l} style={{ minWidth: 160, flex: 1 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: C.muted, marginBottom: 3 }}>{l}</div>
              <div style={{ fontFamily: C.head, fontSize: 13, fontWeight: 700, color: C.teal }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabAddresses({ t, name }) {
  const a = t.addresses;
  const odd = a.items.length % 2 === 1;
  return (
    <div>
      <Sec icon="🧩" first>What {name} Addresses</Sec>
      <div className="kt-card" style={{ background: `linear-gradient(135deg,${C.tealSoft} 0%,${C.orangeSoft} 100%)` }}>
        {a.heading && <div style={caps}>{a.heading}</div>}
        <p style={{ fontSize: 13, color: C.para, marginBottom: 12 }}>{a.intro || `${a.items.length} focus areas this module is organised around:`}</p>
        <div className="kt-grid2">
          {a.items.map((x, i) => (
            <div key={x.title} className="kt-pillar" style={odd && i === a.items.length - 1 ? { gridColumn: "1 / -1" } : undefined}>
              <div className="kt-pillar-icon" style={{ fontFamily: C.head, fontSize: 12, fontWeight: 700, color: C.teal }}>{String(i + 1).padStart(2, "0")}</div>
              <div><div style={hd}>{x.title}</div><div style={sm}>{x.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabFlow({ t, name }) {
  const f = t.flow;
  return (
    <div>
      <Sec icon="🔄" first>Engineering Flow</Sec>
      <div className="kt-card">
        {f.heading && <div style={caps}>{f.heading}</div>}
        {f.intro && <p style={{ ...p, marginBottom: 14 }}>{f.intro}</p>}
        {!f.intro && <p style={{ ...p, fontSize: 13.5, marginBottom: 16 }}>How {name} moves through the engineering sequence:</p>}
        {f.steps.map((s, i) => (
          <div key={i} className="kt-step">
            <div className="kt-step-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="kt-step-text" style={{ fontFamily: C.head, fontWeight: 600, color: C.teal, letterSpacing: ".02em" }}>{s}</div>
          </div>
        ))}
        {f.closing && <div style={{ marginTop: 16 }}><Paras items={f.closing} /></div>}
      </div>
    </div>
  );
}

function TabWhy({ t }) {
  const w = t.why;
  return (
    <div>
      <Sec icon="🎯" first>Why It Matters</Sec>
      <div className="kt-card">
        {w.heading && <div style={caps}>{w.heading}</div>}
        <Paras items={w.paras} />
        {w.listIntro && <p style={{ ...p, margin: "0 0 8px", fontWeight: 600, color: C.teal }}>{w.listIntro}</p>}
        {w.list && <Checks items={w.list} />}
        {w.closing && <Paras items={w.closing} style={{ marginTop: 14 }} />}
        {w.pull && (
          <div style={{ marginTop: 14, background: C.orangeSoft, border: "1px solid rgba(255,125,68,.3)", borderRadius: 8, padding: "13px 16px" }}>
            {w.pull.map((l) => (
              <div key={l} style={{ fontFamily: C.head, fontSize: 12.5, fontWeight: 700, color: C.orangeDeep, letterSpacing: ".04em", lineHeight: 1.8 }}>{l}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TabApproach({ t, name, title, onSelect }) {
  const a = t.approach;
  const others = Object.keys(TECH_STACK).filter((k) => k !== title);
  return (
    <div>
      <Sec icon="🏛️" first>KEC Engineering Approach</Sec>
      <div className="kt-card">
        {a.heading && <div style={caps}>{a.heading}</div>}
        {a.before && <Paras items={a.before} />}
        <FlowChips flow={a.flow} />
        {a.after && <Paras items={a.after} />}
      </div>

      <div style={{ background: `linear-gradient(135deg,${C.teal} 0%,${C.tealMid} 100%)`, borderRadius: 10, padding: "16px 20px", marginBottom: 14 }}>
        <div style={{ fontFamily: C.head, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>📌 {BUILD_IT_RIGHT.title}</div>
        <div style={{ fontFamily: C.head, fontSize: 11.5, fontWeight: 700, color: C.orange, letterSpacing: ".06em", marginBottom: 8 }}>{BUILD_IT_RIGHT.tagline}</div>
        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.8)", lineHeight: 1.65, margin: 0 }}>{BUILD_IT_RIGHT.subtitle}</p>
        <div style={{ marginTop: 10, fontFamily: C.head, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.9)", letterSpacing: ".04em", lineHeight: 1.6 }}>{BUILD_IT_RIGHT.framework}</div>
        <div style={{ marginTop: 10, fontFamily: C.head, fontSize: 11.5, fontWeight: 700, color: "#fff", lineHeight: 1.6 }}>
          {BUILD_IT_RIGHT.philosophy.map((l) => <div key={l}>{l}</div>)}
        </div>
      </div>

      <Sec icon="🔗">KEC Solution Ecosystem</Sec>
      <div className="kt-card">
        <p style={{ ...p, fontSize: 13.5, marginBottom: 14 }}>{name} is one part of the KEC engineering ecosystem. Tap a module to open it.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {others.map((k) => (
            <button key={k} className="kt-chip" onClick={() => onSelect?.(k)} title={TECH_STACK[k].focus}>{k}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechnologyModal({ tech, data, onClose, onSelect }) {
  const [tab, setTab] = useState("overview");
  const [mounted, setMounted] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => setMounted(true), []);
  const onKey = useCallback((e) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onKey]);
  useEffect(() => { bodyRef.current && (bodyRef.current.scrollTop = 0); }, [tab]);
  useEffect(() => setTab("overview"), [tech?.title]);

  if (!tech || !data || !mounted) return null;
  const Icon = tech.icon;
  const layer = STACK_LAYERS[data.layer];

  return createPortal(
    <>
      <style>{css}</style>
      <div className="kt-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="kt-box" role="dialog" aria-modal="true" aria-label={tech.title}>
          <div className="kt-header">
            <div className="kt-top">
              <div style={{ width: 52, height: 52, borderRadius: 12, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 10px 20px -8px ${C.orange}99` }}>
                <Icon size={24} color={C.orange} strokeWidth={1.9} aria-hidden="true" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: C.head, fontSize: 9.5, fontWeight: 700, background: C.orangeSoft, color: C.orangeDeep, padding: "2px 9px", borderRadius: 3, letterSpacing: ".05em" }}>KEC TECH STACK</span>
                  <span style={{ fontFamily: C.head, fontSize: 9.5, fontWeight: 700, background: layer.bg, color: layer.text, padding: "2px 9px", borderRadius: 3 }}>{layer.label}</span>
                </div>
                <h2 style={{ fontFamily: C.head, fontSize: "clamp(.95rem,2vw,1.25rem)", color: C.teal, fontWeight: 700, lineHeight: 1.25, margin: "0 0 3px" }}>
                  KEC Technology — {tech.title}
                </h2>
                <div style={{ fontSize: 12, color: C.muted }}>{tech.body}</div>
              </div>
              <button className="kt-close" onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className="kt-strip">
              {[["Layer", layer.label], ["Focus", data.focus], ["Tagline", data.tagline]].map(([l, v]) => (
                <div key={l} className="kt-strip-item">
                  <div className="kt-strip-label">{l}</div><div className="kt-strip-val">{v}</div>
                </div>
              ))}
            </div>
            <div className="kt-tabs" role="tablist">
              {TABS.map((x) => (
                <button key={x.id} role="tab" aria-selected={tab === x.id} className={`kt-tab${tab === x.id ? " active" : ""}`} onClick={() => setTab(x.id)}>
                  <span>{x.icon}</span>{x.label}
                </button>
              ))}
            </div>
          </div>

          <div className="kt-body" ref={bodyRef}>
            {tab === "overview" && <TabOverview t={data} name={tech.title} layer={layer} />}
            {tab === "addresses" && <TabAddresses t={data} name={tech.title} />}
            {tab === "flow" && <TabFlow t={data} name={tech.title} />}
            {tab === "why" && <TabWhy t={data} />}
            {tab === "approach" && <TabApproach t={data} name={tech.title} title={tech.title} onSelect={onSelect} />}
          </div>

          <div className="kt-footer">
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontFamily: C.head, fontSize: 13.5, fontWeight: 700, color: "#fff" }}>{data.cta.heading}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.85)" }}>{data.cta.line}</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.6)", marginTop: 2 }}>{data.cta.keywords}</div>
            </div>
            <Link href="/contact" className="kt-cta" onClick={onClose}>Talk to our team ↗</Link>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
