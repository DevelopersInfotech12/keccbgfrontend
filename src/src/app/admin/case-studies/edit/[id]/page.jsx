"use client";
import AdminCaseStudyFormScreen from "@/screens/admin/AdminCaseStudyFormScreen";

export default function Page({ params }) {
  return <AdminCaseStudyFormScreen caseStudyId={params.id} />;
}
