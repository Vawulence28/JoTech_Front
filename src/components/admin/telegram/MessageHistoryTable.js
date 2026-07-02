"use client";

import { useMemo, useState } from "react";

export default function MessageHistoryTable({
  history = [],
  loading = false,
}) {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const keyword =
        `${item.title || ""} ${item.recipient_name || ""} ${item.recipient_type || ""}`
          .toLowerCase();

      const matchesSearch =
        keyword.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : (item.status || "").toLowerCase() ===
            statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [history, search, statusFilter]);

  function statusBadge(status) {
    switch ((status || "").toLowerCase()) {
      case "sent":
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Sent
          </span>
        );

      case "failed":
        return (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Failed
          </span>
        );

      case "pending":
        return (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            Pending
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Unknown
          </span>
        );
    }
  }

  return (
    <div className="rounded-xl bg-white shadow">

      <div className="border-b p-6">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              Message History
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Track all Telegram messages sent
              from the admin panel.
            </p>

          </div>

          <div className="flex gap-3">

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
              className="rounded-lg border px-4 py-2"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="rounded-lg border px-4 py-2"
            >
              <option value="all">
                All Status
              </option>

              <option value="sent">
                Sent
              </option>

              <option value="failed">
                Failed
              </option>

              <option value="pending">
                Pending
              </option>

            </select>

          </div>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-slate-50">

              <th className="px-6 py-4 text-left">
                Recipient
              </th>

              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Type
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Sent At
              </th>

              <th className="px-6 py-4 text-left">
                Telegram ID
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="6"
                  className="p-10 text-center"
                >
                  Loading message history...
                </td>

              </tr>

            ) : filteredHistory.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="p-10 text-center text-slate-500"
                >
                  No messages found.
                </td>

              </tr>

            ) : (

              filteredHistory.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="px-6 py-4">

                    <div>

                      <p className="font-medium">
                        {item.recipient_name ||
                          "Unknown User"}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.recipient_type}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {item.title}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {item.recipient_type}
                  </td>

                  <td className="px-6 py-4">
                    {statusBadge(item.status)}
                  </td>

                  <td className="px-6 py-4">
                    {item.sent_at
                      ? new Date(
                          item.sent_at
                        ).toLocaleString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4">

                    {item.telegram_message_id ? (

                      <span className="font-mono text-xs">
                        {item.telegram_message_id}
                      </span>

                    ) : (

                      "-"
                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <div className="border-t px-6 py-4 text-sm text-slate-500">

        Showing{" "}
        <strong>
          {filteredHistory.length}
        </strong>{" "}
        of{" "}
        <strong>
          {history.length}
        </strong>{" "}
        messages.

      </div>

    </div>
  );
}