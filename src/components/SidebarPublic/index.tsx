import React from "react";
import { Link } from "react-router-dom";
import mapMarker from "../../images/map-marker.svg";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

type PathParams = {
  path: string;
};

function SidebarPublic({ path }: PathParams) {
  return (
    <div id="sidebar-public">
      <div className="sidebar-public-logo">
        <img src={mapMarker} alt="Happy" />
      </div>

      <Link to={path} className="sidebar-public-goback">
        <FiArrowLeft className="sidebar-public-goback-arrow" />
      </Link>
    </div>
  );
}

export default SidebarPublic;
