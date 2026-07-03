"use client";

import { useCallback, useEffect, useState } from "react";

import MetricCard from "@/components/admin/MetricCard";
import LoadingCard from "@/components/admin/LoadingCard";

import {
  getDashboardMetrics,
  getAnalytics,
  getLeaderboard,
} from "@/services/adminApi";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);

    try {
      const [
        dashboardResult,
        analyticsResult,
        leaderboardResult,
      ] = await Promise.all([
        getDashboardMetrics(),
        getAnalytics(),
        getLeaderboard(),
      ]);

      setDashboard(dashboardResult?.data || {});
      setAnalytics(analyticsResult?.data || {});

      setLeaderboard(
        leaderboardResult?.data?.streakLeaderboard ||
          leaderboardResult?.data ||
          []
      );
    } catch (error) {
      console.error(
        "Failed to load admin dashboard:",
        error
      );

      setDashboard({});
      setAnalytics({});
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const metrics = [
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: "👥",
    },
    {
      title: "Active Learners",
      value: dashboard.activeLearners,
      icon: "🎓",
    },
    {
      title: "Completed Roadmaps",
      value: dashboard.completedRoadmaps,
      icon: "🗺️",
    },
    {
      title: "Active Roadmaps",
      value: dashboard.activeRoadmaps,
      icon: "📚",
    },
    {
      title: "Lessons Completed",
      value: dashboard.totalLessons,
      icon: "✅",
    },
    {
      title: "Certificates",
      value: dashboard.certificates,
      icon: "🏆",
    },
    {
      title: "XP Earned",
      value: dashboard.totalXP,
      icon: "⭐",
    },
    {
      title: "Badges Awarded",
      value: dashboard.badges,
      icon: "🥇",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}

      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor learners, engagement,
          platform performance and overall
          analytics.
        </p>
      </section>

      {/* Metrics */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map(
              (_, index) => (
                <LoadingCard key={index} />
              )
            )
          : metrics.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value ?? 0}
                icon={metric.icon}
              />
            ))}
      </section>

      {/* Analytics */}

      <section className="grid gap-6 lg:grid-cols-2">
        {/* User Growth */}

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-6 text-xl font-semibold">
            User Growth
          </h2>

          {loading ? (
            <LoadingCard />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Today</span>

                <strong>
                  {analytics?.growth
                    ?.newUsersToday ??
                    analytics?.userGrowth
                      ?.newToday ??
                    0}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>This Week</span>

                <strong>
                  {analytics?.growth
                    ?.newUsersWeek ??
                    analytics?.userGrowth
                      ?.newThisWeek ??
                    0}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>This Month</span>

                <strong>
                  {analytics?.growth
                    ?.newUsersMonth ??
                    analytics?.userGrowth
                      ?.newThisMonth ??
                    0}
                </strong>
              </div>

              <div className="flex justify-between border-t pt-4 font-semibold">
                <span>Total Users</span>

                <span>
                  {dashboard.totalUsers ?? 0}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Telegram */}

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-6 text-xl font-semibold">
            Telegram Statistics
          </h2>

          {loading ? (
            <LoadingCard />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Linked Users</span>

                <strong>
                  {analytics?.telegram
                    ?.telegramLinked ??
                    analytics?.telegram
                      ?.linkedUsers ??
                    0}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Unlinked Users</span>

                <strong>
                  {analytics?.telegram
                    ?.unlinkedUsers ??
                    (
                      analytics?.telegram
                        ?.totalUsers ?? 0
                    ) -
                      (
                        analytics?.telegram
                          ?.telegramLinked ??
                        analytics
                          ?.telegram
                          ?.linkedUsers ??
                        0
                      )}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Total Users</span>

                <strong>
                  {analytics?.telegram
                    ?.totalUsers ??
                    dashboard.totalUsers ??
                    0}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Linked Percentage</span>

                <strong>
                  {analytics?.telegram
                    ?.percentage ?? 0}
                  %
                </strong>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Leaderboard */}

      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold">
          Streak Leaderboard
        </h2>

        {loading ? (
          <LoadingCard />
        ) : leaderboard.length === 0 ? (
          <div className="py-8 text-center text-slate-500">
            No leaderboard data available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">
                    Rank
                  </th>

                  <th className="py-3">
                    Learner
                  </th>

                  <th className="py-3">
                    Current Streak
                  </th>

                  <th className="py-3">
                    Completed Lessons
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map(
                  (item, index) => (
                    <tr
                      key={
                        item.user_id ||
                        item.learn_users
                          ?.id ||
                        index
                      }
                      className="border-b transition hover:bg-slate-50"
                    >
                      <td className="py-3">
                        #{index + 1}
                      </td>

                      <td className="py-3">
                        {item.full_name ||
                          item.learn_users
                            ?.full_name ||
                          "Unknown User"}
                      </td>

                      <td className="py-3">
                        🔥{" "}
                        {item.current_streak ??
                          0}
                      </td>

                      <td className="py-3">
                        {item.total_completed_lessons ??
                          item.completed_lessons ??
                          item.totalLessons ??
                          0}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}