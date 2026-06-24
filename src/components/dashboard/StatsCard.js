export default function StatsCard({ title, value, subtitle }) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-2xl font-bold mt-1">{value}</h2>

      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}