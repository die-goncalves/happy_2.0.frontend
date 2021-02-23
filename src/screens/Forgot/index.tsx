import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import LogotipoImg from "../../images/logotipo.svg";
import api from "../../services/api";

import "./styles.css";

interface IFormInput {
  email: string;
}

function Forgotpage() {
  const [recognize, setRecognize] = useState<number>(0);
  const [sendEmail, setSendEmail] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    const multipartForm = new FormData();
    multipartForm.append("email", data.email);

    api.get(`user/get-email?_user=${data.email}`).then(
      async () => {
        setRecognize(0);
        setSendEmail(true);
        await api.post(`user/forgot-password`, multipartForm);
      },
      () => {
        setRecognize(recognize + 1);
      }
    );
  };

  return (
    <div id="forgot-page">
      <div className="forgot-page-left">
        <div id="forgot-page-logotipo">
          <img src={LogotipoImg} alt="logotipo" />
        </div>
        <div id="forgot-page-city">
          <strong>Jaguaré</strong>
          <span>Espírito Santo</span>
        </div>
      </div>
      <div className="forgot-page-right">
        <div className="voltar">
          <Link to="/dashboard/login" className="forgot-page-box-arrow">
            <FaArrowLeft className="forgot-page-arrow" />
          </Link>
        </div>
        <form className="forgot-page-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Esqueci a senha</legend>
            <div className="forgot-page-info">
              <p>
                Sua redefinição de senha será enviada para o e-mail cadastrado
              </p>
            </div>
            <div className="forgot-page-input-email">
              <label>E-mail</label>
              <input
                className={`${errors.email ? "invalid" : "valid"}`}
                type="text"
                name="email"
                placeholder="fulano@gmail.com"
                autoComplete="off"
                ref={register({
                  required: "E-mail obrigatório",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "E-mail inválido",
                  },
                })}
              />
              <div className="error">
                {errors.email ? (
                  <p className="error-message">{errors.email.message}</p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <div className="forgot-page-recognize-button">
            {recognize !== 0 && (
              <div className="login-page-recognize">
                <p>
                  <span>{recognize}!</span> E-mail não bate com nenhum e-mail
                  cadastrado.
                </p>
              </div>
            )}

            {!sendEmail ? (
              <button className="forgot-page-submit-button" type="submit">
                Enviar
              </button>
            ) : (
              <button disabled className="forgot-page-button-check">
                <div className="forgot-page-inside-button">
                  <p>Verifique seu e-mail</p>
                  <div className="forgot-page-check">
                    <ImCheckmark className="icon-check" />
                  </div>
                </div>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Forgotpage;
