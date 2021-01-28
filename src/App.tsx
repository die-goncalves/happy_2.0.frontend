import React from "react";
import "./homepage.css";
import { FiArrowRight, FiKey } from "react-icons/fi";

function App() {
  return (
    <div id="homepage">
      <div className="grid-container">
        <div className="logo"></div>
        <div className="city">
          <strong>Jaguaré</strong>
          <span>Espírito Santo</span>
        </div>
        <div className="restrict">
          <div className="box-key">
            <span>Acesso restrito</span>
            <FiKey className="key" color="rgba(255, 214, 102, 1.0)" />
          </div>
        </div>
        <div className="map">
          <div className="box-arrow">
            <FiArrowRight className="arrow" color="rgba(255, 214, 102, 1.0)" />
          </div>
        </div>
        <div className="img"></div>
        <div className="description">
          <p>Visite orfanatos e mude o dia de muitas crianças!</p>
        </div>
        <div className="title">
          <h1>
            Leve
            <br />
            felicidade
            <br />
            para
            <br />o mundo
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
