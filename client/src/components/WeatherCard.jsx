import { CloudRain, Wind, Thermometer } from "lucide-react";

function WeatherCard({ weather }) {

  if (!weather) return null;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">

      <div className="bg-slate-900 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <Thermometer />
          <div>
            <p className="text-slate-400">
              Temperature
            </p>

            <h2 className="text-xl font-bold">
              {weather.main.temp}°C
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <CloudRain />
          <div>
            <p className="text-slate-400">
              Weather
            </p>

            <h2 className="text-xl font-bold">
              {weather.weather[0].main}
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <Wind />
          <div>
            <p className="text-slate-400">
              Wind Speed
            </p>

            <h2 className="text-xl font-bold">
              {weather.wind.speed} m/s
            </h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default WeatherCard;