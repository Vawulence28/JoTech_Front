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

  const growth = analytics.growth ?? {};

  const telegram = analytics.telegram ?? {};

  const learning = analytics.learning ?? {};

  const dropOff = analytics.dropOff ?? {};

  const courses = analytics.courses ?? {};

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
          value={growth.totalUsers ?? 0}
        />

        <Card
          title="New Today"
          value={growth.newToday ?? 0}
        />

        <Card
          title="New This Week"
          value={growth.newThisWeek ?? 0}
        />

        <Card
          title="New This Month"
          value={growth.newThisMonth ?? 0}
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
          value={learning.completedLessons ?? 0}
        />

        <Card
          title="Certificates Issued"
          value={learning.certificates ?? 0}
        />

        <Card
          title="Total Roadmaps"
          value={courses.totalCourses ?? 0}
        />

        <Card
          title="Active Roadmaps"
          value={learning.activeRoadmaps ?? 0}
        />

        <Card
          title="Completed Roadmaps"
          value={learning.completedRoadmaps ?? 0}
        />

        <Card
          title="Active Learners Today"
          value={learning.activeLearners ?? 0}
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