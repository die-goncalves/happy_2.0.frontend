import React from "react";
import "./styles.css";
import { FiArrowRight, FiKey } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

function Homepage() {
  const history = useHistory();
  const { isLoggedIn, isLoading } = useAuth();

  function isLogged() {
    if (isLoading === false) {
      if (isLoggedIn === true) {
        history.push("/dashboard/registered");
      } else {
        history.push("/dashboard/login");
      }
    }
  }

  return (
    <div id="home-page">
      <div className="grid-container">
        <div className="logo"></div>
        <div className="city">
          <strong>Jaguaré</strong>
          <span>Espírito Santo</span>
        </div>
        <div className="restrict">
          <button
            type="button"
            className="home-page-box-key"
            onClick={isLogged}
          >
            <span>Acesso restrito</span>
            <FiKey className="home-page-key" color="rgba(255, 214, 102, 1.0)" />
          </button>
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
