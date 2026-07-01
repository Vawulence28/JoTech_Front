import axios from "axios";

// ==========================================
// ADMIN API CLIENT
// ==========================================
//
// Central API client for the Admin Panel.
//
// Responsibilities
// ----------------
// • Configure Axios
// • Attach JWT automatically
// • Handle expired sessions
// • Expose helper functions
//
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
      const token = localStorage.getItem("admin_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
      localStorage.removeItem("admin_user");

      // Prevent redirect loop while already on login page
      if (
        !window.location.pathname.startsWith("/admin/login")
      ) {
        window.location.replace("/admin/login");
      }
    }

    return Promise.reject(error);
  }
);

// ==========================================
// DASHBOARD
// ==========================================

export async function getDashboardMetrics() {
  const { data } = await API.get("/admin/dashboard");
  return data;
}

export async function getRecentUsers(limit = 10) {
  const { data } = await API.get(
    `/admin/dashboard/recent-users?limit=${limit}`
  );

  return data;
}

export async function getDashboardTelegramStats() {
  const { data } = await API.get(
    "/admin/dashboard/telegram"
  );

  return data;
}

export async function getDashboardDropOffUsers() {
  const { data } = await API.get(
    "/admin/dashboard/dropoff"
  );

  return data;
}

// ==========================================
// USER MANAGEMENT
// ==========================================

export async function getUsers(
  page = 1,
  limit = 20
) {
  const { data } = await API.get(
    `/admin/users?page=${page}&limit=${limit}`
  );

  return data;
}

export async function searchUsers(query) {
  const { data } = await API.get(
    `/admin/users/search?q=${encodeURIComponent(query)}`
  );

  return data;
}

export async function suspendUser(id) {
  const { data } = await API.patch(
    `/admin/users/${id}/suspend`
  );

  return data;
}

export async function activateUser(id) {
  const { data } = await API.patch(
    `/admin/users/${id}/activate`
  );

  return data;
}

export async function deleteUser(id) {
  const { data } = await API.delete(
    `/admin/users/${id}`
  );

  return data;
}

// ==========================================
// ANALYTICS
// ==========================================

export async function getAnalytics() {
  const { data } = await API.get(
    "/admin/analytics"
  );

  return data;
}

export async function getGrowthAnalytics() {
  const { data } = await API.get(
    "/admin/analytics/growth"
  );

  return data;
}

export async function getLearningAnalytics() {
  const { data } = await API.get(
    "/admin/analytics/learning"
  );

  return data;
}

export async function getDropOffAnalytics() {
  const { data } = await API.get(
    "/admin/analytics/dropoff"
  );

  return data;
}

export async function getTelegramAnalytics() {
  const { data } = await API.get(
    "/admin/analytics/telegram"
  );

  return data;
}

export async function getCourseAnalytics() {
  const { data } = await API.get(
    "/admin/analytics/courses"
  );

  return data;
}

// ==========================================
// LEADERBOARDS
// ==========================================

export async function getLeaderboard() {
  const { data } = await API.get(
    "/admin/leaderboard"
  );

  return data;
}

export async function getXPLeaderboard() {
  const { data } = await API.get(
    "/admin/leaderboard/xp"
  );

  return data;
}

export async function getStreakLeaderboard() {
  const { data } = await API.get(
    "/admin/leaderboard/streaks"
  );

  return data;
}

// ==========================================
// RAW API INSTANCE
// ==========================================

export default API;