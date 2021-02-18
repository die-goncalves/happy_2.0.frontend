import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { OrphanageParams } from "../../../interfaces/orphanages";
import mapIcon from "../../../utils/mapIcon";
import "./styles.css";

function OrfanatoCardPending({ orphanage }: OrphanageParams) {
  return (
    <div id="orfanato-card-pending">
      <div className="orfanato-card-pending-div-map">
        <MapContainer
          center={[orphanage.latitude, orphanage.longitude]}
          zoom={3.45}
          className={"orfanato-card-pending-map"}
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
      <div className="orfanato-card-pending-options">
        <div className="orfanato-card-pending-name">
          <p>{orphanage.name}</p>
        </div>
        <div className="orfanato-card-pending-buttons">
          <Link
            to={`/dashboard/pending/${orphanage._id}`}
            className="orfanato-card-pending-decision-link"
          >
            <HiArrowRight className="orfanato-card-pending-decision-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrfanatoCardPending;
