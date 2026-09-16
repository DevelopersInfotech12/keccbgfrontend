"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, PenSquare, MapPin, AlertCircle, CheckCircle2, X, Save } from "lucide-react";
import { Label, Input } from "@/comp/admin/FormControls";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { adminApi } from "@/lib/adminApi";
import { C, EMPTY_CITY_PARK } from "@/lib/adminConstants";

function CityParkModal({ initial, onClose, onSaved }) {
  const [form, setForm] = useState(initial || EMPTY_CITY_PARK);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!initial?._id;
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.city || !form.state || !form.stat) { setError("City, State and Plants stat are all required."); return; }
    setSaving(true); setError("");
    try {
      if (isEdit) await adminApi.updateCityPark(form._id, form);
      else await adminApi.createCityPark(form);
      onSaved();
    } catch (e2) { setError(e2.message); }
    finally { setSaving(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,19,16,0.5)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 14, padding: 24, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <h2 style={{ fontFamily: C.display, fontSize: 17, fontWeight: 700, color: C.text }}>{isEdit ? "Edit City Park" : "Add City Park"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}><X size={18} /></button>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: 14 }}>
            <Label required>City</Label>
            <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. Sangrur" autoFocus />
          </div>
          <div style={{ marginBottom: 14 }}>
            <Label required>State</Label>
            <Input value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="e.g. Punjab" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <Label required>Plants stat</Label>
            <Input value={form.stat} onChange={(e) => set("stat", e.target.value)} placeholder="e.g. 3 Plants" />
          </div>
          <div style={{ marginBottom: 18 }}>
            <Label>Display order</Label>
            <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} placeholder="0" />
            <p style={{ fontSize: 11.5, color: C.muted, marginTop: 4 }}>Lower number shows first in the scrolling card strip.</p>
          </div>

          {error && (
            <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
              <AlertCircle size={15} color="#EF4444" />
              <span style={{ fontSize: 12.5, color: "#DC2626" }}>{error}</span>
            </div>
          )}

          <button type="submit" disabled={saving} style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: `linear-gradient(135deg,${C.accent},#2E9E63)`, color: "#fff", padding: "11px 20px", borderRadius: 8, fontFamily: C.sans, fontSize: 13.5, fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
            <Save size={15} />{saving ? "Saving…" : isEdit ? "Save Changes" : "Add City Park"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminCityParksScreen() {
  const { loading: authLoading } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null); // null | {} (new) | {..row} (edit)
  const [toast, setToast] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const res = await adminApi.getCityParks();
      setItems(res.data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (!authLoading) fetchItems(); }, [authLoading, fetchItems]);

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3500); };

  const handleDelete = async (id) => {
    if (!confirm("Remove this city park from the Home page strip?")) return;
    try { await adminApi.deleteCityPark(id); fetchItems(); showToast("success", "City park removed."); }
    catch (e) { showToast("error", e.message); }
  };

  const handleSaved = () => { setModal(null); fetchItems(); showToast("success", "City park saved."); };

  if (authLoading) return null;

  return (
    <>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 100, display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderRadius: 10, background: toast.type === "error" ? "#FEF2F2" : "#EAF6EF", border: `1.5px solid ${toast.type === "error" ? "#FECACA" : "#BBF7D0"}`, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          {toast.type === "error" ? <AlertCircle size={16} color="#DC2626" /> : <CheckCircle2 size={16} color="#218452" />}
          <span style={{ fontSize: 13, fontWeight: 500, color: toast.type === "error" ? "#DC2626" : "#1A6A42", fontFamily: C.sans }}>{toast.msg}</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: C.display, fontSize: 21, fontWeight: 700, color: C.text }}>City Network Parks</h1>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>Edits the scrolling city card strip on the Home page hero.</p>
        </div>
        <button onClick={() => setModal({})} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${C.accent},#2E9E63)`, color: "#fff", padding: "10px 18px", borderRadius: 8, fontFamily: C.sans, fontSize: 13.5, fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(33,132,82,0.28)" }}>
          <Plus size={15} />Add City Park
        </button>
      </div>

      {error && (
        <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 16px", margin: "16px 0" }}>
          <AlertCircle size={16} color="#EF4444" />
          <span style={{ fontSize: 13, color: "#DC2626" }}>{error}</span>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(10,19,16,0.04)", overflow: "hidden", marginTop: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto auto", gap: 14, padding: "13px 18px", background: "#FAFBFA", borderBottom: "2px solid #E6ECE8" }}>
          {["City", "State", "Plants Stat", "Order", "Actions"].map((h) => (
            <div key={h} style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: "48px 20px", textAlign: "center", color: C.muted, fontSize: 13 }}>Loading city parks…</div>
        ) : items.length === 0 ? (
          <div style={{ padding: "56px 20px", textAlign: "center" }}>
            <MapPin size={40} color="#CBD5E0" style={{ margin: "0 auto 14px" }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.body }}>No city parks yet</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Add one — the Home page strip will fall back to a default list until you do.</div>
          </div>
        ) : (
          items.map((item) => (
            <div key={item._id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto auto", gap: 14, alignItems: "center", padding: "13px 18px", borderBottom: "1px solid #F0F4F2" }}>
              <div style={{ fontWeight: 600, fontSize: 13.5, color: C.text }}>{item.city}</div>
              <div style={{ fontSize: 13, color: C.body }}>{item.state}</div>
              <div style={{ fontSize: 13, color: C.body }}>{item.stat}</div>
              <div style={{ fontSize: 13, color: C.muted }}>{item.order ?? 0}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setModal(item)} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: C.sans, border: "1.5px solid #BFDBFE", color: C.accent, background: "none" }}>
                  <PenSquare size={13} />Edit
                </button>
                <button onClick={() => handleDelete(item._id)} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: C.sans, border: "1.5px solid #FECACA", color: "#DC2626", background: "none" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modal !== null && (
        <CityParkModal initial={modal._id ? modal : null} onClose={() => setModal(null)} onSaved={handleSaved} />
      )}
    </>
  );
}
