import React, { useEffect } from "react";
import L, { DomUtil } from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import { Map } from "leaflet";
import userMarker from "../../images/user-icon.svg";

type LocationParams = {
  mylocation: GeolocationPosition | null;
};

export default function MyLocation({ mylocation }: LocationParams) {
  const context = useLeafletContext();

  const MyControl = L.Control.extend({
    onAdd: (map: Map) => {
      let container = DomUtil.create("div");
      container.className = "findme";

      container.style.borderRadius = "50%";
      container.style.backgroundColor = "white";
      container.style.pointerEvents = "visiblePainted";
      container.style.width = "30px";
      container.style.height = "30px";
      container.style.backgroundImage = `url(${userMarker}`;
      container.style.backgroundSize = "55% 55%";
      container.style.backgroundRepeat = "no-repeat";
      container.style.backgroundPosition = "center center";
      container.style.cursor = "pointer";
      container.style.touchAction = "none";
      container.onmouseenter = function () {
        container.style.backgroundColor = "#ebebeb";
      };
      container.onmouseleave = function () {
        container.style.backgroundColor = "white";
      };
      container.style.transition = "all 0.5s";

      L.DomEvent.on(container, "click", function () {
        if (mylocation) {
          map.flyTo(
            [mylocation.coords.latitude, mylocation.coords.longitude],
            map.getZoom()
          );
        }
      });

      return container;
    },
    // this one is optional
    onRemove: (map: Map) => {},
  });

  function myControl(opts: any) {
    return new MyControl(opts);
  }

  useEffect(() => {
    const container = context.map;

    const control = myControl({ position: "topleft" });
    container.addControl(control);

    return () => {
      container.removeControl(control);
    };
  });

  return null;
}
