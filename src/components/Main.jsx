function Main() {
  const handleEditAvatarClick = () => {
    const popupEditAvatar = document.querySelector("#popup-edit-avatar");
    popupEditAvatar.classList.toggle("popup_opened");
  };

  const handleEditProfileClick = () => {
    const popupEditProfile = document.querySelector("#popup-edit-profile");
    popupEditProfile.classList.toggle("popup_opened");
  };

  const handleAddPlaceClick = () => {
    const popupAddPlace = document.querySelector("#popup-add-place");
    popupAddPlace.classList.toggle("popup_opened");
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__image"
            src="<%= require('./images/jacques.png')%>"
            alt="profile avatar"
          ></img>
          <button
            onClick={handleEditAvatarClick}
            className="profile__edit-avatar"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">Cousteau</h1>
          <h2 className="profile__description">Explorador</h2>
          <button
            onClick={handleEditProfileClick}
            className="profile__edit-button"
          ></button>
        </div>
        <button
          onClick={handleAddPlaceClick}
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list"></ul>
      </section>

      <div className="popup" id="popup-edit-profile">
        <div className="popup__container">
          <form className="form popup__form" id="form_edit-profile" novalidate>
            <button
              type="button"
              class="form__exit-button"
              id="form__exit-button"
            ></button>
            <h2 className="form__title">Editar perfil</h2>
            <input
              className="form__name popup__input"
              id="form__name"
              type="text"
              name="name"
              placeholder="Nombre"
              maxlength="40"
              minlength="2"
              required
            />
            <span className="popup__error form__name-error"></span>
            <input
              className="form__description popup__input"
              id="form__description"
              type="text"
              name="description"
              placeholder="Descripción"
              maxlength="200"
              minlength="2"
              required
            />
            <span className="popup__error form__description-error"></span>
            <button
              className="popup__button form__save-button"
              id="save_profile"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>

      <div className="popup" id="popup-edit-avatar">
        <div className="popup__container-edit-avatar">
          <form className="form popup__form" id="form_edit-avatar" novalidate>
            <button
              type="button"
              className="form__exit-button"
              id="form__exit-button"
            ></button>
            <h2 className="form__title">Cambiar foto de perfil</h2>
            <input
              className="form__image-link popup__input"
              id="form__image-link"
              type="url"
              name="link"
              placeholder="Enlace de la imagen"
              required
            />
            <span className="popup__error form__image-link-error"></span>
            <button
              className="popup__button form__save-button"
              id="save_avatar"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>

      <div className="popup" id="popup-add-place">
        <div className="popup__container">
          <form className="form popup__form" id="form_add-element" novalidate>
            <button
              type="button"
              className="form__exit-button"
              id="form__exit-button"
            ></button>
            <h2 className="form__title">Nuevo lugar</h2>
            <input
              className="form__place popup__input"
              id="form__place"
              type="text"
              name="place"
              placeholder="Título"
              minlength="2"
              maxlength="30"
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
          </form>
        </div>
      </div>

      <div class="popup" id="popup-confirm-card">
        <div class="popup__container-confirm-card">
          <button
            class="popup__exit-button"
            type="button"
            id="form__exit-button"
          ></button>
          <h2 class="form__title popup__title">¿Estás seguro?</h2>
          <button class="popup__button form__save-button" id="remove_card">
            S&iacute;
          </button>
        </div>
      </div>

      <div class="popup" id="popup-image">
        <div class="popup__container-images">
          <button
            class="popup__exit-button"
            type="button"
            id="form__exit-button"
          ></button>
          <img class="popup__img" id="popup__image" src="#" alt="" />
          <h3 class="popup__text" id="popup__caption"></h3>
        </div>
      </div>
    </main>
  );
}

export default Main;
