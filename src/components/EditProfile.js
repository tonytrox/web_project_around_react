import { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import PopupWithForm from "./Popup.js";

function EditProfilePopup({ isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext); // Obtiene el objeto currentUser

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => {
    setname(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    currentUser.handleUpdateProfile({ name, about: description });
    onClose();
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Editar perfil"
      onClose={onClose}
      isOpen={isOpen}
      sendButtonText="Guardar"
      onSubmitForm={handleSubmit}
    >
      <input
        className="form__name popup__input"
        id="form__name"
        type="text"
        name="name"
        placeholder="Nombre"
        maxLength="40"
        minLength="2"
        required
        value={name}
        onChange={handleNameChange}
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
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error form__description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
