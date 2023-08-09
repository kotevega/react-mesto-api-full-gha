import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="user"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <label className="popup__fildset">
        <input
          type="text"
          name="name"
          placeholder="Имя"
          id="popup-name"
          className="popup__input"
          required
          minLength="2"
          maxLength="40"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <span className="popup__input-error popup__input-error_type_name"></span>
      </label>
      <label className="popup__fildset">
        <input
          type="text"
          name="about"
          placeholder="Род деятельности"
          id="popup-about"
          className="popup__input"
          required
          minLength="2"
          maxLength="200"
          onChange={(e) => setDescription(e.target.value)}
          value={description || ""}
        />
        <span className="popup__input-error popup__input-error_type_about"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
