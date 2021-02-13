import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { MapContainer, TileLayer } from "react-leaflet";

import "./styles.css";

function OrfanatoCard() {
  return (
    <div id="orfanato-card">
      <div className="orfanato-card-div-map">
        <MapContainer
          center={[8.3693515, -6.8544287]}
          zoom={3.45}
          className={"orfanato-card-map"}
          attributionControl={false}
        >
          <TileLayer
            url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
      <div className="orfanato-card-options">
        <div className="orfanato-card-name">
          <p>Nome do orfanato muito grande</p>
        </div>
        <div className="orfanato-card-buttons">
          <a href="/" className="orfanato-card-edit-link">
            <AiOutlineEdit className="orfanato-card-edit-icon" />
          </a>

          <a href="/" className="orfanato-card-delete-link">
            <FiTrash2 className="orfanato-card-delete-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrfanatoCard;

// <div className="map-do">
//               <label
//                 className={`${
//                   !latlng && errors.latitude ? "do invalid" : "do valid"
//                 }`}
//               >
//                 <span>Clique no mapa para adicionar a localização</span>
//               </label>
//               <div className="error">
//                 {!latlng && errors.latitude ? (
//                   <p className="error-message">{errors.latitude.message}</p>
//                 ) : null}
//               </div>

//               <input
//                 className="coordenada"
//                 name="latitude"
//                 autoComplete="off"
//                 ref={register({
//                   required:
//                     "Procure onde está o orfanato e clique para marcar sua localização",
//                 })}
//               />
//               <input
//                 className="coordenada"
//                 name="longitude"
//                 autoComplete="off"
//                 ref={register({
//                   required:
//                     "Procure onde está o orfanato e clique para marcar sua localização",
//                 })}
//               />
//             </div>
