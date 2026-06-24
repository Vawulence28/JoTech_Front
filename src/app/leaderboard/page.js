"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] =
    useState([]);

  const [myRank, setMyRank] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const [boardRes, rankRes] =
            await Promise.all([
              axios.get(
                "http://localhost:5000/api/leaderboard"
              ),

              axios.get(
                "http://localhost:5000/api/leaderboard/my-rank",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              ),
            ]);

          setLeaderboard(
            boardRes.data.leaderboard || []
          );

          setMyRank(
            rankRes.data
          );
        } catch (error) {
          console.error(
            "Leaderboard Error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-900 text-lg">
          Loading leaderboard...
        </p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">

        {/* HERO */}
        <div className="bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold">
              🏆 Leaderboard
            </h1>

            <p className="text-blue-100 mt-2">
              Track your ranking among learners
            </p>

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* MY STATS */}
          <div className="grid md:grid-cols-2 gap-5 mb-10">

            <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">

              <p className="text-blue-600">
                Your Rank
              </p>

              <h2 className="text-4xl font-bold text-orange-500 mt-2">
                #{myRank?.rank || "-"}
              </h2>

            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">

              <p className="text-blue-600">
                Total XP
              </p>

              <h2 className="text-4xl font-bold text-blue-900 mt-2">
                {myRank?.total_xp || 0}
              </h2>

            </div>

          </div>

          {/* LEADERBOARD TABLE */}
          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-blue-100">

              <h2 className="text-xl font-bold text-blue-900">
                Top Learners
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-blue-50">

                  <tr>

                    <th className="text-left p-4">
                      Rank
                    </th>

                    <th className="text-left p-4">
                      Learner
                    </th>

                    <th className="text-left p-4">
                      XP
                    </th>

                    <th className="text-left p-4">
                      Level
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {leaderboard.map(
                    (user) => (
                      <tr
                        key={user.user_id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >

                        <td className="p-4 font-bold">

                          {user.rank === 1
                            ? "🥇"
                            : user.rank === 2
                            ? "🥈"
                            : user.rank === 3
                            ? "🥉"
                            : `#${user.rank}`}

                        </td>

                        <td className="p-4">
                          {user.full_name}
                        </td>

                        <td className="p-4 font-semibold text-orange-500">
                          {user.total_xp}
                        </td>

                        <td className="p-4">
                          Level {user.level}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}