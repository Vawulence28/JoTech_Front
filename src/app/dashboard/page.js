"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function DashboardPage() {
  const [loadingTelegram, setLoadingTelegram] = useState(false);

  const [analytics, setAnalytics] = useState(null);
  const [todayLesson, setTodayLesson] = useState(null);
  const [recoveryPlan, setRecoveryPlan] = useState(null);

  const [analyticsLoading, setAnalyticsLoading] =
    useState(true);

  const [lessonLoading, setLessonLoading] =
    useState(true);

  const [recoveryLoading, setRecoveryLoading] =
    useState(true);

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
  // HELPERS
  // ===================================

  const todayName = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
    }
  );

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
  // ACTIVE ROADMAP
  // ===================================

  const fetchTodayLesson = async () => {
    try {
      setLessonLoading(true);

      const res = await axios.get(
        "https://jo-tech-b7lk.onrender.com/api/learning/roadmap",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const roadmap =
        res.data?.data?.roadmap_json;

      if (!roadmap?.weeks?.length) {
        setTodayLesson(null);
        return;
      }

      const allLessons = [];

      roadmap.weeks.forEach((week) => {
        week.days?.forEach((day) => {
          allLessons.push({
            weekNumber: week.week,
            weekFocus: week.focus,
            weekTopic: week.topic,
            ...day,
          });
        });
      });

      if (!allLessons.length) {
        setTodayLesson(null);
        return;
      }

      let lesson = allLessons.find(
        (item) =>
          item.day?.toLowerCase() ===
          todayName.toLowerCase()
      );

      if (!lesson) {
        lesson = allLessons[0];
      }

      setTodayLesson({
        goal: roadmap.goal,
        weekNumber: lesson.weekNumber,
        weekFocus: lesson.weekFocus,
        weekTopic: lesson.weekTopic,
        day: lesson.day,
        topic: lesson.topic,
        tasks: lesson.tasks || [],
        learningLink:
          lesson.learning_link || "",
      });
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
  // COMPLETE LESSON
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

      fetchAnalytics();
    } catch (error) {
      console.error(error);
    } finally {
      setCompletingLesson(false);
    }
  };

  // ===================================
  // LOAD
  // ===================================

  useEffect(() => {
    if (!token) return;

    fetchAnalytics();
    fetchTodayLesson();
    fetchRecoveryPlan();
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
                To your learning journey
              </p>
            </div>

            <div className="flex gap-3">

              <Link
                href="/onboarding"
                className="bg-orange-500 px-5 py-3 rounded-xl font-semibold"
              >
                New Roadmap
              </Link>

              <button
                onClick={connectTelegram}
                className="border border-white/30 px-5 py-3 rounded-xl"
              >
                {loadingTelegram
                  ? "Connecting..."
                  : "Telegram"}
              </button>

            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

          {/* ANALYTICS */}

          <section>
            <SectionTitle>
              Analytics
            </SectionTitle>

            {analyticsLoading ? (
              <Card>Loading analytics...</Card>
            ) : (
              <div className="grid md:grid-cols-3 gap-5">

                <Card>
                  <p className="text-gray-500">
                    Total XP
                  </p>

                  <h3 className="text-3xl font-bold text-blue-900 mt-2">
                    {analytics?.totalXP || analytics?.total_xp || analytics?.totalXp || 0}
                  </h3>
                </Card>

                <Card>
                  <p className="text-gray-500">
                    Current Streak
                  </p>

                  <h3 className="text-3xl font-bold text-orange-500 mt-2">
                    🔥{" "}
                    {analytics?.currentStreak || 0}
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

          {/* TODAY LESSON */}

          <section>
            <SectionTitle>
              Today's Lesson
            </SectionTitle>

            {lessonLoading ? (
              <Card>
                Loading lesson...
              </Card>
            ) : !todayLesson ? (
              <Card>
                No lesson available
              </Card>
            ) : (
              <Card>

                <h3 className="text-2xl font-bold text-blue-900">
                  {todayLesson.goal}
                </h3>

                <p className="mt-2 text-orange-600">
                  Week {todayLesson.weekNumber}
                </p>

                <p className="mt-1 text-gray-600">
                  {todayLesson.day}
                </p>

                <div className="mt-6">
                  <h4 className="font-bold text-blue-900">
                    Weekly Focus
                  </h4>

                  <p className="mt-2">
                    {todayLesson.weekFocus}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-blue-900">
                    Today's Topic
                  </h4>

                  <p className="mt-2">
                    {todayLesson.topic}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-blue-900">
                    Tasks
                  </h4>

                  <ul className="list-disc ml-6 mt-3 space-y-2">
                    {todayLesson.tasks.map(
                      (task, index) => (
                        <li key={index}>
                          {task}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {todayLesson.learningLink && (
                  <a
                    href={
                      todayLesson.learningLink
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 text-orange-600 font-semibold"
                  >
                    ▶ Learning Resource
                  </a>
                )}

                <button
                  onClick={completeLesson}
                  disabled={
                    completingLesson ||
                    lessonCompleted
                  }
                  className="mt-8 bg-blue-900 text-white px-6 py-3 rounded-xl"
                >
                  {lessonCompleted
                    ? "Completed ✓"
                    : completingLesson
                    ? "Completing..."
                    : "Mark as Completed"}
                </button>

              </Card>
            )}
          </section>

          {/* RECOVERY */}

          <section>
            <SectionTitle>
              Recovery Plan
            </SectionTitle>

            {recoveryLoading ? (
              <Card>
                Checking recovery...
              </Card>
            ) : recoveryPlan ? (
              <Card>
                <p className="font-semibold text-orange-600">
                  Recovery Plan Available
                </p>
              </Card>
            ) : (
              <Card>
                <button
                  onClick={
                    generateRecoveryPlan
                  }
                  disabled={
                    creatingRecovery
                  }
                  className="bg-orange-500 text-white px-6 py-3 rounded-xl"
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
