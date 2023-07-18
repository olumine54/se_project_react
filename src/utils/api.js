import { baseUrl } from "./constants";
import _checkResponse from "./constants";

function getItems() {
  console.log(12313);
  return fetch(`${baseUrl}/items`).then(_checkResponse);
}

function addItems({ name, weather, link }) {
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
}

function deleteItems(item) {
  return fetch(`${baseUrl}/items/${item}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(_checkResponse);
}
export { getItems, addItems, deleteItems };
