import React, { useEffect, useState } from "react";
import { FaRegSmileBeam, FaPlus } from "react-icons/fa";

import "./styles.css";
import WorldMap, { Orphanages } from "../../components/Map/WorldMap";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Mappage() {
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

  useEffect(() => {
    api.get("hosting").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

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
          <Link to={`/map/create`} className="mp-button">
            <FaPlus className="map-page-icon" />
          </Link>
        </div>
        <div className="mp-map">
          <WorldMap orphanages={orphanages} />
        </div>
      </div>
    </div>
  );
}

export default Mappage;
