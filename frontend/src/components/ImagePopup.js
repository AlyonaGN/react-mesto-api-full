import React from 'react';

function ImagePopup({card, onClose}) {
  if (card){
    return (
      <div className="popup popup_opened popup_type_photo-view" onClick={onClose}>
        <figure className="popup__photo-card-fullscreen">
          <button type="button" className="popup__close-button popup__close-button_small" onClick={onClose}></button>
          <img className="popup__photo-fullscreen" src={card.src} alt={card.alt} />
          <figcaption className="popup__photo-caption">{card.description}</figcaption>
        </figure>
      </div>);
  }
  else {
    return null;
  }
}

export default ImagePopup;