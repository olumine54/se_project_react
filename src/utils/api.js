import { baseUrl } from "./constants";
import _checkResponse from "./constants";

function getItems() {
  return fetch(`${baseUrl}/items`).then(_checkResponse);
}

function addItems({ name, weather, imageUrl }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(_checkResponse);
}

function deleteItems({ id }, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
}

function addCardLike({ id }, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  }).then(_checkResponse);
}

function removeCardLike({ id }, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  }).then(_checkResponse);
}
export { getItems, addItems, deleteItems, removeCardLike, addCardLike };
