"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { STACK_LAYERS, DEPLOY_PHASES } from "@/lib/technologyStackData";

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
  { id: "how", label: "How It Works", icon: "🔄" },
  { id: "caps", label: "Capabilities", icon: "🧩" },
  { id: "integration", label: "Integration", icon: "🔗" },
  { id: "outcomes", label: "Outcomes", icon: "🎯" },
  { id: "deploy", label: "Deployment", icon: "🚀" },
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

function TabOverview({ t, name }) {
  return (
    <div>
      <Sec icon="📖" first>Introduction</Sec>
      <div className="kt-card">
        <p style={p}>{t.intro}</p>
        <p style={{ ...p, marginTop: 12 }}>{t.overview}</p>
      </div>
      <Sec icon="🏛️">4 Pillars of {name}</Sec>
      <div className="kt-card" style={{ background: `linear-gradient(135deg,${C.tealSoft} 0%,${C.orangeSoft} 100%)` }}>
        <p style={{ fontSize: 13, color: C.para, marginBottom: 12 }}>The four building blocks this module is organised around:</p>
        <div className="kt-grid2">
          {t.pillars.map((x) => (
            <div key={x.title} className="kt-pillar">
              <div className="kt-pillar-icon">{x.icon}</div>
              <div><div style={hd}>{x.title}</div><div style={sm}>{x.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
      <Sec icon="📋">Module Details</Sec>
      <div className="kt-card">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {[["Module", name], ["Stack", "KEC Integrated CBG Technology Stack"], ["Stage", t.stage], ["Focus Area", t.focus]].map(([l, v]) => (
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

function TabHow({ t, name }) {
  return (
    <div>
      <Sec icon="🔄" first>How {name} Works</Sec>
      <div className="kt-card">
        <p style={{ ...p, fontSize: 13.5, marginBottom: 16 }}>Typical flow through this module, from input to hand-off:</p>
        {t.steps.map((s, i) => (
          <div key={i} className="kt-step">
            <div className="kt-step-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="kt-step-text">{s}</div>
          </div>
        ))}
        <div style={{ marginTop: 16, background: C.orangeSoft, border: "1px solid rgba(255,125,68,.3)", borderRadius: 8, padding: "13px 16px" }}>
          <div style={{ fontFamily: C.head, fontSize: 12, fontWeight: 700, color: C.orangeDeep, marginBottom: 5 }}>ℹ️ Indicative Description</div>
          <p style={{ fontSize: 13, color: "#7A3A15", lineHeight: 1.65, margin: 0 }}>
            Process architecture is being developed. Final configuration depends on site, feedstock and plant design.
          </p>
        </div>
      </div>
    </div>
  );
}

function TabCaps({ t }) {
  return (
    <div>
      <Sec icon="🧩" first>Key Capabilities</Sec>
      <div className="kt-card" style={{ padding: 0, overflow: "hidden" }}>
        {t.caps.map((c, i) => (
          <div key={i} className="kt-phase" style={{ padding: "11px 16px" }}>
            <div className="kt-phase-n">{String(i + 1).padStart(2, "0")}</div>
            <div style={{ fontSize: 13.5, color: C.para, lineHeight: 1.65, paddingTop: 3 }}>{c}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabIntegration({ t, name, onSelect }) {
  const all = t.sync === "All modules";
  const links = all ? [] : t.sync.split(" · ");
  return (
    <div>
      <Sec icon="🔗" first>Connects With</Sec>
      <div className="kt-card">
        <p style={{ ...p, fontSize: 13.5, marginBottom: 14 }}>
          {all
            ? `${name} is the shared backbone — every other module in the stack connects to it.`
            : `${name} exchanges data and flows with these neighbouring modules. Tap one to open it.`}
        </p>
        {!all && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {links.map((l) => (
              <button key={l} className="kt-chip" onClick={() => onSelect?.(l)}>{l}</button>
            ))}
          </div>
        )}
      </div>
      <Sec icon="🧱">Why Modular</Sec>
      <div className="kt-card">
        <div className="kt-grid2">
          {[
            ["Monitoring", "Every module exposes instrumentation points."],
            ["Synchronisation", "Gas, power and heat coordinated across modules."],
            ["Process Optimisation", "Shared data enables tuning across stages."],
            ["Operational Visibility", "One plant-wide picture for operators."],
          ].map(([a, b]) => (
            <div key={a} className="kt-check"><span style={{ color: C.orange, fontWeight: 800 }}>✓</span>
              <span style={sm}><strong style={{ color: C.teal }}>{a}</strong> — {b}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabOutcomes({ t }) {
  return (
    <div>
      <Sec icon="🎯" first>Intended Outcomes</Sec>
      <div className="kt-card">
        <div className="kt-grid2">
          {t.outcomes.map((o) => (
            <div key={o.t} style={{ background: C.cream, borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 15, marginBottom: 6, color: C.orange }}>◆</div>
              <div style={hd}>{o.t}</div><div style={sm}>{o.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: `linear-gradient(135deg,${C.teal} 0%,${C.tealMid} 100%)`, borderRadius: 10, padding: "16px 20px" }}>
        <div style={{ fontFamily: C.head, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>📌 Positioning Note</div>
        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.8)", lineHeight: 1.65, margin: 0 }}>
          This module is part of KEC's branded infrastructure and process framework being developed for integrated CBG ecosystem deployment.
        </p>
      </div>
    </div>
  );
}

function TabDeploy({ t }) {
  return (
    <div>
      <Sec icon="🚀" first>Deployment Path</Sec>
      <div className="kt-card" style={{ padding: "6px 16px" }}>
        {DEPLOY_PHASES.map((ph, i) => (
          <div key={ph.t} className="kt-phase">
            <div className="kt-phase-n">{String(i + 1).padStart(2, "0")}</div>
            <div><div style={{ ...hd, fontSize: 12.5, color: C.orangeDeep }}>{ph.t}</div>
              <div style={{ fontSize: 13, color: C.para, lineHeight: 1.65 }}>{ph.d}</div></div>
          </div>
        ))}
      </div>
      <Sec icon="📥">Inputs We Typically Need</Sec>
      <div className="kt-card">
        {t.inputs.map((x, i) => (
          <div key={i} className="kt-check" style={{ marginBottom: 7 }}>
            <span style={{ color: C.orange, fontWeight: 700 }}>✓</span><span style={{ fontSize: 13.5, color: C.para, lineHeight: 1.6 }}>{x}</span>
          </div>
        ))}
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
              {[["Layer", layer.label], ["Stage", data.stage], ["Focus", data.focus], ["Works With", data.sync]].map(([l, v]) => (
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
            {tab === "overview" && <TabOverview t={data} name={tech.title} />}
            {tab === "how" && <TabHow t={data} name={tech.title} />}
            {tab === "caps" && <TabCaps t={data} />}
            {tab === "integration" && <TabIntegration t={data} name={tech.title} onSelect={onSelect} />}
            {tab === "outcomes" && <TabOutcomes t={data} />}
            {tab === "deploy" && <TabDeploy t={data} />}
          </div>

          <div className="kt-footer">
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontFamily: C.head, fontSize: 13.5, fontWeight: 700, color: "#fff" }}>Want {tech.title} in your CBG project?</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.75)" }}>Speak with the KEC team about fit, timeline and scope.</div>
            </div>
            <Link href="/contact" className="kt-cta" onClick={onClose}>Talk to our team ↗</Link>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
