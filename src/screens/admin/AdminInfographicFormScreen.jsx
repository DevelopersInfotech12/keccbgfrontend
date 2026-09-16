"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { Label, Input } from "@/comp/admin/FormControls";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { adminApi } from "@/lib/adminApi";
import { C, EMPTY_INFOGRAPHIC, INFOGRAPHIC_CATEGORIES } from "@/lib/adminConstants";

export default function AdminInfographicFormScreen({ infographicId }) {
  const router = useRouter();
  const { loading: authLoading } = useAdminAuth();
  const [form, setForm] = useState(EMPTY_INFOGRAPHIC);
  const [fetchLoading, setFetchLoading] = useState(!!infographicId);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);

  const isEdit = !!infographicId;

  useEffect(() => {
    if (!isEdit || authLoading) return;
    (async () => {
      try {
        const res = await adminApi.getInfographic(infographicId);
        setForm({ ...EMPTY_INFOGRAPHIC, ...res.data });
      } catch (e) { showToast("error", "Failed to load infographic: " + e.message); }
      finally { setFetchLoading(false); }
    })();
  }, [infographicId, isEdit, authLoading]);

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 4000); };
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const autoSlug = (title) => title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleImgUpload = async (file) => {
    if (!file) return;
    setImgUploading(true);
    try {
      const res = await adminApi.uploadImage(file);
      set("img", res.url || res.data?.url || "");
    } catch (e) { showToast("error", "Upload failed: " + e.message); }
    finally { setImgUploading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.date || !form.img) {
      showToast("error", "Title, Category, Date and Image are required.");
      return;
    }
    setSaving(true);
    try {
      const body = { ...form };
      if (!isEdit && !body.slug && body.title) body.slug = autoSlug(body.title);
      if (isEdit) {
        await adminApi.updateInfographic(infographicId, body);
        showToast("success", "Infographic updated!");
      } else {
        await adminApi.createInfographic(body);
        showToast("success", "Infographic created!");
        setTimeout(() => router.push("/admin/infographics"), 700);
      }
    } catch (e) { showToast("error", e.message); }
    finally { setSaving(false); }
  };

  if (authLoading || fetchLoading) return null;

  return (
    <>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 100, display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderRadius: 10, background: toast.type === "error" ? "#FEF2F2" : "#EAF6EF", border: `1.5px solid ${toast.type === "error" ? "#FECACA" : "#BBF7D0"}`, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          {toast.type === "error" ? <AlertCircle size={16} color="#DC2626" /> : <CheckCircle2 size={16} color="#218452" />}
          <span style={{ fontSize: 13, fontWeight: 500, color: toast.type === "error" ? "#DC2626" : "#1A6A42", fontFamily: C.sans }}>{toast.msg}</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <Link href="/admin/infographics" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: C.muted, textDecoration: "none", marginBottom: 6 }}>
            <ArrowLeft size={13} />Back to Infographics
          </Link>
          <h1 style={{ fontFamily: C.display, fontSize: 21, fontWeight: 700, color: C.text }}>
            {isEdit ? "Edit Infographic" : "New Infographic"}
          </h1>
        </div>
        <button onClick={handleSave} disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${C.accent},#2E9E63)`, color: "#fff", padding: "10px 20px", borderRadius: 8, fontFamily: C.sans, fontSize: 13.5, fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, boxShadow: "0 4px 12px rgba(33,132,82,0.28)" }}>
          <Save size={15} />{saving ? "Saving…" : isEdit ? "Save Changes" : "Create Infographic"}
        </button>
      </div>

      <form onSubmit={handleSave} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(10,19,16,0.04)", padding: 20, maxWidth: 640 }}>
        <div style={{ marginBottom: 16 }}>
          <Label required>Title</Label>
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. The CBG Park Ecosystem at a Glance" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated from title if left blank" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div>
            <Label required>Category</Label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontFamily: C.sans, fontSize: 13, color: C.text, outline: "none" }}>
              {INFOGRAPHIC_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <Label required>Date</Label>
            <Input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="e.g. August 10, 2026" />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Label required>Image</Label>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            {form.img && <img src={form.img} alt="" style={{ width: 70, height: 88, objectFit: "cover", borderRadius: 8, border: `1.5px solid ${C.border}`, flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              <Input value={form.img} onChange={(e) => set("img", e.target.value)} placeholder="Image URL, or upload below" style={{ marginBottom: 8 }} />
              <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: C.accent, cursor: "pointer" }}>
                <Upload size={13} />{imgUploading ? "Uploading…" : "Upload image"}
                <input type="file" accept="image/*" hidden onChange={(e) => handleImgUpload(e.target.files[0])} disabled={imgUploading} />
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 4 }}>
          <div>
            <Label>Status</Label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontFamily: C.sans, fontSize: 13, color: C.text, outline: "none" }}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <Label>Display order</Label>
            <Input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} placeholder="0" />
          </div>
        </div>
        <p style={{ fontSize: 11.5, color: C.muted, marginTop: 4 }}>Lower number shows first on the public /infographics page. Only "Published" items appear there.</p>
      </form>
    </>
  );
}
