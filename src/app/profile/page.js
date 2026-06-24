"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    if (!token) return;
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://jo-tech-b7lk.onrender.com/api/profile/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.profile);
      setAnalytics(res.data.analytics || {});
    } catch (error) {
      console.error("Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ children }) => (
    <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6 hover:border-orange-200 transition">
      {children}
    </div>
  );

  const SectionTitle = ({ children }) => (
    <h2 className="text-2xl font-bold text-blue-900 mb-5">
      {children}
    </h2>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-blue-900">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900">
            Profile Not Found
          </h1>

          <p className="text-blue-600 mt-3">
            Unable to load profile information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-blue-950">

      {/* HERO */}
      <div className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <h1 className="text-4xl font-bold">
                {profile.full_name}
              </h1>

              <p className="text-orange-300 mt-2 font-medium">
                {profile.career_goal || "Learning Journey"}
              </p>

              <p className="text-blue-100 mt-2">
                Skill Level: {profile.skill_level || "Beginner"}
              </p>

            </div>

            <div className="bg-white/10 px-6 py-4 rounded-2xl">

              <p className="text-sm text-blue-100">
                Telegram Status
              </p>

              <p className="font-semibold mt-1">
                {profile.telegram_linked
                  ? "✅ Connected"
                  : "⚠️ Not Connected"}
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* STATS */}
        <div>

          <SectionTitle>Learning Statistics</SectionTitle>

          <div className="grid md:grid-cols-4 gap-5">

            <Card>
              <p className="text-blue-500">
                Total XP
              </p>

              <h3 className="text-3xl font-bold text-orange-500 mt-2">
                {analytics?.total_xp || 0}
              </h3>
            </Card>

            <Card>
              <p className="text-blue-500">
                Current Streak
              </p>

              <h3 className="text-3xl font-bold text-orange-500 mt-2">
                🔥 {analytics?.current_streak || 0}
              </h3>
            </Card>

            <Card>
              <p className="text-blue-500">
                Badges
              </p>

              <h3 className="text-3xl font-bold text-orange-500 mt-2">
                🏆 {analytics?.badges || 0}
              </h3>
            </Card>

            <Card>
              <p className="text-blue-500">
                Level
              </p>

              <h3 className="text-3xl font-bold text-orange-500 mt-2">
                {analytics?.level || 1}
              </h3>
            </Card>

          </div>

        </div>

        {/* ACTIVE ROADMAP */}
        <div>

          <SectionTitle>Active Roadmap</SectionTitle>

          {profile.roadmap ? (
            <Card>

              <h3 className="text-xl font-bold text-blue-900">
                {profile.roadmap.roadmap_json.goal}
              </h3>

              <p className="text-blue-600 mt-3">
                Duration:{" "}
                {profile.roadmap.roadmap_json.weeks?.length || 0} Weeks
              </p>

              <Link
                href="/roadmap"
                className="inline-block mt-5 px-5 py-3 bg-blue-900 text-white rounded-xl hover:bg-orange-500 transition"
              >
                View Roadmap
              </Link>

            </Card>
          ) : (
            <Card>
              <p className="text-blue-600">
                No active roadmap available.
              </p>

              <Link
                href="/onboarding"
                className="inline-block mt-4 px-5 py-3 bg-orange-500 text-white rounded-xl"
              >
                Create Roadmap
              </Link>
            </Card>
          )}

        </div>

        {/* CERTIFICATES */}
        <div>

          <SectionTitle>Certificates</SectionTitle>

          {profile.certificates?.length ? (
            <div className="grid md:grid-cols-2 gap-5">

              {profile.certificates.map((certificate) => (
                <Link
                  key={certificate.id}
                  href={`/certificate/${certificate.id}`}
                >
                  <Card>

                    <h3 className="font-bold text-blue-900">
                      {certificate.achievement_text}
                    </h3>

                    <p className="text-blue-600 mt-3 text-sm">
                      Issued:{" "}
                      {new Date(
                        certificate.issued_at
                      ).toDateString()}
                    </p>

                  </Card>
                </Link>
              ))}

            </div>
          ) : (
            <Card>
              <p className="text-blue-600">
                No certificates earned yet.
              </p>
            </Card>
          )}

        </div>

        {/* RECOVERY */}
        <div>

          <SectionTitle>Recovery Status</SectionTitle>

          {profile.recovery ? (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">

              <h3 className="font-bold text-orange-600">
                Active Recovery Plan
              </h3>

              <p className="text-blue-700 mt-3">
                Missed Days: {profile.recovery.missed_days}
              </p>

              <Link
                href="/dashboard"
                className="inline-block mt-5 px-5 py-3 bg-orange-500 text-white rounded-xl hover:bg-blue-900 transition"
              >
                View Recovery Plan
              </Link>

            </div>
          ) : (
            <Card>
              <p className="text-blue-600">
                No active recovery plan.
              </p>
            </Card>
          )}

        </div>

        {/* NOTIFICATIONS */}
        <div>

          <SectionTitle>Notifications & Integrations</SectionTitle>

          <Card>

            <div className="flex items-center justify-between flex-wrap gap-4">

              <div>

                <p className="font-semibold text-blue-900">
                  Telegram Notifications
                </p>

                <p className="text-blue-600 mt-1">
                  {profile.telegram_linked
                    ? "Connected and receiving reminders"
                    : "Not connected"}
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  profile.telegram_linked
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {profile.telegram_linked
                  ? "Connected"
                  : "Not Connected"}
              </span>

            </div>

            <Link
              href="/dashboard"
              className="inline-block mt-5 px-5 py-3 border border-blue-900 text-blue-900 rounded-xl hover:bg-blue-900 hover:text-white transition"
            >
              Manage Settings
            </Link>

          </Card>

        </div>

      </div>
    </div>
  );
}