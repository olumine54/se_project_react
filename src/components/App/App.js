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

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);

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

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItem = ({ name, link, weather }) => {
    addItems({ name: name, link: link, weather: weather })
      .then((item) => {
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

  //   useEffect(() => {
  //     const closeByEscape = (e) => {
  //       if (e.key === 'Escape') {
  //         handleCloseModal();
  //       }
  //     }

  //     document.addEventListener('keydown', closeByEscape)

  //     return () => document.removeEventListener('keydown', closeByEscape)
  // }, [])

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
    <div className="page">
      <div className="page__wrapper">
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTemperatureUnit,
            handleToggleSwitchChange,
          }}>
          <Header onCreateModal={handleCreateModal} />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectedCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
            <Route path="/">
              <Profile
                items={clothingItems}
                onSelectedCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
              />
            </Route>
          </Switch>
          <Footer />
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
  );
}

export default App;
