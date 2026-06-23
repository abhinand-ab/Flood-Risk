import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import API from "../services/api";
import MapController from "./MapController";

function MapView({ userLocation }) {
  const [zones, setZones] = useState([]);
  const rainGauges = [
    {
      name: "Kochi",
      position: [9.9312, 76.2673],
      rainfall: 12,
    },
    {
      name: "Kozhikode",
      position: [11.2588, 75.7804],
      rainfall: 8,
    },
    {
      name: "Alappuzha",
      position: [9.4981, 76.3388],
      rainfall: 18,
    },
  ];

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const res = await API.get("/zones");
      setZones(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getColor = (riskLevel) => {
    switch (riskLevel) {
      case "high":
        return "#e74c3c";
      case "medium":
        return "#f39c12";
      case "low":
        return "#2ecc71";
      default:
        return "#95a5a6";
    }
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-2xl">
      <MapContainer
        center={[10.8505, 76.2711]}
        zoom={8}
        className="h-full w-full"
      >
        <MapController userLocation={userLocation} />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Flood Risk Zones">
            <LayerGroup>
              {zones.map((zone) => {
                const coords = zone.geometry.coordinates[0].map(
                  ([lng, lat]) => [lat, lng]
                );

                return (
                  <Polygon
                    key={zone._id}
                    positions={coords}
                    pathOptions={{
                      color: getColor(zone.riskLevel),
                      fillColor: getColor(zone.riskLevel),
                      fillOpacity: 0.5,
                    }}
                  >
                    <Popup>
                      <div>
                        <h3>{zone.name}</h3>
                        <p>District: {zone.district}</p>
                        <p>Risk: {zone.riskLevel}</p>
                      </div>
                    </Popup>
                  </Polygon>
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Rain Gauges">
            <LayerGroup>
              {rainGauges.map((gauge, index) => (
                <Circle
                  key={index}
                  center={gauge.position}
                  radius={gauge.rainfall * 500}
                  pathOptions={{
                    color: "#2980b9",
                    fillOpacity: 0.4,
                  }}
                >
                  <Popup>
                    {gauge.name}: {gauge.rainfall} mm/hr
                  </Popup>
                </Circle>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="My Location">
            <LayerGroup>
              {userLocation && (
                <Marker position={userLocation}>
                  <Popup>Your Current Location</Popup>
                </Marker>
              )}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

export default MapView;