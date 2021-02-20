import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { OrphanageParams } from "../../../interfaces/orphanages";
import mapIcon from "../../../utils/mapIcon";
import { Link } from "react-router-dom";

import "./styles.css";

function OrfanatoCard({ orphanage }: OrphanageParams) {
  return (
    <div id="orfanato-card">
      <div className="orfanato-card-div-map">
        <MapContainer
          center={[orphanage.latitude, orphanage.longitude]}
          zoom={3.45}
          className={"orfanato-card-map"}
          dragging={false}
          touchZoom={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            interactive={false}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          />
        </MapContainer>
      </div>
      <div className="orfanato-card-options">
        <div className="orfanato-card-name">
          <p>{orphanage.name}</p>
        </div>
        <div className="orfanato-card-buttons">
          <Link
            to={`/dashboard/registered/update/${orphanage._id}`}
            className="orfanato-card-edit-link"
          >
            <AiOutlineEdit className="orfanato-card-edit-icon" />
          </Link>

          <Link
            to={`/dashboard/registered/delete/${orphanage._id}`}
            className="orfanato-card-delete-link"
          >
            <FiTrash2 className="orfanato-card-delete-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrfanatoCard;
