"use client";

import { useEffect, useState } from "react";
import adminApi from "@/services/adminApi";
import LoadingCard from "@/components/admin/LoadingCard";

export default function AdminUsersPage() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [actionLoading, setActionLoading] =
    useState(null);

  // =====================================
  // LOAD USERS
  // =====================================

  const loadUsers = async () => {

    try {

      const response =
        search.trim() === ""

          ? await adminApi.getUsers()

          : await adminApi.searchUsers(search);

      setUsers(response.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadUsers();

  }, []);

  // =====================================
  // SEARCH
  // =====================================

  const handleSearch = async () => {

    setLoading(true);

    await loadUsers();

  };

  // =====================================
  // SUSPEND USER
  // =====================================

  const suspendUser = async (id) => {

    if (!confirm("Suspend this user?")) {
      return;
    }

    try {

      setActionLoading(id);

      await adminApi.suspendUser(id);

      await loadUsers();

    } catch (error) {

      console.error(error);

      alert("Unable to suspend user.");

    } finally {

      setActionLoading(null);

    }

  };

  // =====================================
  // ACTIVATE USER
  // =====================================

  const activateUser = async (id) => {

    try {

      setActionLoading(id);

      await adminApi.activateUser(id);

      await loadUsers();

    } catch (error) {

      console.error(error);

      alert("Unable to activate user.");

    } finally {

      setActionLoading(null);

    }

  };

  // =====================================
  // DELETE USER
  // =====================================

  const deleteUser = async (id) => {

    const confirmed =
      confirm(
        "Delete this user permanently?\n\nThis cannot be undone."
      );

    if (!confirmed) return;

    try {

      setActionLoading(id);

      await adminApi.deleteUser(id);

      await loadUsers();

    } catch (error) {

      console.error(error);

      alert("Delete failed.");

    } finally {

      setActionLoading(null);

    }

  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <LoadingCard />

    );

  }

  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">

          User Management

        </h1>

        <p className="text-gray-500 mt-2">

          Search, suspend, activate and delete users.

        </p>

      </div>

      {/* SEARCH */}

      <div className="flex gap-3">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search name or email..."
          className="flex-1 border rounded-xl px-4 py-3"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 rounded-xl"
        >
          Search
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Role
              </th>

              <th className="text-left p-4">
                Plan
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Telegram
              </th>

              <th className="text-right p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t"
              >

                <td className="p-4 font-medium">

                  {user.full_name}

                </td>

                <td className="p-4">

                  {user.email}

                </td>

                <td className="p-4">

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                    {user.role}

                  </span>

                </td>

                <td className="p-4">

                  {user.plan}

                </td>

                <td className="p-4">

                  {user.is_active ? (

                    <span className="text-green-600 font-semibold">

                      Active

                    </span>

                  ) : (

                    <span className="text-red-600 font-semibold">

                      Suspended

                    </span>

                  )}

                </td>

                <td className="p-4">

                  {user.telegram_linked
                    ? "✅"
                    : "—"}

                </td>

                <td className="p-4">

                  <div className="flex justify-end gap-2">

                    {user.is_active ? (

                      <button
                        disabled={
                          actionLoading === user.id
                        }
                        onClick={() =>
                          suspendUser(user.id)
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                      >
                        Suspend
                      </button>

                    ) : (

                      <button
                        disabled={
                          actionLoading === user.id
                        }
                        onClick={() =>
                          activateUser(user.id)
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Activate
                      </button>

                    )}

                    <button
                      disabled={
                        actionLoading === user.id
                      }
                      onClick={() =>
                        deleteUser(user.id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}