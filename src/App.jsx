import { useEffect, useState } from "react";
import api from "./utils/api";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState({});
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

  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.updateProfile(data.name, data.description).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.updateAvatar(data.avatar).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  // CARDS COMPONENT

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

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(cardId) {
    try {
      await api.deleteCard(cardId);
      setCards((state) => state.filter((card) => card._id !== cardId));
    } catch (error) {
      console.error(error);
    }
  }

  // Añadir función para manejar nueva tarjeta
  const handleAddPlaceSubmit = async (name, link) => {
    try {
      const newCard = await api.postCard(name, link);
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <div>
          <Header />
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
    </>
  );
}

export default App;
