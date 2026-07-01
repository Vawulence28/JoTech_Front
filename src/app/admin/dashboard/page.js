"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import MetricCard from "@/components/admin/MetricCard";
import LoadingCard from "@/components/admin/LoadingCard";
import adminApi from "@/services/adminApi";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================
  // LOAD ADMIN DATA
  // =====================================

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [
        dashboardRes,
        analyticsRes,
        leaderboardRes
      ] = await Promise.all([
        adminApi.getDashboard(),
        adminApi.getAnalytics(),
        adminApi.getLeaderboard()
      ]);

      setDashboard(dashboardRes.data);
      setAnalytics(analyticsRes.data);
      setLeaderboard(
        leaderboardRes.data || []
      );
    } catch (error) {
      console.error(
        "Admin Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-100">

        {/* SIDEBAR */}

        <Sidebar />

        {/* CONTENT */}

        <main className="flex-1">

          <Header />

          <div className="p-8">

            {/* TITLE */}

            <div className="mb-8">

              <h1 className="text-3xl font-bold text-slate-900">
                Admin Dashboard
              </h1>

              <p className="mt-2 text-slate-500">
                Monitor learners, engagement,
                analytics and platform health.
              </p>

            </div>

            {/* METRICS */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

              {loading ? (
                <>
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                  <LoadingCard />
                </>
              ) : (
                <>
                  <MetricCard
                    title="Total Users"
                    value={dashboard?.totalUsers || 0}
                    icon="👥"
                  />

                  <MetricCard
                    title="Active Learners"
                    value={dashboard?.activeLearners || 0}
                    icon="🎓"
                  />

                  <MetricCard
                    title="Completed Roadmaps"
                    value={dashboard?.completedRoadmaps || 0}
                    icon="🗺️"
                  />

                  <MetricCard
                    title="Active Roadmaps"
                    value={dashboard?.activeRoadmaps || 0}
                    icon="📚"
                  />

                  <MetricCard
                    title="Lessons Completed"
                    value={dashboard?.totalLessons || 0}
                    icon="✅"
                  />

                  <MetricCard
                    title="Certificates"
                    value={dashboard?.certificates || 0}
                    icon="🏆"
                  />

                  <MetricCard
                    title="XP Earned"
                    value={dashboard?.totalXP || 0}
                    icon="⭐"
                  />

                  <MetricCard
                    title="Badges Awarded"
                    value={dashboard?.badges || 0}
                    icon="🥇"
                  />
                </>
              )}

            </div>

            {/* SECOND ROW */}

            <div className="grid gap-6 mt-8 lg:grid-cols-2">

              {/* USER GROWTH */}

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-5">
                  User Growth
                </h2>

                {loading ? (
                  <LoadingCard />
                ) : (
                  <div className="space-y-4">

                    <div className="flex justify-between">
                      <span>Today</span>
                      <strong>
                        {analytics?.userGrowth?.newToday || 0}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span>This Week</span>
                      <strong>
                        {analytics?.userGrowth?.newThisWeek || 0}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span>This Month</span>
                      <strong>
                        {analytics?.userGrowth?.newThisMonth || 0}
                      </strong>
                    </div>

                    <div className="flex justify-between border-t pt-4">
                      <span>Total Users</span>
                      <strong>
                        {analytics?.userGrowth?.totalUsers || 0}
                      </strong>
                    </div>

                  </div>
                )}

              </div>

              {/* TELEGRAM */}

              <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-5">
                  Telegram Statistics
                </h2>

                {loading ? (
                  <LoadingCard />
                ) : (
                  <div className="space-y-4">

                    <div className="flex justify-between">
                      <span>Linked Users</span>
                      <strong>
                        {analytics?.telegram?.linkedUsers || 0}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Unlinked Users</span>
                      <strong>
                        {analytics?.telegram?.unlinkedUsers || 0}
                      </strong>
                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* LEADERBOARD */}

            <div className="bg-white rounded-xl shadow mt-8 p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-semibold">
                  Streak Leaderboard
                </h2>

              </div>

              {loading ? (
                <LoadingCard />
              ) : leaderboard.length === 0 ? (
                <p className="text-slate-500">
                  No leaderboard data available.
                </p>
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>

                      <tr className="border-b">

                        <th className="text-left py-3">
                          Rank
                        </th>

                        <th className="text-left py-3">
                          Learner
                        </th>

                        <th className="text-left py-3">
                          Streak
                        </th>

                        <th className="text-left py-3">
                          XP
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {leaderboard.map(
                        (user, index) => (

                          <tr
                            key={user.user_id}
                            className="border-b hover:bg-slate-50"
                          >

                            <td className="py-3">
                              #{index + 1}
                            </td>

                            <td className="py-3">
                              {user.full_name}
                            </td>

                            <td className="py-3">
                              🔥 {user.current_streak}
                            </td>

                            <td className="py-3">
                              ⭐ {user.total_xp}
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>
              )}

            </div>

          </div>

        </main>

      </div>
    </AdminGuard>
  );
}