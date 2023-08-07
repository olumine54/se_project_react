import React from "react";
import "../App/App.css";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useCallback, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather } from "../../utils/weatherApi";
import { parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch } from "react-router-dom";
import {
  getItems,
  addItems,
  deleteItems,
  removeCardLike,
  addCardLike,
} from "../../utils/api";
import { DeleteConfirmModal } from "../DeleteConfirmModal/DeleteConfirmModal";
//import { Redirect } from "react-router-dom";
import RegisterModal from "../Registermodal/RegisterModal";
import LoginModal from "../loggedIn/LoginModal";
//import { signIn, signUp, checkToken, editProfile } from "../Middlewear/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import ProtectedRoute from "../Middlewear/ProtectedRoute";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";
import * as auth from "../Middlewear/auth";
//import NavBar from "./NavBar";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  //const [prevItems, setPrevItems] = useState("");

  const history = useHistory();

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleOpenEditModal = () => {
    setActiveModal("edit");
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

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleProfileUpdate = ({ name, avatar }) => {
    console.log(name, avatar);
    auth
      .editProfile({ name, avatar }, token)
      .then(() => {
        handleCloseModal();
        setCurrentUser({ ...currentUser, name, avatar });
      })
      .catch(console.error);
  };

  const handleAddItem = ({ name, link, weather }) => {
    const token = localStorage.getItem("jwt");
    addItems({ name: name, imageUrl: link, weather: weather }, token)
      .then((item) => {
        // console.log(item);
        // const card = { ...item, name, link, weather };
        setClothingItems([item.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = (id) => {
    deleteItems({ id }, token)
      .then(() => {
        const filteredCards = clothingItems.filter((card) => {
          return card._id !== id;
        });

        setClothingItems(filteredCards);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res.data);
          setToken(jwt);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, [token]);

  const handleSignUp = ({ email, password, name, avatar }) => {
    setIsLoading(true);

    auth
      .signUp({ email, password, name, avatar })
      .then((res) => {
        if (res) {
          setCurrentUser(res.data);
          handleSignIn({ email, password });
          handleCloseModal();
          setIsLoggedIn(true);
        } else {
          console.log("Registration failed:", res.err);
        }
      })
      .catch(console.error);
  };

  const handleSignIn = ({ email, password }) => {
    auth
      .signIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        if (data.token) {
          return auth.checkToken(data.token);
        }
      })
      .then((res) => {
        const data = res.data;
        setCurrentUser(data);
        setToken(data.token);
        handleCloseModal();
        setIsLoggedIn(true);
        history.push("/profile");
      })

      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken("");
    setCurrentUser("");
    history.push("/");
  };

  const handleLikeClick = (id, isLiked) => {
    //const { id, isLiked } = like;
    //const token = localStorage.getItem("jwt");

    isLiked
      ? removeCardLike({ id }, token)
          .then((updatedCard) => {
            setClothingItems((cards) => {
              return cards.map((c) => (c._id === id ? updatedCard.data : c));
            });
          })
          .catch((err) => console.log(err))
      : addCardLike({ id }, token)
          .then((updatedCard) => {
            setClothingItems((cards) => {
              return cards.map((c) =>
                c._id === id ? { ...c, likes: updatedCard.data.likes } : c
              );
            });
          })
          .catch((err) => console.log(err));
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
              isLoggedIn={isLoggedIn}
              onRegisterModal={() => setActiveModal("register")}
              onLogInModal={() => setActiveModal("login")}
            />
            <Switch>
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  onSelectedCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  onCardLike={handleLikeClick}
                  isLoggedIn={isLoggedIn}
                />
              </Route>
              <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
                <Profile
                  items={clothingItems}
                  onSelectedCard={handleSelectedCard}
                  onCreateModal={handleCreateModal}
                  handleOpenEditModal={handleOpenEditModal}
                  logOut={handleLogOut}
                  onCardLike={handleLikeClick}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoute>
            </Switch>
            <Footer />
            {activeModal === "register" && (
              <RegisterModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "create"}
                handleSignUp={handleSignUp}
                isLoading={isLoading}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "create"}
                handleSignIn={handleSignIn}
                isLoading={isLoading}
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
                handleDeleteItem={handleOpenConfirmModal}
                onClose={handleCloseModal}
              />
            )}
            {activeModal === "delete" && (
              <DeleteConfirmModal
                handleDeleteItem={handleDeleteItem}
                handleCloseConfirmModal={handleCloseConfirmModal}
                selectedCard={selectedCard}
                handleCancel={handleCloseConfirmModal}
              />
            )}
            {activeModal === "edit" && (
              <EditProfileModal
                onClose={handleCloseModal}
                onEditProfile={handleProfileUpdate}
                clothingItems={clothingItems}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
