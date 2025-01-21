import { useEffect, useState } from "react";
import api from "./utils/api";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleOpenPopup(popup) {
    if (popup.link) {
      setSelectedCard(popup);
    } else {
      setPopup(popup);
    }
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.updateProfile(data.name, data.description).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
        <div>
          <Header />
          <Main
            selectedCard={selectedCard}
            onOpenPopup={handleOpenPopup}
            onClosePopup={handleClosePopup}
            popup={popup}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
