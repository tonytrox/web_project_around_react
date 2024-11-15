import "./App.css";
import { useState, useEffect } from "react";

import api from "./utils/Api.js";

import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import PopupWithForm from "./components/PopupWithForm.jsx";
import EditProfilePopup from "./components/EditProfilePopup.jsx";
import ImagePopup from "./components/ImagePopup.jsx";

import { CurrentUserContext } from "./contexts/CurrentUserContext.jsx";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

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

  const handleUpdateProfile = async (data) => {
    try {
      const newData = await api.updateProfile(data.name, data.about);
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
        ></Main>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name="edit-avatar"
          title="Cambiar foto de perfil"
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          sendButtonText="Guardar"
        >
          <input
            className="form__image-link popup__input"
            id="form__image-link"
            type="url"
            name="link"
            placeholder="Enlace de la imagen"
            required
          />
          <span className="popup__error form__image-link-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="add-place"
          title="Nuevo lugar"
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          sendButtonText="Crear"
        >
          <input
            className="form__place popup__input"
            id="form__place"
            type="text"
            name="place"
            placeholder="Título"
            minlength="2"
            maxlength="30"
            required
          />
          <span className="popup__error form__place-error"></span>
          <input
            className="form__image-link popup__input"
            id="form__image-link"
            type="url"
            name="link"
            placeholder="Enlace de la imagen"
            required
          />
          <span className="popup__error form__image-link-error"></span>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
