"use client";
// Category dropdown with built-in "add" and "delete".
//   <CategorySelect type="blog" value={form.tag} onChange={(name, cat) => …} />
// Categories live in the backend (/api/categories), shared by every admin.
// Items that already use a deleted category keep their stored text value.
import { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, Settings2, X } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import { C, TAGS, TAG_COLORS, INFOGRAPHIC_CATEGORIES } from "@/lib/adminConstants";

const fallbackList = (type) =>
  (type === "blog" ? TAGS : INFOGRAPHIC_CATEGORIES).map((name) => ({
    _id: `fallback-${name}`, name, color: TAG_COLORS[name], fallback: true,
  }));

const selectStyle = {
  width: "100%", padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8,
  fontFamily: C.sans, fontSize: 13, color: C.text, outline: "none", background: "#fff",
};

export default function CategorySelect({ type, value, onChange, onLoaded }) {
  const [cats, setCats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [manage, setManage] = useState(false);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await adminApi.getCategories(type);
      setCats(res.data || []);
    } catch {
      setCats(fallbackList(type)); // backend unreachable — keep the form usable
    } finally { setLoaded(true); }
  }, [type]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (loaded && onLoaded) onLoaded(cats); }, [loaded, cats]); // eslint-disable-line react-hooks/exhaustive-deps

  const offline = cats.some((c) => c.fallback);
  // A saved value whose category was later deleted still has to show up.
  const options = value && !cats.some((c) => c.name === value) ? [...cats, { _id: "current", name: value }] : cats;

  const add = async () => {
    const name = newName.trim();
    if (!name) return;
    setBusy(true); setErr("");
    try {
      const res = await adminApi.createCategory(type, name);
      setNewName("");
      await load();
      onChange(res.data.name, res.data); // select the one just added
    } catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  };

  const remove = async (cat) => {
    const warn = cat.inUse ? `\n\n${cat.inUse} existing item(s) already use it and will keep the old name.` : "";
    if (!confirm(`Delete category "${cat.name}"?${warn}`)) return;
    setBusy(true); setErr("");
    try {
      await adminApi.deleteCategory(cat._id);
      const rest = cats.filter((c) => c._id !== cat._id);
      setCats(rest);
      if (cat.name === value && rest[0]) onChange(rest[0].name, rest[0]);
    } catch (e) { setErr(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value, cats.find((c) => c.name === e.target.value))}
        style={selectStyle}
      >
        {options.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
      </select>

      <button
        type="button"
        onClick={() => setManage((m) => !m)}
        style={{ marginTop: 7, display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: C.sans, fontSize: 12, fontWeight: 600, color: C.accent }}
      >
        {manage ? <X size={13} /> : <Settings2 size={13} />}
        {manage ? "Close" : "Add / delete categories"}
      </button>

      {manage && (
        <div style={{ marginTop: 8, padding: 12, border: `1.5px solid ${C.border}`, borderRadius: 10, background: "#FAFBFA" }}>
          {offline && (
            <div style={{ fontSize: 11.5, color: C.warn, marginBottom: 8 }}>
              Can’t reach the server — add/delete is disabled until it’s back.
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={newName}
              maxLength={40}
              disabled={busy || offline}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
              placeholder="New category name…"
              style={{ ...selectStyle, flex: 1 }}
            />
            <button
              type="button"
              onClick={add}
              disabled={busy || offline || !newName.trim()}
              style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "0 14px", borderRadius: 8, border: "none", background: C.accent, color: "#fff", fontFamily: C.sans, fontSize: 12.5, fontWeight: 600, cursor: busy || offline || !newName.trim() ? "not-allowed" : "pointer", opacity: busy || offline || !newName.trim() ? 0.55 : 1 }}
            >
              <Plus size={14} />Add
            </button>
          </div>

          {err && <div style={{ fontSize: 12, color: C.danger, marginTop: 7 }}>{err}</div>}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>
            {cats.length === 0 && <span style={{ fontSize: 12, color: C.muted }}>No categories yet — add one above.</span>}
            {cats.map((c) => (
              <span key={c._id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 6px 4px 11px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: c.color?.bg || C.accentLight, color: c.color?.text || C.accentDark }}>
                {c.name}
                <button
                  type="button"
                  title={`Delete ${c.name}`}
                  aria-label={`Delete ${c.name}`}
                  disabled={busy || offline}
                  onClick={() => remove(c)}
                  style={{ display: "grid", placeItems: "center", width: 20, height: 20, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.7)", color: C.danger, cursor: busy || offline ? "not-allowed" : "pointer", padding: 0 }}
                >
                  <Trash2 size={11} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
