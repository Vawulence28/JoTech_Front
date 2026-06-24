export async function getAnalytics() {
  const res = await fetch("http://jo-tech-b7lk.onrender.com/api/analytics/overview", {
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