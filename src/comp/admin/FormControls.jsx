"use client";
// Shared form primitives for the admin content editors (blogs + case studies).
// One copy of Label/Input/Textarea/SectionCard/BlockEditor — both editors use
// these instead of duplicating ~150 lines of near-identical UI twice.

import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { C } from "@/lib/adminConstants";

export function Label({ children, required }) {
  return (
    <label style={{ fontFamily: C.sans, fontSize: 12.5, fontWeight: 600, color: C.body, display: "block", marginBottom: 5 }}>
      {children}{required && <span style={{ color: "#EF4444", marginLeft: 3 }}>*</span>}
    </label>
  );
}

export function Input({ style, ...props }) {
  return (
    <input
      style={{
        width: "100%", padding: "9px 12px", border: `1.5px solid ${C.border}`,
        borderRadius: 8, fontFamily: C.sans, fontSize: 13, color: C.text,
        outline: "none", transition: "border-color 0.18s", ...style,
      }}
      onFocus={(e) => (e.target.style.borderColor = C.accent)}
      onBlur={(e) => (e.target.style.borderColor = C.border)}
      {...props}
    />
  );
}

export function Textarea({ style, ...props }) {
  return (
    <textarea
      style={{
        width: "100%", padding: "9px 12px", border: `1.5px solid ${C.border}`,
        borderRadius: 8, fontFamily: C.sans, fontSize: 13, color: C.text,
        outline: "none", resize: "vertical", minHeight: 80, transition: "border-color 0.18s", ...style,
      }}
      onFocus={(e) => (e.target.style.borderColor = C.accent)}
      onBlur={(e) => (e.target.style.borderColor = C.border)}
      {...props}
    />
  );
}

export function SectionCard({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(10,19,16,0.04)", overflow: "hidden", marginBottom: 18 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: C.display }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{title}</span>
        {open ? <ChevronUp size={16} color={C.muted} /> : <ChevronDown size={16} color={C.muted} />}
      </button>
      {open && <div style={{ padding: "0 20px 20px", borderTop: "1px solid #F0F4F2" }}>{children}</div>}
    </div>
  );
}

const BLOCK_TYPES = ["p", "h3", "ul", "ol", "callout", "callout-warn", "steps", "img"];

// Content-block editor: renders the right controls for whichever block
// `type` is selected. Shared by both the Blog and Case Study section editors.
export function BlockEditor({ block, onChange, onRemove }) {
  const update = (key, val) => onChange({ ...block, [key]: val });
  const updateItem = (i, val) => {
    const items = [...(block.items || [])];
    items[i] = val;
    update("items", items);
  };
  const addItem = () => update("items", [...(block.items || []), ""]);
  const removeItem = (i) => update("items", (block.items || []).filter((_, j) => j !== i));

  const updateStep = (i, key, val) => {
    const steps = [...(block.stepItems || [])];
    steps[i] = { ...steps[i], [key]: val };
    update("stepItems", steps);
  };
  const addStep = () => update("stepItems", [...(block.stepItems || []), { n: "", title: "", desc: "", tip: "" }]);
  const removeStep = (i) => update("stepItems", (block.stepItems || []).filter((_, j) => j !== i));

  return (
    <div style={{ border: "1.5px solid #E6ECE8", borderRadius: 8, padding: 14, marginBottom: 10, background: "#FAFBFA" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <select value={block.type} onChange={(e) => update("type", e.target.value)} style={{ padding: "6px 10px", borderRadius: 6, border: `1.5px solid ${C.border}`, fontFamily: C.sans, fontSize: 12.5, color: C.body, outline: "none" }}>
          {BLOCK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button type="button" onClick={onRemove} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#EF4444", padding: 4 }}>
          <Trash2 size={14} />
        </button>
      </div>

      {["p", "h3", "callout", "callout-warn"].includes(block.type) && (
        <Textarea value={block.text || ""} onChange={(e) => update("text", e.target.value)} placeholder={`Enter ${block.type} text…`} style={{ minHeight: block.type === "p" ? 90 : 60 }} />
      )}

      {["ul", "ol"].includes(block.type) && (
        <div>
          {(block.items || []).map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <Input value={item} onChange={(e) => updateItem(i, e.target.value)} placeholder={`Item ${i + 1}`} />
              <button type="button" onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", flexShrink: 0 }}><Trash2 size={13} /></button>
            </div>
          ))}
          <button type="button" onClick={addItem} style={{ fontSize: 12.5, color: C.accent, background: "none", border: "none", cursor: "pointer", padding: "4px 0", fontFamily: C.sans }}>+ Add item</button>
        </div>
      )}

      {block.type === "img" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Input value={block.src || ""} onChange={(e) => update("src", e.target.value)} placeholder="Image URL" />
          <Input value={block.alt || ""} onChange={(e) => update("alt", e.target.value)} placeholder="Alt text" />
        </div>
      )}

      {block.type === "steps" && (
        <div>
          {(block.stepItems || []).map((step, i) => (
            <div key={i} style={{ border: "1px solid #E6ECE8", borderRadius: 6, padding: 10, marginBottom: 8, background: "#fff" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <Input value={step.n || ""} onChange={(e) => updateStep(i, "n", e.target.value)} placeholder="Step #" style={{ width: 60 }} />
                <Input value={step.title || ""} onChange={(e) => updateStep(i, "title", e.target.value)} placeholder="Step title" />
                <button type="button" onClick={() => removeStep(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", flexShrink: 0 }}><Trash2 size={13} /></button>
              </div>
              <Textarea value={step.desc || ""} onChange={(e) => updateStep(i, "desc", e.target.value)} placeholder="Description" style={{ minHeight: 56, marginBottom: 6 }} />
              <Input value={step.tip || ""} onChange={(e) => updateStep(i, "tip", e.target.value)} placeholder="Tip (optional)" />
            </div>
          ))}
          <button type="button" onClick={addStep} style={{ fontSize: 12.5, color: C.accent, background: "none", border: "none", cursor: "pointer", fontFamily: C.sans }}>+ Add step</button>
        </div>
      )}
    </div>
  );
}
