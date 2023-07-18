import React from "react";
import "../App/App.css";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather } from "../../utils/weatherApi";
import { parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import { getItems, addItems, deleteItems } from "../../utils/api";
import { DeleteConfirmModal } from "../DeleteConfirmModal/DeleteConfirmModal";
//import { Redirect } from "react-router-dom";
import RegisterModal from "../Registermodal/RegisterModal";
import LoginModal from "../loggedIn/LoginModal";
import { signIn, signUp, checkToken } from "../Middlewear/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import ProtectedRoute from "../Middlewear/ProtectedRoute";
//import NavBar from "./NavBar";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [permision, setPermission] = useState(true);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseConfirmModal = () => {
    setActiveModal("");
  };
  const handleOpenConfirmModal = () => {
    setActiveModal("delete");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  // const signUp = () => {
  //   setActiveModal("create");
  // };

  // const signIn = () => {
  //   setActiveModal("create");
  // };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItem = ({ name, link, weather }) => {
    addItems({ name: name, link: link, weather: weather })
      .then((item) => {
        console.log(item);
        const card = { ...item, name, link, weather };
        setClothingItems([card, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = (id) => {
    deleteItems(id)
      .then(() => {
        const filteredCards = clothingItems.filter((card) => card.id !== id);
        setClothingItems(filteredCards);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log(localStorage);

    if (localStorage.getItem("jwt")) {
      checkToken().then((data) => console.log(data));
    } else {
      setPermission(false);
    }
  }, []);

  const handleSignUp = ({ name, avatar, email, password }) => {
    signUp({ name, avatar, email, password }).then((res) => {
      console.log(res);
      signIn(res).then((response) => {
        // in the resoponse you get a token, this token you can save in a local storage and check it's there, if token came + this is correct = we show a hidden path
        console.log(response);
      });
    });
  };

  const handleSignIn = ({ email, password }) => {
    signIn({ email, password }).then((data) => {
      console.log(data);
      localStorage.setItem("jwt", data.token);
      checkToken(data.token).then((res) => {
        console.log(res);
        setLoggedIn(true);
        setCurrentUser(res.user);
      });
    });
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temper = parseWeatherData(data);
        setTemp(temper);
        getItems()
          .then((res) => {
            setClothingItems(res);
          })
          .catch(() => console.log("Error!"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          <CurrentTemperatureUnitContext.Provider
            value={{
              currentTemperatureUnit,
              handleToggleSwitchChange,
            }}>
            <Header
              onCreateModal={handleCreateModal}
              loggedIn={loggedIn}
              onRegisterModal={() => setActiveModal("register")}
              onLogInModal={() => setActiveModal("login")}
            />
            <Switch>
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  onSelectedCard={handleSelectedCard}
                  clothingItems={clothingItems}
                />
              </Route>
              <ProtectedRoute path="/">
                <Profile
                  items={clothingItems}
                  onSelectedCard={handleSelectedCard}
                  onCreateModal={handleCreateModal}
                />
              </ProtectedRoute>
            </Switch>
            <Footer />
            {activeModal === "register" && (
              <RegisterModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "create"}
                handleSignUp={handleSignUp}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "create"}
                handleSignIn={handleSignIn}
              />
            )}
            {activeModal === "create" && (
              <AddItemModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "create"}
                handleAddItem={handleAddItem}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                selectedCard={selectedCard}
                handleCloseModal={handleCloseModal}
                onDelete={handleDeleteItem}
                handleOpenConfirmModal={handleOpenConfirmModal}
                onClose={handleCloseModal}
              />
            )}
            {activeModal === "delete" && (
              <DeleteConfirmModal
                handleDeleteItem={handleDeleteItem}
                handleCloseConfirmModal={handleCloseConfirmModal}
                selectedCard={selectedCard}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

// !loggedIn ? (
//   <>
//     signIn
//     Sihn Up
//   </>
// ) : (
//   UserrProfile
// )
