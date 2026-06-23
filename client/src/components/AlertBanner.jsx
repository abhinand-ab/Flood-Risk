function AlertBanner({ riskData }) {
  const level = riskData?.riskLevel || "none";

  const colors = {
    high: "bg-red-600",
    medium: "bg-orange-500",
    low: "bg-green-600",
    none: "bg-slate-700"
  };

  return (
    <div
      className={`
        ${colors[level]}
        p-4
        text-center
        text-sm sm:text-base lg:text-lg
        font-bold
        shadow-lg
      `}
    >
      {level === "none"
        ? "✅ SAFE AREA"
        : `⚠ ${level.toUpperCase()} FLOOD RISK DETECTED`}
    </div>
  );
}

export default AlertBanner;