import React from "react";
import "./styles.css";
import { FiArrowRight, FiKey } from "react-icons/fi";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div id="home-page">
      <div className="grid-container">
        <div className="logo"></div>
        <div className="city">
          <strong>Jaguaré</strong>
          <span>Espírito Santo</span>
        </div>
        <div className="restrict">
          <Link to="/dashboard/login" className="home-page-box-key">
            <span>Acesso restrito</span>
            <FiKey className="home-page-key" color="rgba(255, 214, 102, 1.0)" />
          </Link>
        </div>
        <div className="map">
          <Link to="/map" className="home-page-box-arrow">
            <FiArrowRight className="home-page-arrow" />
          </Link>
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

export default Homepage;
