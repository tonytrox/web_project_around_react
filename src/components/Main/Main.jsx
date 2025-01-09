import avatar from "../../images/avatar_jacques.png";
import Popup from "./components/Popup/Popup";
import EditAvatar from "./components/Popup/form/EditAvatar/EditAvatar";
import NewCard from "./components/Popup/form/NewCard/NewCard";
import EditProfile from "./components/Popup/form/EditProfile/EditProfile";

import { useState } from "react";

export default function Main() {
  const [popup, setPopup] = useState(null);

  const NewCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const EditProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const EditAvatarPopup = { title: "Editar avatar", children: <EditAvatar /> };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="avatar__container">
          <img
            className="avatar__image"
            src={avatar}
            alt="profile avatar"
          ></img>
          <div
            onClick={() => {
              handleOpenPopup(EditAvatarPopup);
            }}
            className="avatar__edit-button"
            type="button"
          ></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            className="profile__edit-button"
            type="botton"
            onClick={() => {
              handleOpenPopup(EditProfilePopup);
            }}
          ></button>
          <h2 className="profile__description">Explorer</h2>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => {
            handleOpenPopup(NewCardPopup);
          }}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
