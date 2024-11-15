import "./App.css";
import { useState, useEffect } from "react";

import api from "./utils/Api.js";

import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import PopupWithForm from "./components/PopupWithForm.jsx";
import EditProfilePopup from "./components/EditProfilePopup.jsx";
import ImagePopup from "./components/ImagePopup.jsx";
import EditAvatarPopup from "./components/EditAvatarPopup.jsx";
import AddPlacePopup from "./components/AddPlacePopup.jsx";

import { CurrentUserContext } from "./contexts/CurrentUserContext.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const getUserInfo = await api.getInfoProfile();
        setCurrentUser(getUserInfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserInfo();
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente.

  useEffect(() => {
    const getInitialCards = async () => {
      try {
        const cards = await api.getInitialCards();
        setCards(cards);
      } catch (err) {
        console.log(err);
      }
    };
    getInitialCards();
  }, []);

  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data.name, data.link).then((newCard) => {
      setCards((state) => [...state, newCard]);
    });
  }

  const handleUpdateProfile = async (data) => {
    try {
      const newData = await api.updateProfile(data.name, data.about);
      setCurrentUser(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const newData = await api.updateAvatar(data.avatar);
      setCurrentUser(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  // Función para manejar el evento de hacer click en una tarjeta y guardarlo en el estado actual
  const handleCardClick = (clickedCard) => {
    setSelectedCard(clickedCard);
  };

  // Función para cerrar todos los modales
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  // inserta los {children} de los formularios en el DOM
  return (
    <div className="page__container">
      <CurrentUserContext.Provider
        value={{ ...currentUser, handleUpdateProfile }} // {...} propaga todas las propiedades de currentUser
      >
        <Header />
        <Main
          // Esto permitirá que los controladores de eventos puedan seguir siendo llamados desde Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onUpdateAvatar={handleUpdateAvatar}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        ></Main>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
