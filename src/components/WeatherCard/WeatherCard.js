import "./WeatherCard.css";

const weatherOptions = [
  {
    url: require("../../images/day/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/night/cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../../images/night/moon.svg").default,
    day: false,
    type: "moon",
  },
];

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
