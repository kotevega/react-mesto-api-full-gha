function ImagePopup({ onClose, card }) {
  return (
    <div
      className={`popup popup_type-zoom ${card.link && "popup_opened"} : ""`}
    >
      <div className="popup__area">
        <figure className="popup__card">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__heading">{card.name}</figcaption>
        </figure>
        <button
          type="button"
          aria-label="Закртыие попапа"
          id="close-popup-image"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
