"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [activeWeek, setActiveWeek] = useState(1);

  const [roadmap, setRoadmap] = useState(null);

  const [form, setForm] = useState({
    goal: "",
    level: "beginner",
    daily_hours: 2,
    duration_weeks: 8,
    days_per_week: 5,
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "https://jo-tech-b7lk.onrender.com/api/learning/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      const generatedRoadmap =
        data.data.roadmap_json;

      setRoadmap(generatedRoadmap);

      if (
        generatedRoadmap?.weeks?.length
      ) {
        setActiveWeek(
          generatedRoadmap.weeks[0].week
        );
      }

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const todayName =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">

          <h1 className="text-5xl font-bold">
            Your Learning Roadmap Generator
          </h1>

          <p className="mt-4 text-blue-100 text-lg">
            Generate a personalized day-by-day
            curriculum powered by Joel Consult Tech Hub.
          </p>

        </div>
      </section>

      {/* FORM */}

      <section className="max-w-5xl mx-auto px-6 -mt-10">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Create Your Learning Roadmap
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="block mb-2 font-semibold">
                Learning Goal
              </label>

              <input
                name="goal"
                value={form.goal}
                onChange={handleChange}
                placeholder="Frontend Developer"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="grid md:grid-cols-4 gap-4">

              <div>
                <label className="block mb-2">
                  Level
                </label>

                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="beginner">
                    Beginner
                  </option>

                  <option value="intermediate">
                    Intermediate
                  </option>

                  <option value="advanced">
                    Advanced
                  </option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  Daily Hours
                </label>

                <input
                  type="number"
                  name="daily_hours"
                  value={form.daily_hours}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Duration (in weeks)
                </label>

                <input
                  type="number"
                  name="duration_weeks"
                  value={form.duration_weeks}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Days / Week
                </label>

                <input
                  type="number"
                  min="1"
                  max="7"
                  name="days_per_week"
                  value={form.days_per_week}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

            </div>

            <button
              disabled={loading}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold"
            >
              {loading
                ? "Generating..."
                : "Generate Roadmap"}
            </button>

          </form>

        </div>

      </section>

      {/* ROADMAP */}

      {roadmap && (
        <section className="max-w-6xl mx-auto px-6 py-12">

          <div className="bg-white rounded-3xl p-8 shadow-sm border">

            <h2 className="text-4xl font-bold text-blue-900">
              {roadmap.goal}
            </h2>

            <p className="text-orange-600 mt-2">
              Personalized Curriculum
            </p>

          </div>

          {/* OVERVIEW */}

          <div className="grid md:grid-cols-4 gap-4 mt-8">

            <InfoCard
              title="Level"
              value={roadmap.level}
            />

            <InfoCard
              title="Duration"
              value={`${roadmap.duration_weeks} Weeks`}
            />

            <InfoCard
              title="Weeks"
              value={
                roadmap.weeks?.length || 0
              }
            />

            <InfoCard
              title="Skills"
              value={
                roadmap.skills_gained?.length || 0
              }
            />

          </div>

          {/* SKILLS */}

          <div className="bg-white rounded-3xl p-8 mt-8 border">

            <h3 className="text-2xl font-bold mb-5">
              Skills You'll Gain
            </h3>

            <div className="flex flex-wrap gap-3">

              {roadmap.skills_gained?.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full border"
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

          </div>

          {/* PROJECT */}

          <div className="bg-white rounded-3xl p-8 mt-8 border">

            <h3 className="text-2xl font-bold text-orange-600">
              Final Project
            </h3>

            <p className="mt-3">
              {roadmap.final_project}
            </p>

          </div>

          {/* WEEKS */}

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Weekly Curriculum
            </h2>

            {roadmap.weeks?.map((week) => (
              <div
                key={week.week}
                className="bg-white border rounded-2xl mb-4"
              >

                <button
                  onClick={() =>
                    setActiveWeek(
                      activeWeek === week.week
                        ? null
                        : week.week
                    )
                  }
                  className="w-full flex justify-between items-center p-6"
                >

                  <div>

                    <h3 className="text-xl font-bold">
                      Week {week.week}
                    </h3>

                    <p>
                      {week.focus}
                    </p>

                  </div>

                  <span>
                    {activeWeek === week.week
                      ? "−"
                      : "+"}
                  </span>

                </button>

                {activeWeek === week.week && (
                  <div className="border-t p-6">

                    <h4 className="font-bold text-lg">
                      Weekly Topic
                    </h4>

                    <p className="mt-2">
                      {week.topic}
                    </p>

                    <div className="mt-6 space-y-4">

                      {week.days?.map(
                        (day, index) => (
                          <div
                            key={index}
                            className={`border rounded-xl p-4 ${
                              day.day ===
                              todayName
                                ? "bg-orange-50 border-orange-300"
                                : "bg-blue-50 border-blue-100"
                            }`}
                          >

                            <div className="flex justify-between">

                              <h4 className="font-bold">
                                {day.day}
                              </h4>

                              {day.learning_link && (
                                <a
                                  href={
                                    day.learning_link
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-orange-600"
                                >
                                  Learn →
                                </a>
                              )}

                            </div>

                            <p className="mt-2 font-medium">
                              {day.topic}
                            </p>

                            <ul className="list-disc ml-6 mt-3 space-y-1">

                              {day.tasks?.map(
                                (
                                  task,
                                  taskIndex
                                ) => (
                                  <li
                                    key={
                                      taskIndex
                                    }
                                  >
                                    {task}
                                  </li>
                                )
                              )}

                            </ul>

                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>
            ))}

          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-10">

            <button
              onClick={() =>
                router.push("/dashboard")
              }
              className="bg-blue-900 text-white py-4 rounded-xl"
            >
              Go To Dashboard
            </button>

            <button
              onClick={() => {
                setRoadmap(null);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="border border-orange-500 text-orange-600 py-4 rounded-xl"
            >
              Generate Another
            </button>

          </div>

        </section>
      )}

    </div>
  );
}

function InfoCard({
  title,
  value,
}) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <p className="text-gray-500">
        {title}
      </p>

      <h3 className="text-2xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}