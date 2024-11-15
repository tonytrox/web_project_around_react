import { useRef } from "react";

import Popup from "./Popup.js";

function NewCard({ isOpen, onClose, onAddPlaceSubmit }) {
  const nameRef = useRef();
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
    onClose();
  }

  return (
    <Popup
      name="add-place"
      title="Nuevo lugar"
      onClose={onClose}
      isOpen={isOpen}
      sendButtonText="Crear"
      onSubmitForm={handleSubmit}
    >
      <input
        className="form__place popup__input"
        id="form__place"
        type="text"
        name="place"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        ref={nameRef}
      />
      <span className="popup__error form__place-error"></span>
      <input
        className="form__image-link popup__input"
        id="form__image-link"
        type="url"
        name="link"
        placeholder="Enlace de la imagen"
        required
        ref={linkRef}
      />
      <span className="popup__error form__image-link-error"></span>
    </Popup>
  );
}

export default NewCard;
