import React from "react";
import {} from "react-hook-form";
import "./styles.css";
import LogotipoImg from "../../../images/logotipo.svg";

function Loginpage() {
  return (
    <div id="login-page">
      <div className="lp-left">
        <div>
          <img src={LogotipoImg} alt="logotipo" />
        </div>
        <div>
          <strong>Jaguaré</strong>
          <span>Espírito Santo</span>
        </div>
      </div>
      <div className="lp-right"></div>
    </div>
  );
}
export default Loginpage;
