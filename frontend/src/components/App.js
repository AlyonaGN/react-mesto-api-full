import React, { useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { api } from '../utils/Api.js';
import '../index.css';
import DeleteCardPopup from './DeleteCardPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import RegistrationResultsPopup from './RegistrationResultsPopup.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { ROUTES_MAP } from '../utils/routesMap.js';
import { getToken, removeToken } from "../utils/token";
import { getContent } from '../utils/Authentication.js';
import { login } from '../utils/Authentication.js';
import { register } from '../utils/Authentication.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [cardToBeDeleted, setCardToBeDeleted] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistrationPopupOpen, setRegistrationPopupOpen] = React.useState(false);
  const [isRegistrationSuccessfull, setRegistrationSuccessfull] = React.useState(false);
  const [userData, setUserData] = React.useState({id: '', email: ''});
  const [isLoading, setIsLoading] = React.useState(true);
  const history = useHistory();

  const checkToken = useCallback(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    getContent(jwt)
      .then((res) => {
        if (res) {
          setUserData({
            id: res.data._id,
            email: res.data.email
          })
        }
      })
      .then(() => {
        setLoggedIn(true);
        history.push(ROUTES_MAP.MAIN);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [setLoggedIn, history]);

  React.useEffect(() => {
    Promise.all([api.loadAppInfo()
      .then(([cardsFromServer, userData]) => {
      const initialCards = cardsFromServer.map((initialCard) => {
        return api.createCard(initialCard);
      })
      setCards(initialCards);
      setUser(userData);
      })
      .catch((err) => {
        console.log(err);
      }), checkToken()])
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  const handleCardLike = useCallback((card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card.id, isLiked)
      .then((newCard) => {
        newCard = api.createCard(newCard);
        const newCards = cards.map((c) => c.id === card.id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setCards, cards, currentUser]);

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setRegistrationPopupOpen(false);
  }, [setEditProfilePopupOpen, setAddPlacePopupOpen, setEditAvatarPopupOpen, setIsDeleteCardPopupOpen, setSelectedCard]);

  const closeSuccessfullRegPopup = useCallback(() => {
    closeAllPopups();
    if (isRegistrationSuccessfull){
      history.push(ROUTES_MAP.SIGNIN);
    }
    setRegistrationSuccessfull(false);
  }, [closeAllPopups, history, isRegistrationSuccessfull]);
  
  const handleDeleteCard = useCallback(() => {
    const cardId = cardToBeDeleted.id;
    api.deleteCard(cardId)
      .then(() => {
        const cardsWithoutDeletedCard = cards.filter((item) => {
          return item.id !== cardId;
        })
        setCards(cardsWithoutDeletedCard);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [closeAllPopups, cardToBeDeleted, cards]);

  const handleAddCard = useCallback((newCardData) => {
    api.addNewCard(newCardData.link, newCardData.photoDescription)
      .then((newCard) => {
        newCard = api.createCard(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }, [cards, closeAllPopups]);

  const handleUpdateUser = useCallback((formValues) => {
    api.editProfile(formValues)
      .then((res) => {
        setUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }, [closeAllPopups]);

  const handleUpdateAvatar = useCallback((avatarObject) => {
    api.changeAvatar(avatarObject.avatar)
      .then((updatedUserData) => {
        setUser(updatedUserData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }, [closeAllPopups]);

  const handleSignout = useCallback(() => {
    removeToken();
    setLoggedIn(false);
  }, []);

  const prepareCardForDeletion = useCallback((card) => {
    setCardToBeDeleted(card);
  }, [setCardToBeDeleted]);

    return (isLoading ? <span className="preloader__text">Секундочку...</span> :
      <CurrentUserContext.Provider value={currentUser}>
          <Header email={userData.email} onSignout={handleSignout} />
          <Switch>
            <Route path={ROUTES_MAP.SIGNUP}>
              <Register onClose={closeAllPopups} onRegister={
                function handleRegister(password, email) {
                  register(password, email)
                  .then((res) => {
                    if (res) {
                      setRegistrationSuccessfull(true);
                    }
                  })
                  .then(() => {
                    setRegistrationPopupOpen(true);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                }
              } 
            />
            </Route>
            <Route path={ROUTES_MAP.SIGNIN}>
              <Login onLogin={
                function handleLogin(password, email) {
                    login(password, email)
                    .then((res) => {
                      console.log(res);   
                      if (res) {
                        setUserData(userData);
                        setLoggedIn(true);
                        history.push(ROUTES_MAP.MAIN);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                }
              }/>
            </Route>
            <ProtectedRoute path={ROUTES_MAP.MAIN} isUserLoggedIn={loggedIn} component={Main} 
              onEditProfile={() => setEditProfilePopupOpen(true)}
              onAddPlace={() => setAddPlacePopupOpen(true)}
              onEditAvatar={() => setEditAvatarPopupOpen(true)}
              onCardClick={function handleCardClick(card) {
                setSelectedCard(card);
              }}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDeleteClick={function handleDeleteCardClick(card) {
                setIsDeleteCardPopupOpen(true);
                prepareCardForDeletion(card);
              }
            } />
          </Switch>
          <Footer />
  
          {isEditProfilePopupOpen && <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />}
  
          <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeletionConfirm={handleDeleteCard} />
  
          {isAddPlacePopupOpen && <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />}
  
          {isEditAvatarPopupOpen && <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />}
  
          {isRegistrationPopupOpen && <RegistrationResultsPopup onClose={closeSuccessfullRegPopup} isOpen={isRegistrationPopupOpen} isRegSuccessfull={isRegistrationSuccessfull} />}
  
          <ImagePopup name="change-avatar" card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>);
}

export default App;
