import api from "../utils/Api.js";
import Card from "./Card.jsx";
import { useState, useEffect } from "react";

function Main({ onEditProfileClick, onAddPlaceClick, onEditAvatarClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await api.getInfoProfile();
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
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

  // Función para renderizar las tarjetas

  return (
    <main className="content">
      <section className="profile">
        <div className="avatar__container">
          <img
            className="avatar__image"
            src={userAvatar}
            alt="profile avatar"
          ></img>
          <div
            onClick={onEditAvatarClick}
            className="avatar__edit-button"
          ></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <h2 className="profile__description">{userDescription}</h2>
          <button
            onClick={onEditProfileClick}
            className="profile__edit-button"
          ></button>
        </div>
        <button
          onClick={onAddPlaceClick}
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card name={card.name} link={card.link} likes={card.likes} />
          ))}
        </ul>
      </section>

      {/* <div class="popup" id="popup-confirm-card">
        <div class="popup__container-confirm-card">
          <button
            class="popup__exit-button"
            type="button"
            id="form__exit-button"
          ></button>
          <h2 class="form__title popup__title">¿Estás seguro?</h2>
          <button class="popup__button form__save-button" id="remove_card">
            S&iacute;
          </button>
        </div>
      </div> */}

      {/* <div class="popup" id="popup-image">
        <div class="popup__container-images">
          <button
            class="popup__exit-button"
            type="button"
            id="form__exit-button"
          ></button>
          <img class="popup__img" id="popup__image" src="#" alt="" />
          <h3 class="popup__text" id="popup__caption"></h3>
        </div>
      </div> */}
    </main>
  );
}

export default Main;
