"use client";

import { useCallback, useEffect, useState } from "react";

import TelegramStatsCards from "@/components/admin/telegram/TelegramStatsCards";
import TelegramUsersTable from "@/components/admin/telegram/TelegramUsersTable";
import SendMessageModal from "@/components/admin/telegram/SendMessageModal";
import TemplatesPanel from "@/components/admin/telegram/TemplatesPanel";
import MessageHistoryTable from "@/components/admin/telegram/MessageHistoryTable";

import {
  getTelegramDashboard,
  getTelegramUsers,
  getMessageTemplates,
  getMessageHistory,
} from "@/services/adminApi";

export default function AdminTelegramPage() {
  // ==========================================
  // STATE
  // ==========================================

  const [dashboard, setDashboard] = useState({});

  const [users, setUsers] = useState([]);

  const [templates, setTemplates] =
    useState([]);

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [usersLoading, setUsersLoading] =
    useState(true);

  const [
    historyLoading,
    setHistoryLoading,
  ] = useState(true);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [
    showMessageModal,
    setShowMessageModal,
  ] = useState(false);

  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

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

  // ==========================================
  // LOAD USERS
  // ==========================================

  const loadUsers =
    useCallback(async () => {
      try {
        setUsersLoading(true);

        const result =
          await getTelegramUsers(
            page,
            20
          );

        setUsers(
          result.data || []
        );

        setTotalPages(
          result.pagination
            ?.totalPages || 1
        );
      } catch (error) {
        console.error(
          "Users Error",
          error
        );

        setUsers([]);
      } finally {
        setUsersLoading(false);
      }
    }, [page]);

  // ==========================================
  // LOAD TEMPLATES
  // ==========================================

  const loadTemplates =
    useCallback(async () => {
      try {
        const result =
          await getMessageTemplates();

        setTemplates(
          result.data || []
        );
      } catch (error) {
        console.error(
          "Templates Error",
          error
        );

        setTemplates([]);
      }
    }, []);

  // ==========================================
  // LOAD HISTORY
  // ==========================================

  const loadHistory =
    useCallback(async () => {
      try {
        setHistoryLoading(true);

        const result =
          await getMessageHistory();

        setHistory(
          result.data || []
        );
      } catch (error) {
        console.error(
          "History Error",
          error
        );

        setHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    }, []);

  // ==========================================
  // LOAD EVERYTHING
  // ==========================================

  const refresh =
    useCallback(async () => {
      setLoading(true);

      try {
        await Promise.all([
          loadDashboard(),
          loadUsers(),
          loadTemplates(),
          loadHistory(),
        ]);
      } finally {
        setLoading(false);
      }
    }, [
      loadDashboard,
      loadUsers,
      loadTemplates,
      loadHistory,
    ]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ==========================================
  // FILTERED USERS
  // ==========================================

  const filteredUsers =
    users.filter((user) => {
      const keyword =
        `${user.full_name || ""} ${
          user.email || ""
        } ${user.telegram_username || ""}`
          .toLowerCase();

      return keyword.includes(
        search.toLowerCase()
      );
    });

  // ==========================================
  // OPEN MESSAGE MODAL
  // ==========================================

  function openMessageModal(user) {
    setSelectedUser(user);

    setShowMessageModal(true);
  }

  function closeMessageModal() {
    setSelectedUser(null);

    setShowMessageModal(false);
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="space-y-8">

      {/* Header */}

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Telegram Administration
          </h1>

          <p className="mt-2 text-slate-500">
            Manage Telegram users,
            broadcast announcements,
            templates and delivery history.
          </p>

        </div>

        <button
          onClick={refresh}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Refresh Dashboard
        </button>

      </section>

      {/* Statistics */}

      <TelegramStatsCards
        loading={loading}
        stats={dashboard}
      />

      {/* Search */}

      <section className="rounded-xl bg-white p-6 shadow">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              Telegram Users
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View all users connected to
              the Telegram Bot.
            </p>

          </div>

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-2 lg:w-80"
          />

        </div>

      </section>

      <section className="rounded-xl bg-white shadow">

        <div className="overflow-x-auto">

          <TelegramUsersTable
            users={filteredUsers}
            loading={usersLoading}
            onSendMessage={openMessageModal}
          />

        </div>

        {/* Pagination */}

        <div className="flex items-center justify-between border-t px-6 py-4">

          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-3">

            <button
              disabled={page <= 1}
              onClick={() =>
                setPage((previous) =>
                  Math.max(previous - 1, 1)
                )
              }
              className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              Previous
            </button>

            <button
              disabled={page >= totalPages}
              onClick={() =>
                setPage((previous) =>
                  Math.min(
                    previous + 1,
                    totalPages
                  )
                )
              }
              className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              Next
            </button>

          </div>

        </div>

      </section>

      {/* ==========================================
          SEND MESSAGE MODAL
      ========================================== */}

      {showMessageModal && (

        <SendMessageModal
          open={showMessageModal}
          user={selectedUser}
          templates={templates}
          onClose={closeMessageModal}
          onSent={async () => {

            closeMessageModal();

            await Promise.all([
              loadDashboard(),
              loadHistory(),
            ]);

          }}
        />

      )}

      {/* ==========================================
          QUICK SUMMARY
      ========================================== */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Linked Users
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-600">
            {dashboard.telegramLinked ??
              dashboard.linkedUsers ??
              0}
          </h3>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Unlinked Users
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-600">
            {dashboard.unlinkedUsers ?? 0}
          </h3>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Messages Sent Today
          </p>

          <h3 className="mt-3 text-3xl font-bold text-blue-700">
            {dashboard.totalMessages ?? 0}
          </h3>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Broadcasts
          </p>

          <h3 className="mt-3 text-3xl font-bold text-indigo-700">
            {dashboard.broadcasts ?? 0}
          </h3>

        </div>

      </section>

      {/* ==========================================
          TEMPLATES
      ========================================== */}

      <section className="rounded-xl bg-white p-6 shadow">

        <div className="mb-6">

          <h2 className="text-xl font-semibold">
            Message Templates
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Save frequently used announcements,
            reminders and notification templates.
          </p>

        </div>

        <TemplatesPanel
          templates={templates}
          onRefresh={loadTemplates}
        />

      </section>

      {/* ==========================================
          MESSAGE HISTORY
      ========================================== */}

      <section className="rounded-xl bg-white p-6 shadow">

        <div className="mb-6">

          <h2 className="text-xl font-semibold">
            Delivery History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review previously sent Telegram
            messages, delivery status and
            recipients.
          </p>

        </div>

        <MessageHistoryTable
          loading={historyLoading}
          history={history}
        />

      </section>

    </div>
  );
}