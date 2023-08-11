import React from "react";
import { Navigate, useNavigate, Route, Routes } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import Register from "./Register.js";
import Login from "./Login.js";
import api from "../utils/api.js";
import { checkTokenApi, signOut } from "../utils/auth.js";

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [titleTooltip, setTitleTooltip] = React.useState("");
  const [iconTooltip, setIconTooltip] = React.useState("");

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoadingAvatar, setIsLoadingAvatar] = React.useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = React.useState(false);
  const [isLoadingCard, setIsLoadingCard] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfoFromApi(), api.getInitialCardsApi()])
        .then(([dataUser, card]) => {
          setCurrentUser(dataUser);
          setCards(card);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [isLoggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((card) => card === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCardFromApi(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(data) {
    setIsLoadingUserData(true);
    api
      .patchUserInfoToApi(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoadingUserData(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatar(true);
    api
      .patchUserAvatarToApi(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoadingAvatar(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoadingCard(true);
    api
      .postNewCardApi(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoadingCard(false));
  }

  function handleLogin(email) {
    setEmail(email);
    setLoggedIn(true);
  }

  const checkToken = () => {
    checkTokenApi()
      .then((res) => {
        if (!res) {
          return;
        }
        handleLogin(res.email);
        navigate("/", { replace: true });
      })
      .catch((evt) => {
        setLoggedIn(false);
        setEmail("");
        console.log(`Ошибка: ${evt}`);
      });
  };

  React.useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openSuccessTooltip() {
    setIsInfoTooltipOpen(true);
    setIconTooltip("success");
    setTitleTooltip("Вы успешно зарегистрировались!");
  }

  function openErrorTooltip() {
    setIsInfoTooltipOpen(true);
    setIconTooltip("error");
    setTitleTooltip("Что-то пошло не так! Попробуйте ещё раз.");
  }

  function logOut() {
    signOut()
      .then((res) => {
        if (!res) {
          return;
        }
        setLoggedIn(false);
      })
      .catch((evt) => {
        console.log(`Ошибка: ${evt}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header isLoggedIn={isLoggedIn} email={email} onSignOut={logOut} />
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Register
                  onSuccess={openSuccessTooltip}
                  onError={openErrorTooltip}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login onLogin={handleLogin} onError={openErrorTooltip} />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          {isLoggedIn && <Footer />}

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoadingUserData}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoadingAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoadingCard}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            title={titleTooltip}
            iconTooltip={iconTooltip}
          />

          <PopupWithForm name="accept" title="Вы уверены?">
            <button type="submit" className="popup__submit-button">
              Да
            </button>
          </PopupWithForm>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
