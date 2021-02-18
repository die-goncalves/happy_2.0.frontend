import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import LogotipoImg from "../../../images/logotipo.svg";
import CustomCheckbox from "../../../hooks/useCustomCheckbox";
import PasswordToggle from "../../../hooks/usePasswordToggle";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";

interface IFormInput {
  email: string;
  password: string;
  remember: boolean;
}

function Loginpage() {
  const [recognize, setRecognize] = useState<number>(0);
  const { InputType, Icon } = PasswordToggle();
  const { check, CheckBox } = CustomCheckbox();
  const { logIn } = useAuth();
  const history = useHistory();

  const { register, handleSubmit, errors, watch } = useForm<IFormInput>();
  const watchPassword = watch("password");

  const onSubmit = async (data: IFormInput) => {
    // console.log(data);
    const multipartForm = new FormData();
    multipartForm.append("email", data.email);
    multipartForm.append("password", data.password);

    await logIn(multipartForm).then(
      () => {
        setRecognize(0);
        history.push("/dashboard/registered");
      },
      () => {
        setRecognize(recognize + 1);
      }
    );
  };

  return (
    <div id="login-page">
      <div className="lp-left">
        <div id="lp-logotipo">
          <img src={LogotipoImg} alt="logotipo" />
        </div>
        <div id="lp-city">
          <strong>Jaguaré</strong>
          <span>Espírito Santo</span>
        </div>
      </div>
      <div className="lp-right">
        <div className="voltar">
          <Link to="/" className="box-arrow">
            <FaArrowLeft className="arrow" />
          </Link>
        </div>
        <form className="lp-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Fazer login</legend>
            <div className="input-email">
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
            <div className="input-password">
              <label>Senha</label>
              <input
                className={`${errors.password ? "invalid" : "valid"}`}
                name="password"
                type={InputType}
                placeholder="123456;)"
                autoComplete="off"
                ref={register({
                  required: "Senha obrigatória",
                })}
              />
              <div className="error">
                {errors.password ? (
                  <p className="error-message">{errors.password.message}</p>
                ) : null}
              </div>
              <div
                className={`${
                  errors.password
                    ? "div-icon-eye-invalid"
                    : "div-icon-eye-valid"
                }`}
              >
                {errors.password === undefined &&
                  !(watchPassword === undefined || watchPassword === "") && (
                    <div className="teste">{Icon}</div>
                  )}
              </div>
            </div>
            <div className="input-remember">
              <div className="lembrar-me">
                <i className="i-checkbox">{CheckBox}</i>
                <input
                  type="hidden"
                  value={`${check}`}
                  name="remember"
                  ref={register}
                />
                <label>Lembrar-me</label>
              </div>

              <div className="esqueci">
                <label htmlFor="input-esqueci" className="input-simulate">
                  Esqueci minha senha
                </label>
                <input
                  id="input-esqueci"
                  type="button"
                  onClick={() => console.log("redirecionar")}
                />
              </div>
            </div>
          </fieldset>

          <div className="login-page-recognize-button">
            {recognize !== 0 && (
              <div className="login-page-recognize">
                <p>
                  <span>{recognize}!</span> E-mail e senha não batem com nenhum
                  usuário cadastrado.
                </p>
              </div>
            )}

            <button className="submit-button" type="submit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Loginpage;
