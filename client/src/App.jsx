import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import StatsCards from "./components/StatsCards";
import AlertBanner from "./components/AlertBanner";
import WeatherCard from "./components/WeatherCard";
import EmergencyModal from "./components/EmergencyModal";

function App() {
  const [riskData, setRiskData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <Sidebar
        setRiskData={setRiskData}
        setUserLocation={setUserLocation}
        setWeather={setWeather}
        setShowContacts={setShowContacts}
      />

      <div className="flex-1 flex flex-col">
        <AlertBanner riskData={riskData} />

        <StatsCards riskData={riskData} />

        <WeatherCard weather={weather} />

        <div className="bg-slate-900 rounded-2xl p-5 mx-4 mb-4 border border-slate-800">
          <h3 className="text-lg font-bold mb-3">Safety Recommendation</h3>

          <p className="text-slate-300">
            {riskData?.riskLevel === "high" &&
              "⚠ High flood risk detected. Avoid travel, stay away from waterlogged areas, and follow evacuation instructions issued by local authorities."}

            {riskData?.riskLevel === "medium" &&
              "🟠 Moderate flood risk detected. Stay alert, monitor weather updates, and avoid unnecessary travel in low-lying areas."}

            {riskData?.riskLevel === "low" &&
              "🟢 Low flood risk detected. Conditions are generally safe, but continue monitoring local weather forecasts."}

            {riskData?.riskLevel === "none" &&
              "✅ No immediate flood risk detected. The area is currently considered safe."}
          </p>
        </div>

        <div className="flex-1 px-2 py-2 lg:px-4 lg:py-4">
          <MapView userLocation={userLocation} />
        </div>
      </div>
      <EmergencyModal open={showContacts} onClose={() => setShowContacts(false)} />
    </div>
  );
}

export default App;