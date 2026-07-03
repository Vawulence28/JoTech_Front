"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import SendMessageModal from "@/components/admin/telegram/SendMessageModal";

import {
  getTelegramDashboard,
  getTelegramUsers,
  getMessageTemplates,
  getMessageHistory,
} from "@/services/adminApi";

export default function AdminTelegramPage() {

  // =====================================================
  // STATE
  // =====================================================

  const [dashboard, setDashboard] = useState({});

  const [users, setUsers] = useState([]);

  const [templates, setTemplates] = useState([]);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [usersLoading, setUsersLoading] =
    useState(true);

  const [historyLoading, setHistoryLoading] =
    useState(true);

  const [search, setSearch] = useState("");

  const [historySearch, setHistorySearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [showMessageModal, setShowMessageModal] =
    useState(false);

  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  const loadDashboard =
    useCallback(async () => {

      try {

        const result =
          await getTelegramDashboard();

        setDashboard(result.data?.overview || {});

      } catch (error) {

        console.error(
          "Dashboard Error",
          error
        );

        setDashboard({});

      }

    }, []);

  // =====================================================
  // LOAD USERS
  // =====================================================

  const loadUsers =
    useCallback(async () => {

      try {

        setUsersLoading(true);

        const result =
          await getTelegramUsers(page, 20);

        setUsers(result.data || []);

        setTotalPages(
          result.pagination?.totalPages || 1
        );

      } catch (error) {

        console.error(error);

        setUsers([]);

      } finally {

        setUsersLoading(false);

      }

    }, [page]);

  // =====================================================
  // LOAD MESSAGE TEMPLATES
  // =====================================================

  const loadTemplates =
    useCallback(async () => {

      try {

        const result =
          await getMessageTemplates();

        setTemplates(result.data || []);

      } catch (error) {

        console.error(error);

        setTemplates([]);

      }

    }, []);

  // =====================================================
  // LOAD HISTORY
  // =====================================================

  const loadHistory =
    useCallback(async () => {

      try {

        setHistoryLoading(true);

        const result =
          await getMessageHistory();

        setHistory(result.data || []);

      } catch (error) {

        console.error(error);

        setHistory([]);

      } finally {

        setHistoryLoading(false);

      }

    }, []);

  // =====================================================
  // REFRESH
  // =====================================================

  const refresh =
    useCallback(async () => {

      setRefreshing(true);

      try {

        await Promise.all([
          loadDashboard(),
          loadUsers(),
          loadTemplates(),
          loadHistory(),
        ]);

      } finally {

        setRefreshing(false);

      }

    }, [
      loadDashboard,
      loadUsers,
      loadTemplates,
      loadHistory,
    ]);

  useEffect(() => {

    async function initialize() {

      setLoading(true);

      await refresh();

      setLoading(false);

    }

    initialize();

  }, [refresh]);

    // =====================================================
  // COMPUTED VALUES
  // =====================================================

  const filteredUsers =
    useMemo(() => {

      return users.filter((user) => {

        const keyword = `
          ${user.full_name || ""}
          ${user.email || ""}
          ${user.telegram_username || ""}
        `
          .toLowerCase();

        return keyword.includes(
          search.toLowerCase()
        );

      });

    }, [users, search]);

  const filteredHistory =
    useMemo(() => {

      return history.filter((item) => {

        const matchesSearch = `
          ${item.title || ""}
          ${item.message || ""}
          ${item.learn_users?.full_name || ""}
        `
          .toLowerCase()
          .includes(
            historySearch.toLowerCase()
          );

        const matchesStatus =
          statusFilter === "all"
            ? true
            : item.status === statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );

      });

    }, [
      history,
      historySearch,
      statusFilter,
    ]);

  const successRate =
    history.length === 0
      ? 0
      : Math.round(
          (
            history.filter(
              (m) =>
                m.status === "sent"
            ).length /
            history.length
          ) * 100
        );

  const broadcasts =
    history.filter(
      (m) =>
        m.recipient_type === "broadcast"
    ).length;

  const linkedUsers =
    dashboard.linkedUsers ?? 0;

  const unlinkedUsers =
    dashboard.unlinkedUsers ?? 0;

  const totalMessages =
    dashboard.totalMessages ??
    history.length;

  const templateCount =
    templates.length;

  return (

<div className="space-y-8">

  {/* =====================================================
      HEADER
  ====================================================== */}

  <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <h1 className="text-4xl font-black text-slate-900">
        Telegram Administration
      </h1>

      <p className="mt-2 max-w-3xl text-slate-500">
        Manage Telegram users, send individual messages,
        broadcast announcements, maintain reusable
        templates and monitor delivery history from
        one central dashboard.
      </p>

    </div>

    <button
      onClick={refresh}
      disabled={refreshing}
      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
    >
      {refreshing
        ? "Refreshing..."
        : "Refresh Dashboard"}
    </button>

  </section>

  {/* =====================================================
      OVERVIEW CARDS
  ====================================================== */}

  <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

    <StatsCard
      title="Linked Users"
      value={linkedUsers}
      subtitle="Connected to Telegram"
      icon="✅"
      color="green"
    />

    <StatsCard
      title="Unlinked Users"
      value={unlinkedUsers}
      subtitle="Not connected"
      icon="❌"
      color="red"
    />

    <StatsCard
      title="Telegram Messages"
      value={totalMessages}
      subtitle="Messages delivered"
      icon="💬"
      color="blue"
    />

    <StatsCard
      title="Broadcasts"
      value={broadcasts}
      subtitle="Broadcast campaigns"
      icon="📢"
      color="purple"
    />

    <StatsCard
      title="Templates"
      value={templateCount}
      subtitle="Reusable templates"
      icon="📄"
      color="orange"
    />

    <StatsCard
      title="Success Rate"
      value={`${successRate}%`}
      subtitle="Delivery success"
      icon="📈"
      color="emerald"
    />

  </section>

  {/* =====================================================
      USERS SECTION
  ====================================================== */}

  <section className="rounded-2xl border bg-white shadow-sm">

    <div className="border-b p-6">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Telegram Users
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View learners linked to your Telegram bot
            and send messages directly.
          </p>

        </div>

        <input
          type="text"
          placeholder="Search learners..."
          value={search}
          onChange={(e)=>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 lg:w-80"
        />

      </div>

    </div>

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Learner
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Telegram
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {usersLoading ? (

            <tr>

              <td
                colSpan="5"
                className="p-10 text-center text-slate-500"
              >
                Loading users...
              </td>

            </tr>

          ) : filteredUsers.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="p-10 text-center text-slate-500"
              >
                No users found.
              </td>

            </tr>

          ) : (

            filteredUsers.map((user) => {

              const linked =
                !!user.telegram_chat_id;

              return (

                <tr
                  key={user.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-5">

                    <div className="font-semibold text-slate-900">
                      {user.full_name}
                    </div>

                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-5">

                    {linked ? (

                      <span className="font-medium text-blue-700">
                        @{user.telegram_username}
                      </span>

                    ) : (

                      <span className="text-slate-400">
                        —
                      </span>

                    )}

                  </td>

                  <td className="px-6 py-5">

                    {linked ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Connected
                      </span>

                    ) : (

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        Not Linked
                      </span>

                    )}

                  </td>

                  <td className="px-6 py-5 text-right">

                    <button
                      onClick={() => {

                        setSelectedUser(user);

                        setShowMessageModal(true);

                      }}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Send Message
                    </button>

                  </td>

                </tr>

              );

            })

          )}

        </tbody>

      </table>

    </div>

        {/* =====================================================
        PAGINATION
    ====================================================== */}

    <div className="flex items-center justify-between border-t px-6 py-5">

      <p className="text-sm text-slate-500">
        Showing {filteredUsers.length} of {users.length} users
      </p>

      <div className="flex gap-3">

        <button
          disabled={page <= 1}
          onClick={() =>
            setPage((p) => Math.max(1, p - 1))
          }
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={page >= totalPages}
          onClick={() =>
            setPage((p) =>
              Math.min(totalPages, p + 1)
            )
          }
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  </section>

  {/* =====================================================
      SEND MESSAGE
  ====================================================== */}

  {showMessageModal && (

    <SendMessageModal
      open={showMessageModal}
      user={selectedUser}
      templates={templates}
      onClose={() => {

        setSelectedUser(null);

        setShowMessageModal(false);

      }}
      onSent={async () => {

        setSelectedUser(null);

        setShowMessageModal(false);

        await refresh();

      }}
    />

  )}

  {/* =====================================================
      MESSAGE TEMPLATES
  ====================================================== */}

  <section className="rounded-2xl border bg-white p-8 shadow-sm">

    <div className="mb-8 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold">
          Message Templates
        </h2>

        <p className="mt-1 text-slate-500">
          Quickly reuse common Telegram announcements.
        </p>

      </div>

    </div>

    {templates.length === 0 ? (

      <div className="rounded-xl border border-dashed py-12 text-center text-slate-500">
        No templates available.
      </div>

    ) : (

      <div className="grid gap-6 lg:grid-cols-2">

        {templates.map((template) => (

          <div
            key={template.id}
            className="rounded-xl border p-6"
          >

            <div className="flex items-center justify-between">

              <h3 className="font-bold text-lg">
                {template.name}
              </h3>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {template.category}
              </span>

            </div>

            <p className="mt-3 font-medium">
              {template.title}
            </p>

            <pre className="mt-4 whitespace-pre-wrap font-sans text-sm text-slate-600">
              {template.body}
            </pre>

          </div>

        ))}

      </div>

    )}

  </section>

  {/* =====================================================
      DELIVERY HISTORY
  ====================================================== */}

  <section className="rounded-2xl border bg-white p-8 shadow-sm">

    <div className="mb-8">

      <h2 className="text-2xl font-bold">
        Delivery History
      </h2>

      <p className="mt-1 text-slate-500">
        Recently sent Telegram messages.
      </p>

    </div>

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-slate-500">
              Recipient
            </th>

            <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-slate-500">
              Title
            </th>

            <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-slate-500">
              Status
            </th>

            <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-slate-500">
              Sent
            </th>

          </tr>

        </thead>

        <tbody>

          {historyLoading ? (

            <tr>

              <td
                colSpan="4"
                className="p-10 text-center"
              >
                Loading history...
              </td>

            </tr>

          ) : history.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="p-10 text-center text-slate-500"
              >
                No Telegram messages have been sent.
              </td>

            </tr>

          ) : (

            history.map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="px-5 py-5">
                  {item.learn_users?.full_name ||
                    "Broadcast"}
                </td>

                <td className="px-5 py-5">
                  {item.title}
                </td>

                <td className="px-5 py-5">

                  <StatusBadge
                    status={item.status}
                  />

                </td>

                <td className="px-5 py-5 text-slate-500">

                  {item.sent_at
                    ? new Date(
                        item.sent_at
                      ).toLocaleString()
                    : "-"}

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  </section>

</div>
);
}

function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color
}) {

  const colors = {

    green:
      "text-green-600 bg-green-100",

    red:
      "text-red-600 bg-red-100",

    blue:
      "text-blue-600 bg-blue-100",

    purple:
      "text-purple-600 bg-purple-100",

    orange:
      "text-orange-600 bg-orange-100",

    emerald:
      "text-emerald-600 bg-emerald-100"

  };

  return (

    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {subtitle}
          </p>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${colors[color]}`}
        >
          {icon}
        </div>

      </div>

    </div>

  );

}

function StatusBadge({ status }) {

  const value =
    (status || "").toLowerCase();

  if (value === "sent") {

    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        Sent
      </span>
    );

  }

  if (value === "failed") {

    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Failed
      </span>
    );

  }

  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
      Pending
    </span>
  );

}