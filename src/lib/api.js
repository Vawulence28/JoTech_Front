export async function getAnalytics() {
  const res = await fetch("http://localhost:5000/api/analytics/overview", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
}