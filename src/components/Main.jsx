import api from "../utils/Api.js";
import Card from "./Card.jsx";
import { useState, useEffect, useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="avatar__container">
          <img
            className="avatar__image"
            src={currentUser.avatar}
            alt="profile avatar"
          ></img>
          <div
            onClick={onEditAvatarClick}
            className="avatar__edit-button"
          ></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <h2 className="profile__description">{currentUser.about}</h2>
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
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
