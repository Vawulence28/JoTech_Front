"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function DashboardPage() {
  // ===================================
  // STATES
  // ===================================

  const [loadingTelegram, setLoadingTelegram] = useState(false);

  const [analytics, setAnalytics] = useState(null);

  const [todayLesson, setTodayLesson] = useState(null);

  const [recoveryPlan, setRecoveryPlan] = useState(null);

  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const [lessonLoading, setLessonLoading] = useState(true);

  const [recoveryLoading, setRecoveryLoading] = useState(true);

  const [completingLesson, setCompletingLesson] =
    useState(false);

  const [lessonCompleted, setLessonCompleted] =
    useState(false);

  const [creatingRecovery, setCreatingRecovery] =
    useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // ===================================
  // REUSABLE COMPONENTS
  // ===================================

  const Card = ({ children }) => (
    <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6">
      {children}
    </div>
  );

  const SectionTitle = ({ children }) => (
    <h2 className="text-2xl font-bold text-blue-900 mb-5">
      {children}
    </h2>
  );

  // ===================================
  // ANALYTICS
  // ===================================

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(
        "https://jo-tech-b7lk.onrender.com/api/analytics/overview",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalytics(
        res.data?.stats ||
          res.data?.data ||
          res.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // ===================================
  // TODAY LESSON
  // ===================================

  const fetchTodayLesson = async () => {
    try {
      setLessonLoading(true);

      const res = await axios.get(
        "https://jo-tech-b7lk.onrender.com/api/learning/today",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data?.success) {
        setTodayLesson(null);
        return;
      }

      setTodayLesson(res.data.data);
    } catch (error) {
      console.error(error);
      setTodayLesson(null);
    } finally {
      setLessonLoading(false);
    }
  };

  // ===================================
  // RECOVERY PLAN
  // ===================================

  const fetchRecoveryPlan = async () => {
    try {
      const res = await axios.get(
        "https://jo-tech-b7lk.onrender.com/api/recovery/current",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecoveryPlan(
        res.data?.recoveryPlan || null
      );
    } catch (error) {
      console.error(error);
    } finally {
      setRecoveryLoading(false);
    }
  };

  // ===================================
  // GENERATE RECOVERY
  // ===================================

  const generateRecoveryPlan = async () => {
    try {
      setCreatingRecovery(true);

      const res = await axios.post(
        "https://jo-tech-b7lk.onrender.com/api/recovery/generate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecoveryPlan(
        res.data?.data || null
      );
    } catch (error) {
      console.error(error);
    } finally {
      setCreatingRecovery(false);
    }
  };

  // ===================================
  // TELEGRAM
  // ===================================

  const connectTelegram = async () => {
    try {
      setLoadingTelegram(true);

      const res = await axios.get(
        "https://jo-tech-b7lk.onrender.com/api/telegram/generate-link",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.url) {
        window.open(
          res.data.url,
          "_blank"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTelegram(false);
    }
  };

  // ===================================
  // COMPLETE TODAY LESSON
  // ===================================

  const completeLesson = async () => {
    try {
      setCompletingLesson(true);

      await axios.post(
        "https://jo-tech-b7lk.onrender.com/api/learning/complete-today",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLessonCompleted(true);

      await fetchAnalytics();

      await fetchTodayLesson();

    } catch (error) {
      console.error(error);
    } finally {
      setCompletingLesson(false);
    }
  };

  // ===================================
  // CHECK IF TODAY ALREADY COMPLETED
  // ===================================

  const fetchCompletionStatus =
    async () => {
      try {
        const res =
          await axios.get(
            "https://jo-tech-b7lk.onrender.com/api/learning/completion-status",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setLessonCompleted(
          res.data?.completed || false
        );
      } catch (error) {
        console.error(error);
      }
    };

  // ===================================
  // INITIAL LOAD
  // ===================================

  useEffect(() => {
    if (!token) return;

    fetchAnalytics();

    fetchTodayLesson();

    fetchRecoveryPlan();

    fetchCompletionStatus();

  }, [token]);

  // ===================================
  // UI
  // ===================================

    return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">

        {/* HERO */}
        <div className="bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row justify-between gap-5">

            <div>
              <h1 className="text-4xl font-bold">
                Welcome 👋
              </h1>

              <p className="mt-2 text-blue-100">
                Continue your learning journey today.
              </p>
            </div>

            <div className="flex gap-3">

              <Link
                href="/onboarding"
                className="bg-orange-500 px-5 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
              >
                New Roadmap
              </Link>

              <button
                onClick={connectTelegram}
                className="border border-white/30 px-5 py-3 rounded-xl hover:bg-white/10 transition"
              >
                {loadingTelegram
                  ? "Connecting..."
                  : "Telegram"}
              </button>

            </div>

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

          {/* ==========================================
              ANALYTICS
          ========================================== */}

          <section>

            <SectionTitle>
              Analytics
            </SectionTitle>

            {analyticsLoading ? (

              <Card>
                Loading analytics...
              </Card>

            ) : (

              <div className="grid md:grid-cols-3 gap-5">

                <Card>

                  <p className="text-gray-500">
                    Total XP
                  </p>

                  <h3 className="text-3xl font-bold text-blue-900 mt-2">
                    {analytics?.totalXP ||
                      analytics?.total_xp ||
                      analytics?.totalXp ||
                      0}
                  </h3>

                </Card>

                <Card>

                  <p className="text-gray-500">
                    Current Streak
                  </p>

                  <h3 className="text-3xl font-bold text-orange-500 mt-2">
                    🔥 {analytics?.currentStreak || 0}
                  </h3>

                </Card>

                <Card>

                  <p className="text-gray-500">
                    Completed Lessons
                  </p>

                  <h3 className="text-3xl font-bold text-blue-900 mt-2">
                    {analytics?.completedTasks || 0}
                  </h3>

                </Card>

              </div>

            )}

          </section>

          {/* ==========================================
              TODAY LESSON
          ========================================== */}

          <section>

            <SectionTitle>
              Today's Lesson
            </SectionTitle>

            {lessonLoading ? (

              <Card>
                Loading today's lesson...
              </Card>

            ) : !todayLesson ? (

              <Card>

                <p className="text-gray-500">
                  No active roadmap found.
                </p>

              </Card>

            ) : (

              <Card>

                <h3 className="text-3xl font-bold text-blue-900">
                  {todayLesson.goal}
                </h3>

                <div className="mt-3 flex flex-wrap gap-3">

                  <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                    Week {todayLesson.currentWeekNumber}
                  </span>

                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                    Day {todayLesson.lesson?.day_number}
                  </span>

                </div>

                <div className="mt-6">

                  <h4 className="font-semibold text-blue-900">
                    Weekly Focus
                  </h4>

                  <p className="mt-2 text-gray-700">
                    {todayLesson.weeklyFocus}
                  </p>

                </div>

                <div className="mt-6">

                  <h4 className="font-semibold text-blue-900">
                    Weekly Topic
                  </h4>

                  <p className="mt-2 text-gray-700">
                    {todayLesson.weeklyTopic}
                  </p>

                </div>

                <div className="mt-6">

                  <h4 className="font-semibold text-blue-900">
                    Today's Topic
                  </h4>

                  <p className="mt-2 text-lg font-medium">
                    {todayLesson.lesson?.topic}
                  </p>

                </div>

                <div className="mt-6">

                  <h4 className="font-semibold text-blue-900">
                    Tasks
                  </h4>

                  <ul className="list-disc ml-6 mt-3 space-y-2">

                    {(todayLesson.lesson?.tasks || []).map(
                      (task, index) => (
                        <li key={index}>
                          {task}
                        </li>
                      )
                    )}

                  </ul>

                </div>

                {todayLesson.lesson?.learning_link && (

                  <a
                    href={todayLesson.lesson.learning_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mt-8 text-orange-600 font-semibold hover:text-orange-700"
                  >
                    ▶ Open Learning Resource
                  </a>

                )}

                <div className="mt-8">

                  <button
                    onClick={completeLesson}
                    disabled={
                      completingLesson ||
                      lessonCompleted
                    }
                    className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition disabled:opacity-60"
                  >
                    {lessonCompleted
                      ? "Completed ✓"
                      : completingLesson
                      ? "Completing..."
                      : "Mark as Completed"}
                  </button>

                </div>

              </Card>

            )}

          </section>

          {/* ==========================================
              RECOVERY PLAN
          ========================================== */}

          <section>

            <SectionTitle>
              Recovery Plan
            </SectionTitle>

            {recoveryLoading ? (

              <Card>
                Checking recovery status...
              </Card>

            ) : recoveryPlan ? (

              <Card>

                <h3 className="text-xl font-bold text-orange-600">
                  Recovery Plan Available
                </h3>

                <p className="mt-3 text-gray-700">
                  You currently have an active recovery plan.
                  Continue learning to regain your momentum.
                </p>

                <Link
                  href="/recovery"
                  className="inline-block mt-6 bg-orange-500 text-white px-5 py-3 rounded-xl hover:bg-orange-600 transition"
                >
                  View Recovery Plan
                </Link>

              </Card>

            ) : (

              <Card>

                <p className="text-gray-700 mb-5">
                  No recovery plan is currently active.
                </p>

                <button
                  onClick={generateRecoveryPlan}
                  disabled={creatingRecovery}
                  className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition disabled:opacity-60"
                >
                  {creatingRecovery
                    ? "Generating..."
                    : "Generate Recovery Plan"}
                </button>

              </Card>

            )}

          </section>

        </div>

      </div>
    </ProtectedRoute>
  );
}