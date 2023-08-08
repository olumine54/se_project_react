import { baseUrl } from "./constants";
import _checkResponse from "./constants";

function request(url, options) {
  return fetch(url, options).then(_checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function addItems({ name, weather, imageUrl }, token) {
  return request(`${baseUrl}/items`, {
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
  });
}

function deleteItems({ id }, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function addCardLike({ id }, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
}

function removeCardLike({ id }, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
}
export { getItems, addItems, deleteItems, removeCardLike, addCardLike };
