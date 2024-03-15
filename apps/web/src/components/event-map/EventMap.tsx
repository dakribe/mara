import Map from "react-map-gl";
import { LineRoute } from "./LineRoute";
import { Feature } from "geojson";

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface EventMapProps {
  latitude: number;
  longitude: number;
  geoJson: Feature;
}

export function EventMap({ latitude, longitude, geoJson }: EventMapProps) {
  return (
    <Map
      mapboxAccessToken={accessToken}
      initialViewState={{
        longitude,
        latitude,
        zoom: 15,
      }}
      style={{ height: "100%", width: "100vh" }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      interactive={false}
    >
      <LineRoute geoJson={geoJson} />
    </Map>
  );
}
