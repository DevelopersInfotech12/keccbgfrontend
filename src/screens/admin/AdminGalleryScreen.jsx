"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, PenSquare, Image as ImageIcon, AlertCircle, CheckCircle2, X, Save, Upload } from "lucide-react";
import { Label, Input } from "@/comp/admin/FormControls";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { adminApi } from "@/lib/adminApi";
import { C, EMPTY_GALLERY_IMAGE } from "@/lib/adminConstants";

function GalleryImageModal({ initial, onClose, onSaved }) {
  const [form, setForm] = useState(initial || EMPTY_GALLERY_IMAGE);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!initial?._id;
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await adminApi.uploadImage(file);
      set("img", res.url || res.data?.url || "");
    } catch (e) { setError("Upload failed: " + e.message); }
    finally { setUploading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.img) { setError("Image is required."); return; }
    setSaving(true); setError("");
    try {
      if (isEdit) await adminApi.updateGalleryImage(form._id, form);
      else await adminApi.createGalleryImage(form);
      onSaved();
    } catch (e2) { setError(e2.message); }
    finally { setSaving(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,19,16,0.5)", zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 14, padding: 24, width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <h2 style={{ fontFamily: C.display, fontSize: 17, fontWeight: 700, color: C.text }}>{isEdit ? "Edit Gallery Image" : "Add Gallery Image"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}><X size={18} /></button>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: 14 }}>
            <Label required>Image</Label>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              {form.img && <img src={form.img} alt="" style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 8, border: `1.5px solid ${C.border}`, flexShrink: 0 }} />}
              <div style={{ flex: 1 }}>
                <Input value={form.img} onChange={(e) => set("img", e.target.value)} placeholder="Image URL, or upload below" style={{ marginBottom: 8 }} />
                <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: C.accent, cursor: "pointer" }}>
                  <Upload size={13} />{uploading ? "Uploading…" : "Upload image"}
                  <input type="file" accept="image/*" hidden onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} />
                </label>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <Label>Alt text</Label>
            <Input value={form.alt} onChange={(e) => set("alt", e.target.value)} placeholder="e.g. Biogas plant tanks at sunset (optional)" />
          </div>

          <div style={{ marginBottom: 14 }}>
            <Label>Column</Label>
            <select
              value={form.column ?? ""}
              onChange={(e) => set("column", e.target.value === "" ? "" : Number(e.target.value))}
              style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontFamily: C.sans, fontSize: 13, color: C.text, outline: "none" }}
            >
              <option value="">Auto (distribute evenly)</option>
              <option value={1}>Column 1</option>
              <option value={2}>Column 2</option>
              <option value={3}>Column 3</option>
              <option value={4}>Column 4</option>
            </select>
            <p style={{ fontSize: 11.5, color: C.muted, marginTop: 4 }}>Pin this photo to one of the 4 scrolling columns, or leave on Auto.</p>
          </div>

          <div style={{ marginBottom: 18 }}>
            <Label>Display order</Label>
            <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} placeholder="0" />
            <p style={{ fontSize: 11.5, color: C.muted, marginTop: 4 }}>Lower number shows earlier; images are split evenly across the 4 scrolling columns in order.</p>
          </div>

          {error && (
            <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
              <AlertCircle size={15} color="#EF4444" />
              <span style={{ fontSize: 12.5, color: "#DC2626" }}>{error}</span>
            </div>
          )}

          <button type="submit" disabled={saving} style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: `linear-gradient(135deg,${C.accent},#2E9E63)`, color: "#fff", padding: "11px 20px", borderRadius: 8, fontFamily: C.sans, fontSize: 13.5, fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
            <Save size={15} />{saving ? "Saving…" : isEdit ? "Save Changes" : "Add Image"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminGalleryScreen() {
  const { loading: authLoading } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const res = await adminApi.getGalleryImages();
      setItems(res.data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (!authLoading) fetchItems(); }, [authLoading, fetchItems]);

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3500); };

  const handleDelete = async (id) => {
    if (!confirm("Remove this photo from the Home gallery?")) return;
    try { await adminApi.deleteGalleryImage(id); fetchItems(); showToast("success", "Image removed."); }
    catch (e) { showToast("error", e.message); }
  };

  const handleSaved = () => { setModal(null); fetchItems(); showToast("success", "Image saved."); };

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
          <h1 style={{ fontFamily: C.display, fontSize: 21, fontWeight: 700, color: C.text }}>Gallery Images</h1>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>Edits the "KEC Gallery at a CBG Glance" scrolling grid on the Home page.</p>
        </div>
        <button onClick={() => setModal({})} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${C.accent},#2E9E63)`, color: "#fff", padding: "10px 18px", borderRadius: 8, fontFamily: C.sans, fontSize: 13.5, fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(33,132,82,0.28)" }}>
          <Plus size={15} />Add Image
        </button>
      </div>

      {error && (
        <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 16px", margin: "16px 0" }}>
          <AlertCircle size={16} color="#EF4444" />
          <span style={{ fontSize: 13, color: "#DC2626" }}>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ padding: "48px 20px", textAlign: "center", color: C.muted, fontSize: 13 }}>Loading gallery images…</div>
      ) : items.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, padding: "56px 20px", textAlign: "center", marginTop: 18 }}>
          <ImageIcon size={40} color="#CBD5E0" style={{ margin: "0 auto 14px" }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: C.body }}>No gallery images yet</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Add some — Home will fall back to a default set until you do.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14, marginTop: 18 }}>
          {items.map((item) => (
            <div key={item._id} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 2px 8px rgba(10,19,16,0.04)" }}>
              <div style={{ width: "100%", height: 120, background: "#F0F4F2" }}>
                <img src={item.img} alt={item.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div title={item.alt} style={{ fontSize: 12, color: item.alt ? C.body : C.muted, fontStyle: item.alt ? "normal" : "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>{item.alt || "No alt text"}</div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>Order: {item.order ?? 0} · Col: {item.column || "Auto"}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setModal(item)} style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "6px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: C.sans, border: "1.5px solid #BFDBFE", color: C.accent, background: "none" }}>
                    <PenSquare size={12} />Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 10px", borderRadius: 6, cursor: "pointer", fontFamily: C.sans, border: "1.5px solid #FECACA", color: "#DC2626", background: "none" }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal !== null && (
        <GalleryImageModal initial={modal._id ? modal : null} onClose={() => setModal(null)} onSaved={handleSaved} />
      )}
    </>
  );
}
