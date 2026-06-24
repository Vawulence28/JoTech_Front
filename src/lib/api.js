export async function getAnalytics() {
  const res = await fetch("https://jo-tech-b7lk.onrender.com/api/analytics/overview", {
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