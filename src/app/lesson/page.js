"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function LessonPage() {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // =========================
  // FETCH TODAY LESSON
  // =========================
  const fetchLesson = async () => {
    try {
      const res = await axios.get(
        "https://jo-tech-b7lk.onrender.com/api/learning/today",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLesson(res.data.data || null);
    } catch (err) {
      console.error("Lesson Error:", err);
      setLesson(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // COMPLETE LESSON
  // =========================
  const completeLesson = async () => {
    try {
      setCompleting(true);

      await axios.post(
        "https://jo-tech-b7lk.onrender.com/api/learning/complete-today",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCompleted(true);

      // refresh lesson (optional but good UX)
      await fetchLesson();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Failed to complete lesson"
      );
    } finally {
      setCompleting(false);
    }
  };

  useEffect(() => {
    if (token) fetchLesson();
  }, [token]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-blue-900">
          Loading today’s lesson...
        </p>
      </div>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!lesson) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-900">
              No Lesson Available
            </h1>
            <p className="text-gray-600 mt-2">
              Generate a roadmap first.
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const week = lesson.week;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">

        {/* HEADER */}
        <div className="bg-blue-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-10">

            <h1 className="text-3xl font-bold">
              📘 Today’s Lesson
            </h1>

            <p className="text-blue-100 mt-2">
              Week {lesson.currentWeekNumber} of {lesson.totalWeeks}
            </p>

            <h2 className="text-xl mt-4 font-semibold">
              {lesson?.roadmap?.roadmap_json?.goal}
            </h2>

          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

          {/* FOCUS */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-900">
              Weekly Focus
            </h3>

            <p className="mt-2 text-gray-700">
              {week?.focus}
            </p>
          </div>

          {/* TOPICS */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-900">
              Topics
            </h3>

            <ul className="list-disc ml-6 mt-3 space-y-1">
              {week?.topics?.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          {/* TASKS */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-900">
              Daily Tasks
            </h3>

            <ul className="list-disc ml-6 mt-3 space-y-1">
              {week?.daily_tasks?.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          {/* ACTION */}
          <div className="bg-white border rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">

            <div>
              <p className="text-gray-600">
                Mark this lesson as completed when done.
              </p>
            </div>

            <button
              onClick={completeLesson}
              disabled={completing || completed}
              className="bg-blue-900 text-white px-6 py-3 rounded-xl disabled:opacity-50"
            >
              {completing
                ? "Completing..."
                : completed
                ? "Completed ✓"
                : "Mark as Completed"}
            </button>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}