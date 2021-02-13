import React from "react";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import OrfanatoCard from "../../../components/dashboard/OrfanatoCard";
import "./styles.css";

function Registeredpage() {
  return (
    <div id="registered-page">
      <SidebarDashboard />
      <div id="registered-page-main">
        <div className="registered-page-header">
          <p>Orfanatos cadastrados</p>
          <span>x orfanatos</span>
        </div>
        <div className="registered-page-cluster">
          <div className="registered-page-grid-container">
            <OrfanatoCard />
            <OrfanatoCard />
            <OrfanatoCard />
            <OrfanatoCard />
            <OrfanatoCard />
            <OrfanatoCard />
            <OrfanatoCard />
            <OrfanatoCard />
            <OrfanatoCard />
            <OrfanatoCard />
            <OrfanatoCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registeredpage;
