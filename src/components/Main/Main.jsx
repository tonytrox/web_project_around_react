import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Popup from "./components/Popup/Popup";
import EditAvatar from "./components/Popup/form/EditAvatar/EditAvatar";
import NewCard from "./components/Popup/form/NewCard/NewCard";
import EditProfile from "./components/Popup/form/EditProfile/EditProfile";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";

export default function Main(props) {
  const {
    selectedCard,
    popup,
    onOpenPopup,
    onClosePopup,
    cards,
    onCardLike,
    onCardDelete,
    onAddPlace,
  } = props;
  const { currentUser } = useContext(CurrentUserContext);

  // const [cards, setCards] = useState([]);

  // useEffect(() => {
  //   const getInitialCards = async () => {
  //     try {
  //       const cards = await api.getInitialCards();
  //       setCards(cards);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getInitialCards();
  // }, []);

  // async function handleCardLike(card) {
  //   // Verifica una vez más si a esta tarjeta ya les has dado like
  //   const isLiked = card.isLiked;

  //   // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
  //   await api
  //     .changeLikeCardStatus(card._id, !isLiked)
  //     .then((newCard) => {
  //       setCards((state) =>
  //         state.map((currentCard) =>
  //           currentCard._id === card._id ? newCard : currentCard
  //         )
  //       );
  //     })
  //     .catch((error) => console.error(error));
  // }

  // async function handleCardDelete(cardId) {
  //   try {
  //     await api.deleteCard(cardId);
  //     setCards((state) => state.filter((card) => card._id !== cardId));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const NewCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlace={onAddPlace} />,
  };
  const EditProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const EditAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="avatar__container">
          <img
            className="avatar__image"
            src={currentUser?.avatar}
            alt="profile avatar"
          ></img>
          <div
            onClick={() => {
              onOpenPopup(EditAvatarPopup);
            }}
            className="avatar__edit-button"
            type="button"
          ></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            className="profile__edit-button"
            type="botton"
            onClick={() => {
              onOpenPopup(EditProfilePopup);
            }}
          ></button>
          <h2 className="profile__description">{currentUser?.about}</h2>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => {
            onOpenPopup(NewCardPopup);
          }}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              // props de Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      <ImagePopup card={selectedCard} onClose={onClosePopup} />
    </main>
  );
}
