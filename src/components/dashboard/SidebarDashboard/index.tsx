import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import mapMarker from "../../../images/map-marker.svg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiErrorWarningLine } from "react-icons/ri";
import { CgLogOff } from "react-icons/cg";

import "./styles.css";

function SidebarDashboard() {
  return (
    <div id="sidebar-dashboard">
      <div className="sidebar-dashboard-logo">
        <img src={mapMarker} alt="Happy" />
      </div>

      <div className="sidebar-dashboard-center">
        <div className="sidebar-dashboard-registered">
          <NavLink
            to="/dashboard/registered"
            className="sidebar-dashboard-box-registered"
            activeClassName="sidebar-dashboard-box-registered-active"
          >
            <HiOutlineLocationMarker className="sidebar-dashboard-icon-registered" />
          </NavLink>
        </div>
        <div className="sidebar-dashboard-pending">
          <NavLink
            to="/dashboard/pending"
            className="sidebar-dashboard-box-pending"
            activeClassName="sidebar-dashboard-box-pending-active"
          >
            <RiErrorWarningLine className="sidebar-dashboard-icon-pending" />
          </NavLink>
        </div>
      </div>

      <div className="sidebar-dashboard-off">
        <Link to="/" className="sidebar-dashboard-box-off">
          <CgLogOff className="sidebar-dashboard-icon-off" />
        </Link>
      </div>
    </div>
  );
}

export default SidebarDashboard;
