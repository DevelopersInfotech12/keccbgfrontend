"use client";
// Thin compatibility shim: every admin screen imports `useAdminAuth` from
// here. The actual auth state now lives in one shared context
// (AdminAuthContext.jsx), mounted once in app/admin/layout.jsx — this just
// re-exports that context hook under the old name so none of the screens
// had to change their import line.
export { useAdminAuthContext as useAdminAuth } from "./AdminAuthContext";
