import { useMap } from "react-leaflet";
import { useEffect } from "react";

function MapController({ userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 12, {
        duration: 2,
      });
    }
  }, [userLocation, map]);

  return null;
}

export default MapController;