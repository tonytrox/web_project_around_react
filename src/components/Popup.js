function Popup({
  isOpen,
  onClose,
  name,
  title,
  children,
  sendButtonText,
  onSubmitForm,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      id={`popup-${name}`}
    >
      <div className="popup__container">
        <form
          className="form popup__form"
          id={`form_${name}`}
          onSubmit={onSubmitForm}
          noValidate
        >
          <button
            onClick={onClose}
            type="button"
            className="form__exit-button"
            id="form__exit-button"
          ></button>
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="popup__button form__save-button">
            {sendButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
