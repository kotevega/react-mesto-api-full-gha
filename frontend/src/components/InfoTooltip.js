import React from "react";
import iсonSuccess from "../images/ok.svg";
import iсonError from "../images/notOk.svg";

function InfoTooltip({ isOpen, onClose, iconTooltip, title }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container_type_tooltip">
        <div>
          {iconTooltip === "success" ? (
            <img src={iсonSuccess} alt="Успех" />
          ) : (
            <img src={iсonError} alt="Ошибка" />
          )}
        </div>
        <h2 className="popup__title_type_tooltip">{title}</h2>
        <button
          type="button"
          aria-label="Закрытие попапа"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
