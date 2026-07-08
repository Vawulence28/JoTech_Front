"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API =
  "https://jo-tech-b7lk.onrender.com/api";

export default function ProfilePage() {

  // =====================================
  // STATE
  // =====================================

  const [profile, setProfile] =
    useState(null);

  const [user, setUser] =
    useState(null);

  const [analytics, setAnalytics] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [deleting, setDeleting] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deletePassword, setDeletePassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // =====================================
  // LOAD PROFILE
  // =====================================

  useEffect(() => {

    if (!token) {
      setLoading(false);
      return;
    }

    fetchProfile();

  }, []);

  // =====================================
  // FETCH PROFILE
  // =====================================

  const fetchProfile = async () => {

    try {

      const res =
        await axios.get(
          `${API}/profile/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setProfile(
        res.data.profile
      );

      setUser(
        res.data.user
      );

      setAnalytics(
        res.data.analytics || {}
      );

    } catch (error) {

      console.error(
        "Profile Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  // =====================================
  // DELETE ACCOUNT
  // =====================================

  const deleteAccount =
    async () => {

      if (!deletePassword.trim()) {

        setDeleteError(
          "Please enter your password."
        );

        return;

      }

      try {

        setDeleting(true);

        setDeleteError("");

        await axios.delete(
          `${API}/auth/delete-account`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
            data: {
              password:
                deletePassword,
            },
          }
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        window.location.href = "/";

      } catch (error) {

        console.error(
          error
        );

        setDeleteError(

          error?.response?.data?.message ||

          "Unable to delete account."

        );

      } finally {

        setDeleting(false);

      }

    };

  // =====================================
  // REUSABLE COMPONENTS
  // =====================================

  const Card = ({
    children,
  }) => (

    <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6 hover:border-orange-200 transition">

      {children}

    </div>

  );

  const SectionTitle = ({
    children,
  }) => (

    <h2 className="text-2xl font-bold text-blue-900 mb-5">

      {children}

    </h2>

  );

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-white">

        <p className="text-lg text-blue-900">

          Loading profile...

        </p>

      </div>

    );

  }

  // =====================================
  // NO PROFILE
  // =====================================

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

    <>

      <div className="min-h-screen bg-white text-blue-950">

        {/* ===================================== */}
        {/* HERO */}
        {/* ===================================== */}

        <div className="bg-blue-900 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <h1 className="text-4xl font-bold">

                  {profile.full_name}

                </h1>

                <p className="mt-2 text-orange-300 font-medium">

                  {profile.career_goal ||
                    "Learning Journey"}

                </p>

                <p className="mt-2 text-blue-100">

                  Skill Level:{" "}

                  {profile.skill_level ||
                    "Beginner"}

                </p>

              </div>

              <div className="bg-white/10 rounded-2xl px-6 py-5">

                <p className="text-sm text-blue-100">

                  Telegram Status

                </p>

                <p className="mt-2 text-lg font-semibold">

                  {user?.telegram_linked
                    ? "✅ Connected"
                    : "⚠️ Not Connected"}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================== */}
        {/* CONTENT */}
        {/* ===================================== */}

        <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

          {/* ===================================== */}
          {/* LEARNING STATISTICS */}
          {/* ===================================== */}

          <section>

            <SectionTitle>

              Learning Statistics

            </SectionTitle>

            <div className="grid md:grid-cols-4 gap-5">

              <Card>

                <p className="text-blue-500">

                  Total XP

                </p>

                <h3 className="mt-2 text-3xl font-bold text-orange-500">

                  {analytics.totalXP ||

                    analytics.total_xp ||

                    analytics.totalXp ||

                    0}

                </h3>

              </Card>

              <Card>

                <p className="text-blue-500">

                  Current Streak

                </p>

                <h3 className="mt-2 text-3xl font-bold text-orange-500">

                  🔥 {analytics.currentStreak || 0}

                </h3>

              </Card>

              <Card>

                <p className="text-blue-500">

                  Badges

                </p>

                <h3 className="mt-2 text-3xl font-bold text-orange-500">

                  🏆 {analytics.badges || 0}

                </h3>

              </Card>

              <Card>

                <p className="text-blue-500">

                  Level

                </p>

                <h3 className="mt-2 text-3xl font-bold text-orange-500">

                  {analytics.level || 1}

                </h3>

              </Card>

            </div>

          </section>

          {/* ===================================== */}
          {/* ACTIVE ROADMAP */}
          {/* ===================================== */}

          <section>

            <SectionTitle>

              Active Roadmap

            </SectionTitle>

            {profile.roadmap ? (

              <Card>

                <h3 className="text-xl font-bold text-blue-900">

                  {profile.roadmap.roadmap_json.goal}

                </h3>

                <p className="mt-3 text-blue-600">

                  Duration:{" "}

                  {profile.roadmap.roadmap_json
                    .weeks?.length || 0}{" "}

                  Weeks

                </p>

                <Link
                  href="/roadmap"
                  className="inline-block mt-5 rounded-xl bg-blue-900 px-5 py-3 text-white transition hover:bg-orange-500"
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
                  className="inline-block mt-5 rounded-xl bg-orange-500 px-5 py-3 text-white"
                >

                  Create Roadmap

                </Link>

              </Card>

            )}

          </section>

          {/* ===================================== */}
          {/* CERTIFICATES */}
          {/* ===================================== */}

          <section>

            <SectionTitle>

              Certificates

            </SectionTitle>

            {profile.certificates?.length ? (

              <div className="grid md:grid-cols-2 gap-5">

                {profile.certificates.map(
                  (certificate) => (

                    <Link
                      key={certificate.id}
                      href={`/certificate/${certificate.id}`}
                    >

                      <Card>

                        <h3 className="font-bold text-blue-900">

                          {certificate.achievement_text}

                        </h3>

                        <p className="mt-3 text-sm text-blue-600">

                          Issued:{" "}

                          {new Date(
                            certificate.issued_at
                          ).toDateString()}

                        </p>

                      </Card>

                    </Link>

                  )
                )}

              </div>

            ) : (

              <Card>

                <p className="text-blue-600">

                  No certificates earned yet.

                </p>

              </Card>

            )}

          </section>

          {/* ===================================== */}
          {/* RECOVERY */}
          {/* ===================================== */}

          <section>

            <SectionTitle>

              Recovery Status

            </SectionTitle>

            {profile.recovery ? (

              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">

                <h3 className="font-bold text-orange-600">

                  Active Recovery Plan

                </h3>

                <p className="mt-3 text-blue-700">

                  Missed Days:{" "}

                  {profile.recovery.missed_days}

                </p>

                <Link
                  href="/dashboard"
                  className="inline-block mt-5 rounded-xl bg-orange-500 px-5 py-3 text-white transition hover:bg-blue-900"
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

          </section>

          {/* ===================================== */}
          {/* NOTIFICATIONS */}
          {/* ===================================== */}

          <section>

            <SectionTitle>

              Notifications & Integrations

            </SectionTitle>

            <Card>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <h3 className="text-lg font-semibold text-blue-900">

                    Telegram Notifications

                  </h3>

                  <p className="mt-2 text-blue-600">

                    {user?.telegram_linked
                      ? "Your Telegram account is connected and receiving learning reminders."
                      : "Your Telegram account has not been connected yet."}

                  </p>

                </div>

                <span
                  className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold ${
                    user?.telegram_linked
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >

                  {user?.telegram_linked
                    ? "Connected"
                    : "Not Connected"}

                </span>

              </div>

              <Link
                href="/dashboard"
                className="mt-6 inline-block rounded-xl border border-blue-900 px-5 py-3 font-semibold text-blue-900 transition hover:bg-blue-900 hover:text-white"
              >

                Manage Settings

              </Link>

            </Card>

          </section>

          {/* ===================================== */}
          {/* DANGER ZONE */}
          {/* ===================================== */}

          <section>

            <SectionTitle>

              Danger Zone

            </SectionTitle>

            <div className="overflow-hidden rounded-2xl border-2 border-red-200">

              <div className="bg-red-600 px-8 py-5">

                <h2 className="text-2xl font-bold text-white">

                  Delete Account

                </h2>

              </div>

              <div className="bg-red-50 p-8">

                <p className="leading-7 text-red-700">

                  Permanently deleting your account will erase all of your
                  learning information from the JoTech Learning Platform.

                </p>

                <ul className="mt-6 space-y-3 text-red-700">

                  <li>

                    • Your learning profile

                  </li>

                  <li>

                    • Personalized learning roadmap

                  </li>

                  <li>

                    • Lessons and progress history

                  </li>

                  <li>

                    • XP, streaks and badges

                  </li>

                  <li>

                    • Certificates

                  </li>

                  <li>

                    • Recovery plans

                  </li>

                  <li>

                    • Telegram integration

                  </li>

                  <li>

                    • Every other account record

                  </li>

                </ul>

                <div className="mt-8 rounded-xl border border-red-300 bg-white p-5">

                  <p className="font-semibold text-red-700">

                    ⚠️ This action cannot be undone.

                  </p>

                  <p className="mt-2 text-red-600">

                    You will be asked to enter your password before your
                    account is permanently deleted.

                  </p>

                </div>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={deleting}
                  className="mt-8 rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {deleting
                    ? "Deleting Account..."
                    : "Delete My Account"}

                </button>

              </div>

            </div>

          </section>

        </div>

      </div>

      {/* ===================================== */}
      {/* DELETE ACCOUNT MODAL */}
      {/* ===================================== */}

      {showDeleteModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            <div className="border-b border-gray-200 px-6 py-5">

              <h2 className="text-2xl font-bold text-red-600">

                Confirm Account Deletion

              </h2>

            </div>

            <div className="p-6">

              <p className="leading-7 text-gray-700">

                To permanently delete your account, please enter your password.

              </p>

              <p className="mt-3 text-sm text-red-600 font-medium">

                This action cannot be undone.

              </p>

              <div className="mt-6">

                <label className="mb-2 block font-semibold text-blue-900">

                  Password

                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={deletePassword}
                    onChange={(e) =>
                      setDeletePassword(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 p-3 pr-14 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-700"
                  >

                    {showPassword
                      ? "Hide"
                      : "Show"}

                  </button>

                </div>

              </div>

              <div className="mt-8 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => {

                    setShowDeleteModal(false);

                    setDeletePassword("");

                  }}
                  disabled={deleting}
                  className="rounded-xl border border-gray-300 px-5 py-3 font-semibold"
                >

                  Cancel

                </button>

                <button
                  type="button"
                  onClick={deleteAccount}
                  disabled={
                    deleting ||
                    !deletePassword.trim()
                  }
                  className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {deleting
                    ? "Deleting..."
                    : "Delete Forever"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </>

  );

}