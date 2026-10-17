"use client";
import { Suspense } from "react";
import AdminBlogListScreen from "@/screens/admin/AdminBlogListScreen";
export default function Page() { return <Suspense fallback={null}><AdminBlogListScreen /></Suspense>; }
