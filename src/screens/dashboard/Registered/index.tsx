import React, { useEffect, useState } from "react";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import OrfanatoCard from "../../../components/dashboard/OrfanatoCard";
import api from "../../../services/api";
import { Orphanage } from "../../../interfaces/orphanages";

import "./styles.css";

function Registeredpage() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("hosting").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="registered-page">
      <SidebarDashboard />
      <div id="registered-page-main">
        <div className="registered-page-header">
          <p>Orfanatos cadastrados</p>
          <span>{orphanages.length} orfanatos</span>
        </div>
        <div className="registered-page-cluster">
          <div className="registered-page-grid-container">
            {orphanages.map((element) => {
              return <OrfanatoCard key={element._id} orphanage={element} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registeredpage;
