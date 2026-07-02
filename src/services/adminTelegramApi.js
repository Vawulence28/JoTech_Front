import API from "./adminApi";

// ==========================================
// ADMIN TELEGRAM API
// ==========================================

// ==========================================
// TELEGRAM DASHBOARD
// ==========================================

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

export async function saveTelegramSettings(payload) {
  const { data } = await API.put(
    "/admin/telegram/settings",
    payload
  );

  return data;
}

// ==========================================
// TELEGRAM USERS
// ==========================================

export async function getTelegramUsers(
  page = 1,
  limit = 20
) {
  const { data } = await API.get(
    `/admin/telegram/users?page=${page}&limit=${limit}`
  );

  return data;
}

export async function searchTelegramUsers(query) {
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

export async function unlinkTelegramUser(id) {
  const { data } = await API.patch(
    `/admin/telegram/users/${id}/unlink`
  );

  return data;
}

// ==========================================
// TELEGRAM MESSAGES
// ==========================================

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

export async function createMessageTemplate(
  payload
) {
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

export async function deleteMessageTemplate(
  id
) {
  const { data } = await API.delete(
    `/admin/messages/templates/${id}`
  );

  return data;
}

// ==========================================
// SEND MESSAGE
// ==========================================

export async function sendMessage(
  payload
) {
  const { data } = await API.post(
    "/admin/messages/send",
    payload
  );

  return data;
}

export async function sendBroadcast(
  payload
) {
  const { data } = await API.post(
    "/admin/messages/broadcast",
    payload
  );

  return data;
}

// ==========================================
// ANALYTICS
// ==========================================

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

// ==========================================
// BOT
// ==========================================

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
// EXPORT
// ==========================================

export default {
  // Dashboard
  getTelegramDashboard,
  getTelegramStatistics,
  getTelegramSettings,
  saveTelegramSettings,

  // Users
  getTelegramUsers,
  searchTelegramUsers,
  getTelegramUser,
  unlinkTelegramUser,

  // Messages
  getMessageHistory,
  getMessageTemplates,
  createMessageTemplate,
  updateMessageTemplate,
  deleteMessageTemplate,
  sendMessage,
  sendBroadcast,

  // Analytics
  getBroadcastStatistics,
  getMessageFailures,

  // Bot
  getBotStatus,
  restartBot,
  sendTestMessage,
};