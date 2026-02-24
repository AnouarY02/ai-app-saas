import axios from "axios";

const apiClient = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || "http://localhost:4000",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = async (data: { email: string; password: string }) => {
  const r = await apiClient.post("/api/auth/login", data);
  return r.data;
};
export const register = async (data: { name: string; email: string; password: string }) => {
  const r = await apiClient.post("/api/auth/register", data);
  return r.data;
};
export const getCurrentUser = async () => {
  const r = await apiClient.get("/api/auth/me");
  return r.data;
};

// Users (legacy)
export const getUsers = async () => { const r = await apiClient.get("/api/users"); return r.data; };
export const getUser = async (id: string) => { const r = await apiClient.get(`/api/users/${id}`); return r.data; };
export const createUser = async (data: any) => { const r = await apiClient.post("/api/users", data); return r.data; };
export const updateUser = async (id: string, data: any) => { const r = await apiClient.put(`/api/users/${id}`, data); return r.data; };
export const deleteUser = async (id: string) => { const r = await apiClient.delete(`/api/users/${id}`); return r.data; };

// Insights (legacy)
export const getInsights = async () => { const r = await apiClient.get("/api/insights"); return r.data; };
export const getInsight = async (id: string) => { const r = await apiClient.get(`/api/insights/${id}`); return r.data; };
export const createInsight = async (data: any) => { const r = await apiClient.post("/api/insights", data); return r.data; };
export const updateInsight = async (id: string, data: any) => { const r = await apiClient.put(`/api/insights/${id}`, data); return r.data; };
export const deleteInsight = async (id: string) => { const r = await apiClient.delete(`/api/insights/${id}`); return r.data; };

// Admin
export const adminGetUsers = async () => { const r = await apiClient.get("/api/admin/users"); return r.data; };
export const adminCreateUser = async (data: any) => { const r = await apiClient.post("/api/admin/users", data); return r.data; };
export const adminUpdateUser = async (id: string, data: any) => { const r = await apiClient.put(`/api/admin/users/${id}`, data); return r.data; };
export const adminDeleteUser = async (id: string) => { const r = await apiClient.delete(`/api/admin/users/${id}`); return r.data; };
export const adminGetBranding = async () => { const r = await apiClient.get("/api/admin/branding"); return r.data; };
export const adminUpdateBranding = async (data: any) => { const r = await apiClient.put("/api/admin/branding", data); return r.data; };
export const adminGetDocuments = async () => { const r = await apiClient.get("/api/admin/documents"); return r.data; };
export const adminUploadDocument = async (data: any) => { const r = await apiClient.post("/api/admin/documents", data); return r.data; };
export const adminDeleteDocument = async (id: string) => { const r = await apiClient.delete(`/api/admin/documents/${id}`); return r.data; };
export const adminGetFlags = async () => { const r = await apiClient.get("/api/admin/flags"); return r.data; };
export const adminUpdateFlag = async (id: string, data: any) => { const r = await apiClient.put(`/api/admin/flags/${id}`, data); return r.data; };
export const adminGetFormats = async () => { const r = await apiClient.get("/api/admin/formats"); return r.data; };
export const adminGetFormat = async (id: string) => { const r = await apiClient.get(`/api/admin/formats/${id}`); return r.data; };
export const adminUpdateFormat = async (id: string, data: any) => { const r = await apiClient.put(`/api/admin/formats/${id}`, data); return r.data; };

// Public
export const getPublicBranding = async () => { const r = await apiClient.get("/api/public/branding"); return r.data; };
export const getPublicFlags = async () => { const r = await apiClient.get("/api/public/flags"); return r.data; };

// AI functions
export const generateRapportage = async (data: any) => { const r = await apiClient.post("/api/ai/rapportage", data); return r.data; };
export const generateZorgplan = async (data: any) => { const r = await apiClient.post("/api/ai/zorgplan", data); return r.data; };
export const generateRisicosignalering = async (data: any) => { const r = await apiClient.post("/api/ai/risicosignalering", data); return r.data; };
export const generateSignaleringplan = async (data: any) => { const r = await apiClient.post("/api/ai/signaleringplan", data); return r.data; };

export default apiClient;
