export default function Popup(props) {
  //los hijos son el contenido de la ventana emergente
  const { onClose, title, children } = props;
  return (
    <div className="popup popup_opened" id="popup-edit-profile">
      <div className="popup__container">
        <form className="form popup__form" id="form_edit-profile" noValidate>
          <button
            type="button"
            className="form__exit-button"
            id="form__exit-button"
            onClick={onClose}
          ></button>
          <h2 className="form__title">{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
}
