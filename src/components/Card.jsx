import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";

function Card({ name, link, likes, onCardClick, card }) {
  const currentUser = useContext(CurrentUserContext);

  // Verificando si el usuario actual es el propietario de la tarjeta actual
  // const isOwn = card.owner._id === currentUser._id;

  // Creando una variable que después establecerás en `className` para el botón eliminar
  // const cardDeleteButtonClassName = `card__delete-button ${
  //   isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  // }`;

  // Verifica si el usuario actual le dio "like" a la tarjeta
  // const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Crea una variable que después establecerás en `className` para el botón like
  // const cardLikeButtonClassName = `...`;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element__card" onClick={handleClick}>
      <div className="element__container">
        <img className="element__img" src={link} alt={name} />
        <div className="element__description">
          <h2 className="element__text">{name}</h2>
          <div className="element__container-like">
            <button className="element__like-button"></button>
            <p className="element__counter">{likes.length}</p>
          </div>
          <button className="element__remove-button"></button>
        </div>
      </div>
    </li>
  );
}

export default Card;
