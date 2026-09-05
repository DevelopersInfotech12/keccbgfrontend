"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Star, PenSquare, BookOpen, Clock, CheckCircle2, AlertCircle, Camera } from "lucide-react";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { adminApi } from "@/lib/adminApi";
import { C } from "@/lib/adminConstants";

function StatCard({ icon: Icon, label, value, sub, color, bg }) {
  return (
    <div
      style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(10,19,16,0.05)", display: "flex", alignItems: "flex-start", gap: 16, transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(10,19,16,0.10)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(10,19,16,0.05)"; e.currentTarget.style.transform = ""; }}
    >
      <div style={{ width: 46, height: 46, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.text, lineHeight: 1.1 }}>{value ?? "—"}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.body, marginTop: 2 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: C.muted, marginTop: 3 }}>{sub}</div>}
      </div>
    </div>
  );
}

function ContentRow({ item, kind, onToggleStatus, onDelete }) {
  const [actLoading, setActLoading] = useState(false);
  const isPublished = item.status === "published";
  const editHref = kind === "blog" ? `/admin/blogs/edit/${item._id}` : `/admin/case-studies/edit/${item._id}`;

  const handleToggle = async () => {
    setActLoading(true);
    try { await onToggleStatus(item._id); } finally { setActLoading(false); }
  };

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: "1px solid #F0F4F2", transition: "background 0.15s" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFBFA")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13.5, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: isPublished ? C.successBg : C.warnBg, color: isPublished ? "#065F46" : "#92400E" }}>
            {isPublished ? "Published" : "Draft"}
          </span>
          <span style={{ fontSize: 11.5, color: C.muted }}>{kind === "blog" ? item.tag : item.sector}</span>
          <span style={{ fontSize: 11.5, color: C.muted }}>{item.views ?? 0} views</span>
          {item.featured && <span style={{ fontSize: 10.5, fontWeight: 600, color: "#B45309", background: "#FEF3DC", padding: "2px 8px", borderRadius: 999 }}>★ Featured</span>}
        </div>
      </div>
      <Link href={editHref} style={{ fontSize: 12.5, fontWeight: 500, color: C.accent, background: C.accentLight, padding: "6px 14px", borderRadius: 6, textDecoration: "none", whiteSpace: "nowrap" }}>Edit</Link>
      <button
        onClick={handleToggle}
        disabled={actLoading}
        style={{ fontSize: 12.5, fontWeight: 500, padding: "6px 14px", borderRadius: 6, border: "1.5px solid", cursor: "pointer", whiteSpace: "nowrap", fontFamily: C.sans, borderColor: isPublished ? "#FECACA" : "#BBF7D0", color: isPublished ? "#DC2626" : "#059669", background: isPublished ? "#FEF2F2" : "#ECFDF5" }}
      >
        {actLoading ? "…" : isPublished ? "Unpublish" : "Publish"}
      </button>
      <button onClick={() => onDelete(item._id)} style={{ fontSize: 12.5, fontWeight: 500, padding: "6px 12px", borderRadius: 6, border: "1.5px solid #FECACA", background: "#FEF2F2", color: "#DC2626", cursor: "pointer", fontFamily: C.sans }}>
        Delete
      </button>
    </div>
  );
}

export default function AdminDashboardScreen() {
  const { admin, loading: authLoading, logout } = useAdminAuth();
  const [blogStats, setBlogStats] = useState(null);
  const [csStats, setCsStats] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentCaseStudies, setRecentCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bStats, cStats, blogsRes, csRes] = await Promise.all([
        adminApi.getBlogStats(),
        adminApi.getCaseStudyStats(),
        adminApi.getBlogs({ limit: 5, page: 1 }),
        adminApi.getCaseStudies({ limit: 5, page: 1 }),
      ]);
      setBlogStats(bStats.data);
      setCsStats(cStats.data);
      setRecentBlogs(blogsRes.data);
      setRecentCaseStudies(csRes.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (!authLoading) fetchData(); }, [authLoading]);

  const handleToggleBlogStatus = async (id) => { await adminApi.toggleBlogStatus(id); fetchData(); };
  const handleDeleteBlog = async (id) => { if (!confirm("Delete this blog permanently?")) return; try { await adminApi.deleteBlog(id); fetchData(); } catch (e) { alert(e.message); } };
  const handleToggleCsStatus = async (id) => { await adminApi.toggleCaseStudyStatus(id); fetchData(); };
  const handleDeleteCs = async (id) => { if (!confirm("Delete this case study permanently?")) return; try { await adminApi.deleteCaseStudy(id); fetchData(); } catch (e) { alert(e.message); } };

  if (authLoading) return null;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: C.display, fontSize: 22, fontWeight: 700, color: C.text }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>Welcome back, {admin?.name}. Here&apos;s your content overview.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/admin/blogs/create" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${C.accent}, #2E9E63)`, color: "#fff", padding: "10px 18px", borderRadius: 8, fontFamily: C.sans, fontSize: 13, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 12px rgba(33,132,82,0.28)" }}>
            <PenSquare size={15} />New Blog
          </Link>
          <Link href="/admin/case-studies/create" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${C.coral}, #D96450)`, color: "#fff", padding: "10px 18px", borderRadius: 8, fontFamily: C.sans, fontSize: 13, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 12px rgba(236,124,98,0.28)" }}>
            <PenSquare size={15} />New Case Study
          </Link>
        </div>
      </div>

      {error && (
        <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
          <AlertCircle size={16} color="#EF4444" />
          <span style={{ fontSize: 13, color: "#DC2626" }}>{error}</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard icon={FileText} label="Total Blogs" value={blogStats?.total} sub="All articles" color={C.accent} bg={C.accentLight} />
        <StatCard icon={CheckCircle2} label="Published Blogs" value={blogStats?.published} sub="Live on site" color="#10b981" bg={C.successBg} />
        <StatCard icon={Clock} label="Blog Drafts" value={blogStats?.drafts} sub="Not yet live" color="#F59E0B" bg={C.warnBg} />
        <StatCard icon={Camera} label="Total Case Studies" value={csStats?.total} sub="All projects" color={C.coral} bg={C.coralLight} />
        <StatCard icon={CheckCircle2} label="Published Case Studies" value={csStats?.published} sub="Live on site" color="#10b981" bg={C.successBg} />
        <StatCard icon={Star} label="Featured (homepage)" value={csStats?.featured} sub="Case-study teaser" color="#B45309" bg="#FEF3DC" />
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(10,19,16,0.04)", overflow: "hidden", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #F0F4F2" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Recent Blogs</div>
          <Link href="/admin/blogs" style={{ fontSize: 12.5, color: C.accent, textDecoration: "none", fontWeight: 500 }}>View all →</Link>
        </div>
        {loading ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: C.muted, fontSize: 13 }}>Loading...</div>
        ) : recentBlogs.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <BookOpen size={36} color="#CBD5E0" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 14, fontWeight: 600, color: C.body }}>No blogs yet</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Create your first blog to get started.</div>
          </div>
        ) : (
          recentBlogs.map((b) => <ContentRow key={b._id} item={b} kind="blog" onToggleStatus={handleToggleBlogStatus} onDelete={handleDeleteBlog} />)
        )}
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(10,19,16,0.04)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #F0F4F2" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Recent Case Studies</div>
          <Link href="/admin/case-studies" style={{ fontSize: 12.5, color: C.accent, textDecoration: "none", fontWeight: 500 }}>View all →</Link>
        </div>
        {loading ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: C.muted, fontSize: 13 }}>Loading...</div>
        ) : recentCaseStudies.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <Camera size={36} color="#CBD5E0" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 14, fontWeight: 600, color: C.body }}>No case studies yet</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Create your first case study to get started.</div>
          </div>
        ) : (
          recentCaseStudies.map((c) => <ContentRow key={c._id} item={c} kind="case-study" onToggleStatus={handleToggleCsStatus} onDelete={handleDeleteCs} />)
        )}
      </div>
    </>
  );
}
