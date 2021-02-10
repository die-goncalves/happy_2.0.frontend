import React from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import LogotipoImg from "../../../images/logotipo.svg";
import CustomCheckbox from "../../../hooks/useCustomCheckbox";
import PasswordToggle from "../../../hooks/usePasswordToggle";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
  remember: boolean;
}

function Loginpage() {
  const { InputType, Icon } = PasswordToggle();
  const { check, CheckBox } = CustomCheckbox();

  const { register, handleSubmit, errors, watch } = useForm<IFormInput>();
  const watchPassword = watch("password");

  const onSubmit = (data: IFormInput) => {
    console.log(data);
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
          <button className="submit-button" type="submit">
            Entrar
          </button>
        </form>
        {/* <form className="lp-form">
          <fieldset>
            <legend>Crie sua conta</legend>
            <div className="input-essencial">
              <label htmlFor="email">Email</label>
              <input
                className={`${errors.email ? "is-invalid" : "valid"}`}
                name="email"
                placeholder="fulano@email.com"
                autoComplete="off"
                // type="email"
                ref={register({
                  required: "Campo obrigatório",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Endereço de email inválido",
                  },
                })}
              />
              {errors.email ? (
                <p className="error-message">{errors.email.message}</p>
              ) : (
                <p className="gap-10"></p>
              )}
            </div>

            <div className="input-essencial">
              <label>Senha</label>
              <div className="container">
                <div id="input-password">
                  <input
                    id={`${errors.password ? "is-invalid" : "valid"}`}
                    name="password"
                    placeholder="123456;)"
                    autoComplete="off"
                    ref={register({
                      required: "Campo obrigatório",
                      minLength: {
                        value: 8,
                        message: "Sua senha deve ter no mínimo 8 caracteres",
                      },
                    })}
                  />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>

                <div
                  className={`${
                    errors.password
                      ? "div-icon-eye-invalid"
                      : "div-icon-eye-valid"
                  }`}
                >
                  {!(
                    getValues("password") === undefined ||
                    getValues("password") === ""
                  ) && <i className="password-toggle-icon"></i>}
                </div>
              </div>
              {errors.password ? (
                <p className="error-message">{errors.password.message}</p>
              ) : (
                <p className="gap-10"></p>
              )}
            </div>
          </fieldset>
        </form> */}
      </div>
    </div>
  );
}
export default Loginpage;
