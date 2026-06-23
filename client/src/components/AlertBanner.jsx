function AlertBanner({ riskData }) {
  const level = riskData?.riskLevel || "none";

  const colors = {
    high:"bg-gradient-to-r from-red-700 to-red-500"

    medium:"bg-gradient-to-r from-orange-600 to-yellow-500"

    low:"bg-gradient-to-r from-green-700 to-green-500"

    none:"bg-gradient-to-r from-slate-700 to-slate-600"
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