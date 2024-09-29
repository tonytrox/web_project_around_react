function ImagePopup(props) {
  return (
    <div className="popup" id="popup-image">
      <div class="popup__container-images">
        <button
          className="popup__exit-button"
          type="button"
          id="form__exit-button"
        ></button>
        <img className="popup__img" id="popup__image" src="#" alt="" />
        <h3 className="popup__text" id="popup__caption"></h3>
      </div>
    </div>
  );
}

export default ImagePopup;
