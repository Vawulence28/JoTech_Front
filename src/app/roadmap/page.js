"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeWeek, setActiveWeek] = useState(null);
  const [completing, setCompleting] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        const res = await axios.get(
          "https://jo-tech-b7lk.onrender.com/api/learning/roadmap",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRoadmap(res.data.data);
      } catch (error) {
        console.error("Failed to load roadmap:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadRoadmap();
    } else {
      setLoading(false);
    }
  }, [token]);

  const completeRoadmap = async () => {
    try {
      setCompleting(true);

      const res = await axios.post(
        "https://jo-tech-b7lk.onrender.com/api/learning/complete-roadmap",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎓 Roadmap completed! Certificate generated!");
      console.log(res.data);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to complete roadmap"
      );
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-blue-900 text-lg">
          Loading roadmap...
        </p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-center px-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            No Roadmap Found
          </h1>

          <p className="mt-3 text-gray-600">
            Create your first learning roadmap to begin.
          </p>

          <Link
            href="/onboarding"
            className="mt-6 inline-block px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-orange-500 transition"
          >
            Create Roadmap
          </Link>
        </div>
      </div>
    );
  }

  const data = roadmap.roadmap_json;

  return (
    <div className="min-h-screen bg-white text-blue-950">

      {/* HEADER */}
      <div className="border-b border-blue-100 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <Link
            href="/dashboard"
            className="text-sm text-blue-700 hover:text-orange-500"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="text-4xl font-bold text-blue-900 mt-4">
            {data.goal}
          </h1>

          <p className="text-orange-600 mt-2">
            Personalized Learning Roadmap
          </p>

          <button
            onClick={completeRoadmap}
            disabled={completing}
            className="mt-6 px-6 py-3 bg-blue-900 text-white rounded-xl hover:bg-orange-500 transition disabled:opacity-50"
          >
            {completing
              ? "Generating Certificate..."
              : "Complete Roadmap 🎓"}
          </button>

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* OVERVIEW */}
        <div className="grid md:grid-cols-4 gap-5 mb-12">

          {[
            {
              label: "Level",
              value: data.level || "N/A",
            },
            {
              label: "Duration",
              value: `${data.duration_weeks || 0} Weeks`,
            },
            {
              label: "Weeks",
              value: data.weeks?.length || 0,
            },
            {
              label: "Skills",
              value: data.skills_gained?.length || 0,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-blue-100 rounded-xl p-5 bg-white shadow-sm"
            >
              <p className="text-blue-600">
                {item.label}
              </p>

              <h3 className="text-2xl font-bold text-orange-600 mt-1">
                {item.value}
              </h3>
            </div>
          ))}

        </div>

        {/* SKILLS */}
        <div className="mb-12">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Skills You'll Gain
          </h2>

          <div className="flex flex-wrap gap-3">

            {data.skills_gained?.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 border border-blue-200 rounded-full text-blue-800 hover:border-orange-500 transition"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* FINAL PROJECT */}
        <div className="border border-blue-100 rounded-xl p-6 bg-white shadow-sm mb-12">

          <h2 className="text-2xl font-bold text-blue-900">
            Final Project
          </h2>

          <p className="text-blue-700 mt-3">
            {data.final_project}
          </p>

        </div>

        {/* WEEKS */}
        <div>

          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Weekly Learning Plan
          </h2>

          <div className="space-y-5">

            {data.weeks?.map((week) => (
              <div
                key={week.week}
                className="border border-blue-100 rounded-xl bg-white shadow-sm overflow-hidden"
              >

                {/* WEEK HEADER */}
                <div
                  onClick={() =>
                    setActiveWeek(
                      activeWeek === week.week
                        ? null
                        : week.week
                    )
                  }
                  className="p-5 cursor-pointer hover:border-orange-400"
                >
                  <div className="flex justify-between items-center">

                    <div>
                      <h3 className="text-xl font-bold text-blue-900">
                        Week {week.week}
                      </h3>

                      <p className="text-blue-700 mt-2">
                        {week.focus}
                      </p>
                    </div>

                    <span className="text-orange-600 text-2xl font-bold">
                      {activeWeek === week.week ? "−" : "+"}
                    </span>

                  </div>
                </div>

                {/* EXPANDED CONTENT */}
                {activeWeek === week.week && (
                  <div className="border-t border-blue-100 p-6">

                    {/* WEEK TOPIC */}
                    <div className="mb-6">

                      <h4 className="font-bold text-blue-900 text-lg">
                        Weekly Topic
                      </h4>

                      <p className="text-blue-700 mt-2">
                        {week.topic}
                      </p>

                    </div>

                    {/* DAYS */}
                    <div className="space-y-4">

                      {week.days?.map((day, index) => (
                        <div
                          key={index}
                          className={`border rounded-xl p-5 ${
                            day.day === todayName
                              ? "border-orange-400 bg-orange-50"
                              : "border-blue-100 bg-blue-50"
                          }`}
                        >

                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                            <div>

                              <h4 className="font-bold text-blue-900 text-lg">
                                {day.day}
                              </h4>

                              <p className="text-blue-800 mt-1">
                                {day.topic}
                              </p>

                            </div>

                            {day.learning_link && (
                              <a
                                href={day.learning_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-orange-600 font-semibold hover:underline"
                              >
                                ▶ Start Learning
                              </a>
                            )}

                          </div>

                          {/* TASKS */}
                          <div className="mt-4">

                            <h5 className="font-semibold text-blue-900">
                              Tasks
                            </h5>

                            <ul className="list-disc ml-6 mt-2 text-blue-700 space-y-1">

                              {day.tasks?.map(
                                (task, taskIndex) => (
                                  <li key={taskIndex}>
                                    {task}
                                  </li>
                                )
                              )}

                            </ul>

                          </div>

                        </div>
                      ))}

                      {!week.days?.length && (
                        <div className="border border-red-200 bg-red-50 rounded-xl p-4">
                          <p className="text-red-600">
                            No daily curriculum found
                            for this week.
                          </p>
                        </div>
                      )}

                    </div>

                  </div>
                )}

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}