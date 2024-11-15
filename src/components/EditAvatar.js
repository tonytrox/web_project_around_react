import { useRef } from "react";
// import { useContext } from "react";
// import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Popup from "./Popup.js";

function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
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
    <Popup
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
    </Popup>
  );
}

export default EditAvatar;
