import { useEffect, useState } from "react";
import api from "./utils/api";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const getUserInfo = await api.getInfoProfile();
        setCurrentUser(getUserInfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main />
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
