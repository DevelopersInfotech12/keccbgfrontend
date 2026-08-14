"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save, ArrowLeft, Plus, Trash2, Eye, EyeOff, Upload, FileJson, X, ClipboardPaste, FolderOpen,
  AlertCircle, CheckCircle2,
} from "lucide-react";
import { Label, Input, Textarea, SectionCard, BlockEditor } from "@/comp/admin/FormControls";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { adminApi } from "@/lib/adminApi";
import { C, TAGS, TAG_COLORS, EMPTY_BLOG } from "@/lib/adminConstants";

export default function AdminBlogFormScreen({ blogId }) {
  const router = useRouter();
  const { admin, loading: authLoading, logout } = useAdminAuth();
  const [form, setForm] = useState(EMPTY_BLOG);
  const [fetchLoading, setFetchLoading] = useState(!!blogId);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [imgUploading, setImgUploading] = useState({});

  const isEdit = !!blogId;

  useEffect(() => {
    if (!isEdit || authLoading) return;
    (async () => {
      try {
        const res = await adminApi.getBlog(blogId);
        const b = res.data;
        setForm({
          ...EMPTY_BLOG, ...b,
          highlights: b.highlights?.length ? b.highlights : [""],
          toc: b.toc?.length ? b.toc : [{ id: "", label: "" }],
          meta: b.meta?.length ? b.meta : [{ label: "", value: "" }],
          sections: b.sections?.length ? b.sections : [{ id: "", heading: "", content: [{ type: "p", text: "" }] }],
          tags: b.tags?.length ? b.tags : [""],
          related: b.related || [],
          seo: { ...EMPTY_BLOG.seo, ...b.seo },
          sidebarCta: { ...EMPTY_BLOG.sidebarCta, ...b.sidebarCta },
          tagStyle: b.tagStyle || TAG_COLORS[b.tag] || EMPTY_BLOG.tagStyle,
        });
      } catch (e) { showToast("error", "Failed to load blog: " + e.message); }
      finally { setFetchLoading(false); }
    })();
  }, [blogId, isEdit, authLoading]);

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 4000); };

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setNested = (parent, key, val) => setForm((f) => ({ ...f, [parent]: { ...f[parent], [key]: val } }));

  const arrAdd = (key, item) => set(key, [...form[key], item]);
  const arrUpdate = (key, i, val) => { const a = [...form[key]]; a[i] = val; set(key, a); };
  const arrRemove = (key, i) => set(key, form[key].filter((_, j) => j !== i));

  const sectionUpdate = (si, key, val) => set("sections", form.sections.map((sec, i) => (i === si ? { ...sec, [key]: val } : sec)));
  const sectionAddBlock = (si) => set("sections", form.sections.map((sec, i) => (i === si ? { ...sec, content: [...sec.content, { type: "p", text: "" }] } : sec)));
  const sectionUpdateBlock = (si, bi, block) => set("sections", form.sections.map((sec, i) => (i !== si ? sec : { ...sec, content: sec.content.map((b, j) => (j === bi ? block : b)) })));
  const sectionRemoveBlock = (si, bi) => set("sections", form.sections.map((sec, i) => (i !== si ? sec : { ...sec, content: sec.content.filter((_, j) => j !== bi) })));

  const handleImgUpload = async (field, file, onDone) => {
    if (!file) return;
    setImgUploading((u) => ({ ...u, [field]: true }));
    try {
      const res = await adminApi.uploadImage(file);
      const url = res.url || res.data?.url || "";
      if (onDone) onDone(url);
      else if (field.includes(".")) { const [parent, key] = field.split("."); setNested(parent, key, url); }
      else set(field, url);
    } catch (e) { showToast("error", "Upload failed: " + e.message); }
    finally { setImgUploading((u) => ({ ...u, [field]: false })); }
  };

  const autoSlug = (title) => title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const [jsonPanel, setJsonPanel] = useState(false);
  const [jsonTab, setJsonTab] = useState("paste");
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");

  const loadJson = (raw) => {
    setJsonError("");
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed !== "object" || Array.isArray(parsed)) { setJsonError("JSON must be an object matching the blog schema."); return; }
      setForm((prev) => ({
        ...EMPTY_BLOG, ...prev, ...parsed,
        highlights: parsed.highlights?.length ? parsed.highlights : prev.highlights,
        toc: parsed.toc?.length ? parsed.toc : prev.toc,
        meta: parsed.meta?.length ? parsed.meta : prev.meta,
        sections: parsed.sections?.length ? parsed.sections : prev.sections,
        tags: parsed.tags?.length ? parsed.tags : prev.tags,
        related: parsed.related || prev.related,
        seo: { ...EMPTY_BLOG.seo, ...prev.seo, ...parsed.seo },
        sidebarCta: { ...EMPTY_BLOG.sidebarCta, ...prev.sidebarCta, ...parsed.sidebarCta },
        tagStyle: parsed.tagStyle || TAG_COLORS[parsed.tag] || prev.tagStyle,
      }));
      setJsonPanel(false); setJsonText("");
      showToast("success", "JSON loaded — form fields populated!");
    } catch (e) { setJsonError("Invalid JSON: " + e.message); }
  };

  const handleJsonFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setJsonText(ev.target.result); setJsonTab("paste"); };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.tag || !form.excerpt || !form.date || !form.img) {
      showToast("error", "Title, Tag, Excerpt, Date and Image are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        highlights: form.highlights.filter(Boolean),
        toc: form.toc.filter((t) => t.id && t.label),
        meta: form.meta.filter((m) => m.label && m.value),
        tags: form.tags.filter(Boolean),
        sections: form.sections.filter((s) => s.heading).map((s) => ({ ...s, content: s.content.filter((b) => b.type) })),
      };
      if (isEdit) {
        await adminApi.updateBlog(blogId, payload);
        showToast("success", "Blog updated successfully!");
      } else {
        await adminApi.createBlog(payload);
        showToast("success", "Blog created successfully!");
        setTimeout(() => router.push("/admin/blogs"), 1200);
      }
    } catch (e) { showToast("error", e.message); }
    finally { setSaving(false); }
  };

  if (authLoading || fetchLoading) return null;

  return (
    <>
      <style>{`
        .img-upload-btn { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; border:1.5px dashed ${C.border}; border-radius:8px; font-family:${C.sans}; font-size:12.5px; color:${C.muted}; cursor:pointer; transition:all 0.15s; background:#FAFBFA; }
        .img-upload-btn:hover { border-color:${C.accent}; color:${C.accent}; }
        .save-btn { display:inline-flex; align-items:center; gap:8px; padding:11px 24px; border:none; border-radius:8px; font-family:${C.sans}; font-size:14px; font-weight:600; cursor:pointer; background:linear-gradient(135deg,${C.accent},#2E9E63); color:#fff; transition:all 0.2s; }
        .save-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 20px rgba(33,132,82,0.3); }
        .save-btn:disabled { opacity:0.65; cursor:not-allowed; }
        .add-btn { font-size:12.5px; color:${C.accent}; background:none; border:none; cursor:pointer; padding:4px 0; }
        input[type=checkbox] { width:16px; height:16px; cursor:pointer; }
      `}</style>

      {toast && (
        <div style={{ position: "fixed", top: 20, right: 24, zIndex: 1000, display: "flex", alignItems: "center", gap: 10, background: toast.type === "success" ? "#ECFDF5" : "#FEF2F2", border: `1px solid ${toast.type === "success" ? "#A7F3D0" : "#FECACA"}`, borderRadius: 10, padding: "12px 18px", boxShadow: "0 8px 24px rgba(10,19,16,0.12)", fontFamily: C.sans, fontSize: 13, fontWeight: 500, color: toast.type === "success" ? "#065F46" : "#DC2626", maxWidth: 360 }}>
          {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        <Link href="/admin/blogs" style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted, textDecoration: "none", fontSize: 13 }}>
          <ArrowLeft size={15} />Back
        </Link>
        <h1 style={{ fontFamily: C.display, fontSize: 21, fontWeight: 700, color: C.text }}>{isEdit ? "Edit Blog" : "Create New Blog"}</h1>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button type="button" onClick={() => { setJsonPanel((o) => !o); setJsonError(""); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: `1.5px solid ${jsonPanel ? C.accent : C.border}`, borderRadius: 8, background: jsonPanel ? C.accentLight : "#fff", cursor: "pointer", fontFamily: C.sans, fontSize: 12.5, fontWeight: 600, color: jsonPanel ? C.accent : C.body }}>
            <FileJson size={15} />Load JSON
          </button>
          <button type="button" onClick={() => set("status", form.status === "published" ? "draft" : "published")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: `1.5px solid ${form.status === "published" ? "#FECACA" : "#BBF7D0"}`, borderRadius: 8, background: "none", cursor: "pointer", fontFamily: C.sans, fontSize: 12.5, fontWeight: 500, color: form.status === "published" ? "#DC2626" : "#065F46" }}>
            {form.status === "published" ? <><EyeOff size={14} />Unpublish</> : <><Eye size={14} />Publish</>}
          </button>
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            <Save size={15} />{saving ? "Saving…" : isEdit ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </div>

      {jsonPanel && (
        <div style={{ background: "#F0F8F3", border: `1.5px solid ${C.accent}33`, borderRadius: 14, padding: "22px 24px", marginBottom: 22, boxShadow: "0 4px 16px rgba(33,132,82,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div>
              <div style={{ fontFamily: C.display, fontSize: 15, fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
                <FileJson size={18} color={C.accent} /> Upload Blog Data (JSON)
              </div>
              <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3 }}>Paste JSON directly or upload a .json file — all form fields will be auto-populated.</div>
            </div>
            <button type="button" onClick={() => { setJsonPanel(false); setJsonText(""); setJsonError(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4 }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ display: "flex", marginBottom: 14, border: `1.5px solid ${C.border}`, borderRadius: 9, overflow: "hidden", background: "#fff", marginTop: 14 }}>
            {[{ key: "paste", icon: ClipboardPaste, label: "Paste JSON" }, { key: "file", icon: FolderOpen, label: "Upload File" }].map(({ key, icon: Icon, label }) => (
              <button key={key} type="button" onClick={() => setJsonTab(key)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 0", border: "none", cursor: "pointer", fontFamily: C.sans, fontSize: 13, fontWeight: 600, background: jsonTab === key ? C.accent : "#fff", color: jsonTab === key ? "#fff" : C.muted }}>
                <Icon size={15} />{label}
              </button>
            ))}
          </div>

          {jsonTab === "paste" && (
            <textarea
              value={jsonText}
              onChange={(e) => { setJsonText(e.target.value); setJsonError(""); }}
              placeholder="Paste your JSON data here..."
              style={{ width: "100%", minHeight: 220, padding: "12px 14px", border: `1.5px solid ${jsonError ? "#FECACA" : C.border}`, borderRadius: 9, fontFamily: "'Courier New', monospace", fontSize: 12.5, color: C.text, outline: "none", resize: "vertical", background: "#fff", lineHeight: 1.6 }}
            />
          )}

          {jsonTab === "file" && (
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 160, border: `2px dashed ${C.border}`, borderRadius: 10, background: "#fff", cursor: "pointer", gap: 10 }}>
              <FolderOpen size={32} color={C.muted} />
              <div style={{ fontFamily: C.sans, fontSize: 13.5, fontWeight: 600, color: C.body }}>Click to upload .json file</div>
              <div style={{ fontSize: 12, color: C.muted }}>Only .json files are supported</div>
              {jsonText && <div style={{ fontSize: 12, color: C.accent, fontWeight: 500 }}>✓ File loaded — click &quot;Load JSON Data&quot; below</div>}
              <input type="file" accept=".json,application/json" style={{ display: "none" }} onChange={handleJsonFile} />
            </label>
          )}

          {jsonError && (
            <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginTop: 10 }}>
              <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: "#DC2626" }}>{jsonError}</span>
            </div>
          )}

          <button type="button" onClick={() => loadJson(jsonText)} disabled={!jsonText.trim()} style={{ width: "100%", marginTop: 14, padding: "12px", background: jsonText.trim() ? `linear-gradient(135deg,${C.accent},#2E9E63)` : "#CBD5E0", color: "#fff", border: "none", borderRadius: 9, fontFamily: C.sans, fontSize: 14, fontWeight: 600, cursor: jsonText.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <FileJson size={16} /> Load JSON Data
          </button>
        </div>
      )}

      <form onSubmit={handleSave} onKeyDown={(e) => e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.preventDefault()}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start" }}>
          <div>
            <SectionCard title="Core Information">
              <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
                <div>
                  <Label required>Title</Label>
                  <Input value={form.title} onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", autoSlug(e.target.value)); }} placeholder="Blog title…" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><Label required>Slug</Label><Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="blog-slug" /></div>
                  <div>
                    <Label required>Tag / Category</Label>
                    <select value={form.tag} onChange={(e) => { set("tag", e.target.value); set("tagStyle", TAG_COLORS[e.target.value] || EMPTY_BLOG.tagStyle); }} style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontFamily: C.sans, fontSize: 13, color: C.text, outline: "none" }}>
                      {TAGS.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div><Label required>Excerpt</Label><Textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short summary shown in listing cards (1–2 sentences)…" style={{ minHeight: 72 }} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <div><Label required>Date</Label><Input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="March 3, 2026" /></div>
                  <div><Label>Read Time</Label><Input value={form.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="5 min read" /></div>
                  <div><Label>Author</Label><Input value={form.author} onChange={(e) => set("author", e.target.value)} /></div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Images">
              <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
                {[["img", "Card Thumbnail (required)", true], ["heroImg", "Hero / Detail Page Image", false]].map(([field, label, req]) => (
                  <div key={field}>
                    <Label required={req}>{label}</Label>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Input value={form[field]} onChange={(e) => set(field, e.target.value)} placeholder="https://… or upload →" style={{ flex: 1 }} />
                      <label className="img-upload-btn" title="Upload image">
                        {imgUploading[field] ? "…" : <><Upload size={13} />Upload</>}
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImgUpload(field, e.target.files[0])} />
                      </label>
                    </div>
                    {form[field] && (
                      <div style={{ marginTop: 8, position: "relative", width: "100%", height: 160, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, background: "#f5f5f5" }}>
                        <img src={form[field]} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      </div>
                    )}
                  </div>
                ))}
                <div><Label>Hero Gradient</Label><Input value={form.heroGradient} onChange={(e) => set("heroGradient", e.target.value)} placeholder="linear-gradient(…)" /></div>
              </div>
            </SectionCard>

            <SectionCard title="Highlights (Key Takeaways)">
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                {form.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: 8 }}>
                    <Input value={h} onChange={(e) => arrUpdate("highlights", i, e.target.value)} placeholder={`Highlight ${i + 1}`} />
                    <button type="button" onClick={() => arrRemove("highlights", i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", flexShrink: 0 }}><Trash2 size={14} /></button>
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={() => arrAdd("highlights", "")}>+ Add highlight</button>
              </div>
            </SectionCard>

            <SectionCard title="Table of Contents" defaultOpen={false}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                {form.toc.map((t, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8 }}>
                    <Input value={t.id} onChange={(e) => arrUpdate("toc", i, { ...t, id: e.target.value })} placeholder="section-id" />
                    <Input value={t.label} onChange={(e) => arrUpdate("toc", i, { ...t, label: e.target.value })} placeholder="Label" />
                    <button type="button" onClick={() => arrRemove("toc", i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}><Trash2 size={14} /></button>
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={() => arrAdd("toc", { id: "", label: "" })}>+ Add TOC entry</button>
              </div>
            </SectionCard>

            <SectionCard title="Meta Info (Sidebar)" defaultOpen={false}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                {form.meta.map((m, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8 }}>
                    <Input value={m.label} onChange={(e) => arrUpdate("meta", i, { ...m, label: e.target.value })} placeholder="Label" />
                    <Input value={m.value} onChange={(e) => arrUpdate("meta", i, { ...m, value: e.target.value })} placeholder="Value" />
                    <button type="button" onClick={() => arrRemove("meta", i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}><Trash2 size={14} /></button>
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={() => arrAdd("meta", { label: "", value: "" })}>+ Add meta row</button>
              </div>
            </SectionCard>

            <SectionCard title="Content Sections">
              <div style={{ marginTop: 14 }}>
                {form.sections.map((sec, si) => (
                  <div key={si} style={{ border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 14, background: "#FAFBFA" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 10, marginBottom: 12 }}>
                      <Input value={sec.id} onChange={(e) => sectionUpdate(si, "id", e.target.value)} placeholder="section-id" />
                      <Input value={sec.heading} onChange={(e) => sectionUpdate(si, "heading", e.target.value)} placeholder="Section heading" />
                      <button type="button" onClick={() => set("sections", form.sections.filter((_, j) => j !== si))} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}><Trash2 size={15} /></button>
                    </div>

                    <div style={{ border: `1px dashed ${C.border}`, borderRadius: 8, padding: 12, marginBottom: 12, background: "#fff" }}>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Section image (optional)</div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <Input value={sec.image || ""} onChange={(e) => sectionUpdate(si, "image", e.target.value)} placeholder="Image URL — leave blank for no image" style={{ flex: 1 }} />
                        <label className="img-upload-btn" title="Upload image">
                          {imgUploading[`section-${si}`] ? "…" : <><Upload size={13} />Upload</>}
                          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImgUpload(`section-${si}`, e.target.files[0], (url) => sectionUpdate(si, "image", url))} />
                        </label>
                      </div>
                      {sec.image && (
                        <>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                            <Input value={sec.imageAlt || ""} onChange={(e) => sectionUpdate(si, "imageAlt", e.target.value)} placeholder="Alt text" />
                            <Input value={sec.imageCaption || ""} onChange={(e) => sectionUpdate(si, "imageCaption", e.target.value)} placeholder="Caption (optional)" />
                          </div>
                          <div style={{ position: "relative", width: "100%", height: 140, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, background: "#f5f5f5" }}>
                            <img src={sec.image} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                          </div>
                        </>
                      )}
                    </div>

                    <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Content Blocks</div>
                    {sec.content.map((block, bi) => (
                      <BlockEditor key={bi} block={block} onChange={(b) => sectionUpdateBlock(si, bi, b)} onRemove={() => sectionRemoveBlock(si, bi)} />
                    ))}
                    <button type="button" className="add-btn" onClick={() => sectionAddBlock(si)}>+ Add content block</button>
                  </div>
                ))}
                <button type="button" onClick={() => arrAdd("sections", { id: "", heading: "", content: [{ type: "p", text: "" }] })} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: `1.5px dashed ${C.border}`, borderRadius: 8, background: "none", cursor: "pointer", fontFamily: C.sans, fontSize: 13, color: C.muted, width: "100%", justifyContent: "center" }}>
                  <Plus size={14} />Add Section
                </button>
              </div>
            </SectionCard>

            <SectionCard title="CTA Band" defaultOpen={false}>
              <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                <div><Label>CTA Title</Label><Input value={form.ctaTitle} onChange={(e) => set("ctaTitle", e.target.value)} placeholder="Thinking about a plant on your site?" /></div>
                <div><Label>CTA Body</Label><Textarea value={form.ctaBody} onChange={(e) => set("ctaBody", e.target.value)} /></div>
              </div>
            </SectionCard>

            <SectionCard title="SEO Settings" defaultOpen={false}>
              <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                <div><Label>Meta Title</Label><Input value={form.seo.metaTitle} onChange={(e) => setNested("seo", "metaTitle", e.target.value)} placeholder="Defaults to blog title" /></div>
                <div><Label>Meta Description</Label><Textarea value={form.seo.metaDescription} onChange={(e) => setNested("seo", "metaDescription", e.target.value)} placeholder="Max 160 chars…" style={{ minHeight: 60 }} /></div>
                <div><Label>Meta Keywords (comma-separated)</Label><Input value={(form.seo.metaKeywords || []).join(", ")} onChange={(e) => setNested("seo", "metaKeywords", e.target.value.split(",").map((s) => s.trim()))} placeholder="CBG, biogas, anaerobic digestion…" /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><Label>OG Title</Label><Input value={form.seo.ogTitle} onChange={(e) => setNested("seo", "ogTitle", e.target.value)} /></div>
                  <div><Label>OG Image URL</Label><Input value={form.seo.ogImage} onChange={(e) => setNested("seo", "ogImage", e.target.value)} /></div>
                </div>
                <div><Label>OG Description</Label><Textarea value={form.seo.ogDescription} onChange={(e) => setNested("seo", "ogDescription", e.target.value)} style={{ minHeight: 56 }} /></div>
                <div><Label>Canonical URL</Label><Input value={form.seo.canonicalUrl} onChange={(e) => setNested("seo", "canonicalUrl", e.target.value)} placeholder="https://biocbg.com/blog/…" /></div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" checked={form.seo.noIndex} onChange={(e) => setNested("seo", "noIndex", e.target.checked)} />
                  <span style={{ fontSize: 13, color: C.body }}>No-index (hide from search engines)</span>
                </div>
              </div>
            </SectionCard>
          </div>

          <div>
            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, padding: "18px 18px", boxShadow: "0 2px 8px rgba(10,19,16,0.04)", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 14 }}>Publish Settings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <Label>Status</Label>
                  <select value={form.status} onChange={(e) => set("status", e.target.value)} style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontFamily: C.sans, fontSize: 13, color: C.text, outline: "none" }}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#FEF3DC", borderRadius: 8, border: "1px solid #FDE68A" }}>
                  <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}>★ Featured Post</div>
                    <div style={{ fontSize: 11.5, color: "#B45309", marginTop: 1 }}>Only 1 blog can be featured at a time</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, padding: "18px 18px", boxShadow: "0 2px 8px rgba(10,19,16,0.04)", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 12 }}>Tags</div>
              {form.tags.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <Input value={t} onChange={(e) => arrUpdate("tags", i, e.target.value)} placeholder="Tag" />
                  <button type="button" onClick={() => arrRemove("tags", i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", flexShrink: 0 }}><Trash2 size={14} /></button>
                </div>
              ))}
              <button type="button" className="add-btn" onClick={() => arrAdd("tags", "")}>+ Add tag</button>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, padding: "18px 18px", boxShadow: "0 2px 8px rgba(10,19,16,0.04)", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 12 }}>Sidebar CTA</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div><Label>Title</Label><Input value={form.sidebarCta.title} onChange={(e) => setNested("sidebarCta", "title", e.target.value)} placeholder="Considering a plant?" /></div>
                <div><Label>Body</Label><Textarea value={form.sidebarCta.body} onChange={(e) => setNested("sidebarCta", "body", e.target.value)} style={{ minHeight: 60 }} /></div>
                <div><Label>Button text</Label><Input value={form.sidebarCta.btn} onChange={(e) => setNested("sidebarCta", "btn", e.target.value)} placeholder="Get Free Consultation →" /></div>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, padding: "18px 18px", boxShadow: "0 2px 8px rgba(10,19,16,0.04)", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 12 }}>Tag Style</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <Label>Background</Label>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input type="color" value={form.tagStyle.bg} onChange={(e) => set("tagStyle", { ...form.tagStyle, bg: e.target.value })} style={{ width: 36, height: 36, padding: 2, border: `1.5px solid ${C.border}`, borderRadius: 6, cursor: "pointer" }} />
                    <Input value={form.tagStyle.bg} onChange={(e) => set("tagStyle", { ...form.tagStyle, bg: e.target.value })} style={{ flex: 1 }} />
                  </div>
                </div>
                <div>
                  <Label>Text color</Label>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input type="color" value={form.tagStyle.text} onChange={(e) => set("tagStyle", { ...form.tagStyle, text: e.target.value })} style={{ width: 36, height: 36, padding: 2, border: `1.5px solid ${C.border}`, borderRadius: 6, cursor: "pointer" }} />
                    <Input value={form.tagStyle.text} onChange={(e) => set("tagStyle", { ...form.tagStyle, text: e.target.value })} style={{ flex: 1 }} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 10, padding: "6px 14px", borderRadius: 6, display: "inline-flex", background: form.tagStyle.bg, color: form.tagStyle.text, fontSize: 12, fontWeight: 600 }}>{form.tag}</div>
            </div>

            <button className="save-btn" type="button" onClick={handleSave} disabled={saving} style={{ width: "100%", justifyContent: "center" }}>
              <Save size={15} />{saving ? "Saving…" : isEdit ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </div>
      </form>

      <style>{`@media(max-width:900px){ form > div { grid-template-columns:1fr !important; } }`}</style>
    </>
  );
}
