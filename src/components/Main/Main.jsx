import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import avatar from "../../images/avatar_jacques.png";
import Popup from "./components/Popup/Popup";
import EditAvatar from "./components/Popup/form/EditAvatar/EditAvatar";
import NewCard from "./components/Popup/form/NewCard/NewCard";
import EditProfile from "./components/Popup/form/EditProfile/EditProfile";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";

// const cards = [
//   {
//     isLiked: false,
//     _id: "5d1f0611d321eb4bdcd707dd",
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
//     owner: "5d1f0611d321eb4bdcd707dd",
//     createdAt: "2019-07-05T08:10:57.741Z",
//   },
//   {
//     isLiked: false,
//     _id: "5d1f064ed321eb4bdcd707de",
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
//     owner: "5d1f0611d321eb4bdcd707dd",
//     createdAt: "2019-07-05T08:11:58.324Z",
//   },
// ];

// console.log(cards);

export default function Main(props) {
  const { popup, selectedCard, onOpenPopup, onClosePopup } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

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

  const NewCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
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
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
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
