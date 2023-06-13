import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
//import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../CurrentTemperatureUnitContext";
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
function Main({ weatherTemp, onSelectCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentTemp = temperature(weatherTemp);
  const currentTempString = currentTemp[currentTemperatureUnit];
  //const temp = weatherTemp?.temperature?.currentTemperatureUnit || 999;
  const weatherType = getWeatherType(weatherTemp);
  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });
  return (
    <main className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card_section" id="card__section">
        Today is {currentTempString} / You may want to wear:
        <div className="card_items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={onSelectCard}
              name={item.name}
              weather={item.weather}
              id={item.id}
              link={item.link}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
