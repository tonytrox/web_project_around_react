import "./App.css";
import { useState, useEffect } from "react";

import api from "./utils/Api.js";

import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import PopupWithForm from "./components/PopupWithForm.jsx";
import ImagePopup from "./components/ImagePopup.jsx";

import { CurrentUserContext } from "./contexts/CurrentUserContext.jsx";
º;
function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await api.getInfoProfile();
        setCurrentUser(userInfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserInfo();
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente.

  // Manejadores de eventos para abrir y cerrar modales
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  // inserta los {children} de los formularios en el DOM
  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
        ></Main>
        <Footer />
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
          name="edit-profile"
          title="Editar perfil"
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          sendButtonText="Guardar"
        >
          <input
            className="form__name popup__input"
            id="form__name"
            type="text"
            name="name"
            placeholder="Nombre"
            maxlength="40"
            minlength="2"
            required
          />
          <span className="popup__error form__name-error"></span>
          <input
            className="form__description popup__input"
            id="form__description"
            type="text"
            name="description"
            placeholder="Descripción"
            maxlength="200"
            minlength="2"
            required
          />
          <span className="popup__error form__description-error"></span>
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
