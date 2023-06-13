import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import React, { useContext } from "react";
import { temperature } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption = weatherOptions.find((option) => {
    return option.day === day && option.type === type;
  });
  const weatherOptionUrl = weatherOption.url || "";
  const currentTemp = temperature(weatherTemp);
  const currentTempString = currentTemp[currentTemperatureUnit];

  return (
    <section className="weather" id="weather">
      <div className="weather__info">{currentTempString}</div>

      <img
        src={weatherOptionUrl}
        className="weather__image"
        alt="weather--option-image"
      />
    </section>
  );
};
export default WeatherCard;
