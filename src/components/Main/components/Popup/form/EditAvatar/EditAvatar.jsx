export default function EditAvatar() {
  return (
    <>
      <input
        className="form__image-link popup__input"
        id="form__image-link"
        type="url"
        name="link"
        placeholder="Enlace de la imagen"
        // required
      />
      <span className="popup__error form__image-link-error"></span>
      <button className="popup__button form__save-button" id="save_avatar">
        Guardar
      </button>
    </>
  );
}
