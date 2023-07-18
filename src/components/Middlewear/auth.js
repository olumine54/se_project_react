import { baseUrl } from "../../utils/constants";
export const signUp = (name, avatar, password, email) => {
  return fetch(`${baseUrl}/auth/local/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const signIn = (password, email) => {
  return fetch(`${baseUrl}/auth/local/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      } else {
        return;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/auth/local/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const editProfile = (name, avatar) => {
  return fetch(`${baseUrl}/auth/local/editProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name, avatar),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server if needed
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the API call
      console.error(error);
    });
};
