import React, { ChangeEvent, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { TiDeleteOutline } from "react-icons/ti";
import { BiCheck } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import api from "../../../services/api";
import SidebarPublic from "../../../components/SidebarPublic";
import mapIcon from "../../../utils/mapIcon";
import { useParams } from "react-router-dom";
import { Orphanage, OrphanageParams } from "../../../interfaces/orphanages";

import "./styles.css";
import "leaflet/dist/leaflet.css";

function Editpending() {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const params = useParams<OrphanageParams>();
  const history = useHistory();

  async function saveFunction() {
    await api.put(`/hosting/confirm?_id=${params._id}`);
    history.push("/dashboard/pending");
  }
  async function cancelFunction() {
    await api.delete(`/hosting/delete?_id=${params._id}`);
    history.push("/dashboard/pending");
  }

  useEffect(() => {
    api.get(`hosting/show?_id=${params._id}`).then((response: any) => {
      setOrphanage(response.data);
    });
  }, [params._id]);

  if (!orphanage) {
    return <div>carregando ...</div>;
  }

  return (
    <div id="edit-pending">
      <SidebarPublic path="/dashboard/pending" />

      <div className="edit-pending-rightside">
        <section className="edit-pending-section">
          <fieldset>
            <legend>Dados</legend>
            <div className="edit-pending-map-do">
              <MapContainer
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={3.45}
                className={"edit-pending-map"}
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
              <label className="edit-pending-do">
                <span>Clique no mapa para adicionar a localização</span>
              </label>
            </div>
            <div className="edit-pending-input-data">
              <label>Nome</label>
              <input
                value={orphanage.name}
                disabled
                className="edit-pending-name"
              />
            </div>
            <div className="edit-pending-input-data">
              <label>Sobre</label>
              <textarea
                value={orphanage.about}
                disabled
                className="edit-pending-about"
              />
            </div>
            <div className="edit-pending-input-data">
              <label>Fotos</label>

              <div className="edit-pending-grid">
                {orphanage.pictures.map((image) => {
                  return (
                    <img
                      key={image._id}
                      src={`/uploads/${image.filename}`}
                      alt={orphanage.name}
                    />
                  );
                })}
              </div>

              <label className="edit-pending-pictures edit-pending-valid-pictures">
                <FiPlus className="edit-pending-plus edit-pending-valid-plus" />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Visitação</legend>
            <div className="edit-pending-input-data">
              <label>Instruções</label>
              <textarea
                value={orphanage.instructions}
                disabled
                className="edit-pending-instructions"
              />
            </div>
            <div className="edit-pending-input-data">
              <label>Horário das visitas</label>
              <input
                value={orphanage.opening_hours}
                disabled
                className="edit-pending-opening-hours"
              />
            </div>
            <div className="edit-pending-input-data">
              <label>Atende fim de semana</label>

              <div className="edit-pending-button-select">
                <label
                  className={
                    orphanage.open_on_weekends
                      ? "edit-pending-button-true edit-pending-button-green"
                      : "edit-pending-button-true"
                  }
                >
                  SIM
                </label>

                <label
                  className={
                    orphanage.open_on_weekends
                      ? "edit-pending-button-false"
                      : "edit-pending-button-false edit-pending-button-green"
                  }
                >
                  NÃO
                </label>
              </div>
            </div>
          </fieldset>
        </section>

        <div className="edit-pending-refuse-accept">
          <button onClick={cancelFunction} className="edit-pending-refuse">
            <TiDeleteOutline className="edit-pending-refuse-icon" />
            <p>Recusar</p>
          </button>
          <button onClick={saveFunction} className="edit-pending-accept">
            <BiCheck className="edit-pending-accept-icon" />
            <p>Aceitar</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editpending;
