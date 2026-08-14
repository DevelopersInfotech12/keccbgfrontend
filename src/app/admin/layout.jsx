"use client";
// One persistent shell for the whole /admin section. Next.js keeps this
// mounted across navigation between child routes (dashboard, blogs, create,
// edit, …) — the sidebar/topbar and the auth check underneath them only run
// once per visit, not once per click. That's what fixes the "blinks and
// refreshes for a split second on every click" feel: before, every single
// admin page independently wrapped itself in its own sidebar AND re-ran the
// login check, so navigating anywhere remounted the whole shell and
// blanked the screen while it re-verified the token.
import { usePathname } from "next/navigation";
import { AdminAuthProvider, useAdminAuthContext } from "@/lib/AdminAuthContext";
import AdminLayout from "@/comp/admin/AdminLayout";

function Shell({ children }) {
  const pathname = usePathname();
  const { admin, loading, logout } = useAdminAuthContext();

  // The login page and the root "/admin" redirect page render their own
  // full-screen UI — no sidebar shell around either of those.
  const bare = pathname === "/admin/login" || pathname === "/admin";
  if (bare) return children;

  // One shared blank beat on first load of the whole section (or a hard
  // refresh) while the token is verified — never again per navigation.
  if (loading) return null;

  return (
    <AdminLayout admin={admin} onLogout={logout}>
      {children}
    </AdminLayout>
  );
}

export default function AdminSectionLayout({ children }) {
  return (
    <AdminAuthProvider>
      <Shell>{children}</Shell>
    </AdminAuthProvider>
  );
}
