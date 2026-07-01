"use client";

import { useEffect, useState } from "react";
import { getAnalytics } from "@/services/adminApi";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const response = await getAnalytics();

      setAnalytics(response.data);
    } catch (error) {
      console.error("Analytics error", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-8">
        <p className="text-red-500">
          Unable to load analytics.
        </p>
      </div>
    );
  }

  const dashboard = analytics.dashboard ?? {};

  const users = dashboard.users ?? {};

  const telegram = dashboard.telegram ?? {};

  const lessons = dashboard.lessons ?? {};

  const certificates = dashboard.certificates ?? {};

  const roadmaps = dashboard.roadmaps ?? {};

  const activeLearners = dashboard.activeLearners ?? {};

  const dropOff = dashboard.dropOff ?? {};

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-black text-blue-900">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Platform analytics overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="Total Users"
          value={users.totalUsers ?? 0}
        />

        <Card
          title="New Today"
          value={users.newToday ?? 0}
        />

        <Card
          title="New This Week"
          value={users.newThisWeek ?? 0}
        />

        <Card
          title="New This Month"
          value={users.newThisMonth ?? 0}
        />

        <Card
          title="Telegram Linked"
          value={telegram.linkedUsers ?? 0}
        />

        <Card
          title="Telegram Unlinked"
          value={telegram.unlinkedUsers ?? 0}
        />

        <Card
          title="Completed Lessons"
          value={lessons.completedLessons ?? 0}
        />

        <Card
          title="Certificates Issued"
          value={certificates.certificatesIssued ?? 0}
        />

        <Card
          title="Total Roadmaps"
          value={roadmaps.totalRoadmaps ?? 0}
        />

        <Card
          title="Active Roadmaps"
          value={roadmaps.activeRoadmaps ?? 0}
        />

        <Card
          title="Completed Roadmaps"
          value={roadmaps.completedRoadmaps ?? 0}
        />

        <Card
          title="Active Learners Today"
          value={activeLearners.activeToday ?? 0}
        />

        <Card
          title="Inactive Users"
          value={dropOff.inactiveUsers ?? 0}
        />

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow border border-gray-200">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-black text-blue-900">
        {value}
      </h2>

    </div>
  );
}