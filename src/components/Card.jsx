function Card({ name, link, likes, onCardClick, card }) {
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
