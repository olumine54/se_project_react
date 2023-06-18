import sunnyDay from "../images/day/sunny.svg";
import cloudyDay from "../images/day/cloudy.svg";
import cloudyNight from "../images/night/cloudy.svg";
import moonNight from "../images/night/moon.svg";

export const weatherOptions = [
  {
    url: sunnyDay,
    day: true,
    type: "sunny",
  },
  {
    url: cloudyDay,
    day: true,
    type: "cloudy",
  },
  {
    url: cloudyNight,
    day: false,
    type: "cloudy",
  },
  {
    url: moonNight,
    day: false,
    type: "moon",
  },
];

export default function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error${res.status}`);
}

export const baseUrl =
  "https://my-json-server.typicode.com/olumine54/se_project_react";
//export const baseUrl = "http://localhost:3001";

export const latitude = 44.34;
export const longitude = 10.99;
export const APIkey = "87dca1eddcea29b389dfb0be2418219f";
