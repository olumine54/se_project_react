import React from "react";
import "../App/App.css";
import Header from "../Header/Header";
import { Profile } from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { AddItemModal } from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather } from "../../utils/weatherApi";
import { parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import { ApiItem } from "../../utils/api";
import { defaultClothingItems } from "../../utils/constants";
import { DeleteConfirmModal } from "../DeleteConfirmModal/DeleteConfirmModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

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

  // const onAddItem = (values) => {
  //   console.log(values);
  // };

  const handleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const onAddItem = ({ name, link, weatherType }) => {
    ApiItem.addItem({
      name,
      link,
      weather: weatherType,
    })
      .then((res) => {
        console.log(res);
        setClothingItems([res, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = (item) => {
    console.log(item);
    ApiItem.deleteItem(item.id)
      .then(() => {
        const filteredCards = clothingItems.filter(
          (card) => card.id !== item.id
        );
        console.log(filteredCards);
        setClothingItems(filteredCards);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temper = parseWeatherData(data);
        setTemp(temper);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(currentTemperatureUnit);
  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTemperatureUnit,
            handleSwitchChange,
          }}>
          <Header onCreateModal={handleCreateModal} />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
            <Route path="/">
              <Profile
                items={clothingItems}
                onSelectCard={handleSelectedCard}
              />
            </Route>
          </Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              handleCloseModal={handleCloseModal}
              onDelete={handleDeleteItem}
              handleOpenConfirmModal={handleOpenConfirmModal}
            />
          )}
          {activeModal === "delete" && (
            <DeleteConfirmModal
              handleDeleteItem={() => handleDeleteItem(selectedCard._id)}
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
