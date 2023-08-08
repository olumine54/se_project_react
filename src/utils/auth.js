import { baseUrl } from "./constants";
import _checkResponse from "./constants";
export const signUp = ({ name, avatar, password, email }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, password, email }),
  })
    .then((res) => _checkResponse(res))
    .then((res) => res);
};
export const signIn = ({ password, email }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => _checkResponse(res))
    .then((res) => res);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => _checkResponse(res))
    .then((res) => res);
};
export const editProfile = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  })
    .then((res) => _checkResponse(res))
    .then((data) => {
      return data;
    });
};
