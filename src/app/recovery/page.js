"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function RecoveryPage() {
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [recovering, setRecovering] = useState(false);

  const [recoveryPlan, setRecoveryPlan] = useState(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // =========================
  // FETCH RECOVERY PLAN
  // =========================
  const fetchRecovery = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/recovery/current",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecoveryPlan(res.data.recoveryPlan || null);
    } catch (err) {
      console.error("Recovery fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE RECOVERY PLAN
  // =========================
  const generateRecoveryPlan = async () => {
    try {
      setCreating(true);

      const res = await axios.post(
        "http://localhost:5000/api/recovery/generate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecoveryPlan(res.data.data);
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Failed to generate recovery plan"
      );
    } finally {
      setCreating(false);
    }
  };

  // =========================
  // RECOVER TODAY ACTION
  // =========================
  const recoverToday = async () => {
    try {
      setRecovering(true);

      const res = await axios.post(
        "http://localhost:5000/api/recovery/recover-today",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Recovery activated 🚀");

      fetchRecovery();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Recovery failed"
      );
    } finally {
      setRecovering(false);
    }
  };

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    if (!token) return;
    fetchRecovery();
  }, [token]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-blue-900 font-medium">
            Loading recovery system...
          </p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 text-blue-950">

        {/* HEADER */}
        <div className="bg-orange-500 text-white">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold">
              Recovery System 🧠
            </h1>

            <p className="mt-2 text-white/90">
              Get back on track when you miss learning days
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* ACTIVE PLAN */}
          {recoveryPlan ? (
            <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm">

              <h2 className="text-2xl font-bold text-orange-600">
                Active Recovery Plan
              </h2>

              <p className="mt-3 text-blue-700">
                Reason:{" "}
                <span className="font-medium">
                  {recoveryPlan.reason || "Missed learning streak"}
                </span>
              </p>

              <p className="mt-2 text-blue-700">
                Missed Days:{" "}
                <span className="font-bold">
                  {recoveryPlan.missed_days || 0}
                </span>
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <button
                  onClick={recoverToday}
                  disabled={recovering}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl"
                >
                  {recovering ? "Recovering..." : "Recover Today 🚀"}
                </button>

                <button
                  onClick={fetchRecovery}
                  className="border border-orange-500 text-orange-600 px-5 py-3 rounded-xl"
                >
                  Refresh
                </button>

              </div>

            </div>
          ) : (
            <div className="bg-white border rounded-2xl p-8 text-center shadow-sm">

              <h2 className="text-2xl font-bold text-blue-900">
                No Recovery Plan Active
              </h2>

              <p className="mt-3 text-blue-600">
                You are currently on track 🎯
              </p>

              <button
                onClick={generateRecoveryPlan}
                disabled={creating}
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
              >
                {creating
                  ? "Generating..."
                  : "Generate Recovery Plan"}
              </button>

            </div>
          )}

          {/* INFO SECTION */}
          <div className="mt-10 grid md:grid-cols-3 gap-5">

            <div className="bg-white border rounded-xl p-5">
              <h3 className="font-bold text-blue-900">
                Why Recovery?
              </h3>
              <p className="text-sm text-blue-600 mt-2">
                Helps you rebuild consistency after missed learning days.
              </p>
            </div>

            <div className="bg-white border rounded-xl p-5">
              <h3 className="font-bold text-blue-900">
                How it works
              </h3>
              <p className="text-sm text-blue-600 mt-2">
                It adjusts your learning intensity based on missed progress.
              </p>
            </div>

            <div className="bg-white border rounded-xl p-5">
              <h3 className="font-bold text-blue-900">
                Goal
              </h3>
              <p className="text-sm text-blue-600 mt-2">
                Prevent burnout and restore learning momentum.
              </p>
            </div>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}