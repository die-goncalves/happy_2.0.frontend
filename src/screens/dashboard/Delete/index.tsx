import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteImg from "../../../images/delete.svg";
import { Orphanage, OrphanageParams } from "../../../interfaces/orphanages";
import api from "../../../services/api";
import { ImSpinner, ImCheckmark } from "react-icons/im";

import "./styles.css";

function Deletepage() {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [deleteOrphanage, setDeleteOrphanage] = useState<boolean>(false);
  const [spinnerCheck, setSpinnerCheck] = useState<boolean>(false);

  const params = useParams<OrphanageParams>();

  function deleteFunction() {
    setDeleteOrphanage(true);
    api.delete(`/hosting/delete?_id=${params._id}`).then(() => {
      setSpinnerCheck(true);
    });
  }

  function spinnerFunction() {
    if (deleteOrphanage) {
      if (spinnerCheck === false) {
        return (
          <button
            className="delete-page-button delete-page-button-spinner"
            disabled
          >
            <div className="delete-page-spinner">
              <ImSpinner className="fa-spin" />
            </div>
          </button>
        );
      } else {
        return (
          <button
            className="delete-page-button delete-page-button-check"
            disabled
          >
            <div className="delete-page-check">
              <ImCheckmark className="icon-check" />
            </div>
          </button>
        );
      }
    } else {
      return (
        <button
          className="delete-page-button  delete-page-button-question"
          onClick={deleteFunction}
        >
          <p>Quero excluir</p>
        </button>
      );
    }
  }

  useEffect(() => {
    api.get(`hosting/show?_id=${params._id}`).then((response: any) => {
      setOrphanage(response.data);
    });
  }, []);

  return (
    <div id="delete-page">
      <div className="delete-page-left">
        <div id="delete-page-title">
          <p>Excluir!</p>
        </div>
        <div id="delete-page-description">
          <p>
            Você tem certeza que quer <br />
            excluir {orphanage && orphanage.name}?
          </p>
        </div>
        {spinnerFunction()}
        <div className="delete-page-options">
          <Link to="/map" id="delete-page-comeback-map">
            <p>Ir para o mapa</p>
          </Link>
          <Link to="/dashboard/registered" id="delete-page-comeback-registered">
            <p>Excluir mais um?</p>
          </Link>
        </div>
      </div>
      <div className="delete-page-right">
        <div id="delete-page-pictures">
          <img src={DeleteImg} alt="success" />
        </div>
      </div>
    </div>
  );
}

export default Deletepage;
