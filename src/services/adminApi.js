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

export async function getCertificates() {
  const { data } = await API.get(
    "/admin/certificates"
  );

  return data;
}

export async function getCertificate(id) {
  const { data } = await API.get(
    `/admin/certificates/${id}`
  );

  return data;
}

export async function getTelegramDashboard() {
  const { data } = await API.get(
    "/admin/telegram/dashboard"
  );

  return data;
}

export async function getTelegramStatistics() {
  const { data } = await API.get(
    "/admin/telegram/statistics"
  );

  return data;
}

export async function getTelegramSettings() {
  const { data } = await API.get(
    "/admin/telegram/settings"
  );

  return data;
}

export async function saveTelegramSettings(
  payload
) {
  const { data } = await API.put(
    "/admin/telegram/settings",
    payload
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

export async function getTelegramUsers(
  page = 1,
  limit = 20
) {
  const { data } = await API.get(
    `/admin/telegram/users?page=${page}&limit=${limit}`
  );

  return data;
}

export async function searchTelegramUsers(
  query
) {
  const { data } = await API.get(
    `/admin/telegram/users/search?q=${encodeURIComponent(
      query
    )}`
  );

  return data;
}

export async function getTelegramUser(id) {
  const { data } = await API.get(
    `/admin/telegram/users/${id}`
  );

  return data;
}

export async function unlinkTelegramUser(
  id
) {
  const { data } = await API.patch(
    `/admin/telegram/users/${id}/unlink`
  );

  return data;
}

export async function getMessageHistory(
  page = 1,
  limit = 50
) {
  const { data } = await API.get(
    `/admin/messages/history?page=${page}&limit=${limit}`
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

export async function updateMessageTemplate(
  id,
  payload
) {
  const { data } = await API.put(
    `/admin/messages/templates/${id}`,
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

export async function getBroadcastStatistics() {
  const { data } = await API.get(
    "/admin/messages/statistics"
  );

  return data;
}

export async function getMessageFailures() {
  const { data } = await API.get(
    "/admin/messages/failures"
  );

  return data;
}

export async function getBotStatus() {
  const { data } = await API.get(
    "/admin/telegram/bot/status"
  );

  return data;
}

export async function restartBot() {
  const { data } = await API.post(
    "/admin/telegram/bot/restart"
  );

  return data;
}

export async function sendTestMessage(
  telegramId
) {
  const { data } = await API.post(
    "/admin/telegram/bot/test",
    {
      telegramId,
    }
  );

  return data;
}


// ==========================================
// DEFAULT EXPORT
// ==========================================

const adminApi = API;

// Dashboard
adminApi.getDashboard = getDashboard;
adminApi.getDashboardMetrics =
  getDashboardMetrics;
adminApi.getRecentUsers =
  getRecentUsers;
adminApi.getDashboardTelegramStats =
  getDashboardTelegramStats;
adminApi.getDashboardDropOffUsers =
  getDashboardDropOffUsers;

// Users
adminApi.getUsers = getUsers;
adminApi.searchUsers = searchUsers;
adminApi.suspendUser = suspendUser;
adminApi.activateUser = activateUser;
adminApi.deleteUser = deleteUser;

// Analytics
adminApi.getAnalytics = getAnalytics;
adminApi.getGrowthAnalytics =
  getGrowthAnalytics;
adminApi.getLearningAnalytics =
  getLearningAnalytics;
adminApi.getDropOffAnalytics =
  getDropOffAnalytics;
adminApi.getTelegramAnalytics =
  getTelegramAnalytics;
adminApi.getCourseAnalytics =
  getCourseAnalytics;

// Leaderboards
adminApi.getLeaderboard =
  getLeaderboard;
adminApi.getXPLeaderboard =
  getXPLeaderboard;
adminApi.getStreakLeaderboard =
  getStreakLeaderboard;

// Settings
adminApi.getSettings = getSettings;
adminApi.updateSettings =
  updateSettings;

// Certificates
adminApi.getCertificates =
  getCertificates;
adminApi.getCertificate =
  getCertificate;

// Telegram Dashboard
adminApi.getTelegramDashboard =
  getTelegramDashboard;
adminApi.getTelegramStatistics =
  getTelegramStatistics;
adminApi.getTelegramSettings =
  getTelegramSettings;
adminApi.saveTelegramSettings =
  saveTelegramSettings;

// Telegram Users
adminApi.getTelegramUsers =
  getTelegramUsers;
adminApi.searchTelegramUsers =
  searchTelegramUsers;
adminApi.getTelegramUser =
  getTelegramUser;
adminApi.unlinkTelegramUser =
  unlinkTelegramUser;

// Telegram Overview
adminApi.getTelegramOverview =
  getTelegramOverview;
adminApi.getTelegramLinkedUsers =
  getTelegramLinkedUsers;
adminApi.getTelegramUnlinkedUsers =
  getTelegramUnlinkedUsers;
adminApi.getTelegramMessages =
  getTelegramMessages;
adminApi.getTelegramBot =
  getTelegramBot;

// Messages
adminApi.getMessageHistory =
  getMessageHistory;
adminApi.getMessageTemplates =
  getMessageTemplates;
adminApi.createMessageTemplate =
  createMessageTemplate;
adminApi.updateMessageTemplate =
  updateMessageTemplate;
adminApi.deleteMessageTemplate =
  deleteMessageTemplate;
adminApi.sendMessage =
  sendMessage;
adminApi.sendBroadcast =
  sendBroadcast;

// Message Analytics
adminApi.getBroadcastStatistics =
  getBroadcastStatistics;
adminApi.getMessageFailures =
  getMessageFailures;

// Telegram Bot
adminApi.getBotStatus =
  getBotStatus;
adminApi.restartBot =
  restartBot;
adminApi.sendTestMessage =
  sendTestMessage;

export { API };

export default adminApi;