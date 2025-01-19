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

export default function Main() {
  const currentUser = useContext(CurrentUserContext);

  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
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
              handleOpenPopup(EditAvatarPopup);
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
              handleOpenPopup(EditProfilePopup);
            }}
          ></button>
          <h2 className="profile__description">{currentUser?.about}</h2>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => {
            handleOpenPopup(NewCardPopup);
          }}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      <ImagePopup card={selectedCard} onClose={handleClosePopup} />
    </main>
  );
}
