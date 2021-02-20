import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import MarkUser from "./MarkUser";
import MyLocation from "./MyLocation";
import mapIcon from "../../utils/mapIcon";
import { OrphanagesWorldProps } from "../../interfaces/orphanages";

import "leaflet/dist/leaflet.css";
import "./WorldMap.css";

export default function WorldMap({ orphanages }: OrphanagesWorldProps) {
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
      {orphanages.map((orphanage) => {
        return (
          <Marker
            key={orphanage._id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup closeButton={false} className="map-popup">
              <p className="world-map-name">{orphanage.name}</p>
              <Link
                to={`/orphanage/${orphanage._id}`}
                className="world-map-link"
              >
                <FiArrowRight className="world-map-arrow" />
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
