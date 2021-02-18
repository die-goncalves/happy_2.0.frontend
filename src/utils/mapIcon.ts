import L from "leaflet";
import mapMarkerImg from "../images/map-marker.svg";

const mapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -68],
});

export default mapIcon;
