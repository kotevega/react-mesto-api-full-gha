import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

function Register({ onSuccess, onError }) {
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
      .register(formValue.email, formValue.password)
      .then(() => {
        onSuccess();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        onError();
        console.log(`Ошибка: ${err}`);
      });
  };

  return (
    <div className="register">
      <h2 className="register__headig">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          placeholder="Email"
          type="email"
          name="email"
          required
          value={formValue.email}
          onChange={handleChange}
        ></input>
        <input
          className="register__input"
          placeholder="Пароль"
          type="password"
          name="password"
          required
          value={formValue.password}
          onChange={handleChange}
        ></input>
        <button type="submit" className="register__submit-button">
          Зарегистрироваться
        </button>
        <Link className="register__login-link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
