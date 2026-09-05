"use client";
// Centralised fetch wrapper for the Bio CBG content backend.
// One client, two resources (blogs + case studies) — same shape as the backend.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("biocbg_admin_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  // A 401 on /auth/login just means "wrong email or password" — let it
  // surface as a normal error so the login form can show it. Only treat a
  // 401 on an already-authenticated call as an expired/invalid session.
  if (res.status === 401 && path !== "/auth/login") {
    if (typeof window !== "undefined") {
      localStorage.removeItem("biocbg_admin_token");
      window.location.href = "/admin/login";
    }
    throw new Error(data.message || "Session expired — please sign in again.");
  }

  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

const uploadImage = async (file) => {
  const token = getToken();
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${BASE_URL}/upload/image`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data;
};

// Builds the CRUD half shared identically by blogs and case studies.
const resourceApi = (resource) => ({
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/${resource}${qs ? "?" + qs : ""}`);
  },
  getStats: () => request(`/${resource}/stats`),
  getOne: (id) => request(`/${resource}/${id}`),
  create: (data) => request(`/${resource}`, { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  toggleStatus: (id) => request(`/${resource}/${id}/status`, { method: "PATCH" }),
  toggleFeatured: (id) => request(`/${resource}/${id}/featured`, { method: "PATCH" }),
  remove: (id) => request(`/${resource}/${id}`, { method: "DELETE" }),
  bulk: (action, ids) => request(`/${resource}/bulk`, { method: "POST", body: JSON.stringify({ action, ids }) }),
});

export const adminApi = {
  // Auth
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  getMe: () => request("/auth/me"),
  changePassword: (currentPassword, newPassword) =>
    request("/auth/change-password", { method: "PUT", body: JSON.stringify({ currentPassword, newPassword }) }),

  // Blogs
  getBlogs: (params) => resourceApi("blogs").getAll(params),
  getBlogStats: () => resourceApi("blogs").getStats(),
  getBlog: (id) => resourceApi("blogs").getOne(id),
  createBlog: (data) => resourceApi("blogs").create(data),
  updateBlog: (id, data) => resourceApi("blogs").update(id, data),
  toggleBlogStatus: (id) => resourceApi("blogs").toggleStatus(id),
  toggleBlogFeatured: (id) => resourceApi("blogs").toggleFeatured(id),
  deleteBlog: (id) => resourceApi("blogs").remove(id),
  bulkBlogs: (action, ids) => resourceApi("blogs").bulk(action, ids),

  // Case studies
  getCaseStudies: (params) => resourceApi("case-studies").getAll(params),
  getCaseStudyStats: () => resourceApi("case-studies").getStats(),
  getCaseStudy: (id) => resourceApi("case-studies").getOne(id),
  createCaseStudy: (data) => resourceApi("case-studies").create(data),
  updateCaseStudy: (id, data) => resourceApi("case-studies").update(id, data),
  toggleCaseStudyStatus: (id) => resourceApi("case-studies").toggleStatus(id),
  toggleCaseStudyFeatured: (id) => resourceApi("case-studies").toggleFeatured(id),
  deleteCaseStudy: (id) => resourceApi("case-studies").remove(id),
  bulkCaseStudies: (action, ids) => resourceApi("case-studies").bulk(action, ids),

  // Upload
  uploadImage,
};
