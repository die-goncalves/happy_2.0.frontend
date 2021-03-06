import React, { useEffect, useState } from "react";
import { FaRegSmileBeam, FaPlus } from "react-icons/fa";
import WorldMap from "../../components/Map/WorldMap";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Orphanage } from "../../interfaces/orphanages";

import "./styles.css";

function Mappage() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

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

          <p className="mp-description">
            Muitas crianças estão
            <br />
            esperando a sua visita <FaRegSmileBeam />{" "}
          </p>

          <div className="map-page-options">
            <Link to="/" className="map-page-box">
              <p>Voltar ao ínicio</p>
            </Link>
            <Link to="/map/create" className="map-page-box">
              <p>Criar orfanato</p>
            </Link>
          </div>
        </div>
        <div className="mp-city">
          <strong>Jaguaré</strong>
          <span>Espírito Santo</span>
        </div>
      </div>
      <div className="mp-world">
        <div className="mp-map">
          <WorldMap orphanages={orphanages} />
        </div>
      </div>
    </div>
  );
}

export default Mappage;
