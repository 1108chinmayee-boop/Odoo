import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ============================================
// GET ALL PAYROLL
// ============================================

export const getPayroll = () =>
  api.get("/payroll");


// ============================================
// GET MY PAYROLL
// ============================================

export const getMyPayroll = () =>
  api.get("/payroll/my");


// ============================================
// GET PAYROLL BY ID
// ============================================

export const getPayrollById = (id) =>
  api.get(`/payroll/${id}`);


// ============================================
// CREATE PAYROLL
// ============================================

export const createPayroll = (data) =>
  api.post("/payroll", data);


// ============================================
// UPDATE PAYROLL
// ============================================

export const updatePayroll = (id, data) =>
  api.put(`/payroll/${id}`, data);


// ============================================
// DELETE PAYROLL
// ============================================

export const deletePayroll = (id) =>
  api.delete(`/payroll/${id}`);


// ============================================
// PAYROLL ANALYTICS
// ============================================

export const getPayrollAnalytics = () =>
  api.get("/payroll/analytics");