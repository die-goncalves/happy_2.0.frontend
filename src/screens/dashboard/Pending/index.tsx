import React, { useEffect, useState } from "react";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import OrfanatoCardPending from "../../../components/dashboard/OrfanatoCardPending";
import api from "../../../services/api";
import { Orphanage } from "../../../interfaces/orphanages";
import zeroOrphanages from "../../../images/zero-orphanages.svg";

import "./styles.css";

function Pendingpage() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("hosting/pending").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  if (orphanages.length === 0) {
    return (
      <div id="pending-page">
        <SidebarDashboard />

        <div id="pending-page-main-zero">
          <div className="pending-page-header-zero">
            <p>Cadastros pendentes</p>
          </div>
          <div className="pending-page-zero-orphanages">
            <div className="pending-page-zero-orphanages-image">
              <img src={zeroOrphanages} alt="no-orphanages" />
            </div>
            <div className="pending-page-zero-orphanages-text">
              <p>Nenhum no momento</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="pending-page">
      <SidebarDashboard />
      <div id="pending-page-main">
        <div className="pending-page-header">
          <p>Cadastros pendentes</p>
          <span>{orphanages.length} orfanatos</span>
        </div>
        <div className="pending-page-cluster">
          <div className="pending-page-grid-container">
            {orphanages.map((element) => {
              return (
                <OrfanatoCardPending key={element._id} orphanage={element} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pendingpage;
