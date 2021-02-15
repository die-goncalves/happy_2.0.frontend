import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./styles.css";
import "leaflet/dist/leaflet.css";
import api from "../../services/api";

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  pictures: Array<{
    url: string;
  }>;
}

interface OrphanageParams {
  _id: any;
}

function Detailpage() {
  const [orphanage, setOrphanage] = useState<Orphanage[]>([]);
  const params = useParams<OrphanageParams>();
  // console.log(watch("pictures"));
  console.log(params._id);

  useEffect(() => {
    api.get(`hosting/show?_id=${params._id}`).then((response: any) => {
      setOrphanage(response.data);
    });
  }, [params._id]);

  return (
    <div id="detail-page">
      Detalhes
      <p> Seus parametros {params._id}</p>
    </div>
  );
}

export default Detailpage;
