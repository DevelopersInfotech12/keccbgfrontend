"use client";
// Shared admin-auth state for the whole /admin section.
//
// Mounted ONCE, in app/admin/layout.jsx, which Next.js keeps alive across
// every navigation between /admin/dashboard, /admin/blogs, etc. — that's
// what makes the admin panel feel like a single-page app: the auth check
// (a network round-trip to /auth/me) runs once per visit instead of once
// per click, and the sidebar never remounts.
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { adminApi, getToken } from "./adminApi";

const AdminAuthCtx = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const loadAdmin = useCallback(async () => {
    setLoading(true);
    const token = getToken();
    if (!token) {
      setLoading(false);
      if (pathname !== "/admin/login" && pathname !== "/admin") router.replace("/admin/login");
      return;
    }
    try {
      const data = await adminApi.getMe();
      setAdmin(data.admin);
    } catch {
      if (typeof window !== "undefined") localStorage.removeItem("biocbg_admin_token");
      if (pathname !== "/admin/login" && pathname !== "/admin") router.replace("/admin/login");
    } finally {
      setLoading(false);
    }
    // Deliberately NOT re-running on every pathname change — only on mount
    // and whenever something explicitly calls refresh() (e.g. right after
    // login). Re-running per navigation is exactly the flicker this exists
    // to remove.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => { loadAdmin(); }, [loadAdmin]);

  const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("biocbg_admin_token");
    setAdmin(null);
    router.push("/admin/login");
  };

  return (
    <AdminAuthCtx.Provider value={{ admin, loading, logout, refresh: loadAdmin }}>
      {children}
    </AdminAuthCtx.Provider>
  );
}

export function useAdminAuthContext() {
  const ctx = useContext(AdminAuthCtx);
  if (!ctx) throw new Error("useAdminAuthContext must be used inside AdminAuthProvider (app/admin/layout.jsx)");
  return ctx;
}
