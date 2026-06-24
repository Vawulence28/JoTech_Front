import StatsCard from "./StatsCard";

export default function DashboardGrid({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

      <StatsCard
        title="Total XP"
        value={data.totalXP}
        subtitle={`Level ${data.level}`}
      />

      <StatsCard
        title="Streak"
        value={`${data.currentStreak} days`}
        subtitle={`Best: ${data.longestStreak}`}
      />

      <StatsCard
        title="Tasks Completed"
        value={data.completedTasks}
      />

      <StatsCard
        title="Missed Tasks"
        value={data.missedTasks}
      />

      <StatsCard
        title="Roadmaps"
        value={data.roadmapsCreated}
        subtitle={data.activeRoadmap ? "Active roadmap running" : "No active roadmap"}
      />

      <StatsCard
        title="Badges"
        value={data.badges}
      />

    </div>
  );
}