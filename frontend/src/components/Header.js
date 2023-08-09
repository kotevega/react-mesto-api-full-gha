import logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header({ isLoggedIn, email, onSignOut }) {
  function signOut() {
    localStorage.removeItem("jwt");
    onSignOut();
  }

  return (
    <header className="header">
      <img src={logo} alt="логотип Место" className="header__logo" />
      <div className="header__login">
        {isLoggedIn ? <p className="header__email">{email}</p> : ""}
        <Routes>
          <Route
            path="/"
            element={
              <Link className="header__link" to="/sign-in" onClick={signOut}>
                Выйти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
