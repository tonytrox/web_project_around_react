export default function EditProfile() {
  return (
    <>
      <input
        className="form__name popup__input"
        id="form__name"
        type="text"
        name="name"
        placeholder="Nombre"
        maxLength="40"
        minLength="2"
        // required
      />
      <span className="popup__error form__name-error"></span>
      <input
        className="form__description popup__input"
        id="form__description"
        type="text"
        name="description"
        placeholder="Descripción"
        maxLength="200"
        minLength="2"
        // required
      />
      <span className="popup__error form__description-error"></span>
      <button className="popup__button form__save-button" id="save_profile">
        Guardar
      </button>
    </>
  );
}
