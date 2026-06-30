"use client";

import { useEffect, useState } from "react";
import adminApi from "@/services/adminApi";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getAnalytics();
      setData(res.data);
    } catch (err) {
      console.error("Analytics error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading analytics...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-900">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Card title="Total Users" value={data.totalUsers} />
        <Card title="New Today" value={data.newToday} />
        <Card title="New Week" value={data.newThisWeek} />
        <Card title="New Month" value={data.newThisMonth} />

        <Card title="Active Learners" value={data.activeLearners} />
        <Card title="Certificates" value={data.certificates} />
        <Card title="Lessons" value={data.totalLessons} />
        <Card title="XP Earned" value={data.totalXP} />

        <Card title="Badges" value={data.badges} />
        <Card title="Telegram Users" value={data.telegramUsers} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold text-blue-900">{value}</p>
    </div>
  );
}