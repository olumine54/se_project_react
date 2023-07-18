import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import { temperature } from "../../utils/weatherApi";

const getWeatherType = (weatherTemp) => {
  if (weatherTemp >= 86) {
    return "hot";
  } else if (weatherTemp >= 66 && weatherTemp <= 85) {
    return "warm";
  } else if (weatherTemp <= 65) {
    return "cold";
  }
};
function Main({ weatherTemp, onSelectedCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentTemp = temperature(weatherTemp);
  const currentTempString = currentTemp[currentTemperatureUnit];

  const weatherType = getWeatherType(weatherTemp);
  const filteredCards = clothingItems.filter((card) => {
    return card.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card_section" id="card__section">
        Today is {currentTempString} / You may want to wear:
        <div className="card_items">
          {filteredCards.map((card) => (
            <ItemCard
              key={card._id}
              item={card}
              onSelectedCard={onSelectedCard}
              // name={card.name}
              // weather={card.weather}
              // id={card.id}
              // link={card.link}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
