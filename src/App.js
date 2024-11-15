import "./App.css";
import { useState, useEffect } from "react";

import api from "./utils/Api.js";

import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";
import Popup from "./components/Popup.js";
import EditProfile from "./components/EditProfile.js";
import ImagePopup from "./components/ImagePopup.jsx";
import EditAvatar from "./components/EditAvatar.js";
import NewCard from "./components/NewCard.js";

import { CurrentUserContext } from "./contexts/CurrentUserContext.js";

function App() {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
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
    setIsEditAvatarOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsNewCardOpen(true);
  };
  // Función para manejar el evento de hacer click en una tarjeta y guardarlo en el estado actual
  const handleCardClick = (clickedCard) => {
    setSelectedCard(clickedCard);
  };

  // Función para cerrar todos los modales
  const closeAllPopups = () => {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsNewCardOpen(false);
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
        <EditProfile isOpen={isEditProfileOpen} onClose={closeAllPopups} />
        <EditAvatar
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <NewCard
          isOpen={isNewCardOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
