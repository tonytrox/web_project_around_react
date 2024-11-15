import { useRef } from "react";
// import { useContext } from "react";
// import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import PopupWithForm from "./PopupWithForm.jsx";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  //   const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    onClose();
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Cambiar foto de perfil"
      onClose={onClose}
      isOpen={isOpen}
      sendButtonText="Guardar"
      onSubmitForm={handleSubmit}
    >
      <input
        className="form__image-link popup__input"
        id="form__image-link"
        type="url"
        name="link"
        placeholder="Enlace de la imagen"
        required
        ref={avatarRef}
      />
      <span className="popup__error form__image-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
