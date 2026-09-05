"use client";
import AdminBlogFormScreen from "@/screens/admin/AdminBlogFormScreen";

export default function Page({ params }) {
  return <AdminBlogFormScreen blogId={params.id} />;
}
