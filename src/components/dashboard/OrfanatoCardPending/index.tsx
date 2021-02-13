import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { MapContainer, TileLayer } from "react-leaflet";

import "./styles.css";

function OrfanatoCardPending() {
  return (
    <div id="orfanato-card-pending">
      <div className="orfanato-card-pending-div-map">
        <MapContainer
          center={[8.3693515, -6.8544287]}
          zoom={3.45}
          className={"orfanato-card-pending-map"}
          attributionControl={false}
        >
          <TileLayer
            url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
      <div className="orfanato-card-pending-options">
        <div className="orfanato-card-pending-name">
          <p>Nome curto</p>
        </div>
        <div className="orfanato-card-pending-buttons">
          <a href="/" className="orfanato-card-pending-decision-link">
            <HiArrowRight className="orfanato-card-pending-decision-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrfanatoCardPending;
