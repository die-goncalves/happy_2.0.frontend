import React, { useEffect, useState } from "react";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import OrfanatoCardPending from "../../../components/dashboard/OrfanatoCardPending";
import api from "../../../services/api";
import { Orphanage } from "../../../interfaces/orphanages";

import "./styles.css";

function Pendingpage() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("hosting/pending").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

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
