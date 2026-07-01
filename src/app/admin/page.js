"use client";

import { useEffect, useState } from "react";

import MetricCard from "@/components/admin/MetricCard";
import LoadingCard from "@/components/admin/LoadingCard";

import {
  getDashboardMetrics,
  getAnalytics,
  getLeaderboard,
} from "@/services/adminApi";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [
        dashboardResponse,
        analyticsResponse,
        leaderboardResponse,
      ] = await Promise.all([
        getDashboardMetrics(),
        getAnalytics(),
        getLeaderboard(),
      ]);

      setDashboard(dashboardResponse.data);
      setAnalytics(analyticsResponse.data);

      setLeaderboard(
        leaderboardResponse.data?.streakLeaderboard || []
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
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor learners, engagement,
          analytics and platform health.
        </p>
      </div>

      {/* Metrics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </>
        ) : (
          <>
            <MetricCard
              title="Total Users"
              value={dashboard?.totalUsers ?? 0}
              icon="👥"
            />

            <MetricCard
              title="Active Learners"
              value={dashboard?.activeLearners ?? 0}
              icon="🎓"
            />

            <MetricCard
              title="Completed Roadmaps"
              value={dashboard?.completedRoadmaps ?? 0}
              icon="🗺️"
            />

            <MetricCard
              title="Active Roadmaps"
              value={dashboard?.activeRoadmaps ?? 0}
              icon="📚"
            />

            <MetricCard
              title="Lessons Completed"
              value={dashboard?.totalLessons ?? 0}
              icon="✅"
            />

            <MetricCard
              title="Certificates"
              value={dashboard?.certificates ?? 0}
              icon="🏆"
            />

            <MetricCard
              title="XP Earned"
              value={dashboard?.totalXP ?? 0}
              icon="⭐"
            />

            <MetricCard
              title="Badges Awarded"
              value={dashboard?.badges ?? 0}
              icon="🥇"
            />
          </>
        )}
      </div>

      {/* Analytics */}

      <div className="grid gap-6 mt-8 lg:grid-cols-2">
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
                  {analytics?.growth?.newUsersToday ?? 0}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>This Week</span>
                <strong>
                  {analytics?.growth?.newUsersWeek ?? 0}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>This Month</span>
                <strong>
                  {analytics?.growth?.newUsersMonth ?? 0}
                </strong>
              </div>

              <div className="flex justify-between border-t pt-4">
                <span>Total Users</span>
                <strong>
                  {dashboard?.totalUsers ?? 0}
                </strong>
              </div>
            </div>
          )}
        </div>

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
                  {analytics?.telegram?.telegramLinked ?? 0}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Total Users</span>
                <strong>
                  {analytics?.telegram?.totalUsers ?? 0}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Linked %</span>
                <strong>
                  {analytics?.telegram?.percentage ?? 0}%
                </strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard */}

      <div className="bg-white rounded-xl shadow mt-8 p-6">
        <h2 className="text-xl font-semibold mb-6">
          Streak Leaderboard
        </h2>

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
                    Current Streak
                  </th>
                  <th className="text-left py-3">
                    Completed Lessons
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map(
                  (item, index) => (
                    <tr
                      key={
                        item.learn_users?.id ??
                        index
                      }
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="py-3">
                        #{index + 1}
                      </td>

                      <td className="py-3">
                        {item.learn_users
                          ?.full_name ??
                          "Unknown User"}
                      </td>

                      <td className="py-3">
                        🔥 {item.current_streak}
                      </td>

                      <td className="py-3">
                        {
                          item.total_completed_lessons
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}