import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { ImCheckmark, ImSpinner } from "react-icons/im";
import LogotipoImg from "../../images/logotipo.svg";
import api from "../../services/api";
import { useLocation } from "react-router-dom";

import "./styles.css";

interface IFormInput {
  new_password: string;
  confirm_password: string;
}

function Resetpage() {
  const [savednewPassword, setSavedNewPassword] = useState<boolean>(false);
  const [savingPassword, setSavingPassword] = useState<boolean>(false);
  const query = new URLSearchParams(useLocation().search);

  const { register, handleSubmit, errors, watch } = useForm<IFormInput>();

  const password = useRef({});
  password.current = watch("new_password", undefined);

  const onSubmit = async (data: IFormInput) => {
    setSavingPassword(true);

    const multipartForm = new FormData();
    multipartForm.append("new_password", data.new_password);
    multipartForm.append("confirm_password", data.confirm_password);
    await api.put(`/user/reset-password?t=${query.get("t")}`, multipartForm);

    setSavedNewPassword(true);
  };

  function stateButtonFunction() {
    if (savingPassword) {
      if (savednewPassword === false) {
        return (
          <button
            className="reset-page-button reset-page-button-spinner"
            disabled
          >
            <p>Trocar senha</p>
            <div className="reset-page-spinner">
              <ImSpinner className="fa-spin" />
            </div>
          </button>
        );
      } else {
        return (
          <button
            className="reset-page-button reset-page-button-check"
            disabled
          >
            <p>Senha trocada!</p>
            <div className="reset-page-check">
              <ImCheckmark className="icon-check" />
            </div>
          </button>
        );
      }
    } else {
      return (
        <button
          className="reset-page-button reset-page-button-submit"
          type="submit"
        >
          <p>Trocar senha</p>
        </button>
      );
    }
  }

  return (
    <div id="reset-page">
      <div className="reset-page-left">
        <div id="reset-page-logotipo">
          <img src={LogotipoImg} alt="logotipo" />
        </div>
        <div id="reset-page-city">
          <strong>Jaguaré</strong>
          <span>Espírito Santo</span>
        </div>
      </div>
      <div className="reset-page-right">
        <div className="voltar">
          <Link to="/dashboard/login" className="reset-page-box-arrow">
            <FaArrowLeft className="reset-page-arrow" />
          </Link>
        </div>
        <form className="reset-page-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Criar nova senha</legend>

            <div className="reset-page-input-new-password">
              <label>Digite sua nova senha</label>

              <input
                className={`${errors.new_password ? "invalid" : "valid"}`}
                name="new_password"
                autoComplete="off"
                ref={register({
                  required: "Campo obrigatório",
                  minLength: {
                    value: 8,
                    message: "Sua senha deve ter no mínimo 8 caracteres",
                  },
                })}
              />

              <div className="error">
                {errors.new_password ? (
                  <p className="error-message">{errors.new_password.message}</p>
                ) : null}
              </div>
            </div>

            <div className="reset-page-input-confirm-password">
              <label>Confirme sua senha</label>
              <input
                className={`${errors.confirm_password ? "invalid" : "valid"}`}
                name="confirm_password"
                type="password"
                autoComplete="off"
                ref={register({
                  required: "Campo obrigatório",
                  validate: (value) =>
                    value === password.current || "As senhas não coincidem",
                })}
              />

              <div className="error">
                {errors.confirm_password ? (
                  <p className="error-message">
                    {errors.confirm_password.message}
                  </p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <div className="reset-page-recognize-button">
            {stateButtonFunction()}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Resetpage;
