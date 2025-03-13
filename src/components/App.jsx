import { useEffect, useState } from "react";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState({}); // estado del usuario actual
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  function handleOpenPopup(popup) {
    if (popup.link) {
      setSelectedCard(popup);
    } else {
      setPopup(popup);
    }
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  // useEffect, obtiene la información del usuario y lo guarda en el estado: currentUser
  useEffect(() => {
    (async () => {
      await api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) =>
          console.error(
            "Error al obtener la información del usuario:",
            error.message || error
          )
        );
    })();
  }, []); // [] lo ejecutamos solo la primera vez

  // Función para actualizar el perfil del usuario
  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .updateProfile(data.name, data.description)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) =>
          console.error(
            "Error al actualizar el perfil del usuario:",
            error.message || error
          )
        );
    })();
  };

  // Función para actualizar el avatar del usuario
  const handleUpdateAvatar = (data) => {
    (async () => {
      await api
        .updateAvatar(data.avatar)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) =>
          console.error(
            "Error al actualizar el avatar:",
            error.message || error
          )
        );
    })();
  };

  // Cargar tarjetas iniciales
  useEffect(() => {
    const getInitialCards = async () => {
      try {
        const cards = await api.getInitialCards();
        setCards(cards);
      } catch (error) {
        console.error(
          "Error al obtener las tarjetas iniciales:",
          error.message || error
        );
      }
    };
    getInitialCards();
  }, []); // [] se ejecuta solo la primera vez

  // Comprueba si le han dado like a la tarjeta
  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtiene la tarjeta actualizada
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(
        console.error(
          "Error al cambiar el estado del like:",
          error.message || error
        )
      );
  }

  async function handleCardDelete(cardId) {
    try {
      await api.deleteCard(cardId);
      // Filtra las tarjetas para eliminar la que coincida con el ID
      setCards((state) => state.filter((card) => card._id !== cardId));
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error.message || error);
    }
  }

  // Función que agrega una nueva tarjeta
  const handleAddPlaceSubmit = async (name, link) => {
    try {
      const newCard = await api.postCard(name, link);
      // Añadir la nueva tarjeta al inicio sin modificar la lista existente
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (error) {
      console.error("Error al agregar la tarjeta:", error.message || error);
    }
  };

  return (
    // <>
    // Paso 2: Proveer el Contexto
    // Proveedor del contexto, pasamos el valor del usuario actual y las funciones de actualización
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div>
        <Header />
        {/* Pasamos las props necesarias a Main */}
        <Main
          selectedCard={selectedCard}
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlace={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
    // </>
  );
}

export default App;
