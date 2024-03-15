import { Feature } from "geojson";
import { Layer, LineLayer, Source } from "react-map-gl";

const routeLayer: LineLayer = {
  id: "routeLayer",
  type: "line",
  paint: {
    "line-color": "#33bb6a",
    "line-width": 6,
  },
};

interface LineRouteProps {
  geoJson: Feature;
}

export function LineRoute({ geoJson }: LineRouteProps) {
  return (
    <Source type="geojson" data={geoJson}>
      <Layer {...routeLayer} />
    </Source>
  );
}
