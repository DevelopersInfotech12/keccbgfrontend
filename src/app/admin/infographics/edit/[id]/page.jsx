"use client";
import AdminInfographicFormScreen from "@/screens/admin/AdminInfographicFormScreen";

export default function Page({ params }) {
  return <AdminInfographicFormScreen infographicId={params.id} />;
}
