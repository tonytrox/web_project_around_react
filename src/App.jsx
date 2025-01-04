import logo from "./images/logo_aroundus.svg";
import avatar from "./images/avatar_jacques.png";

function App() {
  return (
    <>
      <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="Around the U.S logo"
        />
      </header>
      <main className="content">
        <section className="profile">
          <img
            className="profile__image"
            src={avatar}
            alt="profile avatar"
          />
          <div className="profile__info">
            <h1 className="profile__title">Jacques Cousteau</h1>
            <button className="profile__edit-button"></button>
            <h2 className="profile__description">Explorer</h2>
          </div>
          <button className="profile__add-button"></button>
        </section>
        <section className="elements">
          <ul className="elements__list"></ul>
        </section>
      </main>
      <footer className="footer">
        <p className="footer__copyright">&copy; 2023 Around The U.S.</p>
      </footer>
    </>
  );
}

export default App;
