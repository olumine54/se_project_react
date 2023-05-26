import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find((option) => {
    return option.day === day && option.type === type;
  });
  const weatherOptionUrl = weatherOption.url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp} °F</div>

      <img
        src={weatherOptionUrl}
        className="weather__image"
        alt="weather--option-image"
      />
    </section>
  );
};
export default WeatherCard;
