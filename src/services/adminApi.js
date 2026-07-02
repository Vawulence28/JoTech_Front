import axios from "axios";

// ==========================================
// ADMIN API CLIENT
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

// Legacy alias
export const getDashboard = getDashboardMetrics;

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
// USERS
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
    `/admin/users/search?q=${encodeURIComponent(
      query
    )}`
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

export async function getSettings() {
  const { data } = await API.get(
    "/admin/settings"
  );

  return data;
}

export async function updateSettings(payload) {
  const { data } = await API.put(
    "/admin/settings",
    payload
  );

  return data;
}

export async function getCertificates(){
  const {data}=await API.get(
    "/admin/certificates"
  );

  return data;
}

export async function revokeCertificate(id){
  const {data}=await API.patch(
    `/admin/certificates/${id}/revoke`
  );

  return data;
}

// ==========================================
// TELEGRAM
// ==========================================

export async function getTelegramDashboard() {
  const { data } = await API.get(
    "/admin/telegram"
  );

  return data;
}

export async function getTelegramOverview() {
  const { data } = await API.get(
    "/admin/telegram/overview"
  );

  return data;
}

export async function getTelegramLinkedUsers() {
  const { data } = await API.get(
    "/admin/telegram/linked-users"
  );

  return data;
}

export async function getTelegramUnlinkedUsers() {
  const { data } = await API.get(
    "/admin/telegram/unlinked-users"
  );

  return data;
}

export async function getTelegramMessages() {
  const { data } = await API.get(
    "/admin/telegram/messages"
  );

  return data;
}

export async function getTelegramBot() {
  const { data } = await API.get(
    "/admin/telegram/bot"
  );

  return data;
}

// ==========================================
// MESSAGES
// ==========================================

export async function getMessageHistory() {
  const { data } = await API.get(
    "/admin/messages/history"
  );

  return data;
}

export async function getMessageTemplates() {
  const { data } = await API.get(
    "/admin/messages/templates"
  );

  return data;
}

export async function sendBroadcast(payload) {
  const { data } = await API.post(
    "/admin/messages/broadcast",
    payload
  );

  return data;
}

export async function sendMessage(payload) {
  const { data } = await API.post(
    "/admin/messages/send",
    payload
  );

  return data;
}

export async function createMessageTemplate(payload) {
  const { data } = await API.post(
    "/admin/messages/templates",
    payload
  );

  return data;
}

export async function deleteMessageTemplate(id) {
  const { data } = await API.delete(
    `/admin/messages/templates/${id}`
  );

  return data;
}

// ==========================================
// DEFAULT EXPORT
// ==========================================

const adminApi = {
  api: API,

  getDashboard,
  getDashboardMetrics,

  getRecentUsers,
  getDashboardTelegramStats,
  getDashboardDropOffUsers,

  getUsers,
  searchUsers,
  suspendUser,
  activateUser,
  deleteUser,

  getAnalytics,
  getGrowthAnalytics,
  getLearningAnalytics,
  getDropOffAnalytics,
  getTelegramAnalytics,
  getCourseAnalytics,

  getLeaderboard,
  getXPLeaderboard,
  getStreakLeaderboard,

  getSettings,
  updateSettings,
};

export default adminApi;