import logo from "../images/logo_aroundus.svg";

function Header() {
  return (
    <header className="header">
      <img
        classNamne="header__logo"
        src={logo}
        alt="logo around the world USA"
      ></img>
    </header>
  );
}

export default Header;
