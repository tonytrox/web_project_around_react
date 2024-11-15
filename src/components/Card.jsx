import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";

// recibe una tarjeta (card) y un callback (function onCardClick)
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button_visible" : ""
  }`;

  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Crea una variable que después establecerás en `className` para el botón like
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element__card">
      <div className="element__container">
        <img
          className="element__img"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <div className="element__description">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__container-like">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <p className="element__counter">{card.likes.length}</p>
          </div>
          <button
            className={cardDeleteButtonClassName}
            onClick={handleDeleteClick}
          ></button>
        </div>
      </div>
    </li>
  );
}

export default Card;
