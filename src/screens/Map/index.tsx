import React from "react";
import { FaRegSmileBeam, FaPlus } from "react-icons/fa";
import { MapContainer, TileLayer } from "react-leaflet";

import "./styles.css";
import "leaflet/dist/leaflet.css";

function Mappage() {
  return (
    <div id="mp">
      <div className="mp-side">
        <div className="mp-mark"></div>
        <div className="mp-text">
          <h1 className="mp-title">
            Escolha
            <br />
            um orfanato
            <br />
            no mapa
          </h1>
          <br />
          <p className="mp-description">
            Muitas crianças estão
            <br />
            esperando a sua visita <FaRegSmileBeam />{" "}
          </p>
        </div>
        <div className="mp-city">
          <strong>Jaguaré</strong>
          <span>Espírito Santo</span>
        </div>
      </div>
      <div className="mp-grid-world">
        <div className="mp-register">
          <div className="mp-button">
            <FaPlus color="rgba(255, 214, 102, 1.0)" />
          </div>
        </div>
        <div className="mp-map">
          <MapContainer center={[0, 0]} zoom={13} className="leaf">
            <TileLayer
              url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Mappage;
