import { Component } from "solid-js";
import MapGL, { Source, Layer } from "solid-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [-74.0597, 40.6031], // Start: Staten Island
          [-74.0539, 40.609], // Verrazzano-Narrows Bridge
          [-74.0396, 40.6179],
          [-74.0303, 40.6271], // Enter Brooklyn
          [-74.028, 40.6339],
          [-74.0138, 40.6415], // 4th Avenue
          [-74.0049, 40.6457],
          [-73.9908, 40.6517],
          [-73.98, 40.6565],
          [-73.9687, 40.6614],
          [-73.9576, 40.6663],
          [-73.9464, 40.6713],
          [-73.9352, 40.6762],
          [-73.9467, 40.6897], // Turn onto Lafayette Avenue
          [-73.9557, 40.6935],
          [-73.9447, 40.6951], // Bedford Avenue
          [-73.9592, 40.7066],
          [-73.9518, 40.7124], // Williamsburg
          [-73.9535, 40.7425], // Queensboro Bridge
          [-73.9662, 40.7615], // Enter Manhattan, 1st Avenue
          [-73.9639, 40.7697],
          [-73.9613, 40.7778],
          [-73.9588, 40.786],
          [-73.9296, 40.7953], // Enter The Bronx
          [-73.928, 40.808],
          [-73.9333, 40.8082], // 138th Street
          [-73.9365, 40.8034], // Madison Avenue Bridge (re-entering Manhattan)
          [-73.94, 40.7989], // 5th Avenue
          [-73.9521, 40.7928],
          [-73.9584, 40.7852],
          [-73.969, 40.7765], // Central Park South
          [-73.9747, 40.7729], // Enter Central Park
          [-73.9719, 40.7739],
          [-73.9691, 40.776], // Finish line near Tavern on the Green        type: "LineString",
        ],
      },
    },
  ],
};

export const EventMap: Component = (props) => {
  return (
    <MapGL
      class="flex-1"
      options={{
        accessToken: import.meta.env.VITE_MAPBOX_PUBLIC,
        style: "mb:dark",
      }}
      viewport={{
        center: [-73.94, 40.73],
        zoom: 12,
      }}
    >
      <Source
        source={{
          type: "geojson",
          data: geojson,
        }}
      >
        <Layer
          style={{
            type: "line",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#cc6",
              "line-width": 8,
            },
          }}
        />
      </Source>
    </MapGL>
  );
};
