"use client";

import { useEffect, useState } from "react";
import adminApi from "@/services/adminApi";

export default function AdminLeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getLeaderboard();

      setLeaders(res.data.xpLeaderboard || []);
    } catch (err) {
      console.error("Leaderboard error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-900">
        Leaderboard
      </h1>

      {loading ? (
        <p className="mt-6">Loading leaderboard...</p>
      ) : (
        <div className="mt-6 bg-white border rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Rank</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">XP</th>
                <th className="p-2 border">Level</th>
              </tr>
            </thead>

            <tbody>
              {leaders.map((u, index) => (
                <tr key={u.learn_users?.id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{u.learn_users?.full_name}</td>
                  <td className="p-2 border">{u.total_xp}</td>
                  <td className="p-2 border">{u.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}