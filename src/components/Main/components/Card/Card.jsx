export default function Card(props) {
  const { name, link, isLiked } = props.card;

  return (
    <>
      <li className="element__card">
        <div className="element__container">
          <img className="element__img" src={link} alt={name} />
          <div className="element__description">
            <h2 className="element__text">{name}</h2>
            <div className="element__container-like">
              <button className="element__like-button" type="button"></button>
              {/* <p className="element__counter">{likes.length}</p> */}
            </div>
            <button className="element__remove-button" type="button"></button>
          </div>
        </div>
      </li>
    </>
  );
}
