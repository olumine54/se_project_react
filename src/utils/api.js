import { baseUrl } from "./constants";
import _checkResponse from "./constants";

const ApiItem = {
  getItems: () => {
    return fetch(`${baseUrl}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(_checkResponse);
  },
  addItems: ({ name, weather, link }) => {
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        weather,
        link,
      }),
    }).then(_checkResponse);
  },

  deleteItems: (item) => {
    return fetch(`${baseUrl}/items/${item}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(_checkResponse);
  },
};
export { ApiItem };
