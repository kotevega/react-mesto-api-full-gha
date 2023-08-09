import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

function Login({ onLogin, onError }) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        onLogin(formValue.email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        onError();
        console.log(`Ошибка: ${err}`);
      });
  };

  return (
    <div className="register">
      <h2 className="register__headig">Вход</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          placeholder="Email"
          type="email"
          name="email"
          required
          value={formValue.email || ""}
          onChange={handleChange}
        ></input>
        <input
          className="register__input"
          placeholder="Пароль"
          type="password"
          name="password"
          required
          value={formValue.password || ""}
          onChange={handleChange}
        ></input>
        <button type="submit" className="register__submit-button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
