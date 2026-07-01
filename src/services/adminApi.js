import axios from "axios";

// ==========================================
// API INSTANCE
// ==========================================

const API = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://jo-tech-b7lk.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 30000,

});

// ==========================================
// REQUEST INTERCEPTOR
// ==========================================

API.interceptors.request.use(

  (config) => {

    if (typeof window !== "undefined") {

      const token =
        localStorage.getItem("admin_token");

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;

      }

    }

    return config;

  },

  (error) => Promise.reject(error)

);

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

API.interceptors.response.use(

  (response) => response,

  (error) => {

    if (

      typeof window !== "undefined" &&

      error.response?.status === 401

    ) {

      localStorage.removeItem("admin_token");

      window.location.replace("/admin/login");

    }

    return Promise.reject(error);

  }

);

// ==========================================
// DASHBOARD
// ==========================================

export const getDashboardMetrics = async () => {

  const { data } =
    await API.get("/admin/dashboard");

  return data;

};

// ==========================================
// USERS
// ==========================================

export const getUsers = async (

  page = 1,

  limit = 20

) => {

  const { data } =
    await API.get(
      `/admin/users?page=${page}&limit=${limit}`
    );

  return data;

};

export const searchUsers = async (query) => {

  const { data } =
    await API.get(
      `/admin/users/search?q=${encodeURIComponent(query)}`
    );

  return data;

};

export const suspendUser = async (id) => {

  const { data } =
    await API.patch(
      `/admin/users/${id}/suspend`
    );

  return data;

};

export const activateUser = async (id) => {

  const { data } =
    await API.patch(
      `/admin/users/${id}/activate`
    );

  return data;

};

export const deleteUser = async (id) => {

  const { data } =
    await API.delete(
      `/admin/users/${id}`
    );

  return data;

};

// ==========================================
// ANALYTICS
// ==========================================

export const getAnalytics = async () => {

  const { data } =
    await API.get("/admin/analytics");

  return data;

};

// ==========================================
// LEADERBOARD
// ==========================================

export const getLeaderboard = async () => {

  const { data } =
    await API.get("/admin/leaderboard");

  return data;

};

// ==========================================
// TELEGRAM
// ==========================================

export const getTelegramStats = async () => {

  const { data } =
    await API.get("/admin/telegram");

  return data;

};

// ==========================================
// CERTIFICATES
// ==========================================

export const getCertificates = async () => {

  const { data } =
    await API.get("/admin/certificates");

  return data;

};

// ==========================================
// EXPORT
// ==========================================

export default API;