"use client";

import { useMemo, useState } from "react";

export default function TelegramUsersTable({
  users = [],
  loading = false,
  onSendMessage,
}) {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        (user.full_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (user.email || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      if (status === "linked") {
        return (
          matchesSearch &&
          user.telegram_id
        );
      }

      if (status === "unlinked") {
        return (
          matchesSearch &&
          !user.telegram_id
        );
      }

      return matchesSearch;
    });
  }, [users, search, status]);

  return (
    <div className="rounded-xl bg-white shadow">

      {/* Header */}

      <div className="border-b p-6">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              Telegram Users
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View every learner and
              manage Telegram messaging.
            </p>

          </div>

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="rounded-lg border px-4 py-2"
            >
              <option value="all">
                All Users
              </option>

              <option value="linked">
                Linked
              </option>

              <option value="unlinked">
                Unlinked
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-slate-50">

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Learner
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Telegram
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="5"
                  className="p-10 text-center"
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

              filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4">

                    <div>

                      <p className="font-medium">
                        {user.full_name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {user.id}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">

                    {user.telegram_id ? (

                      <span className="font-mono text-sm">
                        {user.telegram_id}
                      </span>

                    ) : (

                      <span className="text-slate-400">
                        —
                      </span>

                    )}

                  </td>

                  <td className="px-6 py-4">

                    {user.telegram_id ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Linked
                      </span>

                    ) : (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Not Linked
                      </span>

                    )}

                  </td>

                  <td className="px-6 py-4 text-center">

                    <button
                      disabled={!user.telegram_id}
                      onClick={() =>
                        onSendMessage?.(user)
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition
                      ${
                        user.telegram_id
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "cursor-not-allowed bg-slate-300"
                      }`}
                    >
                      Send Message
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="border-t px-6 py-4 text-sm text-slate-500">

        Showing{" "}
        <strong>
          {filteredUsers.length}
        </strong>{" "}
        of{" "}
        <strong>
          {users.length}
        </strong>{" "}
        users.

      </div>

    </div>
  );
}