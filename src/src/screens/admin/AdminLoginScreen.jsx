"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Leaf, AlertCircle } from "lucide-react";
import { adminApi, getToken } from "@/lib/adminApi";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { C } from "@/lib/adminConstants";

export default function AdminLoginScreen() {
  const router = useRouter();
  const { refresh } = useAdminAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getToken()) router.replace("/admin/dashboard");
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("Both fields are required."); return; }
    setLoading(true);
    try {
      const data = await adminApi.login(form.email, form.password);
      localStorage.setItem("biocbg_admin_token", data.token);
      await refresh();
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: C.sans }}>
      <style>{`
        * { box-sizing:border-box; }
        .login-input { width:100%; padding:11px 14px 11px 42px; border:1.5px solid ${C.border}; border-radius:8px; font-family:${C.sans}; font-size:13.5px; color:${C.text}; outline:none; transition:border-color 0.18s, box-shadow 0.18s; background:#fff; }
        .login-input:focus { border-color:${C.accent}; box-shadow:0 0 0 3px rgba(33,132,82,0.10); }
        .login-btn { width:100%; padding:12px; border:none; border-radius:8px; font-family:${C.sans}; font-size:14px; font-weight:600; cursor:pointer; background:linear-gradient(135deg,${C.accent},#2E9E63); color:#fff; transition:all 0.2s; }
        .login-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 20px rgba(33,132,82,0.35); }
        .login-btn:disabled { opacity:0.65; cursor:not-allowed; transform:none; }
        .left-panel { display:flex; flex-direction:column; justify-content:center; align-items:center; padding:60px; background:linear-gradient(160deg,${C.sidebar} 0%,${C.accentDark} 100%); color:#fff; }
        @media(max-width:900px){ .left-panel { display:none; } }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        .fade-in { animation:fadeIn 0.5s ease forwards; }
      `}</style>

      <div className="left-panel" style={{ flex: "0 0 420px" }}>
        <div style={{ textAlign: "center", maxWidth: 320 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", backdropFilter: "blur(8px)" }}>
            <Leaf size={28} color="#fff" />
          </div>
          <h1 style={{ fontFamily: C.display, fontSize: 28, fontWeight: 700, marginBottom: 14, lineHeight: 1.2 }}>
            Content Admin
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: 36 }}>
            Manage the Bio CBG blog and case-study library — create, edit, publish and track everything from one place.
          </p>
          {["Create & publish blogs", "Manage case studies", "Track views & analytics", "SEO & content tools"].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, justifyContent: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.coral, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.80)" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: C.bg }}>
        <div className="fade-in" style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${C.accent}, #2E9E63)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px rgba(33,132,82,0.3)` }}>
              <Leaf size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Bio CBG</div>
              <div style={{ fontSize: 11, color: C.muted }}>Content Admin</div>
            </div>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 6 }}>Welcome back</h2>
          <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 28 }}>Sign in to manage blogs and case studies</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: C.body, display: "block", marginBottom: 6 }}>Email address</label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
                <input className="login-input" type="email" placeholder="admin@biocbg.in" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} autoComplete="email" />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: C.body, display: "block", marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
                <input className="login-input" type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPass((s) => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4 }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px" }}>
                <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, color: "#DC2626" }}>{error}</span>
              </div>
            )}

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <a href="/" style={{ fontSize: 12.5, color: C.muted, textDecoration: "none" }}>← Back to Bio CBG website</a>
          </div>
        </div>
      </div>
    </div>
  );
}
