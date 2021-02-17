import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import api from "../../services/api";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import mapMarker from "../../images/map-marker.svg";
import { FiClock, FiInfo, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import SidebarPublic from "../../components/SidebarPublic";

function sideScroll(
  element: HTMLElement,
  direction: string,
  speed: number,
  distance: number,
  step: number
) {
  /*
    horizontal scroll with buttons based here:
      https://jsfiddle.net/pGR3B/2/
  */
  let scrollAmount = 0;
  var slideTimer = setInterval(function () {
    if (direction == "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  pictures: Array<{
    _id: any;
    destination: string;
    filename: string;
  }>;
}

interface OrphanageParams {
  _id: any;
}

const mapIcon = L.icon({
  iconUrl: mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

function Detailpage() {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActivateImageIndex] = useState(0);
  const params = useParams<OrphanageParams>();

  useEffect(() => {
    api.get(`hosting/show?_id=${params._id}`).then((response: any) => {
      setOrphanage(response.data);
    });
  }, [params._id]);

  if (!orphanage) {
    return (
      <div id="detail-page">
        <SidebarPublic />

        <div className="skeleton-right-side">
          <div className="skeleton-content">
            <div className="skeleton-picture animate"></div>
            <div className="skeleton-below-picture">
              <div className="skeleton-nome-descricao">
                <h1 className="animate "></h1>
                <p className="skeleton-descricao-a animate "></p>
                <p className="skeleton-descricao-b animate "></p>
              </div>
              <div className="skeleton-list-pictures">
                <div className="skeleton-list-pictures-a animate"></div>
                <div className="skeleton-list-pictures-b animate"></div>
                <div className="skeleton-list-pictures-c animate"></div>
              </div>
              <div className="skeleton-map animate"></div>
              <hr className="skeleton-division" />
              <div className="skeleton-instructions">
                <h2 className="animate"></h2>
                <p className="skeleton-instructions-a animate"></p>
                <p className="skeleton-instructions-b animate"></p>
              </div>
              <div className="skeleton-buttons">
                <div className="skeleton-button-time animate"></div>
                <div className="skeleton-button-open-weekends animate"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="detail-page">
      <SidebarPublic />

      <div className="detail-page-rightside">
        <div className="detail-page-orphanage">
          <img
            className="detail-page-picture-focus"
            src={`/uploads/${orphanage.pictures[activeImageIndex].filename}`}
            // src={`${orphanage.pictures[activeImageIndex].destination}/${orphanage.pictures[activeImageIndex].filename}`}
            alt={orphanage.name}
          />

          <div className="detail-page-below-picture">
            <div className="detail-page-nome-descricao">
              <h1>{orphanage.name}</h1>
              <p>{orphanage.about}</p>
            </div>

            <div className="detail-page-pictures">
              <div id="detail-page-grid">
                {orphanage.pictures.map((image, index) => {
                  return (
                    <button
                      key={image._id}
                      className={activeImageIndex === index ? "active" : ""}
                      type="button"
                      onClick={() => {
                        setActivateImageIndex(index);
                      }}
                    >
                      <img
                        src={`/uploads/${image.filename}`}
                        alt={orphanage.name}
                      />
                    </button>
                  );
                })}
              </div>
              <button
                className="detail-page-pass-pictures-right"
                onClick={() => {
                  const container = document.getElementById("detail-page-grid");
                  const widthPicture = 0.16607 * window.screen.width;
                  if (container)
                    sideScroll(container, "right", 10, widthPicture, 10);
                  if (activeImageIndex < orphanage.pictures.length - 1)
                    setActivateImageIndex(activeImageIndex + 1);
                }}
              >
                <FiArrowRight className="detail-page-pass-pictures-arrow" />
              </button>
              <button
                className="detail-page-pass-pictures-left"
                onClick={() => {
                  const container = document.getElementById("detail-page-grid");
                  const widthPicture = 0.16607 * window.screen.width;
                  if (container)
                    sideScroll(container, "left", 10, widthPicture, 10);
                  if (activeImageIndex > 0)
                    setActivateImageIndex(activeImageIndex - 1);
                }}
              >
                <FiArrowLeft className="detail-page-pass-pictures-arrow" />
              </button>
            </div>

            <div className="detail-page-map-container">
              <MapContainer
                className="detail-page-map"
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
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

              <footer className="detail-page-footer-map">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <div className="detail-page-intructions">
              <h2>Instruções para visita</h2>
              <p>{orphanage.instructions}</p>
            </div>

            <div className="detail-page-time-visit">
              <div className="detail-page-box detail-page-time">
                <FiClock className="detail-page-time-icon" color="#15b6d6" />
                Horário de visitas <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends ? (
                <div className="detail-page-box detail-page-open-on-weekends">
                  <FiInfo
                    className="detail-page-on-weekends-icon"
                    color="#39CC83"
                  />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="detail-page-box detail-page-open-on-weekends-off">
                  <FiInfo
                    className="detail-page-off-weekends-icon"
                    color="#FF669D"
                  />
                  Não Atendemos <br />
                  fim de semana
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailpage;
