import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDeleteClick}) {
  const currentUserData = React.useContext(CurrentUserContext);

  if (currentUserData) {
    return (
      <main className="content-container page__content-container">
          <section className="profile content-container__profile">
            
            <div className="profile__avatar-overlay">
              <img className="profile__avatar" alt="здесь должно быть фото профиля, но что-то пошло не так" src={currentUserData.avatar}/>
              <button type="button" className="profile__avatar-change-button" onClick={onEditAvatar}></button>
            </div>
            
            <div className="profile__info">
              <div className="profile__name-and-button-container">
                <h1 className="profile__name">{currentUserData.name}</h1>
                <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
              </div>
              <p className="profile__description">{currentUserData.about}</p>
            </div>
            
            <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
          
          </section>
  
          <section className="photo-cards">
            
            <ul className="photo-cards__list">
              {cards.map(card => <Card key={card.id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDeleteClick} />)}
            </ul>
            
          </section>
        </main>
    );
  }
  else {
    return null;
  }
  
  
}

export default Main;
