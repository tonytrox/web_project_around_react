export default function Popup(props) {
  //los hijos son el contenido de la ventana emergente
  const { onClose, title, children } = props;
  return (
    <div className="popup popup_opened">
      <div className="popup__container">
        <div className="form popup__form" noValidate>
          <button
            type="button"
            className="form__exit-button"
            id="form__exit-button"
            onClick={onClose}
          ></button>
          <h2 className="form__title">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
