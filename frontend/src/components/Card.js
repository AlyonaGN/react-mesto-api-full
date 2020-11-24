import React, { useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({cardId, card, onCardClick, onCardLike, onCardDelete }) {
    const handleClick = useCallback(() => {
        onCardClick(card);
    }, [onCardClick, card]);
    
    const handleLikeClick = useCallback(() => {
        onCardLike(card);
      }, [onCardLike, card]);

      const handleDeleteClick = useCallback(() => {
          onCardDelete(card);
      }, [onCardDelete, card]);

    const currentUserData = React.useContext(CurrentUserContext);
    const isOwnCard = card.ownerId === currentUserData._id;
    const isLiked = card.likes.some(item => item._id === currentUserData._id);

    const cardDeleteButtonClassName = (
        `photo-card__delete-button ${isOwnCard && 'photo-card__delete-button_visible'}`
      );
    const cardLikeButtonClassName = (`photo-card__like ${isLiked && 'photo-card__like_active'}`);

    return (
        <li>
            <figure className="photo-card">
                <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
                <img className="photo-card__photo" src={card.src} alt={card.alt} onClick={handleClick} />
                <figcaption className="photo-card__caption">
                    <h2 className="photo-card__description">{card.description}</h2>
                    <div className="photo-card__like-container">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                        <p className="photo-card__likes-amount">{card.likesAmount}</p>
                    </div>
                </figcaption>
            </figure>
        </li>
    )
}

export default Card;
