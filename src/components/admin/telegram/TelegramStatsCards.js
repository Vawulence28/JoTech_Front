"use client";

export default function TelegramStatsCards({
  stats = {},
}) {
  const cards = [
    {
      title: "Linked Users",
      value: stats.linkedUsers ?? 0,
      color: "text-green-600",
      icon: "✅",
    },
    {
      title: "Unlinked Users",
      value: stats.unlinkedUsers ?? 0,
      color: "text-red-600",
      icon: "❌",
    },
    {
      title: "Telegram Messages",
      value: stats.totalMessages ?? 0,
      color: "text-blue-600",
      icon: "💬",
    },
    {
      title: "Broadcasts Sent",
      value: stats.totalBroadcasts ?? 0,
      color: "text-purple-600",
      icon: "📢",
    },
    {
      title: "Templates",
      value: stats.totalTemplates ?? 0,
      color: "text-orange-600",
      icon: "📄",
    },
    {
      title: "Success Rate",
      value: `${stats.successRate ?? 0}%`,
      color: "text-green-700",
      icon: "📈",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h2
                className={`mt-2 text-3xl font-bold ${card.color}`}
              >
                {card.value}
              </h2>
            </div>

            <div className="text-4xl">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}