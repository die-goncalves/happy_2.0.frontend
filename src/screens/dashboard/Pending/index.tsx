import React from "react";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import OrfanatoCardPending from "../../../components/dashboard/OrfanatoCardPending";
import "./styles.css";

function Pendingpage() {
  return (
    <div id="pending-page">
      <SidebarDashboard />
      <div id="pending-page-main">
        <div className="pending-page-header">
          <p>Cadastros pendentes</p>
          <span>x orfanatos</span>
        </div>
        <div className="pending-page-cluster">
          <div className="pending-page-grid-container">
            <OrfanatoCardPending />
            <OrfanatoCardPending />
            <OrfanatoCardPending />
            <OrfanatoCardPending />
            <OrfanatoCardPending />
            <OrfanatoCardPending />
            <OrfanatoCardPending />
            <OrfanatoCardPending />
            <OrfanatoCardPending />
            <OrfanatoCardPending />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pendingpage;
