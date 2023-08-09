import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          aria-label="Редактирование аватара"
          className="profile__edit-avatar"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar}
            alt="фото пользователя"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__user">
            <div className="profile__user-edit">
              <h1 id="profile-name" className="profile__name">
                {currentUser.name}
              </h1>
              <button
                type="button"
                aria-label="Редактирование профиля"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p id="profile-occupation" className="profile__occupation">
              {currentUser.about}
            </p>
          </div>
          <button
            type="button"
            aria-label="Редактирование карточки"
            className="profile__add-button"
            onClick={onAddPlace}
          ></button>
        </div>
      </section>
      <section className="elements" aria-label="Фотографии пользователя">
        <ul className="element">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
