import React from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import { Link } from "react-router-dom";

import SuccessImg from "../../images/success.svg";
import "./styles.css";

function Successpage() {
  return (
    <div id="success-page">
      <div className="sp-left">
        <div id="sp-title">
          <p>Ebaaa!</p>
        </div>
        <div id="sp-description">
          <p>
            O cadastro deu certo e foi enviado <br /> ao administrador para ser
            aprovado.
            <br />
            Agora é só esperar <FaRegSmileBeam />
          </p>
        </div>
        <Link to="/map" id="sp-comeback">
          <p>Voltar para o mapa</p>
        </Link>
      </div>
      <div className="sp-right">
        <div id="sp-pictures">
          <img src={SuccessImg} alt="success" />
        </div>
      </div>
    </div>
  );
}

export default Successpage;
