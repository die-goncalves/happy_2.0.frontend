import React from "react";
import L, { LatLngExpression } from "leaflet";
import { Circle, Marker, Popup } from "react-leaflet";
import youMarker from "../../images/you-better.svg";
import youShadowMarker from "../../images/you-better-shadow.svg";

const mapIcon = L.icon({
  iconUrl: youMarker,
  shadowUrl: youShadowMarker,
  iconSize: [47.0829, 63.00583],
  iconAnchor: [23.54145, 63.00583],
  shadowSize: [53.5373, 33.6722],
  shadowAnchor: [0, 33.6722],
  popupAnchor: [0.25, -63.00583],
});

type LocationParams = {
  mylocation: GeolocationPosition;
};

export default function MarkUser({ mylocation }: LocationParams) {
  const latlng: LatLngExpression = [
    mylocation.coords.latitude,
    mylocation.coords.longitude,
  ];
  return (
    <Marker position={latlng} icon={mapIcon}>
      <Popup closeButton={false} className="mark-user-popup">
        <h1>Você</h1>
        <span>Posição central:</span>
        <p>
          Latitude: {latlng[0]}
          <br />
          Longitude: {latlng[1]}
        </p>
      </Popup>
      <Circle
        center={latlng}
        pathOptions={{
          fillColor: "#f9fafb",
          fillOpacity: 0.3,
          stroke: true,
          color: "#0d4e6b",
          weight: 1.5,
        }}
        radius={mylocation.coords.accuracy}
      />
    </Marker>
  );
}
