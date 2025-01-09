export default function NewCard() {
  return (
    <>
      <input
        className="form__place popup__input"
        id="form__place"
        type="text"
        name="place"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error form__place-error"></span>
      <input
        className="form__image-link popup__input"
        id="form__image-link"
        type="url"
        name="link"
        placeholder="Enlace de la imagen"
        required
      />
      <span className="popup__error form__image-link-error"></span>
      <button className="popup__button form__save-button" id="save_place">
        Crear
      </button>
    </>
  );
}
