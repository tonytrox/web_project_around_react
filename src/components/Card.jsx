function Card({ name, link, likes }) {
  return (
    <li class="element__card">
      <div class="element__container">
        <img class="element__img" src={link} alt={name} />
        <div class="element__description">
          <h2 class="element__text">{name}</h2>
          <div class="element__container-like">
            <button class="element__like-button"></button>
            <p class="element__counter">{likes.length}</p>
          </div>
          <button class="element__remove-button"></button>
        </div>
      </div>
    </li>
  );
}

export default Card;
