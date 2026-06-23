import {
  Shield,
  MapPinned,
  AlertTriangle,
  Activity
} from "lucide-react";

function StatsCards({ riskData }) {
  const cards = [
    {
      title: "Risk Level",
      value: riskData?.riskLevel?.toUpperCase() || "NONE",
      icon: AlertTriangle
    },
    {
      title: "Zone",
      value: riskData?.zoneName || "Safe Area",
      icon: MapPinned
    },
    {
      title: "District",
      value: riskData?.district || "--",
      icon: Shield
    },
    {
      title: "Safety Score",
      value: riskData?.safetyScore ?? 100,
      icon: Activity
    }
  ];

  return (
   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="
          bg-white/5
          backdrop-blur-lg
          border border-white/10
          shadow-xl
          rounded-2xl
          p-5
          hover:border-blue-500
          transition-all
          duration-300
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <card.icon
              size={32}
              className="text-blue-400"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;