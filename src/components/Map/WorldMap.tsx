import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkUser from "./MarkUser";
import MyLocation from "./MyLocation";
import "./WorldMap.css";

export default function WorldMap() {
  const [pos, setpos] = useState<GeolocationPosition | null>(null);

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (location) {
        setpos(location);
      },
      function (error) {
        console.error(`ERROR(${error.code}): ${error.message}`);
        setpos(null);
      },
      { enableHighAccuracy: true }
    );
  } else {
    console.error("Geolocation is not supported by your browser");
    setpos(null);
  }

  return (
    <MapContainer
      center={[8.3693515, -6.8544287]}
      zoom={3.45}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {pos ? <MarkUser mylocation={pos} /> : null}
      {pos ? <MyLocation mylocation={pos} /> : null}
    </MapContainer>
  );
}