"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, PenSquare, Trash2, Eye, EyeOff, RefreshCw, AlertCircle, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { adminApi } from "@/lib/adminApi";
import { C, INFOGRAPHIC_CATEGORIES } from "@/lib/adminConstants";

const STATUS_OPTS = ["all", "published", "draft"];
const CATEGORY_OPTS = ["all", ...INFOGRAPHIC_CATEGORIES];

export default function AdminInfographicListScreen() {
  const { loading: authLoading } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const fetchItems = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (status !== "all") params.status = status;
      if (category !== "all") params.category = category;
      const res = await adminApi.getInfographics(params);
      setItems(res.data);
      setPagination(res.pagination);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [page, search, status, category]);

  useEffect(() => { if (!authLoading) fetchItems(); }, [authLoading, fetchItems]);

  const handleToggleStatus = async (id) => { try { await adminApi.toggleInfographicStatus(id); fetchItems(); } catch (e) { alert(e.message); } };
  const handleDelete = async (id) => { if (!confirm("Delete this infographic permanently?")) return; try { await adminApi.deleteInfographic(id); fetchItems(); } catch (e) { alert(e.message); } };

  if (authLoading) return null;

  return (
    <>
      <style>{`
        .info-row { display:grid; grid-template-columns:64px 1fr auto auto auto; align-items:center; gap:14px; padding:13px 18px; border-bottom:1px solid #F0F4F2; transition:background 0.15s; }
        .info-row:hover { background:#FAFBFA; }
        .act-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:500; cursor:pointer; font-family:${C.sans}; border:1.5px solid; transition:all 0.15s; background:none; white-space:nowrap; }
        .search-input { padding:9px 14px 9px 40px; border:1.5px solid ${C.border}; border-radius:8px; font-family:${C.sans}; font-size:13px; outline:none; width:240px; transition:border-color 0.18s; }
        .search-input:focus { border-color:${C.accent}; }
        .filter-btn { padding:8px 16px; border:1.5px solid ${C.border}; border-radius:8px; font-family:${C.sans}; font-size:12.5px; font-weight:500; cursor:pointer; background:#fff; color:${C.body}; transition:all 0.15s; }
        .filter-btn.active { background:${C.accent}; border-color:${C.accent}; color:#fff; }
        @media(max-width:700px){ .info-row { grid-template-columns:44px 1fr; } .info-row .hide-mobile { display:none; } }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: C.display, fontSize: 21, fontWeight: 700, color: C.text }}>All Infographics</h1>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>{pagination.total} total infographics</p>
        </div>
        <Link href="/admin/infographics/create" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${C.accent},#2E9E63)`, color: "#fff", padding: "10px 18px", borderRadius: 8, fontFamily: C.sans, fontSize: 13.5, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 12px rgba(33,132,82,0.28)" }}>
          <PenSquare size={15} />New Infographic
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, padding: "14px 18px", marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
          <input className="search-input" placeholder="Search infographics…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STATUS_OPTS.map((s) => (
            <button key={s} className={`filter-btn${status === s ? " active" : ""}`} onClick={() => { setStatus(s); setPage(1); }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORY_OPTS.map((c) => (
            <button key={c} className={`filter-btn${category === c ? " active" : ""}`} onClick={() => { setCategory(c); setPage(1); }}>
              {c === "all" ? "All categories" : c}
            </button>
          ))}
        </div>
        <button onClick={fetchItems} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 6 }}>
          <RefreshCw size={16} />
        </button>
      </div>

      {error && (
        <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
          <AlertCircle size={16} color="#EF4444" />
          <span style={{ fontSize: 13, color: "#DC2626" }}>{error}</span>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(10,19,16,0.04)", overflow: "hidden" }}>
        <div className="info-row" style={{ background: "#FAFBFA", borderBottom: "2px solid #E6ECE8" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Img</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Title</div>
          <div className="hide-mobile" style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</div>
          <div className="hide-mobile" style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Actions</div>
        </div>

        {loading ? (
          <div style={{ padding: "48px 20px", textAlign: "center", color: C.muted, fontSize: 13 }}>Loading infographics…</div>
        ) : items.length === 0 ? (
          <div style={{ padding: "56px 20px", textAlign: "center" }}>
            <ImageIcon size={40} color="#CBD5E0" style={{ margin: "0 auto 14px" }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.body }}>No infographics found</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Try a different search or filter, or create one.</div>
          </div>
        ) : (
          items.map((item) => {
            const isPublished = item.status === "published";
            return (
              <div key={item._id} className="info-row">
                <div style={{ width: 46, height: 46, borderRadius: 8, overflow: "hidden", background: "#F0F4F2", flexShrink: 0 }}>
                  {item.img && <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                  <div style={{ fontSize: 11.5, color: C.muted, marginTop: 3 }}>{item.date}</div>
                </div>
                <div className="hide-mobile">
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999, background: "#EAF6EF", color: "#1A6A42" }}>{item.category}</span>
                </div>
                <div className="hide-mobile">
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: isPublished ? C.successBg : C.warnBg, color: isPublished ? "#065F46" : "#92400E" }}>{item.status}</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Link href={`/admin/infographics/edit/${item._id}`} className="act-btn" style={{ borderColor: "#BFDBFE", color: C.accent, textDecoration: "none" }}>Edit</Link>
                  <button className="act-btn" style={{ borderColor: isPublished ? "#FECACA" : "#BBF7D0", color: isPublished ? "#DC2626" : "#065F46" }} onClick={() => handleToggleStatus(item._id)}>
                    {isPublished ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                  <button className="act-btn" style={{ borderColor: "#FECACA", color: "#DC2626" }} onClick={() => handleDelete(item._id)}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {pagination.pages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 22 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 14px", border: "1.5px solid #E6ECE8", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: C.sans, fontSize: 13, color: C.body }}>
            <ChevronLeft size={14} />Prev
          </button>
          <span style={{ fontSize: 13, color: C.muted }}>Page {page} of {pagination.pages}</span>
          <button onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages} style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 14px", border: "1.5px solid #E6ECE8", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: C.sans, fontSize: 13, color: C.body }}>
            Next<ChevronRight size={14} />
          </button>
        </div>
      )}
    </>
  );
}
